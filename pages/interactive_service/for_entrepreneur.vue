<template>
  <div class="container_wrapper">
    <h1 class="section_title mb-[16px]">{{ $t("page-titles.interactive-service.for-entrepreneur") }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-col">
          <ItemsList v-for="item in itemsList">
            <div @click="goToItem(item)">{{ item.title }}</div>
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
import usePaginationOptions from "../../composables/usePaginationOptions";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {getBusinessEntityBySlug} from "../../api/businessEntity";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const route = useRoute()
const router = useRouter()

const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getBusinessEntityBySlug(slug, 'business', page)
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

watch(() => locale.value, async () => {
  await getItems(route.path)
})

useHead({
  title: $t('page-titles.interactive-service.for-entrepreneur')
})


function paginationClickHandler(val) {
  setCurrentPage(val)
  console.log(val)
  getItems(route.path, val)
  window.scrollTo(0, 0)
}

function goToItem(item) {
  if (item.children.length) {
    router.push(`/interactive_service/${item.children[0]}`)
  } else if (item.link) {
    window.open(item.link, '_blank').focus();
  } else {
    router.push(`/interactive_service/${item.id}`)
  }
}


</script>

<style scoped>

</style>
