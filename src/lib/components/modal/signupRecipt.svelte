<script lang="ts">
  import { CloseButton, Modal } from "flowbite-svelte";
  import Icon from "$lib/components/icons/index.svelte";
  import Typography from "$lib/components/typography/index.svelte";
  import Button from "$lib/components/button/index.svelte";
  import {
    ShowToastError,
    isChecked,
    isOpenSignupReciptModal,
    parkEntryId,
    paymentRequestId,
    receiptEmail,
  } from "$lib/store";
  import { updatePublicPaymentRequest } from "../../../graphql/generated";
  import { trackEvent } from "$lib/helpers/tracking";

  export let id: any;

  let unsubscribe: () => void;
  let email: string = "";
  let paymentId: string = "";
  let parkId: string = "";
  let emailValid: boolean = true;
  let complete: boolean = false;
  let errorMessage: string = "";

  $: localModal = $isOpenSignupReciptModal;
  $: emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  unsubscribe = isOpenSignupReciptModal.subscribe((value) => {
    localModal = value;
  });
  parkEntryId.subscribe(($parkId) => {
    parkId = $parkId;
  });
  paymentRequestId.subscribe(($paymentId) => {
    paymentId = $paymentId;
  });

  const handleUpdateReceipt = async () => {
    try {
      await updatePublicPaymentRequest({
        variables: {
          data: {
            id: paymentId,
            receiptEmail: email,
            sendReceipt: true,
          },
        },
      });
    } catch (error) {
      console.error(error);
      ShowToastError.set({
        showToastError: true,
        text: "",
      });
    }
  };

  const handleSubmit = () => {
    if (!emailValid) {
      errorMessage = "無効なメールアドレスです";
      return;
    }
    if (paymentId && emailValid) {
      handleUpdateReceipt();
    }
    receiptEmail.set(email);
    isChecked.set(true);
    isOpenSignupReciptModal.set(false);
    receiptEmail.set(email);
    email = "";
    errorMessage = "";
  };

  const handleClose = () => {
    complete = emailValid && email.trim().length > 0;
    trackEvent("closes_receipt_form", { key: complete });
    isOpenSignupReciptModal.set(false);
    isChecked.set(false);
    email = "";
    errorMessage = "";
  };
</script>

{#if parkId === id}
  <Modal
    bind:open={$isOpenSignupReciptModal}
    bodyClass="border-none modal-main recipt-modal"
    class="rounded-[15px] border-2 border-dark-300 w-[360px]"
  >
    <div class="absolute right-[15px] top-[-15px] reciptClose">
      <CloseButton on:click={handleClose} />
    </div>
    <div class="flex flex-col gap-9">
      <div class="flex justify-center flex-col items-center gap-5 text-center">
        <div>
          <Icon name="receipt" />
        </div>
        <div>
          <Typography
            size="2xl"
            color="dark"
            font="bold"
            className="tracking-[0.24px]"
            >電子領収書 (PDF) を受信するメールアドレスをご入力ください</Typography
          >
        </div>
        <div class="w-full">
          <input
            type="email"
            class="w-full border-none bg-light-300 rounded-lg py-4 focus:border-none outline-none text-dark-200 font-medium"
            placeholder="user@lott.jp"
            bind:value={email}
          />
          {#if errorMessage}
            <Typography
              size="sm"
              color="error"
              font="medium"
              className="text-start">{errorMessage}</Typography
            >
          {/if}
        </div>
        <div>
          <Typography size="base" color="secondary" font="medium"
            >精算完了時に電子領収書が <br />
            送信されます。</Typography
          >
        </div>
      </div>
      <div>
        <div class="w-full flex flex-col gap-5">
          <Button
            variant="primary"
            rounded="rounded"
            size="sm"
            disabled={!email}
            shadow
            onClick={() => handleSubmit()}>設定する</Button
          >
          <Button
            onClick={handleClose}
            variant="secondary"
            rounded="rounded"
            size="sm"
            shadow
            outline>キャンセル</Button
          >
        </div>
      </div>
    </div>
  </Modal>
{/if}
