<script lang="ts">
  import Typography from "$lib/components/typography/index.svelte";

  const currentYear = new Date().getFullYear();
</script>

<div class="flex justify-center">
  <Typography as="p" size="xs" font="medium" color="white">
    <span class="font-fractul"> ©{currentYear}</span>, Pragtech
  </Typography>
</div>
