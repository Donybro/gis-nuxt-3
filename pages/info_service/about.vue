<template>
  <HtmlPageWrapper :pageData="pageData"/>
</template>

<script setup>
import {getInfoServiceBySlug} from "../../api/getInfoServiceData";
import HtmlPageWrapper from "../../components/HtmlPageWrapper";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const pageData = ref(null)


const {data} = await getInfoServiceBySlug({submenu_slug: route.path}, 'about')
if (data && data?.value && data?.value?.results) {
  pageData.value = data?.value?.results[0]
}

const {locale, t: $t} = useI18n()
useHead({
  title: $t('navbar.ozcom-full')
})


watch(() => locale.value, async () => {
  const {data} = await getInfoServiceBySlug({submenu_slug: route.path}, 'about')
  if (data && data?.value && data?.value?.results) {
    pageData.value = data?.value?.results[0]
  }
})

</script>

<style scoped>

</style>
