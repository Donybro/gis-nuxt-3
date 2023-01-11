<template>
  <div class="relative cursor-pointer" @click="$emit('click',news?.id)">
    <div class="h-[571px] w-full">
      <nuxt-img v-if="activePhoto" height="571" width="1024" class="object-cover w-full h-full" alt="photo"  format="webp" :src="activePhoto.replace('http://', 'https://')" />
      <Icon v-else class="w-full h-full object-cover" icon="material-symbols:no-photography-rounded"/>
    </div>
    <div
        class="w-full xl:w-[60%] absolute -bottom-[42px] xl:left-[26px] left-0 bg-[#3A2F7D] px-[20px] pt-[18px] pb-[8px]">
      <div class="flex items-center gap-[8px]">
        <div class="flex items-center">
          <Icon class="text-[#20457A] mr-[2px]" width="22px" height="15x" icon="carbon:dot-mark"/>
          <p class="text-text_secondary text-[0.75em] font-roboto">{{dayjs(news?.date).format('DD.MM.YYYY')}}</p>
        </div>
        <Devider class="w-[1px] h-[15px] h-full"/>
        <div class="flex items-center gap-[8px]">
          <Icon class="text-text_secondary mr-[2px]" width="22px" height="15x" icon="ant-design:eye-filled"/>
          <p class="text-text_secondary text-[0.75em] font-roboto">{{news?.view_count}}</p>
        </div>
      </div>
      <h3 class="text-white line-clamp-2 mt-[6px] mb-[12px] text-[1.15em] xl:text-[1.5em] leading-[130%] font-bold font-roboto">
        {{news?.title}}</h3>
      <h5 class="text-text_secondary line-clamp-3  text-[1em] leading-[140%] font-inter break-words"
          v-html="htmlToTextNews"></h5>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import {Icon} from "@iconify/vue";
import {computed, onMounted, toRefs} from "vue";

const props = defineProps({
  news: {
    type: Object,
    default: () => ({
      photo: 'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
      date: '12.09.2021',
      title: 'Ijro intizomiga rioya etish, murojaatlar bilan ishlash va boshqa...',
      description: 'dasdas'
    })
  }
})
const {news} = toRefs(props)
defineEmits(['click'])

const htmlToTextNews = ref('')

onMounted(() => {
  if (window) {
    const {description} = news.value
    const div = document.createElement('div')
    div.innerHTML = description
    htmlToTextNews.value = div.innerText
  }
})
const activePhoto = computed(()=>news.value.images.find(img => img.active === true)?.photo )

</script>

<style scoped>

</style>
