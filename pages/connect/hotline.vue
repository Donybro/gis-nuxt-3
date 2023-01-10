<template>
  <HtmlPageWrapper :pageData="pageData"/>
</template>

<script setup>
import HtmlPageWrapper from "../../components/HtmlPageWrapper";
import {getConnectionDataBySlug} from "../../api/getConnectionData";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const {t: $t} = useI18n()
const route = useRoute()
const pageData = ref(null)

useHead({
  title: $t('navbar.ozcom-full')
})

const {locale} = useI18n()

const {data} = await getConnectionDataBySlug({slug: route.path})
if (data && data?.value) {
  pageData.value = data.value[0]
}

watch(() => locale.value, async () => {
  const {data} = await getConnectionDataBySlug({slug: route.path})
  if (data && data?.value) {
    pageData.value = data.value[0]
  }
})

</script>

<style scoped>

</style>
