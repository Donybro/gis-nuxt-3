<template>
  <div class="gradientBox">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HoverGradientBox"
}
</script>

<style scoped>
.gradientBox{
  background: transparent;
  padding: 1px;
  width: 100%;
}
.gradientBox:hover{
  background: linear-gradient(90deg, rgba(216, 170, 99, 0) 0%, #FBF7C2 13%, #F4D082 24%, #F7D17F 42%, #E8BF73 56%, #FEF1B1 70%, #D8AA63 83%, rgba(147, 94, 37, 0) 100%);
}
</style>
