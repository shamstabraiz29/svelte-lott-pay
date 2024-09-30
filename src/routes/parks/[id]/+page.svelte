<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  import PaymentCard from "$lib/components/card/payment/index.svelte";
  import Badge from "$lib/components/badge/index.svelte";
  import Typography from "$lib/components/typography/index.svelte";
  import Loader from "$lib/components/loader/index.svelte";
  import {
    getPublicPark,
    type GetPublicParkQuery,
  } from "../../../graphql/generated";
  import { ShowToastError } from "$lib/store";
  import { trackEvent } from "$lib/helpers/tracking";

  let getPublicParkData: GetPublicParkQuery["getPublicPark"] | null = null;
  let isLoading: boolean = false;

  onMount(() => {
    getPublicPark({
      variables: {
        id: $page.params.id,
      },
    }).subscribe(({ data, loading, errors }) => {
      isLoading = loading;
      if (data) {
        getPublicParkData = data?.getPublicPark;
      }
      if (errors) {
        ShowToastError.set({
          showToastError: true,
          text: "",
        });
      }
    });
    trackEvent("lands_parking_top", { key: $page.params.id });
  });
</script>

<svelte:head>
  <title>Lott Checkout | {getPublicParkData?.name}</title>
</svelte:head>

<div class="container min-h-screen">
  {#if isLoading === true}
    <div class="flex justify-center items-center pt-36">
      <Loader color="#FFFF" size="lg" />
    </div>
  {:else if getPublicParkData && getPublicParkData.parkingSlots}
    <div class="space-y-[25px] text-center">
      <div>
        <Badge label={getPublicParkData?.name} />
      </div>
      <div>
        <Typography
          as="h1"
          font="bold"
          color="white"
          size="2xl"
          className="leading-normal tracking-wide"
        >
          車室番号を選択し､<br /> 精算してください
        </Typography>
      </div>
      <div class="space-y-[15px]">
        {#each getPublicParkData.parkingSlots as item}
          <PaymentCard
            id={item.currentParkEntry?.id}
            name={item.name}
            occupied={item.occupied}
          />
        {/each}
      </div>
    </div>
  {/if}
</div>
