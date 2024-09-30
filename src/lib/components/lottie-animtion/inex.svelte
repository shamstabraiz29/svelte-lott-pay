<script lang="ts">
    import { onMount } from "svelte";
    export let src: any;
    export let height: string | number ;
    export let width: string | number ;
    export let loop = true;
    export let autoplay = true;
    export let controls = false;
    export let speed = "1";
  
    let LottiePlayer: any;
  
    onMount(async () => {
      const module = await import("@lottiefiles/svelte-lottie-player");
      LottiePlayer = module.LottiePlayer;
    });
  
    let controlsLayout = [
      "previousFrame",
      "playpause",
      "stop",
      "nextFrame",
      "progress",
      "frame",
      "loop",
      "spacer",
      "snapshot",
      "zoom",
      "info"
    ];
  </script>
  
  {#if LottiePlayer}
    <svelte:component
      this={LottiePlayer}
      {speed}
      {src}
      {autoplay}
      {loop}
      {controls}
      renderer="svg"
      background="transparent"
      {width}
      {height}
      {controlsLayout}
    />
  {/if}