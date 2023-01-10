<template>
  <section v-if="pageData" class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <h1 class="section_title">{{ pageData?.title }}</h1>
        <div class="text-text_secondary desc-html text-[1em] leading-[22px] font-inter break-words"
             v-html="pageData?.description"></div>
        <div v-if="pageData.link" class="my-[20px]">
          <h3 class="text-white text-[25px] font-inter mb-[10px]">{{ $t('common.link') }}</h3>
          <ItemsList>
            <NuxtLink :to="pageData.link">
              {{ pageData.title }}
            </NuxtLink>
          </ItemsList>
        </div>
      </div>
      <div class="col-span-12 xl:col-span-3">
        <SideMenuNavigator :preLoadedMenuName="'INTERACTIVE_SERVICES'"/>
      </div>
    </div>
  </section>
</template>

<script setup>
import ItemsList from "../../components/ItemsList";
import {getBusinessEntityById} from "../../api/businessEntity";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const pageData = ref(null)

const {data} = await getBusinessEntityById(route.params.id)
if (data && data?.value) {
  pageData.value = data.value
}
const {locale, t: $t} = useI18n()
useHead({
  title: $t('navbar.ozcom-full')
})


watch(() => locale.value, async () => {
  const {data} = await getBusinessEntityById(route.params.id)
  if (data && data?.value) {
    pageData.value = data.value
  }

})


console.log(pageData)
</script>

<style scoped>

</style>
