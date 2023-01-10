<template>
  <div class="">
    <h1 class="section_title">{{$t('main-page.region-inspections')}}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 md:col-span-7">
        <ClientOnly>
          <MapOfUzbekistan  @region-selected="getRegionInspector"/>
        </ClientOnly>
      </div>
      <div class="col-span-12 md:col-span-5">
        <RegionInspectorCard :key="$i18n.locale" :inspection-info="selectedRegionInspector"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import MapOfUzbekistan from "../MapOfUzbekistan";
import RegionInspectorCard from "./RegionInspectionCard";
import {getRegionInspectorById} from "../../api/getRegionsList";


const selectedRegionInspector = ref(null)
const defaultSelectedRegionInspectorID = 10
await getRegionInspector({id:defaultSelectedRegionInspectorID})
async function getRegionInspector({id}){
  const {data} = await getRegionInspectorById(id)
  if(data && data.value){
    selectedRegionInspector.value =  data.value[0]
  }
}


const { locale} = useI18n()

watch( () => locale.value, async()=>{
  await getRegionInspector({id:defaultSelectedRegionInspectorID})
})
</script>

<style scoped>

</style>
