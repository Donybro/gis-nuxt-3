<template>
  <section class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px] mt-[45px]">
      <h1 class="section_title col-span-12">{{ imagesListName }}</h1>
      <div class="col-span-12 xl:col-span-9">
        <div class="hidden xl:grid grid-rows-4 grid-cols-3 grid-flow-col gap-[24px] h-[486px]">
          <div class="row-span-4 col-span-2">
            <div class="shadow cursor-pointer group">
              <a :href="firstImage?.image" class="w-full h-[468px] block" data-fancybox="gallery">
                <img v-if="firstImage?.image" :src="firstImage?.image" class="w-full h-full object-cover"/>
                <Icon v-else class="w-full h-full text-text_secondary" icon="bi:image-fill"/>
              </a>
            </div>
          </div>
          <div class="flex flex-col gap-[24px]">
            <div v-for="img in secondAndThirdImages" :key="img.id" class="shadow cursor-pointer group h-[222px]">
              <a :href="img.image" class="w-full h-full block" data-fancybox="gallery">
                <img v-if="img.image" :src="img.image" class="w-full h-[222px] object-cover"/>
                <Icon v-else class="w-full h-full text-text_secondary" icon="bi:image-fill"/>
              </a>
            </div>
          </div>
        </div>
        <div class="hidden xl:grid grid-cols-3 gap-[24px] my-[24px]">
          <div v-for="img in otherImages" :key="img.id" class="shadow cursor-pointer group h-[222px]">
            <a :href="img.image" class="w-full h-full block" data-fancybox="gallery">
              <img v-if="img.image" :src="img.image" class="w-full h-full object-cover"/>
              <Icon v-else class="w-full h-full text-text_secondary" icon="bi:image-fill"/>
            </a>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-[24px] md:grid-cols-2 xl:hidden">
          <div v-for="img in [firstImage,...secondAndThirdImages,...otherImages]" :key="img.id"
               class="shadow cursor-pointer group">
            <a :href="img?.image" class="w-full h-[238px] block" data-fancybox="gallery">
              <img v-if="img?.image" :src="img?.image" class="w-full h-full object-cover"/>
              <Icon v-else class="w-full h-full text-text_secondary" icon="bi:image-fill"/>
            </a>
          </div>
        </div>
      </div>
      <div class="xl:col-span-3">
        <div class="flex flex-col gap-[32px]">
          <SideMenuNavigator :preLoadedMenuName="'INFORMATION_SERVICE'"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getImageById} from "../../../api/getInfoServiceData";
import SideMenuNavigator from "../../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()

const firstImage = ref(null)
const secondAndThirdImages = ref([])
const otherImages = ref([])
const imagesListName = ref(null)

const {data} = await getImageById(route.params.id)
if (data && data?.value) {
  const [first, second, third, ...others] = data.value?.images
  console.log(data.value)
  imagesListName.value = data.value?.name
  firstImage.value = first
  second ? secondAndThirdImages.value.push(second) : null
  third ? secondAndThirdImages.value.push(third) : null
  otherImages.value = others
}

const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.info-service.photomaterials')
})

watch(() => locale.value, async () => {
  const {data} = await getImageById(route.params.id)
  if (data && data?.value) {
    const [first, second, third, ...others] = data.value?.images
    console.log(data.value)
    imagesListName.value = data.value?.name
    firstImage.value = first
    second ? secondAndThirdImages.value.push(second) : null
    third ? secondAndThirdImages.value.push(third) : null
    otherImages.value = others
  }
})


</script>

<style scoped>

</style>
