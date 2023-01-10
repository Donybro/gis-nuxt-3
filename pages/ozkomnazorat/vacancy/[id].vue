<template>
  <div class="">
    <HtmlPageWrapper :pageData="pageData"/>
    <div class="container_wrapper flex mt-[45px] justify-center">
      <nuxt-link class="px-[70px] py-[20px] hover:text-primary hover:bg-white text-white bg-primary border border-white"
                 to="/ozkomnazorat/vacancy/resume">
        {{ $t('button.send-resume') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import HtmlPageWrapper from "../../../components/HtmlPageWrapper";
import {getOzkomVacancyById} from "../../../api/getOzkomnazoratData";

import {useHead} from "nuxt/app";

const route = useRoute()
const pageData = ref(null)
const {data} = await getOzkomVacancyById(route.params.id, 'vacancy-id')
pageData.value = data?.value


const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.ozcom.vacancy')
})

watch(() => locale.value, async () => {
  const {data} = await getOzkomVacancyById(route.params.id, 'vacancy-id')
  if (data && data?.value) {
    pageData.value = data?.value[0]
  }
})

console.log(data.value)
</script>

<style scoped>

</style>
