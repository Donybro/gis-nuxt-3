<template>
  <section class="container_wrapper">
    <h1 class="section_title">{{ videos.name }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
          <VideoWrapper v-for="source in videos.videos" :image="source.cover" :source="source.link"
                        class="w-[350px] h-[250px]"/>
        </div>
      </div>
      <!--      <div class="col-span-3">-->
      <!--          <SideMenuNavigator/>-->
      <!--      </div>-->
    </div>
  </section>
</template>

<script setup>
import {getVideoById} from "../../../api/getInfoServiceData";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const videos = ref(null)
const {data} = await getVideoById(route.params.id)
if (data && data?.value) {
  videos.value = data.value
}
const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.info-service.videomaterials')
})


watch(() => locale.value, async () => {
  const {data} = await getVideoById(route.params.id)
  if (data && data?.value) {
    videos.value = data.value
  }
})

</script>

<style scoped>

</style>
