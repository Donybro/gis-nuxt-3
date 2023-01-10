<template>
  <section class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px] mt-[45px]">
      <div class="col-span-12 xl:col-span-5">
        <div class="flex flex-col">
          <h2 class="text-white font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px]">
            {{ pageData?.title }}</h2>
          <div class="text-white font-semibold font-montserrat text-[1.12em] leading-[25px] my-[12px] break-words"
               v-html="pageData?.preview"></div>
          <div class="text-text_secondary text-[1em] leading-[22px] font-inter break-words"
               v-html="pageData?.description"></div>
          <div class="mt-[60px]">
            <ItemsList v-for="item in pageData.files" :key="item.id" :item="item" @click="itemClickHandler">
              <a :href="item.file">{{ item.title }}</a>
            </ItemsList>
          </div>
        </div>
      </div>
      <div class="col-span-12 xl:col-span-7">
        <template v-if="pageData?.photo">
          <img :src="pageData?.photo" alt="" class="w-full object-contain">
        </template>
        <tepmlate v-else>
          <Icon class="text-text_secondary" icon="material-symbols:no-photography-rounded" width="100%"/>
        </tepmlate>

      </div>
    </div>
  </section>
</template>

<script setup>
import {getLogoBySlug} from "../../api/getOzkomnazoratData";
import {Icon} from "@iconify/vue";
import ItemsList from "../../components/ItemsList";

import {useHead} from "nuxt/app";

const route = useRoute()
const router = useRouter()


const pageData = ref({
  title: '',
  preview: '',
  text: ''
})

function itemClickHandler(item) {
  router.push(item.file)
}

const {data} = await getLogoBySlug({slug: route.path})
if (data && data?.value) {
  pageData.value = data?.value[0]
}

const {locale, t: $t} = useI18n()

useHead({
  title: $t('navbar.ozcom-full')
})

watch(() => locale.value, async () => {
  const {data} = await getLogoBySlug({slug: route.path})
  if (data && data.value) {
    pageData.value = data?.value[0]
  }

})


</script>

<style scoped>

</style>
