<template>
  <div class="container mx-auto">
    <h1 class="section_title mb-[16px]">{{title}}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-9">
        <div class="flex flex-col">
          <ItemsList v-for="item in 5" :text="item"/>
        </div>
        <PaginationCrumbs class="mt-[25px]" v-if="allPagesCount > 1" @pagination-btn-clicked="paginationClickHandler" :allPagesCount="3" :currentPage="currentPage"/>
      </div>
      <div class="col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </div>
</template>

<script setup>
import ItemsList from "../components/ItemsList";
import SideMenuNavigator from "../components/Menu/SideMenuNavigator";
import PaginationCrumbs from "./PaginationCrumbs";
import usePaginationOptions from "../composables/usePaginationOptions";

const props = defineProps({
  title: {
    type: String
  },
  fetchItemHandler:{
    type:Function
  }
})


defineEmits(['item-click'])

const itemsList = ref([])

const {currentPage,setCurrentPage,allPagesCount} = usePaginationOptions()

async function getItems(params){
  try {
    itemsList.value = await props.fetchItemHandler(params)
  }catch (e) {
    console.log(e)
  }
}

function paginationClickHandler(val){
  setCurrentPage(val)
  getItems({page:val})
}

</script>

<style scoped>

</style>
