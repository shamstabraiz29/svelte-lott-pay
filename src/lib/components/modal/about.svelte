<script lang="ts">
  import { Modal } from "flowbite-svelte";

  import Icon from "$lib/components/icons/index.svelte";
  import Typography from "$lib/components/typography/index.svelte";
  import Checkout from "$lib/components/card/checkout.svelte";
  import { isOpenAboutModal } from "$lib/store";

  let unsubscribe: () => void;

  $: localModal = $isOpenAboutModal;
  $: {
    unsubscribe = isOpenAboutModal.subscribe((value) => {
      localModal = value;
    });
  }

  let items = [
    { itemNumber: 1, itemName: "枠内に駐車", itemIcon: "car" },
    { itemNumber: 2, itemName: "QRコードをスキャン", itemIcon: "qrCode" },
    { itemNumber: 3, itemName: "お支払い", itemIcon: "payment" },
    { itemNumber: 4, itemName: "出庫", itemIcon: "carIssue" },
  ];
</script>

<Modal
  bind:open={$isOpenAboutModal}
  bodyClass="modal-main border-none"
  class="rounded-[15px] border-2 border-dark-300 h-[532px] w-[360px]"
>
  <div class="flex justify-center flex-col items-center gap-[30px] w-full">
    <div class="flex justify-center flex-col items-center gap-5 text-center">
      <div>
        <Icon name="logo" />
      </div>
      <div>
        <Typography font="bold" color="dark" size="2xl"
          >Lott Checkout</Typography
        >
      </div>
      <div>
        <Typography size="sm" color="secondary" font="medium">
          Lott
          Checkoutは、お持ちのスマートフォンを使って駐車料金のキャッシュレス支払いを
          実現するサービスです。これまでの支払い方法よりもシンプルに料金を決済できます。
        </Typography>
      </div>
    </div>
    <div class="flex flex-col gap-4 items-center w-full">
      <div>
        <Typography size="lg" color="dark" font="bold">ご利用方法</Typography>
      </div>
      <div class="w-full">
        <Checkout {items} />
      </div>
    </div>
    <div class="flex flex-col gap-5 w-full border-t border-dark-300 pt-6">
      <div class="flex flex-row gap-5 justify-between items-center w-full">
        <a href="https://pragtech.jp/privacy-policy" target="_blank">
          <Typography size="xs" font="medium" color="secondary"
            >プライバシーポリシー</Typography
          >
        </a>
        <div>
          <span class="border border-dark-300 h-5 w-px" />
        </div>
        <a href="https://pragtech.jp/terms" target="_blank">
          <Typography size="xs" font="medium" color="secondary"
            >Lottサービス利用規約</Typography
          >
        </a>
      </div>
      <a
        href="mailto:support@pragtech.com?subject=Lott Checkoutからのお問い合わせ&body=※円滑なサポートのためにご利用の駐車場、入庫時間とナンバープレートを必ずお書き下さい"
        class="flex flex-row justify-center items-center w-full gap-2"
        target="_blank"
      >
        <div>
          <Icon name="mail" />
        </div>
        <div>
          <Typography size="sm" font="medium" color="secondary"
            >お問い合わせ</Typography
          >
        </div>
      </a>
    </div>
  </div>
</Modal>
