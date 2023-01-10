<template>
  <div class="w-full h-[400px] flex items-center" :style="{backgroundImage:`url(${imgSource})`,backgroundPosition:'center'}">
    <div class="container mx-auto">
      <p class="w-[75%] font-roboto text-[1.35em] xl:text-[2em] text-white">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InterActiveServiceInnerPageHero",
  props:{
    imgSource:{
      type:String,
    },
    title:{
      type:String,
    },
  }
}
</script>

<style scoped>

</style>
