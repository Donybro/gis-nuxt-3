<template>
  <div class="flex flex-col group gap-[8px] w-[300px] xl:w-[342px] cursor-pointer" @click="$emit('click',news.id)">
    <div class="w-full h-[200px]">
      <img v-if="getActivePhotoSrc(news?.images)"
           :src="getActivePhotoSrc(news?.images)?.photo" alt="" class="w-full h-full object-cover">
      <Icon v-else class="w-full h-full object-cover" icon="material-symbols:no-photography-rounded"/>
    </div>
    <div v-if="news?.category" class="">
      <span class="inline py-[4px] px-[16px] text-white font-inter text-[1em] bg-secondary">{{ news.category }}</span>
    </div>
    <p class="h-[84px] group-hover:text-[#3D8DFF] max-h-[84px] font-semibold font-montserrat text-white text-[1.25em] leading-[28px] line-clamp-3">
      {{ news.title }}</p>
    <div class="flex items-center gap-[12px]">
      <div class="flex items-center gap-[8px]">
        <img alt="" class="w-[18px] h-[20px] text-text_secondary" src="/icons/calendar.svg">
        <p class="text-text_secondary text-[1em] font-inter">{{ dayjs(news.date).format('DD.MM.YYYY') }}</p>
      </div>
      <Devider class="h-full"/>
      <div class="flex items-center">
        <Icon class="text-text_secondary mr-[11px]" height="15x" icon="ant-design:eye-filled" width="22px"/>
        <p class="text-text_secondary text-[1em] font-inter">{{ news?.view_count }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Icon} from "@iconify/vue";
import Devider from "../Devider";
import dayjs from "dayjs";

const emit = defineEmits(['click'])
const props = defineProps({
  news: {
    type: Object,
    default: () => ({
      id: '',
      photo: '',
      category: 'Sohalar',
      title: '“Kiberxavfsizlikni taʼminlash va kiberjinoyatchilikka qarshi kurash dolzarb muammo” mavzusida davra suhbati',
      date: '2020.10.23',
      view_count: 222
    })
  }
})


function getActivePhotoSrc(images) {
  let activePhoto = images.find(img => img.active === true)
  return activePhoto
}

</script>

<style scoped>

</style>
