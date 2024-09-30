<script lang="ts">
  import Icon from "$lib/components/icons/index.svelte";
  import Typography from "$lib/components/typography/index.svelte";

  export let title: string;
  export let subtitle: string;
  export let iconName: any;
</script>

<div class="flex flex-col gap-3">
  <div class="flex flex-row items-center gap-2">
    <Icon name={iconName} />
    <Typography
      size="sm"
      font="medium"
      color="dark"
      className=" tracking-[0.14px] leading-normal">{title}</Typography
    >
  </div>
  <div class="flex flex-row justify-between">
    <Typography
      size="xl"
      font="normal"
      color="secondary"
      className="tracking-[0.4px] leading-normal font-fractul"
      >{subtitle}</Typography
    >
  </div>
</div>
