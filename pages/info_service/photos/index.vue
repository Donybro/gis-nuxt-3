<template>
  <section class="container_wrapper">
    <h1 class="section_title">{{ $t('page-titles.info-service.photomaterials') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9 gap-[24px]">
        <div class="hidden xl:grid grid-rows-4 grid-flow-col gap-[24px] h-[468px]">
          <div class="row-span-4 col-span-2">
            <div class="relative group">
              <nuxt-link :to="`/info_service/photos/${firstCategory.id}`">
                <nuxt-img  height="468" class="object-cover h-[468px] w-full" alt="photo"  format="webp" :src="firstCategory.cover.replace('http://', 'https://')" />
                <img alt=""
                     class="absolute h-full object-cover top-0 bottom-0 left-0 z-10 group-hover:hidden"
                     src="/img/GradientHeader.svg">
                <p class="absolute text-white line-clamp-2 text-[1.12em] font-bold font-montserrat h-[50px] bottom-2 left-1 z-20 break-words">
                  {{ firstCategory.name }}</p>
              </nuxt-link>
            </div>
          </div>
          <div v-for="cat in secondAndThirdCategories" :key="cat.id" class="row-span-2 col-span-1">
            <div class="relative h-full w-full group">
              <nuxt-link :to="`/info_service/photos/${cat.id}`">
                <nuxt-img class="object-cover h-full w-full" alt="photo"  format="webp" :src="cat.cover.replace('http://', 'https://')" />
                <img alt=""
                     class="absolute h-full object-cover top-0 bottom-0 left-0 z-10 group-hover:hidden"
                     src="/img/GradientHeader.svg">
                <p class="absolute text-white line-clamp-2 text-[1.12em] font-bold  font-montserrat h-[50px] bottom-2 left-1 z-20 break-words">
                  {{ cat.name }}</p>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="hidden xl:grid grid-cols-3 gap-[24px] mt-[24px]">
          <div v-for="cat in otherCategories" class="relative">
            <nuxt-link :to="`/info_service/photos/${cat.id}`">
              <nuxt-img width="342" height="250" class="w-[342px] h-[250px] object-cover" alt="photo"  format="webp" :src="cat.cover.replace('http://', 'https://')" />
              <img alt="" class="absolute h-full object-cover top-0 bottom-0 left-0 z-10" src="/img/GradientHeader.svg">
              <p class="absolute text-white line-clamp-2 text-[1.12em] font-bold  font-montserrat h-[50px] bottom-2 left-1 z-20 break-words">
                {{ cat.name }}</p>
            </nuxt-link>
          </div>
        </div>
        <div class="grid xl:hidden grid-cols-1 md:grid-cols-2 gap-[24px]">
          <div v-for="cat in [firstCategory,...secondAndThirdCategories,...otherCategories]"
               class="relative bg-red-600">
            <nuxt-link :to="`/info_service/photos/${cat.id}`">
              <nuxt-img  height="250" class="w-full h-[250px] object-cover" alt="photo"  format="webp" :src="cat.cover.replace('http://', 'https://')" />
              <img alt="" class="absolute h-full object-cover top-0 bottom-0 left-0 z-10" src="/img/GradientHeader.svg">
              <p class="absolute text-white line-clamp-2 text-[1.12em] font-bold  font-montserrat h-[50px] bottom-2 left-1 z-20 break-words">
                {{ cat.name }}</p>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </section>
</template>
<script setup>
import {getImagesCategory} from '../../../api/getInfoServiceData'
import SideMenuNavigator from "../../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const router = useRouter()
const firstCategory = ref(null)
const secondAndThirdCategories = ref([])
const otherCategories = ref([])

const {data} = await getImagesCategory()
if (data && data?.value) {
  const [first, second, third, ...others] = data.value
  firstCategory.value = first
  second ? secondAndThirdCategories.value.push(second) : null
  third ? secondAndThirdCategories.value.push(third) : null
  otherCategories.value = others
}

const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.info-service.photomaterials')
})

watch(() => locale.value, async () => {
  const {data} = await getImagesCategory()
  if (data && data?.value) {
    const [first, second, third, ...others] = data.value
    firstCategory.value = first
    second ? secondAndThirdCategories.value.push(second) : null
    third ? secondAndThirdCategories.value.push(third) : null
    otherCategories.value = others
  }
})

function clickHandler(newsId) {
  router.push(`/info_service/${newsId}`)
}

</script>

<style scoped>

</style>
