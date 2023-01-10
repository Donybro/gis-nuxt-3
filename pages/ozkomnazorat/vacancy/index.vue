<template>
  <section class="container_wrapper">
    <h1 class="section_title">{{ $t('page-titles.ozcom.vacancy') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-wrap gap-[24px]">
          <VacancyCard v-for="item in itemsList" :key="item.id" :vacancy="item" @click="vacancyCardClicked"/>
        </div>
        <p v-if="!itemsList.length" class="text-white font-montserrat font-bold text-[1.25em]">
          {{ $t('other.no-vacancy') }}
        </p>
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
import SideMenuNavigator from "../../../components/Menu/SideMenuNavigator";
import VacancyCard from "../../../components/Cards/VacancyCard";
import {getOzkomVacancies} from "../../../api/getOzkomnazoratData";

import usePaginationOptions from "../../../composables/usePaginationOptions";

import {useHead} from "nuxt/app";

const router = useRouter()
const route = useRoute()

function vacancyCardClicked(vacancyId) {
  router.push('/ozkomnazorat/vacancy/' + vacancyId)
}


const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(page = 1) {
  try {
    const {data} = await getOzkomVacancies(page)
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

await getItems(1)

const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.ozcom.vacancy')
})

watch(() => locale.value, async () => {
  await getItems(route.path)
})

function paginationClickHandler(val) {
  setCurrentPage(val)
  getItems(val)
  window.scrollTo(0, 0)
}
</script>

<style scoped>

</style>
