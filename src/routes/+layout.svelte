<script lang="ts">
  import { onMount } from "svelte";

  import Header from "$lib/components/header/index.svelte";
  import Footer from "$lib/components/footer/index.svelte";
  import Toast from "$lib/components/toaster/index.svelte";
  import "./app.css";

  onMount(() => {
    function isIOS() {
      return (
        /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
      );
    }
    if (isIOS()) {
      const mainElement = document.querySelector(".main");
      if (mainElement && mainElement instanceof HTMLElement) {
        mainElement.style.paddingBottom = "10rem";
      }
    }
  });
</script>

<div class="main">
  <nav>
    <Header />
  </nav>
  <main>
    <slot />
  </main>
  <Toast
    type="error"
    message="申し訳ありませんが、失敗しました。少し時間をおいて再度お試し下さい。"
  />
  <footer>
    <Footer />
  </footer>
</div>
