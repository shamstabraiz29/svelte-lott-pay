<script lang="ts">
  import Icon from "$lib/components/icons/index.svelte";
  import Loader from "$lib/components/loader/index.svelte";

  export let outline: boolean = false;
  export let loading: boolean = false;
  export let block: boolean = false;
  export let disabled: boolean = false;
  export let size: "sm" | "md" | "lg" = "md";
  export let rounded: "rounded" | "full" = "rounded";
  export let type: "button" | "submit" = "button";
  export let className: string = "";
  export let onClick: () => void = () => null;
  export let variant: "primary" | "secondary" | "light" | "success" = "primary";
  export let font: "normal" | "medium" | "semibold" | "bold" = "normal";
  export let iconName: any = "";
  export let id: string = "";
  export let shadow: boolean = false;

  const baseClasses = `${
    iconName
      ? "tracking-[0.17px]"
      : "flex justify-center items-center tracking-[0.16px]"
  }  transition-all duration-150 text-base font-bold  self-stretch`;
  const blockClass = block ? "w-full" : "";
  const sizeClasses = {
    sm: "px-4 py-2.5  leading-6",
    md: "px-4 py-[15px] leading-normal ",
    lg: "px-5 py-[15px] leading-7 ",
  };
  const fontClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  const roundedClasses = {
    rounded: "rounded-lg",
    full: "rounded-full",
  };
  const varientClasses = {
    primary: "bg-primary-100 text-white border border-primary-100",
    secondary: "bg-white text-primary-100  ",
    light: "bg-primary-200  text-primary-100 ",
    success: "bg-[#F1FAF6] text-black",
  };
  const outlineVarientClasses = {
    primary: "border border-primary-100 text-primary-100",
    secondary: "border border-primary-100 text-primary-100 bg-white",
    light: "bg-light text-primary-100  ",
    success: "border-green-200",
  };
  const disabledClasses = "!bg-[#C5C5C5] border-none  cursor-not-allowed";
  const loadingClasses = "cursor-wait !bg-[#C5C5C5] !border-none ";
  $: buttonClasses = `${baseClasses} ${blockClass} ${sizeClasses[size]} ${
    fontClasses[font]
  } ${roundedClasses[rounded]} 
          ${outline ? outlineVarientClasses[variant] : varientClasses[variant]} 
          ${disabled === true ? disabledClasses : ""} ${
            loading ? loadingClasses : ""
          } ${className}`;
</script>

<button {id} class={buttonClasses} {disabled} {type} on:click={onClick} 
style={`${shadow && 'box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.15);'}`}
>
  {#if loading}
    <Loader size="sm" color={`${iconName ? "#545FFF" : "#FFFF"}`} />
  {:else if iconName}
    <div class="flex justify-center items-center gap-4">
      <Icon name={iconName} />
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</button>
