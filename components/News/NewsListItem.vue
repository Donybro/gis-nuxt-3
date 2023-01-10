<template>
  <div class="border-b border-[#ECECEC] pb-[8px] cursor-pointer" @click="$emit('click',news?.id)">
    <div class="flex items-center mb-[4px] gap-[8px]">
      <div class="flex items-center gap-[8px]">
        <Icon icon="carbon:dot-mark" width="15" height="15" class="text-[#20457A]" />
        <p class="text-text_secondary text-[0.75em] leading-[16px] font-roboto">{{dayjs(news?.date).format('DD.MM.YYYY')}}</p>
      </div>
      <Devider class="w-[1px] h-[15px] h-full"/>
      <div class="flex items-center gap-[8px]">
        <Icon class="text-text_secondary mr-[2px]" width="14px" height="10x" icon="ant-design:eye-filled" />
        <p class="text-text_secondary text-[0.75em] font-roboto">{{news?.view_count}}</p>
      </div>
    </div>
    <div class="text-white line-clamp-3 mt-[6px] mb-[12px] text-[1em] leading-[23px] max-h-[66px] font-inter">{{news?.title}}</div>
  </div>
</template>

<script setup>
import {Icon} from "@iconify/vue";
import Devider from "../Devider";
import dayjs from 'dayjs'
defineProps({
  news:{
    type:Object,
    default:()=>({
      title:'',
      date:''
    })
  }
})
defineEmits(['click'])
</script>

<style scoped>

</style>
