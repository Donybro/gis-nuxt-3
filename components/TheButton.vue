<template>
  <button v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
</script>

<style scoped>
button:active{
  transform: scale(0.97);
}
</style>