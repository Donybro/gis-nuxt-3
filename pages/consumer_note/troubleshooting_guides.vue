<template>
  <HtmlPageWrapper :pageData="pageData"/>
</template>

<script setup>
import HtmlPageWrapper from "../../components/HtmlPageWrapper";
import {getNoteForConsumerBySlug} from "../../api/getConsumerNotes";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()

const {t: $t} = useI18n()
useHead({
  title: $t('navbar.ozcom-full')
})
const pageData = ref(null)

const {locale} = useI18n()

watch(() => locale.value, async () => {
  const {data} = await getNoteForConsumerBySlug({slug: route.path}, 'troubleshooting')
  if (data && data?.value) {
    pageData.value = data.value[0]
  }
})

const {data} = await getNoteForConsumerBySlug({slug: route.path}, 'troubleshooting')
if (data && data?.value) {
  pageData.value = data.value[0]
}
</script>

<style scoped>

</style>
