<template>
  <HtmlPageWrapper :pageData="pageData"/>
</template>

<script setup>
import {getOzkomAboutBySlug} from "~/api/getOzkomnazoratData";
import HtmlPageWrapper from "../../components/HtmlPageWrapper";

const route = useRoute()

const pageData = ref({
  title: '',
  text: ''
})
const {data} = await getOzkomAboutBySlug({slug: route.path}, 'history')
if (data && data?.value) {
  pageData.value = data?.value[0]
  console.log(data.value[0])
}


const {locale, t: $t} = useI18n()

useHead({
  title: $t('navbar.ozcom-full')
})

watch(() => locale.value, async () => {
  const {data} = await getOzkomAboutBySlug({slug: route.path}, 'history')
  console.log(data.value[0])
  pageData.value = data.value[0]
})

</script>

<style scoped>

</style>
