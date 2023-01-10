<template>
  <div class="container_wrapper">
    <h1 class="section_title mb-[16px]">{{ $t('page-titles.activity.anticorruption') }}</h1>

    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <section v-if="locale !== 'en'">
          <h3 class="request" v-if="locale === 'ru'">{{ $t('page-titles.activity.anticorruption-text.request') }}</h3>
          <h2 class="main-title">{{ $t('page-titles.activity.anticorruption-text.main-title') }}</h2>
          <h3 class="request" v-if="locale !== 'ru'">{{ $t('page-titles.activity.anticorruption-text.request') }}</h3>
          <h4 class="title-header-footer">{{ $t('page-titles.activity.anticorruption-text.title-header') }}</h4>
          <p class="text" v-html="$t('page-titles.activity.anticorruption-text.text')"></p>
          <div class="flex flex-col mb-[52px]">
            <p class="font-roboto text-[.5em] xl:text-[1em] xl:leading-[34px] whitespace-pre-line text-justify text-text_secondary">
              {{ $t('page-titles.activity.anticorruption-text.respectfully') }}</p>
            <p class="font-roboto text-[.5em] xl:text-[1em] xl:leading-[34px] whitespace-pre-line text-justify text-text_secondary">
              {{ $t('page-titles.activity.anticorruption-text.footer-text') }}</p>
          </div>
        </section>
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
import {useHead} from "nuxt/app";
import PaginationCrumbs from "../../components/PaginationCrumbs";
import {getActivityPostBySlug} from '../../api/getActivityData'
import usePaginationOptions from "../../composables/usePaginationOptions";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";

const {locale, t: $t} = useI18n()
useHead({
  title: $t('page-titles.activity.anticorruption')
})

const route = useRoute()


const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getActivityPostBySlug({slug}, 'anticorruption', page)
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

strong {
  font-weight: 900 !important;
}

.request {
  @apply font-roboto font-semibold text-[1.25em] xl:text-[1.8em] leading-[32px] xl:leading-[24px] text-center  mb-[22px] text-text_secondary
}

.main-title {
  @apply font-roboto font-semibold text-[0.9em] xl:text-[1.5em] xl:leading-[34px] text-center  mb-[22px] text-text_secondary
}

.title-header-footer {
  @apply font-roboto font-semibold text-[.7em] xl:text-[1.3em] xl:leading-[34px] text-center  mb-[22px] text-text_secondary
}

.text {
  @apply font-roboto text-[.5em] xl:text-[1em] xl:leading-[34px] whitespace-pre-line text-justify  mb-[32px] text-text_secondary
}

</style>
