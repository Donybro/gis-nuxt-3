<template>
  <section class="container_wrapper">
    <h1 class="section_title"> {{ $t('page-titles.info-service.infographics') }} </h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-x-[24px] gap-y-[38px]">
          <ImageWrapper v-for="source in itemList" :key="source.id" :image="source.photo" :source="source.photo"
                        :title="source.title"/>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </section>
</template>
<script setup>
import {getInfographicsBySlug} from '../../api/getInfoServiceData'
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";


const route = useRoute()
const router = useRouter()

const itemList = ref([])

const {data} = await getInfographicsBySlug({slug: route.path}, 'infographics')
if (data && data?.value) {
  itemList.value = data.value
}

const {locale, t: $t} = useI18n()
useHead({
  title: $t('page-titles.info-service.infographics')
})


watch(() => locale.value, async () => {
  const {data} = await getInfographicsBySlug({slug: route.path}, 'infographics')
  if (data && data?.value) {
    itemList.value = data.value
  }
})

function clickHandler(newsId) {
  router.push(`/info_service/${newsId}`)
}

</script>

<style scoped>

</style>
