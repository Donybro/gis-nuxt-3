<template>
  <div class="">
    <h1 class="section_title">{{$t('main-page.sponsors')}}</h1>
    <div class="flex  gap-[50px]">
      <swiper
          :slides-per-view="slidesPerView"
          :space-between="24"
          :autoplay="{
            delay: 1500,
            disableOnInteraction: false,
          }"
          :modules="[Autoplay]"
      >
        <swiper-slide v-for="item in sponsorsList" :key="item.id">
          <nuxt-link :to="item?.link" target="_blank">
          <HoverSolidGradientBox class="hover:cursor-pointer">
            <SponsorCard :icon-source="item.photo" :text="item.title"/>
          </HoverSolidGradientBox>
          </nuxt-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import SponsorCard from "./SponsorCard";
import {getPartnersData} from "../../api/getPartnersData";
import HoverSolidGradientBox from "../Cards/HoverSolidGradientBox";
import { Autoplay } from "swiper";

const sponsorsList = ref(null)
const { data } = await getPartnersData()
sponsorsList.value = data.value


import {mapState} from "pinia";
import {useWindowSizeStore} from "../../store/window";
const { locale} = useI18n()
const store = useWindowSizeStore()

const  slidesPerView = computed(()=>{
  if(store.isWindowSmallerThanMD){
    return 1
  }else if(store.isWindowSmallerThanXL){
    return  2
  }else  return  4
})


watch( () => locale.value, async()=>{
  const { data } = await getPartnersData()
  sponsorsList.value = data.value
})

</script>

<style scoped>

</style>
