<template>
  <section class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <h1 class="section_title">{{ pageData?.title }}</h1>
        <p class="text-text_secondary text-[1em] leading-[22px] font-inter">{{ pageData?.description }}</p>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator :preLoadedMenuName="'INFORMATION_SERVICE'"/>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getInfoServiceAdditionalInfoById} from "../../../api/getInfoServiceData";
import SideMenuNavigator from "../../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const pageData = ref(null)
const {data} = await getInfoServiceAdditionalInfoById(route.params.id)
if (data && data?.value) {
  pageData.value = data.value
}


const {locale, t: $t} = useI18n()
useHead({
  title: $t('navbar.ozcom-full')
})

watch(() => locale.value, async () => {
  const {data} = await getInfoServiceAdditionalInfoById(route.params.id)
  if (data && data?.value) {
    pageData.value = data.value
  }
})

</script>

<style scoped>

</style>
