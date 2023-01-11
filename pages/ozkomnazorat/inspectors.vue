<template>
  <section class="container_wrapper">
    <h1 class="section_title">{{ $t('page-titles.ozcom.inspections') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-wrap gap-[24px]">
          <RegionInspectionWorkerCard v-for="worker in itemsList" :key="worker.id" :inspectionWorker="worker"
                                      @card-click="regionInspectionCardClickHandler"/>
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
import RegionInspectionWorkerCard from "../../components/Cards/RegionInspectionWorkerCard";
import {getOzkomEmployeeBySlug} from "../../api/getOzkomnazoratData";
import usePaginationOptions from "../../composables/usePaginationOptions";
import PaginationCrumbs from "../../components/PaginationCrumbs";

import {useHead} from "nuxt/app";
import {useWindowSizeStore} from "../../store/window";
import DepartmentWorkerCardForAlert from "~/components/Cards/DepartmentWorkerCardForAlert.vue";

const route = useRoute()
const inspectorsList = ref(null)
const modalRef = ref()
const departmentWorkerData = ref()
// const {data} = await getOzkomEmployeeBySlug({slug:route.path},'inspectors')
// inspectorsList.value = data.value

const swal = inject('$swal')
const windowSizeStore = useWindowSizeStore()

function regionInspectionCardClickHandler(worker) {
  departmentWorkerData.value = worker
  modalRef.value.openModal()
}


const itemsList = ref([])
const {currentPage, setCurrentPage, allPagesCount} = usePaginationOptions()

async function getItems(slug = route.path, page = 1) {
  try {
    const {data} = await getOzkomEmployeeBySlug({slug}, 'inspectors', page)
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
  title: $t('page-titles.ozcom.inspections')
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

<style scoped>

</style>
