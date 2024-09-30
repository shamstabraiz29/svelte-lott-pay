<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import Icon from "$lib/components/icons/index.svelte";
  import { ShowToastError, type ShowToastErrorState } from "$lib/store";
  import { onDestroy } from "svelte";

  export let type: "error" | "info" | "success" = "info";
  export let message: string = "";
  export let duration: number = 3000;

  let ShowToast: ShowToastErrorState = { showToastError: false, text: "" };

  const unsubscribe = ShowToastError.subscribe((value) => {
    ShowToast = value;
  });
  onDestroy(unsubscribe);

  const typeProperties = {
    error: { color: "red", icon: "error-icon" },
    info: { color: "blue", icon: "info-icon" },
    success: { color: "green", icon: "success-icon" },
  };

  $: if (ShowToast.showToastError) {
    setTimeout(() => {
      ShowToast.showToastError = false;
    }, duration);
  }
</script>

{#if ShowToast.showToastError === true}
  <Toast
    position="top-right"
    class={`fixed p-2 z-50 border-2 border-[${typeProperties[type].color}]`}
    dismissable
    on:close={() => (ShowToast.showToastError = false)}
  >
    <span class="flex items-center gap-2">
      <Icon name="info" color={typeProperties[type].color} />
      <p
        class="text-sm font-medium"
        style={`color: ${typeProperties[type].color};`}
      >
        {#if ShowToast.text}
          {ShowToast.text}
        {:else}
          {message}
        {/if}
      </p>
    </span>
  </Toast>
{/if}
