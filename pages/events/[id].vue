<template>
  <section v-if="pageData" class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <h1 class="section_title">{{ pageData?.title }}</h1>
        <div class="desc-html text-text_secondary text-[1em] leading-[22px] font-inter break-words"
             v-html="pageData?.description"></div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator :preLoadedMenuName="'EVENTS'"/>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getEventById} from "../../api/getEventsData";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const pageData = ref(null)

const {data} = await getEventById(route.params.id)
if (data && data?.value) {
  pageData.value = data.value
}
const {t: $t} = useI18n()
useHead({
  title: $t('navbar.ozcom-full')
})


const {locale} = useI18n()

watch(() => locale.value, async () => {
  const {data} = await getEventById(route.params.id)
  if (data && data?.value) {
    pageData.value = data.value
  }
})

</script>

<style scoped>

</style>
