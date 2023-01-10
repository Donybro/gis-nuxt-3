<template>
  <div class="container_wrapper">
    <h1 class="section_title mb-[16px]">{{ $t("interactive-services.open-data") }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <Tab v-model:selectedItem="selectedTab" :tab-items="tabItems" class="mb-[12px]"/>
        <div :class="selectedTab === 'openData' ? 'col-span-12':'col-span-12 xl:col-span-6 gap-[12px]'">
          <div v-if="selectedTab==='openData'" class="flex flex-col gap-[18px]">
            <OpenDataCard v-for="data in openDataList" :key="data.structId"
                          :open-data="data"/>
          </div>

          <div v-if="selectedTab === 'customOpenData'" class="flex flex-col gap-[18px]">
            <CustomOpenDataCard v-for="data in customOpenDataList" :key="data.structId"
                                :open-data="data"/>
          </div>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import OpenDataCard from "../../components/InteractiveServices/OpenDataCard";
// import PaginationCrumbs from "../../components/PaginationCrumbs";
import {getCustomOpenData, getOpenData} from "../../api/getInfoServiceData";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";
import CustomOpenDataCard from "../../components/InteractiveServices/CustomOpenDataCard";

defineComponent({SideMenuNavigator, OpenDataCard, CustomOpenDataCard})

const route = useRoute()
const router = useRouter()
const selectedTab = ref('openData')
const tabItems = computed(() => {
  return [{
    title: $t("form.interactive-service.open-data"),
    id: 'openData'
  }, {
    title: $t("form.interactive-service.custom-open-data"),
    id: 'customOpenData',
  }]
})

// import usePaginationOptions from "../../composables/usePaginationOptions";

// import {getBusinessEntityBySlug} from "../../api/businessEntity";

const openDataList = ref([])
const customOpenDataList = ref([])

async function getOpenDataItems() {
  const {result} = await getOpenData()
  if (result && result.data) {
    openDataList.value = result.data
  }
}

async function getCustomOpenDataItems() {
  const resp = (await getCustomOpenData()).data
  if (resp && resp.value) {
    console.log(resp)
    customOpenDataList.value = resp.value
  }
}

await getOpenDataItems()
await getCustomOpenDataItems()

const {locale, t: $t} = useI18n()
useHead({
  title: $t('interactive-services.open-data')
})


watch(() => locale.value, async () => {
  await getOpenDataItems()
  await getCustomOpenDataItems()
})


</script>

<style scoped>

</style>
