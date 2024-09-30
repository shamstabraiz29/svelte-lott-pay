<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import Icon from "$lib/components/icons/index.svelte";
  import Typography from "$lib/components/typography/index.svelte";
  import Button from "$lib/components/button/index.svelte";
  import { isPaymentButtonEnabled, isConfirmPayment } from "$lib/store";

  let drawer: any;
  let isOpen: boolean = false;
  let bodyScrollLock: boolean = false;

  function toggleDrawer(event: any) {
    if (event) {
      event.stopPropagation();
    }
    isOpen = !isOpen;
    bodyScrollLock = isOpen;
    if (bodyScrollLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  function handleClickOutside(event: any) {
    if (!drawer.contains(event.target)) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
    window.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";
  });
  $: backdropStyle = isOpen
    ? "h-full w-full fixed inset-0 bg-black bg-opacity-50 z-30 overflow-hidden "
    : "hidden";

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && isOpen) {
      toggleDrawer(event);
    }
  }
  function handleSubmit(event: any) {
    event.stopPropagation();
  }
</script>

<div class="mb-[-20px]">
  <Button
    variant="secondary"
    rounded="rounded"
    font="bold"
    size="sm"
    block
    outline
    shadow
    iconName="cardIcon"
    className="h-[55px]"
    onClick={() => toggleDrawer(event)}
  >
    クレジットカード
  </Button>
</div>
<div
  class={backdropStyle}
  on:click={toggleDrawer}
  tabindex="0"
  role="button"
  on:keydown={handleKeyDown}
  aria-label="Close drawer"
></div>

<div
  class="fixed inset-x-0 bottom-0 z-40 p-4 bg-white dark:bg-gray-800 pt-12 px-7 {isOpen
    ? 'drawer-open'
    : 'drawer-closed'} drawer-transition h-fit rounded-t-[15px]"
>
  <button
    bind:this={drawer}
    on:click={toggleDrawer}
    class="absolute top-5 right-6 text-gray-400 bg-transparent
         rounded-lg text-sm w-8 h-8
          inline-flex items-center justify-center"
  >
    <Icon name="cross" />
  </button>
  <div class="flex flex-col gap-[18px]">
    <div class="flex flex-col justify-center items-center gap-2">
      <Icon name="creditCard" />
      <Typography
        color="dark"
        size={"2xl"}
        font="bold"
        className="tracking-[0.24px]">クレジットカード払い</Typography
      >
    </div>
    <div>
      <form id="payment-form">
        <div id="credit-card-element"></div>
        <div class="pt-2.5">
          <Button
            type="submit"
            shadow
            id="submit"
            block
            variant="primary"
            size="lg"
            className="mt-4"
            loading={$isConfirmPayment}
            disabled={!$isPaymentButtonEnabled || $isConfirmPayment}
            onClick={() => handleSubmit(event)}>支払う</Button
          >
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  .drawer-transition {
    transition: transform 0.3s ease-in-out;
  }
  .drawer-open {
    transform: translateY(0%);
  }
  .drawer-closed {
    transform: translateY(100%);
  }
</style>
