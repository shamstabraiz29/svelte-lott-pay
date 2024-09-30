<script lang="ts">
  import type { TypographyProps } from "./types";

  export let as: TypographyProps["as"] = "p";
  export let className: string = "";
  export let size: string = "";
  export let color: string = "";
  export let font: string = "normal";

  const generateClassString = (className: string): string => {
    const fontSizeClass = size
      ? {
          xxs: "text-[10px]",
          xs: "text-xs",
          sm: "text-sm",
          base: "text-base",
          lg: "text-lg",
          xl: "text-xl",
          xxl: "text-[21px]",
          "2xl": "text-2xl",
          "3xl": "text-3xl",
          "3.5xl": "text-[32px]",
          "4xl": "text-4xl",
          "5xl": "text-[42px]",
          "6xl": "text-[50px]",
        }[size]
      : "text-base";

    const colorClass = color
      ? {
          primary: "text-primary-100",
          secondary: "text-dark-100",
          light: "text-light-200",
          lighter: "text-light-400",
          white: "text-white",
          error: "text-danger-100",
          dark: "text-dark-200",
        }[color]
      : "";

    const fontWeightClass = font
      ? {
          light: "font-light",
          normal: "font-normal",
          medium: "font-medium",
          semibold: "font-semibold",
          bold: "font-bold",
        }[font]
      : "";

    return `${fontSizeClass} ${colorClass} ${fontWeightClass} ${className}`;
  };

  $: classString = generateClassString(className);
</script>

<svelte:element this={as} class={classString}>
  <slot />
</svelte:element>
