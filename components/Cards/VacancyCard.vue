<template>
  <HoverGradientBox>
    <div class="p-[24px] border border-border_primary bg-primary flex flex-col cursor-pointer w-full" @click="$emit('click',vacancy.id)">
      <h2 class="text-white font-bold text-[1.15em] xl:text-[1.5em] leading-[32px] font-roboto mb-[8px] ">{{vacancy.title}}</h2>
      <div class="text-text_secondary font-semibold font-montserrat text-[1.12em] mb-[24px]">{{ vacancy.position }}</div>
    </div>
  </HoverGradientBox>
</template>

<script>
import HoverGradientBox from "./HoverGradientBox";
export default {
  name: "VacancyCard",
  components: {HoverGradientBox},
  props:{
    vacancy:{
      type:Object,
      default:()=>({
        id:'1',
        title:'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        position:'Boʻlim boshligʻi',
        work_experience:'1 yildan 3 yilgacha',
        work_schedule:'Toʻliq kun',
        employment:'Toʻliq bandlik',
        salary:'3 000 000',

      })
    }
  },
  emits:['click']
}
</script>

<style scoped>
.description_wrapper{
  @apply flex flex-col gap-[3px]
}
.description_title {
  @apply font-inter text-[1em] text-text_secondary
}
.description_text{
  @apply font-montserrat font-semibold text-[1.12em] text-white
}
</style>
<!--<div class="grid grid-cols-2 md:grid-cols-4 gap-[24px]">-->
<!--<div class="description_wrapper">-->
<!--  <h3 class="description_title">Ish tajribasi</h3>-->
<!--  <p class="description_text">{{vacancy.work_experience}}</p>-->
<!--</div>-->
<!--<div class="description_wrapper">-->
<!--  <h3 class="description_title">Ish grafigi</h3>-->
<!--  <p class="description_text">{{vacancy.work_schedule}}</p>-->
<!--</div>-->
<!--<div class="description_wrapper">-->
<!--  <h3 class="description_title">Bandlik</h3>-->
<!--  <p class="description_text">{{vacancy.employment}}</p>-->
<!--</div>-->
<!--<div class="description_wrapper">-->
<!--  <h3 class="description_title">Ish haqi</h3>-->
<!--  <p class="description_text">{{vacancy.salary}}  soʻm</p>-->
<!--</div>-->
<!--</div>-->
