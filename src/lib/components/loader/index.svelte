<script lang="ts">
    export let color: string = "#545FFF";
    export let size: "sm" | "md" | "lg" = "md";
  
    const sizeClasses = {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    };
  
    $: className = `${sizeClasses[size]}`;
  </script>
  
  <div
    class={`animate-spin inline-block  border-[3px] border-[${color}] border-t-transparent text-[${color}] ${className} rounded-full`}
    role="status"
    aria-label="loading"
  >
    <span class="sr-only">Loading...</span>
  </div>
  