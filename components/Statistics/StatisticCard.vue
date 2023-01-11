<template>
  <div class="border border-[#474271] bg-[#252356] py-[33px] px-[16px] flex flex-col gap-[8px]">
    <nuxt-img height="98" class="w-full  object-contain" alt="photo"  format="webp" :src="iconPath.replace('http://', 'https://')" />
    <p class="font-inter font-medium leading-[140%] text-white">{{stat.title}}</p>
    <p class="font-montserrat text-white font-bold text-[48px] leading-[140%]">{{stat.count}}</p>
    <p class="line-clamp-4 text-text_secondary font-medium font-inter text-[1em]">{{stat.text}}</p>
  </div>
</template>

<script>
export default {
  name: "StatisticCard",
  props:{
    stat:{
      type:Object,
      default:()=>({
        title:'Statyalar soni',
        count:17439,
        text:'2021 yildagi uyali aloqa operatorlari bazaviy stansiyalarining umumiy soni'
      })
    },
    iconPath:String
  }
}
</script>

<style scoped>

</style>