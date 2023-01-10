<template>
  <div class="gradientBox">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HoverSolidGradientBox"
}
</script>

<style scoped>
.gradientBox{
  background: transparent;
  padding: 1px;
  width: 100%;
  overflow: hidden;
}
.gradientBox:hover{
  background: linear-gradient(90deg, #D8AA63 0%, #FBF7C2 13%, #F4D082 24%, #F7D17F 42%, #E8BF73 56%, #FEF1B1 70%, #D8AA63 83%, #935E25 100%);
}
</style>
