<template>
  <section class="container_wrapper" v-if="pageData">
    <div class="grid grid-cols-12 gap-[24px] mt-[45px]">
      <div class="col-span-12 xl:col-span-9">
        <h1 class="section_title">{{ pageData?.title }}</h1>
        <div class="text-text_secondary desc-html text-[1em] leading-[22px] font-inter break-words" v-html="pageData?.description"></div>
        <div v-if="pageData?.link" class="my-[20px]">
          <h3 class="text-white text-[25px] font-inter mb-[10px]">{{ $t('common.link') }}</h3>
          <ItemsList>
            <NuxtLink :to="pageData?.link" target="_blank">
              {{ pageData.title }}
            </NuxtLink>

          </ItemsList>
        </div>
        <div v-if="pageData?.file" class="my-[30px]">
          <ClientOnly>
            <NuxtLink target="_blank" :to="pageData?.file">
              <a class="hover:text-primary hover:bg-white font-bold tracking-[1px] text-white bg-primary border border-text_secondary px-[20px] py-[12px]">{{
                  $t("button.download-document")
                }}</a>
            </NuxtLink>
          </ClientOnly>
        </div>
        <div v-if="pageData?.images.length" class="my-[20px]">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
            <ImageWrapper v-for="source in pageData.images" :source="source.image" :image="source.image" class="w-[300px] h-[250px] md:w-[350px] md:h-[250px]"/>
          </div>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator :preLoadedMenuName="'ACTIVITY'"/>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getPostById} from "../../api/getActivityData";
import ItemsList from "../../components/ItemsList";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";


const route = useRoute()
const pageData = ref(null)

const {data} = await getPostById(route.params.id)
if (data && data?.value) {
  pageData.value = data.value
}


const {locale} = useI18n()

watch(() => locale.value, async () => {
  const {data} = await getPostById(route.params.id)
  if (data && data?.value) {
    pageData.value = data.value
  }
})


</script>

<style scoped>

</style>
