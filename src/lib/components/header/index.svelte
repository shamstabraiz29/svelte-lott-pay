<script lang="ts">
  import AboutModal from "$lib/components/modal/about.svelte";
  import Icon from "$lib/components/icons/index.svelte";
  import { isOpenAboutModal } from "$lib/store";

  const handleOpenModal = () => {
    isOpenAboutModal.set(true);
  };
</script>

<div>
  <div class="px-6 py-6 grid grid-cols-8 w-full">
    <div />
    <div class="col-span-6 m-auto">
      <Icon name="logoWithName" />
    </div>
    <div class="col-span-1 flex">
      <button on:click={handleOpenModal}>
        <Icon name="question" />
      </button>
    </div>
  </div>
  <div>
    <AboutModal />
  </div>
</div>
