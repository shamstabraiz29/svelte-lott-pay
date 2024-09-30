<script lang="ts">
  import CardIcon from "./cardIcon.svelte";
  import ApplePayIcon from "./applePayIcon.svelte";
  import AboutIcon from "./aboutIcon.svelte";
  import CarIcon from "./carIcon.svelte";
  import ReceiptIcon from "./receiptIcon.svelte";
  import LogoIcon from "./logoIcon.svelte";
  import MailIcon from "./mailIcon.svelte";
  import LogoWithNameIcon from "./logoWithName.svelte";
  import Qustion from "./question.svelte";
  import ColoredCar from "./coloredCar.svelte";
  import GooglePayIcon from "./googlePayIcon.svelte";
  import PaypayIcon from "./paypayIcon.svelte";
  import InfoIcon from "./infoIcon.svelte";
  import QrcodeIcon from "./qrcodeIcon.svelte";
  import PaymentIcon from "./paymentIcon.svelte";
  import ParkedIcon from "./parkedIcon.svelte";
  import AmountIcon from "./amountIcon.svelte";
  import CreditCard from "./creditCard.svelte";
  import MasterCard from "./masterCard.svelte";
  import CardCodeIcon from "./cardCodeIcon.svelte";
  import VisaCard from "./visaCard.svelte";
  import SendIcon from "./sendIcon.svelte";
  import CalendarIcon from "./calendarIcon.svelte";
  import HashIcon from "./hashIcon.svelte";
  import CashIcon from "./cashIcon.svelte";
  import CarIssueIcon from "./carIssueIcon.svelte";
  import CrossIcon from "./crossIcon.svelte";

  type IconName =
    | "cardIcon"
    | "applePay"
    | "about"
    | "receipt"
    | "car"
    | "logo"
    | "logoWithName"
    | "question"
    | "coloredCar"
    | "paypay"
    | "mail"
    | "googlePay"
    | "info"
    | "payment"
    | "qrCode"
    | "park"
    | "amount"
    | "creditCard"
    | "masterCard"
    | "cardCode"
    | "visa"
    | "send"
    | "calendar"
    | "hash"
    | "carIssue"
    | "cross"
    | "cash";

  export let name: IconName;
  export let color: string='';
</script>

<div>
  {#if name === "cardIcon"}
    <CardIcon />
  {:else if name === "applePay"}
    <ApplePayIcon />
  {:else if name === "about"}
    <AboutIcon />
  {:else if name === "receipt"}
    <ReceiptIcon />
  {:else if name === "car"}
    <CarIcon />
  {:else if name === "logo"}
    <LogoIcon />
  {:else if name === "logoWithName"}
    <LogoWithNameIcon />
  {:else if name === "mail"}
    <MailIcon />
  {:else if name === "coloredCar"}
    <ColoredCar {color} />
  {:else if name === "googlePay"}
    <GooglePayIcon />
  {:else if name === "paypay"}
    <PaypayIcon />
  {:else if name === "info"}
    <InfoIcon {color} />
  {:else if name === "question"}
    <Qustion />
  {:else if name === "payment"}
    <PaymentIcon />
  {:else if name === "park"}
    <ParkedIcon />
  {:else if name === "amount"}
    <AmountIcon />
  {:else if name === "qrCode"}
    <QrcodeIcon />
  {:else if name === "creditCard"}
    <CreditCard />
  {:else if name === "masterCard"}
    <MasterCard />
  {:else if name === "cardCode"}
    <CardCodeIcon />
  {:else if name === "send"}
    <SendIcon />
  {:else if name === "calendar"}
    <CalendarIcon />
  {:else if name === "hash"}
    <HashIcon />
  {:else if name === "cash"}
    <CashIcon />
  {:else if name === "visa"}
    <VisaCard />
  {:else if name === "cross"}
    <CrossIcon />
  {:else if name === "carIssue"}
    <CarIssueIcon />
  {/if}
</div>
