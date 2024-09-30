<script lang="ts">
  import {
    formatPrice,
    formatDateTime,
    formatJapaneseDate,
  } from "$lib/helpers/index";
  import Typography from "$lib/components/typography/index.svelte";

  export let expandButtons: boolean;
  export let ReceiptDate: Date;
  export let stockingTime: Date;
  export let settlementAmount: number;
</script>

<div class="flex flex-col gap-2.5">
  <div class="w-full flex gap-2.5">
    <div class="box">
      <Typography size="sm" color="secondary" font="medium">入庫日</Typography>
      <Typography
        size="2xl"
        color="dark"
        font="normal"
        className="font-fractul"
      >
        {ReceiptDate ? formatJapaneseDate(ReceiptDate) : "N/A"}
      </Typography>
    </div>
    <div class="box">
      <Typography size="sm" color="secondary" font="medium">入庫時間</Typography
      >
      <Typography size="2xl" color="dark" font="normal" className="font-fractul"
        >{formatDateTime(stockingTime)}</Typography
      >
    </div>
  </div>
  <div class="box">
    <div>
      <Typography size="sm" color="secondary" font="medium">精算金額</Typography
      >
    </div>
    <div class="flex items-center gap-2">
      <div
        class={`w-2 h-2 rounded-full ${
          settlementAmount === 0 || expandButtons ? "bg-[#E1E1E1]" : "dot"
        }`}
      ></div>
      <div>
        <Typography
          size={"4xl"}
          color="dark"
          font="normal"
          className="font-fractul tracking-[0.48px]"
          >{formatPrice(settlementAmount)}</Typography
        >
      </div>
    </div>
  </div>
</div>

<style>
  .box {
    @apply flex flex-col w-full items-center p-4 bg-light-100 rounded-[15px] z-30 gap-2;
  }
  @keyframes colorChange {
    0% {
      background-color: white;
    }
    50% {
      background-color: #89dab8;
    }
    100% {
      background-color: white;
    }
  }
  .dot {
    animation: colorChange 2s infinite;
  }
</style>
