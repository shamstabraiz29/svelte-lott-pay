<script lang="ts">
  import { Card } from "flowbite-svelte";
  import { format } from "date-fns";

  import InfoBlock from "./infoBlock.svelte";
  import { formatPrice } from "$lib/helpers";
  import Typography from "$lib/components/typography/index.svelte";
  import Icon from "$lib/components/icons/index.svelte";

  export let amount: any;
  export let transactionDate: any;
  export let referenceNumber: any;
  export let sendReceipt: boolean;

  let paymentDetails = [
    {
      title: "現在の精算金額",
      iconName: "cash",
      subtitle: formatPrice(amount),
    },
    {
      title: "精算完了日",
      iconName: "calendar",
      subtitle: format(new Date(transactionDate), "yyyy/MM/dd HH:mm"),
    },

    {
      title: "受付番号",
      iconName: "hash",
      subtitle: referenceNumber,
    },
  ];
</script>

<Card
  class="rounded-[15px] border-2 border-dark-300 px-[25px] py-[30px] mx-auto "
>
  <div class="flex flex-col gap-[20px]">
    <div>
      {#each paymentDetails as detail, i (detail.title)}
        <div class={i === 0 ? "pb-3" : "border-t pb-3 pt-5"}>
          <InfoBlock
            subtitle={detail.subtitle}
            title={detail.title}
            iconName={detail.iconName}
          />
        </div>
      {/each}
    </div>
    {#if sendReceipt}
      <div
        class="flex items-center gap-[7px] justify-center bg-[#F1FAF6] py-2.5 px-[15px] rounded-lg"
      >
        <Icon name="send" />
        <Typography
          size="sm"
          font="medium"
          color="dark"
          className="tracking-[0.14px]">電子領収書が送信されました</Typography
        >
      </div>
    {/if}
  </div>
</Card>
