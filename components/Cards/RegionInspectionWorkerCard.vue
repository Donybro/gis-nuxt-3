<template>
  <HoverGradientBox>
    <div class="p-[12px] md:p-[24px] border border-border_primary bg-secondary flex flex-col items-center xl:flex-row xl:items-start xl:flex-row gap-[24px] w-full"
         @click.stop.prevent="$emit('card-click',inspectionWorker)"
    >
      <div class="w-[150px] sm:w-[236px] h-[125px] sm:h-[250px]">
        <img :src="inspectionWorker.photo" class="w-full h-full object-cover object-top" alt="">
      </div>
      <div class="flex flex-col justify-between w-full">
        <div class="">
          <h3 class="text-[#3D8DFF] text-center xl:text-left font-montserrat font-medium text-[1em] lg:text-[1.12em] mb-[8px]">
            {{ inspectionWorker.position }}</h3>
          <!--      <h1 class="font-bold font-roboto text-[1.15em] xl:text-[1.5em] text-white">{{}}</h1>-->
          <h2 class="font-semibold text-center xl:text-left font-inter  text-[1.1em] lg:text-[1.25em] h-[90px] max-h-[90px] text-text_secondary">
            {{ `${inspectionWorker.last_name} ${inspectionWorker.first_name} ${inspectionWorker.father_name}` }}</h2>
        </div>

        <h3 class="text-white text-center xl:text-left font-montserrat font-medium text-[1em] lg:text-[1.12em] pb-[8px]">
          {{ inspectionWorker.address }}</h3>
        <div class="flex justify-center xl:justify-start border-t border-text_secondary">
          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 pt-[16px] border-t border-text_secondary w-full">
            <div class="col-span-1 flex items-center gap-[8px]">
              <div class="">
                <Icon class="text-white" height="34px" icon="carbon:phone-filled" width="34px"/>
              </div>
              <div class="flex flex-col font-roboto">
                <p class="font-medium text-[0.8125em] text-text_secondary mb-[4px]">{{ $t('card.phone') }}</p>
                <p class="text-[1em] text-white">{{ inspectionWorker.phone }}</p>
              </div>
            </div>
            <div class="col-span-1 flex items-center gap-[8px]">
              <div class="">
                <Icon class="text-white" height="34px" icon="cib:mail-ru" width="34px"/>
              </div>
              <div class="flex flex-col font-roboto">
                <p class="font-medium text-[0.8125em] text-text_secondary mb-[4px]">{{ $t('card.email') }}</p>
                <p class="text-[1em] text-white">{{ inspectionWorker.mail }}</p>
              </div>
            </div>
            <div v-if="inspectionWorker.working_time"
                 class="col-span-1 sm:col-span-2 flex items-center gap-[8px] overflow-hidden">
              <div class="">
                <Icon class="text-white" height="34px" icon="fa-solid:calendar-alt" width="34px"/>
              </div>
              <div class="flex flex-col font-roboto">
                <p class="font-medium text-[0.8125em] text-text_secondary mb-[4px]">{{ $t('card.receive-time') }}</p>
                <div class="text-[1em] text-white line-clamp-1 break-words"
                     v-html="inspectionWorker.working_time"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </HoverGradientBox>
</template>

<script>
import {Icon} from "@iconify/vue";
import HoverGradientBox from "./HoverGradientBox";

export default {
  name: "RegionInspectionWorkerCard",
  components: {HoverGradientBox, Icon},
  emits: ['card-click'],
  props: {
    inspectionWorker: {
      type: Object,
      default: () => ({
        photo: '',
        position: 'Qoraqalpog‘iston Respublikasi hududiy inspeksiyasi boshlig‘i',
        name: 'Xalqaro aloqalar guruhi boshlig\'i',
        father_name: 'Abdullayev',
        first_name: 'A’zam',
        last_name: 'Abdushukurovich',
        address: 'Abdushukurovich',
        phone: '+998 (71) 202 69 80',
        mail: 'info@gis.uz',
        working_time: 'Qabul kunlari: Seshanba kuni soat 10:00 dan 12:00 gacha, juma kuni soat 15:00 dan 17:00 gacha'

      })
    },
  },
}
</script>

<style scoped>

</style>
