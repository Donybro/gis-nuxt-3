<template>
  <section class="container_wrapper">
    <h1 class="section_title">{{ $t('page-titles.ozcom.departments') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-wrap gap-[24px]">
          <DepartmentCard v-for="dep in itemsList" :key="dep.id" :department="dep" @click="departmentCardClickHandler"/>
        </div>
        <PaginationCrumbs v-if="allPagesCount > 1" :allPagesCount="allPagesCount" :currentPage="currentPage"
                          class="mt-[25px]" @pagination-btn-clicked="paginationClickHandler"/>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
    <ModalComponent ref="modalRef">
      <template #slotBody>
        <DepartmentWorkerCardForAlert :department-worker="departmentWorkerData"/>
      </template>
    </ModalComponent>
  </section>
</template>

<script setup>
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import DepartmentCard from "../../components/Cards/DepartmentCard";
import {getOzkomEmployeeBySlug} from "~/api/getOzkomnazoratData";
import PaginationCrumbs from "../../components/PaginationCrumbs";
import usePaginationOptions from "../../composables/usePaginationOptions";
import {useWindowSizeStore} from "~/store/window";
import DepartmentWorkerCardForAlert from "~/components/Cards/DepartmentWorkerCardForAlert.vue";
const modalRef = ref()
const departmentWorkerData = ref()

const route = useRoute()
const windowSizeStore = useWindowSizeStore()

function departmentCardClickHandler(departmentWorker) {
  departmentWorkerData.value = departmentWorker
  modalRef.value.openModal()
}

const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getOzkomEmployeeBySlug({slug}, 'departments', page)
    if (data && data?.value) {
      // console.log(data.value,'Abdumannon')
      const {num_pages, results, current_page} = data.value
      allPagesCount.value = num_pages
      itemsList.value = results
      currentPage.value = current_page
    }
  } catch (e) {
    console.log(e)
  }
}

(async () => {
  await getItems(route.path)
})()

const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.ozcom.departments')
})

watch(() => locale.value, async () => {
  await getItems(route.path)
})

function paginationClickHandler(val) {
  setCurrentPage(val)
  getItems(route.path, val)
  window.scrollTo(0, 0)
}
</script>

<style>

</style>
