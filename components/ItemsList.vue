<template>
  <HoverGradientBox>
  <div class="border-t-[2px] border-b-[2px] bg-primary hover:bg-primary_hovered w-full border-secondary cursor-pointer">
    <p class="font-inter text-[1.12em] text-text_secondary px-[8px] py-[15px]">
      <slot></slot>
    </p>
  </div>
  </HoverGradientBox>
</template>

<script>
import HoverGradientBox from "./Cards/HoverGradientBox";
export default {
  name: "ItemsList",
  components: {HoverGradientBox}
}
</script>

<style scoped>

</style>