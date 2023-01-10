<template>
  <section class="container_wrapper">
    <h1 class="section_title">{{ $t('page-titles.info-service.videomaterials') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-col flex-wrap gap-[24px] my-[50px]">
          <ClientOnly>
            <div class="hidden xl:grid grid-rows-4 grid-cols-3 grid-flow-col gap-[24px] h-[468px]">
              <div class="row-span-4 col-span-2">
                <div class="relative">
                  <VideoWrapper :image="firstVideo.cover" :source="firstVideo.link" :title="firstVideo.name"
                                class="w-full h-full h-[468px]"/>
                </div>
              </div>
              <div v-for="vid in secondAndThirdVideos" :key="vid.id" class="row-span-2 col-span-1">
                <VideoWrapper :image="vid.cover" :source="vid.link" :title="vid.name" class="w-full h-full"/>
              </div>
            </div>
            <div class="hidden xl:grid grid-cols-3 gap-[24px]">
              <VideoWrapper v-for="source in otherVideos" :image="source.cover" :source="source.link"
                            :title="source.name" class="w-[342px] h-[250px]"/>
            </div>
            <div class="grid grid-cols-1  md:grid-cols-2 gap-[24px] xl:hidden">
              <VideoWrapper v-for="video in [firstVideo,...secondAndThirdVideos,...otherVideos]" :image="video.cover"
                            :source="video.link" :title="video.name" class="w-full h-full h-[238px]"/>
            </div>

            <!--            <div class="relative" v-for="cat in videosCategory">-->
            <!--              <nuxt-link :to="`/info_service/videos/${cat.id}`">-->
            <!--                <img :src="cat.cover" class="w-[500px] h-[300px] object-cover" alt="cover">-->
            <!--                <img src="/img/GradientHeader.svg" class="absolute h-full object-cover top-0 bottom-0 left-0 z-10" alt="GradientHeader">-->
            <!--                <p class="absolute text-white w-[500px] font-roboto h-[50px] bottom-2 left-1 z-20">{{cat.name}}</p>-->
            <!--              </nuxt-link>-->
            <!--            </div>-->
          </ClientOnly>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </section>
</template>
<script setup>
import {getVideosCategory} from '../../../api/getInfoServiceData'
import SideMenuNavigator from "../../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";


const route = useRoute()
const router = useRouter()

const firstVideo = ref(null)
const secondAndThirdVideos = ref([])
const otherVideos = ref([])

const {data} = await getVideosCategory()
if (data && data?.value) {
  const [first, second, third, ...others] = data.value
  firstVideo.value = first
  console.log(firstVideo.value)
  second ? secondAndThirdVideos.value.push(second) : null
  third ? secondAndThirdVideos.value.push(third) : null
  otherVideos.value = others
}
const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.info-service.videomaterials')
})


watch(() => locale.value, async () => {
  const {data} = await getVideosCategory()
  if (data && data?.value) {
    const [first, second, third, ...others] = data.value
    firstVideo.value = first
    console.log(firstVideo.value)
    second ? secondAndThirdVideos.value.push(second) : null
    third ? secondAndThirdVideos.value.push(third) : null
    otherVideos.value = others
  }
})


function clickHandler(newsId) {
  router.push(`/info_service/${newsId}`)
}

</script>

<style scoped>

</style>
