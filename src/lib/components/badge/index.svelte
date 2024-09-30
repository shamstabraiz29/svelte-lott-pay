<script lang="ts">
  import { Badge } from "flowbite-svelte";
  import Icon from "$lib/components/icons/index.svelte";

  export let label: any
  export let iconName: any | string = "park";
</script>

<Badge
  class="rounded-[15px] w-fit mx-auto bg-white bg-opacity-20 overflow-hidden shadow-lg flex p-[15px] px-[25px] items-center gap-2"
  style="box-shadow: 25px 0px 25px 0px rgba(0, 0, 0, 0.15);"
>
  <Icon name={iconName} />
  <p
    class="text-white font-bold font-noto-sans text-base leading-normal tracking-tight"
  >
    {label}
  </p>
</Badge>
