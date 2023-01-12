<template>
  <section class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px] mt-[45px]">
      <div class="col-span-12 xl:col-span-9">
        <template v-if="!isLoading">
          <h1 class="section_title">{{ pageData?.title }}</h1>
          <div class="flex items-center justify-between my-[20px]">
            <div class="flex items-center gap-[12px] h-full">
              <div class="flex items-center">
                <Icon class="text-text_secondary mr-[11px]" height="20px" icon="fa-solid:calendar-alt" width="18px"/>
                <p class="text-text_secondary text-[1em] font-inter">{{ dayjs(pageData.date).format('DD.MM.YYYY') }}</p>
              </div>
              <Devider class="h-full"/>
              <div class="flex items-center">
                <Icon class="text-text_secondary mr-[11px]" height="15x" icon="ant-design:eye-filled" width="22px"/>
                <p class="text-text_secondary text-[1em] font-inter">{{ pageData.view_count }}</p>
              </div>
            </div>
            <div class="flex items-center gap-[30px]">
              <ClientOnly>
                <ShareNetwork
                    :title="pageData?.title"
                    :url="route.fullPath"
                    hashtags="GIS"
                    network="facebook"
                >
                  <Icon class="brand-icon" icon="brandico:facebook"/>
                </ShareNetwork>
                <ShareNetwork
                    :title="pageData?.title"
                    :url="route.path"
                    hashtags="GIS"
                    network="telegram"
                >
                  <Icon class="brand-icon" icon="bxl:telegram"/>
                </ShareNetwork>
              </ClientOnly>
            </div>
          </div>
          <ClientOnly>
            <div v-if="pageData.images.length" class="flex items-center gap-[24px] py-[10px]">
              <swiper
                  :loop="true"
                  :modules="[Navigation,Pagination]"
                  :pagination="true"
                  :slides-per-view="1"
                  :space-between="50"
                  navigation
              >
                <swiper-slide v-for="img in pageData.images" :key="img.photo">
                  <a :href="img.photo" class="w-full h-full" data-fancybox="info-service-photo">
                    <nuxt-img height="700" width="1056" quality="100"  class="w-full h-full object-cover" alt="photo"  format="webp" :src="img.photo.replace('http://', 'https://')" />
                  </a>
                </swiper-slide>
              </swiper>
            </div>
          </ClientOnly>
          <p class="page-text-content desc-html mt-[41px] break-words" v-html="pageData?.description"></p>
          <div class="footer-section"></div>
        </template>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator :preLoadedMenuName="'INFORMATION_SERVICE'"/>
      </div>
    </div>
  </section>

</template>

<script setup>
import dayjs from "dayjs";
import {Icon} from "@iconify/vue";
import Devider from "../../components/Devider";
import {getInfoServiceById, seeInfoData} from '../../api/getInfoServiceData'
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Navigation, Pagination} from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation'
import "swiper/css/pagination";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const pageData = ref(null)
const isLoading = ref(true)

const firstSign = ref(1)


watch(() => route.params.id, async (pageId) => {
  if (pageId) {
    isLoading.value = true
    await getPageDataById(pageId)
    // await seeInfoData(route.params.id)
    isLoading.value = false
  }
}, {
  immediate: true
})


const {locale, t: $t} = useI18n()

useHead({
  title: $t('navbar.ozcom-full')
})

watch(() => locale.value, async () => {
  isLoading.value = true
  await getPageDataById(route.params.id)
  isLoading.value = false
})

watch(() => isLoading.value, (val) => {
  if (val === false && window) {
    setTimeout(() => {
      const section = window.document.querySelectorAll('.footer-section')[0]
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && firstSign.value === 1) {
            await seeInfoData(route.params.id)
            firstSign.value++
          }
        })
      })
      observer.observe(section)
    }, 400)
  }
}, {
  immediate: true
})


async function getPageDataById(id) {
  const {data} = await getInfoServiceById(id)
  if (data && data?.value) {
    pageData.value = data.value
  }
}


</script>

<style>
.swiper-pagination-bullet {
  width: 16px !important;
  height: 16px !important;
  background: #A2A0B3 !important;
  opacity: 100% !important;
}

.swiper-pagination-bullet-active {
  background: #fff !important;
  width: 16px !important;
  height: 16px !important;
}
</style>

<style scoped>
.brand-icon {
  @apply text-text_secondary h-[24px] w-[24px]
}

.page-text-content {
  @apply font-medium font-inter text-[1em] leading-[22px] text-text_secondary
}
</style>
