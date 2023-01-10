<template>
  <section class="container_wrapper">
    <h1 class="section_title">{{ $t('page-titles.activity.marks') }} {{ pageTitle }} </h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-[24px] gap-y-[38px]">
          <MarkCard v-for="ads in itemsList" :key="ads.id" :mark="ads" @click="markClickHandler"/>
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
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";
import MarkCard from "~/components/Cards/MarkCard.vue";
import SideMenuNavigator from "~/components/Menu/SideMenuNavigator.vue";
import {getMarkByYearId} from "~/api/marks.service";
import {computed} from "vue";


const route = useRoute()
const router = useRouter()
const markYear = computed(() => route.params.mark_year)

const itemsList = ref([])
const pageTitle = ref('')
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(mark_year = markYear.value, page = 1) {
  if (mark_year) {
    try {
      const {data} = await getMarkByYearId(mark_year, 'markyear', page)
      console.log(data)
      if (data && data?.value) {
        const {postmarks, sub_title} = data.value
        pageTitle.value = sub_title
        itemsList.value = postmarks
      }
    } catch (e) {
      console.log(e)
    }
  }

}

// await getItems(route.path)
const {locale, t: $t} = useI18n()
useHead({
  title: $t('page-titles.activity.marks')
})


watch(() => locale.value, async () => {
  await getItems(route.params.mark_year)
}, {
  immediate: true
})

function paginationClickHandler(val) {
  setCurrentPage(val)
  getItems(route.params.mark_year, val)
  window.scrollTo(0, 0)
}

function markClickHandler(newsId) {
  router.push(`/activity/marks/${newsId}`)
}

</script>
