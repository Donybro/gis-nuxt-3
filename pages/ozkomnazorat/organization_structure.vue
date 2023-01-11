<template>
  <section class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <h1 class="font-montserrat font-semibold text-[1.35em] xl:text-[2em] xl:leading-[44px] text-white mb-[40px]">
          {{ $t('page-titles.ozcom.structure') }}</h1>
        <nuxt-img v-if="structure[0]?.photo"  class="w-full" alt="photo"  format="webp" :src="structure[0]?.photo.replace('http://', 'https://')" />
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getOzkomStructureBySlug} from "../../api/getOzkomnazoratData";
import SideMenuNavigator from '../../components/Menu/SideMenuNavigator'

import {useHead} from "nuxt/app";

const route = useRoute()
const structure = ref(null)
const {data} = await getOzkomStructureBySlug({slug: route.path}, 'organization_structure')
if (data && data?.value) {
  structure.value = data.value
}


const {locale, t: $t} = useI18n()

useHead({
  title: $t('navbar.ozcom-full')
})

watch(() => locale.value, async () => {
  const {data} = await getOzkomStructureBySlug({slug: route.path}, 'organization_structure')
  if (data && data?.value) {
    structure.value = data.value
  }
})
</script>

<style scoped>

</style>
