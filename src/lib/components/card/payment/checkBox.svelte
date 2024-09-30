<script lang="ts">
  import Typography from "$lib/components/typography/index.svelte";
  import { trackEvent } from "$lib/helpers/tracking";
  import {
    isOpenSignupReciptModal,
    receiptEmail,
    paymentRequestId,
    isChecked,
  } from "$lib/store";
  import { updatePublicPaymentRequest } from "../../../../graphql/generated";

  let email: string = "";
  let paymentId: string = "";

  receiptEmail.subscribe(($email) => {
    email = $email;
  });
  paymentRequestId.subscribe(($paymentId) => {
    paymentId = $paymentId;
  });

  const handleOpenModal = () => {
    if ($isChecked) {
      trackEvent('removed_receipt_form_data');
      isChecked.set(false);
      receiptEmail.set("");
      if (paymentId) {
        handleDeleteReceipt();
      }
    } else {
      trackEvent('opens_receipt_form');
      isOpenSignupReciptModal.set(true);
    }
  };

  const handleDeleteReceipt = async () => {
    try {
      await updatePublicPaymentRequest({
        variables: {
          data: {
            id: paymentId,
            receiptEmail: null,
            sendReceipt: false,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
</script>

<div
  role="button"
  aria-label="Toggle Receipt Modal"
  tabindex="0"
  on:keydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleOpenModal();
    }
  }}
  class="flex flex-col gap-2.5"
  on:click={handleOpenModal}
>
  <div class="flex justify-center items-center space-x-3 cursor-pointer">
    <Typography className="select-none" color="dark" size="sm" font="medium"
      >電子領収書 (PDF) を受け取る</Typography
    >
    <input
      class="w-7 h-7 rounded-md border-primary-100 outline-none focus:outline-none focus:ring-transparent bg-light-300 flex flex-shrink-0 justify-center items-center"
      type="checkbox"
      id="checkbox"
      bind:checked={$isChecked}
    />
  </div>
  {#if $isChecked == true}
    <div>
      <Typography color="secondary" size="xs" font="medium"
        >送付先： {email}</Typography
      >
    </div>
  {/if}
</div>
