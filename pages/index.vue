<template>
  <div class="">
    <!--    <section class="h-full">-->
    <!--      <MainPageHeader/>-->
    <!--    </section>-->
    <section class="container  mx-auto mb-[170px] px-[12px] xl:px-0">
      <MainNewsView/>
    </section>
    <section class="container mx-auto mb-[100px] px-[12px] xl:px-0">
      <MainInteractiveServicesView/>
    </section>
    <section class="bg-secondary py-[40px] mb-[100px] px-[12px] xl:px-0">
      <div class="container mx-auto">
        <MainStatisticsView/>
      </div>
    </section>

    <section class="container mx-auto mb-[100px] px-[12px] xl:px-0">
      <MainRegionInspectionsView />
    </section>
    <section class="container mx-auto px-[12px] mb-[120px] xl:px-0">
      <MainSponsorsView />
    </section>
  </div>
</template>

<script setup>
import MainNewsView from "../components/News/MainNewsView";
import MainInteractiveServicesView from "../components/InteractiveServices/MainInteractiveServicesView";
import MainRegionInspectionsView from "../components/RegionInspections/MainRegionInspectionsView";
import MainSponsorsView from "../components/Sponsors/MainSponsorsView";
import MainStatisticsView from "../components/Statistics/MainStatisticsView";
import {useHead} from "nuxt/app";

const {t: $t} = useI18n()


useHead({
  title: $t('navbar.ozcom-full')
})
definePageMeta({
  layout: 'main'
})

</script>


<style></style>
