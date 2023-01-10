<template>
  <section class="container_wrapper">
    <h1 class="section_title"> {{ $t('page-titles.info-service.wisdom') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-[24px] gap-y-[38px]">
          <NewsSmallCard v-for="item in itemsList" :key="item.id" :news="item" @click="clickHandler"/>
        </div>
        <div class="mt-[40px]">
          <PaginationCrumbs v-if="allPagesCount > 1" :allPagesCount="allPagesCount" :currentPage="currentPage"
                            @pagination-btn-clicked="paginationClickHandler"/>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getInfoServiceBySlug} from '../../api/getInfoServiceData'
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

function clickHandler(newsId) {
  router.push(`/info_service/${newsId}`)
}

const route = useRoute()
const router = useRouter()


const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getInfoServiceBySlug({submenu_slug: slug}, 'wisdom', page)
    if (data && data?.value) {
      const {num_pages, results, current_page} = data.value
      allPagesCount.value = num_pages
      console.log(data.value)
      itemsList.value = results
      currentPage.value = current_page
    }

  } catch (e) {
    console.log(e)
  }
}

await getItems(route.path)
const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.info-service.wisdom')
})

watch(() => locale.value, async () => {
  await getItems(route.path)
})

function paginationClickHandler(val) {
  setCurrentPage(val)
  console.log(val)
  getItems(route.path, val)
  window.scrollTo(0, 0)
}


</script>

<style scoped>

</style>
