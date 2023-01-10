<template>
  <section class="container_wrapper">
    <h1 class="section_title">{{ $t('page-titles.ozcom.leaders') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <section v-if="itemsList && itemsList.length" class="flex flex-col gap-[24px]">
          <LeaderCard v-for="l in itemsList" :key="l.id" :leader="l"/>
        </section>
        <PaginationCrumbs v-if="allPagesCount > 1" :allPagesCount="allPagesCount" :currentPage="currentPage"
                          class="mt-[25px]" @pagination-btn-clicked="paginationClickHandler"/>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </section>

</template>

<script setup>
import LeaderCard from "../../components/Cards/LeaderCard";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator"
import {getOzkomEmployeeBySlug} from "../../api/getOzkomnazoratData";
import PaginationCrumbs from "../../components/PaginationCrumbs";
import usePaginationOptions from "../../composables/usePaginationOptions";

import {useHead} from "nuxt/app";

const route = useRoute()


// const { data: leadersList,pending } = await getOzkomEmployeeBySlug({slug:route.path},'leaders')
// console.log(leadersList.value)

const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getOzkomEmployeeBySlug({slug}, 'leaders', page)
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


const {locale, t: $t} = useI18n()

useHead({
  title: $t('navbar.ozcom-full')
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

// const leadersListWithValidPhotoPath = computed(()=>leadersList.value.map(el)=>({...el}))
</script>

<style scoped>

</style>
