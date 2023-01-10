<template>
  <div class="container_wrapper">
    <h1 class="section_title mb-[16px]">{{ $t('page-titles.documents.gov-standarts') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-[24px] my-[20px]">
          <div class="relative">
            <input id="full_name" v-model="title" class="base_input !px-[40px] !w-full" name="full_name" type="text">
            <Icon class="text-text_secondary absolute top-5 left-3" icon="akar-icons:search"/>
            <button class="absolute top-4 right-3" @click.stop.prevent="title = ''">
              <Icon class="text-text_secondary" icon="clarity:window-close-line" width="25px"/>
            </button>
          </div>
          <YearPicker v-model:dateValue="year"/>
        </div>
        <div class="flex flex-col">
          <ItemsList v-for="item in itemsList">
            <NuxtLink :to="item.link" target="_blank">{{ item.title }}</NuxtLink>
          </ItemsList>
        </div>
        <!--        <PaginationCrumbs class="mt-[25px]" v-if="allPagesCount > 1" @pagination-btn-clicked="paginationClickHandler" :allPagesCount="allPagesCount" :currentPage="currentPage"/>-->
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </div>
</template>

<script setup>
import YearPicker from "../../components/YearPicker";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {Icon} from "@iconify/vue";
import {getDocumentsBySlug} from '../../api/getDocumentsData'
import usePaginationOptions from "../../composables/usePaginationOptions";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const {locale, t: $t} = useI18n()
useHead({
  title: $t('page-titles.documents.gov-standarts')
})

const year = ref(null)
const title = ref('')


const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getDocumentsBySlug(slug, 'gov_standarts', title.value, year.value, page)
    if (data && data?.value) {
      const {num_pages, results, current_page} = data.value
      allPagesCount.value = num_pages
      itemsList.value = results
      currentPage.value = current_page
    }
  } catch (e) {
    console.log(e)
  }
}

await getItems(route.path)


watch(() => locale.value, async () => {
  await getItems(route.path)
})


function paginationClickHandler(val) {
  setCurrentPage(val)
  console.log(val)
  getItems(route.path, val)
  window.scrollTo(0, 0)
}

watch([year, title], ([year, title]) => {
  getItems(route.path)
}, {
  immediate: true
})


</script>
<style scoped>

</style>
