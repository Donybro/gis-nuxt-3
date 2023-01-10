<template>
  <section class="container_wrapper">
    <h1 class="section_title"> {{ $t('page-titles.activity.marks') }} </h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-[24px] gap-y-[38px]">
          <MarkCard v-for="mark in itemsList" :key="mark.id" :mark="mark" @click="markClickHandler"/>
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
// import {getInfoServiceBySlug} from '../../api/getInfoServiceData'
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";
import MarkCard from "~/components/Cards/MarkCard.vue";
import SideMenuNavigator from "~/components/Menu/SideMenuNavigator.vue";
import {getMarksYearsListBySlug} from "~/api/marks.service";


const route = useRoute()
const router = useRouter()

const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getMarksYearsListBySlug({slug}, 'marks', page)
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

const {locale, t: $t} = useI18n()
useHead({
  title: $t('page-titles.activity.marks')
})


watch(() => locale.value, async () => {
  await getItems(route.path)
}, {
  immediate: true
})

function paginationClickHandler(val) {
  setCurrentPage(val)
  getItems(route.path, val)
  window.scrollTo(0, 0)
}

function markClickHandler(mark_year) {
  navigateTo({
    path: "/activity/marks/mark-year-" + mark_year,
    params: {
      mark_year
    }
  })
}

</script>

<style scoped></style>
