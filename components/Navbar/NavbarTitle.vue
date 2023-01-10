<template>
  <div class="flex items-center gap-[8px] xl:gap-[16px] cursor-pointer" @click="$emit('click')">
    <img src="/icons/Logo.svg" class="w-[83px] h-[83px] p-[5px]"/>
    <img src="/icons/Flag.png"/>
    <div class="">
      <h1 class="title">{{ $t('navbar.ozcom') }}</h1>
      <p class="max-w-[280px]">{{ $t('navbar.ozcom-full') }}</p>
    </div>
  </div>
</template>

<script setup>


const {t: $t} = useI18n()

</script>

<style scoped>
h1, p {
  color: transparent;
  background: linear-gradient(67.87deg, #F4D974 3.68%, #B88114 49.93%, #EFD26C 82.76%, rgba(255, 153, 42, 0) 118.99%),
  linear-gradient(0deg, #FFFFFF, #FFFFFF);
  background-clip: text;
}

h1 {
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 130%;
}

p {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}
</style>
