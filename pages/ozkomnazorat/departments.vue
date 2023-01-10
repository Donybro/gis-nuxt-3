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
  </section>
</template>

<script setup>
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import DepartmentCard from "../../components/Cards/DepartmentCard";
import {getOzkomEmployeeBySlug} from "../../api/getOzkomnazoratData";
import PaginationCrumbs from "../../components/PaginationCrumbs";
import usePaginationOptions from "../../composables/usePaginationOptions";

import {useWindowSizeStore} from "../../store/window";

const route = useRoute()
// const modalComponentRef = ref()
const swal = inject('$swal')
const windowSizeStore = useWindowSizeStore()

function departmentCardClickHandler(departmentWorker) {
  swal.fire({
    html: `<div class="p-[12px] md:p-[24px] border border-border_primary bg-secondary items-center flex flex-col gap-[12px] md:gap-[24px] w-full">
    <div class="w-[200px] h-[222px] md:w-[366px] md:h-[388px]">
      <img  src="${departmentWorker.photo}" class="w-full h-full object-cover object-top" alt="">
    </div>
    <div class="flex flex-col gap-[12px]">
      <h2 class="font-semibold font-inter text-[.9em] md:text-[1.25em] text-center text-text_secondary">${departmentWorker.last_name} ${departmentWorker.first_name} ${departmentWorker.father_name}</h2>
      <h3 class="text-[#3D8DFF] font-montserrat font-medium text-[.8em] md:text-[1.12em] md:mb-[8px] text-center">${departmentWorker.position}</h3>
      <div class="desc-html font-inter text-left !text-text_secondary text-[.7em] text-[1em] max-h-[350px] overflow-y-auto px-[12px]">
        ${departmentWorker.description || ''}
      </div>
    </div>
  </div>`,
    background: 'transparent',
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    width: windowSizeStore.isWindowSmallerThanMD ? '100%' : '70%',
    focusConfirm: false,
  })
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
