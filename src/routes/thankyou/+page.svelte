<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { derived, type Unsubscriber } from "svelte/store";

  import { page } from "$app/stores";
  import Lottie from "$lib/components/lottie-animtion/inex.svelte";
  import Completion from "$lib/static/animations/Completion-app.json";

  import Badge from "$lib/components/badge/index.svelte";
  import Typography from "$lib/components/typography/index.svelte";
  import PaymentReceipt from "$lib/components/card/paymentReceipt/index.svelte";
  import Button from "$lib/components/button/index.svelte";
  import { confirmPublicPayment } from "../../graphql/generated";
  import Loader from "$lib/components/loader/index.svelte";
  import { parkIdStore, ShowToastError } from "$lib/store";
  import { trackEvent } from "$lib/helpers/tracking";

  let confirmPublicPaymentData: any;
  let isLoading = false;
  let subscription: Unsubscriber;
  $: parkId = $parkIdStore;

  onMount(() => {
    const paymentIntentParams = derived(page, ($page) => ({
      payment_intent: $page.url.searchParams.get("payment_intent"),
      payment_intent_client_secret: $page.url.searchParams.get(
        "payment_intent_client_secret"
      ),
    }));

    subscription = paymentIntentParams.subscribe(
      ({ payment_intent, payment_intent_client_secret }) => {
        if (payment_intent && payment_intent_client_secret) {
          handleUpdateReceipt(payment_intent, payment_intent_client_secret);
        }
      }
    );

    async function handleUpdateReceipt(
      payment_intent: string,
      payment_intent_client_secret: string
    ) {
      try {
        isLoading = true;
        const response = await confirmPublicPayment({
          variables: {
            data: {
              paymentIntentClientSecret: payment_intent_client_secret,
              paymentIntentId: payment_intent,
            },
          },
        });
        confirmPublicPaymentData = response.data?.confirmPublicPayment;
        isLoading = false;
        if (!localStorage.getItem(`tracked_${payment_intent}`)) {
          trackEvent("completes_payment");
          localStorage.setItem(`tracked_${payment_intent}`, "true");
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
        ShowToastError.set({
          showToastError: true,
          text: "",
        });
      }
    }
  });

  onDestroy(() => {
    if (subscription) {
      subscription();
    }
  });
</script>

<svelte:head>
  <title
    >Lott Checkout | ご利用ありがとうございました {confirmPublicPaymentData
      ? ` - ${confirmPublicPaymentData.referenceNumber}`
      : ""}</title
  >
</svelte:head>

<div class="container {isLoading ? 'min-h-screen' : ''} max-w-sm">
  {#if isLoading}
    <div class="flex justify-center items-center pt-36">
      <Loader color="#FFFF" size="lg" />
    </div>
  {:else if confirmPublicPaymentData}
    <div class="flex flex-col gap-5">
      <div class="flex flex-col justify-center items-center">
        <div>
          <Badge label="ライオンパーク飯塚病院前" />
        </div>
        <div class="mb-[-15px]">
          <Lottie src={Completion} width={180} height={180} loop={false} />
        </div>
        <div class="gap-y-[15px] flex flex-col justify-center items-center">
          <div>
            <Typography
              as="h1"
              font="bold"
              color="white"
              size="3.5xl"
              className="leading-normal tracking-[0.32px] text-center"
            >
              ご利用ありがとう<br />ございました
            </Typography>
          </div>
          <div>
            <Typography
              as="p"
              font="medium"
              color="white"
              size="base"
              className="leading-6 tracking-[0.16px] text-center"
            >
              お支払いは完了しています。<br />そのままご出庫ください。
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <PaymentReceipt
          amount={confirmPublicPaymentData?.amount}
          transactionDate={confirmPublicPaymentData?.transactionDate}
          referenceNumber={confirmPublicPaymentData?.referenceNumber}
          sendReceipt={confirmPublicPaymentData?.sendReceipt}
        />
      </div>
      <div>
        <Button
          shadow
          block
          variant="primary"
          font="bold"
          size="lg"
          onClick={() => goto(`/parks/${parkId}`)}>他の車室番号を支払う</Button
        >
      </div>
    </div>
  {/if}
</div>
