<script lang="ts">
  import Icon from "$lib/components/icons/index.svelte";
  import Typography from "$lib/components/typography/index.svelte";
  export let items: any;
</script>

<div class="bg-light-100 rounded-[15px] space-y-7 px-[30px] py-[35px]">
  {#each items as item}
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-5">
        <div
          class="flex flex-col items-center justify-center rounded-full bg-dark-300 w-[35px] h-[35px]"
        >
          <Typography
            as="h2"
            className="font-fractul mt-1"
            color="secondary"
            size="xxl"
            font="normal">{item.itemNumber}</Typography
          >
        </div>
        <div class="flex-1">
          <Typography
            size="base"
            color="secondary"
            font="bold"
            className="text-start w-[100px]">{item.itemName}</Typography
          >
        </div>
      </div>
      <div class=" w-12 flex justify-center items-center">
        <Icon name={item.itemIcon} />
      </div>
    </div>
  {/each}
</div>
