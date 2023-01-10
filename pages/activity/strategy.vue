<template>
  <div class="container_wrapper">
    <h1 class="section_title mb-[16px]">{{ $t('page-titles.activity.strategy') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-col">
          <ItemsList v-for="item in itemsList">
            <NuxtLink :to="`/activity/${item.id}`">{{ item.title }}</NuxtLink>
          </ItemsList>
        </div>
        <PaginationCrumbs v-if="allPagesCount > 1" :allPagesCount="allPagesCount" :currentPage="currentPage"
                          class="mt-[25px]" @pagination-btn-clicked="paginationClickHandler"/>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </div>
</template>

<script setup>
import PaginationCrumbs from "../../components/PaginationCrumbs";
import {getActivityPostBySlug} from '../../api/getActivityData'
import usePaginationOptions from "../../composables/usePaginationOptions";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()

useHead({
  title: $t('page-titles.activity.strategy')
})

const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getActivityPostBySlug({slug}, 'strategy', page)
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

const {locale} = useI18n()

watch(() => locale.value, async () => {
  await getItems(route.path)
})

function paginationClickHandler(val) {
  setCurrentPage(val)
  getItems(route.path, val)
  window.scrollTo(0, 0)
}
</script>

<style scoped>

</style>
