<template>
  <ClientOnly>
    <button @click.prevent="modalComponentRef.openModal()">
      <Icon icon="akar-icons:search" width="25px" class="text-white" />
    </button>
     <ModalComponent :closeOnClickAway="false" class="w-[90%] xl:w-[70%] p-[24px] text-white bg-primary border border-border_primary" modal-position="center" ref="modalComponentRef" @close="clearData">
      <template #slotBody >
        <div class="flex flex-col gap-[24px]">
          <h1 class="text-[1.35em] xl:text-[2em] text-center">{{$t('button.search')}}</h1>
          <div class="grid grid-cols-12 gap-[12px] xl:gap-[0px]">
            <input v-model="srchInput" type="text" class="col-span-12 xl:col-span-10 base_input w-full">
            <button :disabled="!srchInput" @click="searchHandler" :class="{'opacity-50' :!srchInput}" class="col-span-12 xl:col-span-2 base_input hover:text-primary hover:bg-white text-white bg-secondary border border-white">{{$t('button.search')}}</button>
          </div>
          <div v-if="resultData.length" class="my-[24px] flex flex-col gap-[8px] max-h-[300px] overflow-y-auto">
            <nuxt-link @click="modalComponentRef.closeModal()" :to="goToLink(data)" class="rounded-[8px] font-montserrat border border-border_primary p-[12px]" v-for="data in resultData" :key="data.id">
              <div v-html="data?.title" class="font-bold "></div>
              <div v-html="data?.description" class="text-text_secondary"></div>
            </nuxt-link>
          </div>
          <p v-if="noData">{{$t('other.no-data')}}</p>
        </div>
    </template>
  </ModalComponent>
  </ClientOnly>
</template>

<script setup>
import ModalComponent from "./ModalComponent";
import {Icon} from "@iconify/vue";

import useSearch from "../composables/useSearch";
const resultData = ref([])
const router = useRouter()
const {t:$t} = useI18n()
const noData = ref(false)

const srchInput = ref('')

const modalComponentRef = ref()
const {getSearch} = useSearch()

async function searchHandler(){
  try {
    resultData.value = []
    const data = await getSearch(srchInput.value)
    if(data && data.length){
      resultData.value = data
      console.log(data)
    }else {
      noData.value = true
    }
  }catch (e) {
    console.log(e)
  }
}

function clearData() {
  srchInput.value = ''
  noData.value = false
  resultData.value = []
}

function goToLink({model,id,sub_menu}){
  let resLink=''
  if(sub_menu.type === 1){
    resLink =  (sub_menu.slug)
  }
  if(sub_menu.type === 0){
    if(model === 'Vacancy'){
      resLink =  (`/ozkomnazorat/vacancy/${id}`)
    }
    if(model === 'InformationService'){
      resLink =  (`/info_service/${id}`)
    }
    if(model === 'AdditionalInfo'){
      resLink =  (`/info_service/seminar_data/${id}`)
    }
    if(model === 'ActivityPost'){
      resLink =  (`/activity/${id}`)
    }if(model === 'Event'){
      resLink =  (`/events/${id}`)
    }if(model === 'Document' || model === 'StateStandard'){
      resLink =  (`/documents/${id}`)
    }if(model === 'BusinessEntity'){
      resLink =  (`/interactive_service/${id}`)
    }
  }
  return resLink
}

</script>

<style scoped>
mark{
  background: #f6d128;
  padding: 2px;
}
</style>
