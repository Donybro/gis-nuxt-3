<template>
  <section>
    <div class="container_wrapper">
      <div class="flex gap-[12px]">
        <h3 class="text-[1.3em] text-[#ad2929]">{{ $t('other.test-page') }}</h3>
        <h3 class="text-[1.3em] text-[#ad2929]">{{ $t('other.no-actual-data') }}</h3>
      </div>
      <h1 class="section_title mb-[16px]">{{ $t('page-titles.interactive-service.check-site') }}</h1>
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-12">
          <CheckSiteForm :clearForm="clearForm" :conclusionDate="siteConclusionDate"
                         :conclusionNumber="siteConclusionNumber" :exist="siteIsExist" @submit="submitHandler"/>
        </div>
        <div class="col-span-12">
          <div class="flex flex-col gap-[56px] text-justify break-words whitespace-pre-line">
            <div class="flex items-start gap-[8px] text-text_secondary">
              <div>{{ $t('check-site.examples') }}</div>
              :
              <div class="flex flex-col">
                <p>{{ $t('check-site.domain') }}</p>
                <p>{{ $t('check-site.url') }}</p>
              </div>
            </div>
            <div class="flex flex-col gap-[12px]">
              <p class="text-white font-montserrat font-semibold text-[1.375em]">
                {{ $t('check-site.rester') }}
              </p>
              <p class="text-text_secondary font-roboto">
                {{ $t('check-site.reester-text') }}
              </p>
            </div>
            <div class="flex flex-col gap-[12px]">
              <p class="text-white font-montserrat font-semibold text-[1.375em]">
                {{ $t('check-site.for-authors') }}
              </p>
              <p class="text-text_secondary font-roboto">
                {{ $t('check-site.for-authors-text') }}
              </p>
            </div>
            <div class="">
              <p class="text-white font-montserrat font-semibold text-[1.375em]">
                {{ $t('check-site.justice') }}
              </p>
              <p class="text-text_secondary font-roboto">
                {{ $t('check-site.justice-address') }}
              </p>
              <div class="text-text_secondary font-roboto">
                {{ $t('card.phone') }} : (0371) 207-04-43
              </div>
              <div class="text-text_secondary font-roboto">
                {{ $t('card.email') }} : info@adliya.uz
              </div>
            </div>
            <div class="">
              <p class="text-white font-montserrat font-semibold text-[1.375em]">
                {{ $t('check-site.ozcom') }}
              </p>
              <p class="text-text_secondary font-roboto">
                {{ $t('check-site.ozcom-address') }}
              </p>
              <div class="text-text_secondary font-roboto">
                {{ $t('card.phone') }} : (71) 202-69-65 , (71) 202-69-61
              </div>
              <div class="text-text_secondary font-roboto">
                {{ $t('check-site.help-phone-text') }} : (71) 202-20-19
              </div>
              <div class="text-text_secondary font-roboto">
                {{ $t('card.email') }} : info@gis.uz , gis@exat.uz
              </div>
            </div>
          </div>
        </div>
        <!--        <div class="xl:col-span-3">-->
        <!--          <SideMenuNavigator/>-->
        <!--        </div>-->
      </div>
    </div>
  </section>
</template>

<script setup>
import InterActiveServiceInnerPageHero from "../../components/InteractiveServices/InterActiveServiceInnerPageHero";
import CheckSiteForm from "../../components/InteractiveServices/CheckSiteForm";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {checkSite} from "../../api/search";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

defineComponent({SideMenuNavigator, CheckSiteForm, InterActiveServiceInnerPageHero})

const siteIsExist = ref(undefined)
const siteConclusionNumber = ref(undefined)
const siteConclusionDate = ref(undefined)

const clearForm = ref(false)
const {t: $t} = useI18n()
useHead({
  title: $t('page-titles.interactive-service.check-site')
})


async function submitHandler(siteUrl) {
  clearForm.value = false
  const {data} = await checkSite(siteUrl)
  if (data && data.value) {
    const {exist, conclusionNumber, conclusionDate} = data.value.data
    siteConclusionNumber.value = conclusionNumber
    siteConclusionDate.value = conclusionDate
    if (exist) {
      siteIsExist.value = true
    } else siteIsExist.value = false
    clearForm.value = true
  }

}


</script>

<style scoped>
ul {
  color: #ad2929
}
</style>
