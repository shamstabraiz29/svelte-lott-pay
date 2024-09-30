<script lang="ts">
  import { afterUpdate, onDestroy, onMount, tick } from "svelte";
  import { page } from "$app/stores";
  import { getStripe } from "$lib/stripe";
  import { formatTime } from "$lib/helpers/index";
  import { type Stripe } from "@stripe/stripe-js";

  import img from "$lib/images/carTrack.png";
  import Icon from "$lib/components/icons/index.svelte";
  import Analytics from "./analytics.svelte";
  import Button from "$lib/components/button/index.svelte";
  import CheckBox from "./checkBox.svelte";
  import Typography from "$lib/components/typography/index.svelte";
  import {
    IsCardExpanded,
    ShowToastError,
    isPaymentButtonEnabled,
    parkEntryId,
    paymentRequestId,
    receiptEmail,
    type CardExpandState,
    isChecked,
    isConfirmPayment,
    parkIdStore,
  } from "$lib/store";
  import {
    publicPayParkEntry,
    type GetPublicParkEntryQuery,
    GetPublicParkEntryDoc,
  } from "../../../../graphql/generated";
  import SingUpReciptModal from "$lib/components/modal/signupRecipt.svelte";
  import BottomSheet from "$lib/components/bottomSheet/index.svelte";
  import Loader from "$lib/components/loader/index.svelte";

  import client from "$lib/graphql/apollo";
  import { trackEvent } from "$lib/helpers/tracking";

  export let id: any;
  export let name: string;
  export let occupied: boolean;
  let cardLoading: boolean = false;
  let isLoading: boolean = false;
  let expandButtons: boolean = false;
  let checkLoading: boolean = true;
  let email: string = "";
  let parkId: string = "";
  let stripe: Stripe;
  let clientSecret: any;
  let isReadyToMountStripe = false;
  let getPublicParkEntryData: GetPublicParkEntryQuery["getPublicParkEntry"];
  let localModal: CardExpandState = { isExpanded: false, id: "" };
  let shouldScrollIntoView: boolean = true;

  const unsubscribe = IsCardExpanded.subscribe((value) => {
    localModal = value;
  });
  onDestroy(unsubscribe);

  onMount(async () => {
    stripe = await getStripe();
    isReadyToMountStripe = true;
    if (typeof window !== "undefined") {
      const id: string = $page.params.id;
      parkIdStore.set(id);
    }
  });
  afterUpdate(() => {
    buildCard(clientSecret);
  });

  $: if (isReadyToMountStripe && stripe && clientSecret) {
    prepareStripeElement(clientSecret);
  }

  async function prepareStripeElement(clientSecret: string) {
    await tick();
    if (document.querySelector("#express-checkout-element")) {
      buildExpressCheckout(clientSecret);
    } else {
      console.error(
        "#express-checkout-element not found even after awaiting tick"
      );
    }
  }

  afterUpdate(() => {
    if (localModal.isExpanded && localModal.id === id && shouldScrollIntoView) {
      const element = document.getElementById(`card-${id}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  });

  receiptEmail.subscribe(($email) => {
    email = $email;
  });
  parkEntryId.subscribe(($parkId) => {
    parkId = $parkId;
  });

  const handleCreatePaymentIntent = async () => {
    shouldScrollIntoView = false;
    trackEvent("clicks_proceed_payment", { key: name });
    try {
      isLoading = true;
      const result = await publicPayParkEntry({
        variables: {
          data: {
            parkEntryId: parkId,
            receiptEmail: email ? email : null,
            sendReceipt: email ? true : false,
          },
        },
      });
      paymentRequestId.set(result.data?.publicPayParkEntry?.paymentRequest.id);
      clientSecret = result.data?.publicPayParkEntry?.clientSecret;
      expandButtons = !expandButtons;
      isLoading = false;
    } catch (error) {
      ShowToastError.set({
        showToastError: true,
        text: "",
      });
      console.error(error);
      isLoading = false;
    }
  };

  const toggleCard = () => {
    shouldScrollIntoView = true;
    if (occupied) {
      IsCardExpanded.set({
        isExpanded: localModal.id !== id || !localModal.isExpanded,
        id: id,
      });
      if (localModal.isExpanded) fetchPublicParkEntry(id);
      parkEntryId.set(id);
    }
    if (localModal.isExpanded && localModal.id === id) {
      trackEvent("opens_parking_slot", { key: name });
    }
    expandButtons = false;
    checkLoading = true;
  };

  async function fetchPublicParkEntry(parkEntryId: string) {
    cardLoading = true;
    isChecked.set(false);
    receiptEmail.set("");
    try {
      const { data, loading, errors } = await client.query({
        query: GetPublicParkEntryDoc,
        variables: { id: parkEntryId },
        fetchPolicy: "network-only",
      });

      if (data) {
        getPublicParkEntryData = data.getPublicParkEntry;
      }
      if (errors) {
        ShowToastError.set({
          showToastError: true,
          text: "Failed to fetch park entry data.",
        });
        IsCardExpanded.set({
          isExpanded: false,
          id: "",
        });
      }
    } catch (error) {
      console.error(error);
      ShowToastError.set({
        showToastError: true,
        text: "An unknown error occurred.",
      });
      IsCardExpanded.set({
        isExpanded: false,
        id: "",
      });
    } finally {
      cardLoading = false;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      toggleCard();
    }
  }

  function hashString(inputString: string) {
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }
    return hash;
  }

  function generateCarColor(id: string) {
    if (!id) {
      return "";
    }

    const index = Math.abs(hashString(id)) % 7;

    const carColors = [
      "#C8E5E1",
      "#E6D5F3",
      "#EEEED0",
      "#D6DFF6",
      "#D6EBCD",
      "#D1D1D1",
      "#F4D9D5",
    ];

    return carColors[index];
  }

  const handleError = (error: any) => {
    const messageContainer = document.querySelector(
      "#error-message"
    ) as Element;
    messageContainer.textContent = error.message;
  };

  const buildExpressCheckout = async (pi: string) => {
    if (!stripe) return;

    const element = stripe.elements({
      clientSecret: pi,
      appearance: {
        theme: "flat",
        variables: {
          borderRadius: "8px",
        },
      },
    });
    const expressCheckoutElement = element.create("expressCheckout", {
      buttonHeight: 55,
      buttonType: {
        googlePay: "plain",
        applePay: "plain",
      },
      buttonTheme: {
        googlePay: "black",
        applePay: "black",
      },
      layout: {
        maxColumns: 1,
        maxRows: 10,
      },
      paymentMethodOrder: ["googlePay", "applePay"],
      wallets: {
        applePay: "always",
        googlePay: "always",
      },
    });
    expressCheckoutElement.on("ready", function (event) {
      checkLoading = false;
    });
    expressCheckoutElement.mount("#express-checkout-element");
    expressCheckoutElement.on("confirm", async () => {
      const { error: submitError } = await element.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const { error } = await stripe.confirmPayment({
        elements: element,
        clientSecret: pi,
        confirmParams: { return_url: `${$page.url.origin}/thankyou` },
      });
      if (error) {
        console.log(error);
        handleError(error);
      } else {
      }
    });
  };
  const buildCard = async (pi: string) => {
    if (!stripe) return;
    const form = document.getElementById("payment-form");
    if (!form) return;

    const element = stripe.elements({
      clientSecret: pi,
      appearance: {},
    });

    const paymentElement = element.create("payment", {
      layout: {
        type: "tabs",
        radios: false,
      },
      wallets: {
        googlePay: "never",
        applePay: "never",
      },
      fields: {
        billingDetails: {
          address: {
            country: "never",
          },
        },
      },
    });
    paymentElement.mount("#credit-card-element");
    paymentElement.on("change", (event) => {
      if (event.complete) {
        isPaymentButtonEnabled.set(true);
      }
    });
    form.addEventListener("submit", async (event) => {
      isConfirmPayment.set(true);
      event.preventDefault();
      if (stripe) {
        const { error: confirmError } = await stripe.confirmPayment({
          elements: element,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                address: {
                  country: "JP",
                },
              },
            },
            return_url: `${$page.url.origin}/thankyou`,
          },
        });
        if (confirmError) {
          handleError(confirmError);
          isConfirmPayment.set(false);
          return;
        }
      }
    });
  };
</script>

<div
  id={`card-${id}`}
  class={`mx-auto rounded-[25px] transition-all duration-300
  ease-in-out max-w-sm overflow-hidden pt-[15px]
   px-[25px] border-2 border-[#424242] bg-[#FFF] ${
     localModal.isExpanded && localModal.id !== null && localModal.id !== id
       ? "opacity-50"
       : ""
   }  ${occupied ? "cardContianer" : "bg-white border-light-300"}`}
>
  <div class="flex flex-col relative">
    <div
      role="button"
      tabindex="0"
      on:keydown={handleKeydown}
      on:click={toggleCard}
      class={`w-full relative flex items-center justify-between bg-cover bg-center h-[100px] pb-[15px]`}
    >
      <div class="z-10 w-10">
        <Typography
          size={"6xl"}
          font="medium"
          color="dark"
          className={`font-fractul mt-3 tracking-[0.5px]  ${
            occupied ? "" : "text-light-400"
          }`}
        >
          {name}
        </Typography>
      </div>
      <div class="parkCar">
        <img src={img} alt="" />
      </div>
      {#if occupied}
        <div class="z-10">
          <Icon name="coloredCar" color={`${generateCarColor(id)}`} />
        </div>
      {/if}
      <div class="z-10 w-10">
        {#if occupied}
          <Typography
            size="5xl"
            font="medium"
            color="dark"
            className=" tracking-[0.42px]"
          >
            満
          </Typography>
        {:else}
          <Typography
            size="5xl"
            font="medium"
            color="dark"
            className="text-light-400 tracking-[0.42px]"
          >
            空
          </Typography>
        {/if}
      </div>
    </div>
    {#if cardLoading}
      <div class="flex justify-center items-center mb-4">
        <Loader color="#0000" size="sm" />
      </div>
    {:else if getPublicParkEntryData && localModal.isExpanded && localModal.id === id}
      <div class="flex flex-col gap-[15px]">
        <div
          class={`${
            getPublicParkEntryData &&
            getPublicParkEntryData.remainingFare === 0 &&
            "border-b pb-[25px] border-dark-300 rounded-[10px]"
          }`}
        >
          <Analytics
            {expandButtons}
            ReceiptDate={getPublicParkEntryData.enteredAt}
            stockingTime={getPublicParkEntryData.enteredAt}
            settlementAmount={getPublicParkEntryData.remainingFare}
          />
        </div>
        {#if getPublicParkEntryData && getPublicParkEntryData.remainingFare !== 0}
          <div class="flex flex-col gap-[15px]">
            <div class="flex gap-4 justify-center items-center">
              {#if getPublicParkEntryData}
                <div class="mb-[3px]">
                  <Typography
                    size="sm"
                    font="medium"
                    color="secondary"
                    className="tracking-[0.14px]">利用時間</Typography
                  >
                </div>
                <div
                  class="flex text-base font-medium text-dark-100 space-x-2 tracking-[2.1px]"
                >
                  {@html formatTime(getPublicParkEntryData.elapsedSeconds || 0)}
                </div>
              {/if}
            </div>
            <div
              class="flex items-center justify-center gap-2 border border-dark-300 py-[10px] rounded-lg"
            >
              <Icon name="info" color="#B4B4B4" />
              <Typography
                size="xxs"
                font="medium"
                color="secondary"
                className="text-center"
                >入庫時間のご確認のうえ、お支払いにお進みください</Typography
              >
            </div>
          </div>
          <div class="border-b pt-2.5 pb-5">
            <CheckBox />
            <SingUpReciptModal {id} />
          </div>
          <div>
            {#if expandButtons}
              <div class="pt-2.5 space-y-[25px]">
                {#if checkLoading}
                  <div class="flex justify-center items-center">
                    <Loader color="#FFFF" size="sm" />
                  </div>
                {:else}
                  <div>
                    <Typography
                      as="h2"
                      size="base"
                      font="bold"
                      color="dark"
                      className="text-center"
                      >決済手段を選択してください</Typography
                    >
                  </div>
                  <div>
                    <BottomSheet />
                  </div>
                {/if}
                {#if isReadyToMountStripe}
                  <div id="express-checkout-element"></div>
                {/if}
              </div>
            {:else}
              <div class="pt-2.5 space-y-[25px]">
                <div>
                  <Typography
                    as="h2"
                    font="bold"
                    color="dark"
                    size="base"
                    className=" text-center font-noto-sans tracking-wide"
                  >
                    精算金額のご確認のうえ、<br />お支払いにお進みください
                  </Typography>
                </div>
                <div>
                  <Button
                    variant="secondary"
                    rounded="rounded"
                    iconName="amount"
                    size="lg"
                    block
                    outline
                    font="bold"
                    loading={isLoading}
                    shadow
                    className="flex justify-center"
                    onClick={handleCreatePaymentIntent}
                  >
                    上記の金額で精算する</Button
                  >
                </div>
              </div>
            {/if}
            <div class="flex items-center justify-center gap-2 mt-[17px]">
              <div>
                <Icon name="info" color="#B4B4B4" />
              </div>
              <div>
                <Typography
                  as="p"
                  size="xxs"
                  font="medium"
                  color="secondary"
                  className="tracking-[0.5px]"
                >
                  10分以内に支払いを完了し、出庫をお願いします。
                </Typography>
              </div>
            </div>
          </div>
        {/if}
      </div>
      <div class="pb-[15px] pt-[25px]">
        <Button
          variant="light"
          size="md"
          font="bold"
          block
          rounded="full"
          onClick={() => IsCardExpanded.set({ isExpanded: false, id: "" })}
          >閉じる</Button
        >
      </div>
    {/if}
  </div>
</div>

<style>
  .parkCar {
    position: absolute;
    right: -4px;
    bottom: -30px;
  }
  @media screen and (max-width: 400px) {
    .parkCar {
      position: absolute;
      right: -24px;
    }
  }
  .cardContianer {
    box-shadow: 0px 15px 20px -5px rgba(0, 0, 0, 0.24);
  }
  .example {
    @apply font-fractul;
  }
</style>
