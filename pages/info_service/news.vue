<template>
  <section class="container_wrapper">
    <h1 class="section_title"> {{ $t('page-titles.info-service.news-archive') }} </h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:hidden ">
        <div class="flex flex-col gap-[32px]">
          <ClientOnly>
            <Datepicker v-model="date" :autoApply="true" :flow="['year','month']"
                        format="MM.yyyy" inputClassName="yearPicker_input" menuClassName="yearPicker_menu" monthPicker/>
          </ClientOnly>
          <NewsCategories v-model:category_id="category_id" :categories-list="categoriesList"/>
        </div>
      </div>
      <div class="col-span-12 xl:col-span-9">
        <div v-if="itemsList?.length" class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-x-[24px] gap-y-[38px]">
          <NewsSmallCard v-for="news in itemsList" :key="news.id" :news="news" @click="newsClickHandler"/>
        </div>
        <h1 v-else class="text-text_secondary font-bold text-[1.15em] xl:text-[1.5em] font-montserrat">
          {{ $t('other.no-news') }}
        </h1>
        <div class="mt-[40px]">
          <PaginationCrumbs v-if="allPagesCount > 1" :allPagesCount="allPagesCount" :currentPage="currentPage"
                            @pagination-btn-clicked="paginationClickHandler"/>
        </div>
      </div>
      <div class="xl:col-span-3">
        <div class="hidden xl:flex flex-col gap-[32px]">
          <SideMenuNavigator :is-fixed="false"/>
          <!-- <YearMonthPicker v-model:dateValue="date"/>-->
          <ClientOnly>
            <Datepicker v-model="date" :autoApply="true" :flow="['year','month']"
                        format="MM.yyyy" inputClassName="yearPicker_input" menuClassName="yearPicker_menu" monthPicker/>
          </ClientOnly>
          <NewsCategories v-model:category_id="category_id" :categories-list="categoriesList"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getInfoServiceBySlug, getNewsCategories} from '../../api/getInfoServiceData'
import {useI18n} from "vue-i18n";
import usePaginationOptions from "../../composables/usePaginationOptions";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import NewsCategories from "../../components/NewsCategories";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useHead} from "nuxt/app";

const {t: $t, locale} = useI18n({useScope: 'global'})

useHead({
  title: $t('page-titles.info-service.news-archive')
})

const route = useRoute()
const router = useRouter()

const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

await getItems(route.path)

watch(() => locale.value, async () => {
  await getItems(route.path)
})

function paginationClickHandler(val) {
  setCurrentPage(val)
  getItems(route.path, val)
  window.scrollTo(0, 0)
}

const category_id = ref('')

const date = ref(null)

watch([category_id, date], async ([category_id, dateVal]) => {
  await getItems(route.path, 1, category_id, dateVal?.month + 1, dateVal?.year)
})


async function getItems(slug = route.path, page = 1, category_id, month = null, year = null) {
  try {
    const {data} = await getInfoServiceBySlug({submenu_slug: slug, category_id, month, year}, 'news', page)
    if (data && data?.value) {
      const {num_pages, results, current_page} = data?.value
      allPagesCount.value = num_pages
      itemsList.value = results
      currentPage.value = current_page
    }
  } catch (e) {
    console.log(e)
  }
}

const {data: categoriesList} = await getNewsCategories()

function newsClickHandler(newsId) {
  router.push(`/info_service/${newsId}`)
}


</script>

<style>
.yearPicker_input {
  @apply text-text_secondary text-[1.25em] py-[18px] bg-secondary
}

.yearPicker_menu {
  @apply text-text_secondary  bg-secondary
}

.dp__overlay {
  @apply bg-secondary text-text_secondary
}

.dp__button {
  @apply bg-secondary text-text_secondary hover:text-primary
}

.dp__menu {
  @apply border border-border_primary
}

.dp__input {
  @apply border border-border_primary
}
</style>
