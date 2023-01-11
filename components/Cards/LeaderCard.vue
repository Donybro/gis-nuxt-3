<template>
  <HoverGradientBox>
    <div class="p-[24px] bg-secondary hover:bg-primary_hovered border border-border_primary flex flex-col items-center xl:flex-row xl:items-start xl:flex-row gap-[24px] w-full">
      <div class="w-[118px] sm:w-[236px] h-[125px] sm:h-[250px]">
          <nuxt-img width="350" class="w-full h-full object-cover"  alt="leader"  format="webp" :src="leader.photo.replace('http://', 'https://')" />
      </div>
      <div class="flex flex-col justify-between w-full">
        <div class="">
          <h3 class="text-white text-center xl:text-left font-montserrat font-medium text-[1.12em] mb-[8px]">
            {{ leader.position }}</h3>
          <!--      <h1 class="font-bold font-roboto text-[1.15em] xl:text-[1.5em] text-white">{{}}</h1>-->
          <h2 class="font-semibold text-center xl:text-left font-inter text-[1.25em] h-[90px] max-h-[90px] text-text_secondary">
            {{ `${leader.last_name} ${leader.first_name} ${leader.father_name}` }}</h2>
        </div>
        <!--      <h3 class="text-[#3D8DFF] font-montserrat font-medium text-[1.12em] pb-[8px] border-b border-text_secondary" v-html="leader.working_time"></h3>-->
        <div class="flex justify-center xl:justify-start border-t border-text_secondary">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-[12px] xl:gap-[24px]  xl:grid-cols-4 pt-[16px] ">
            <div class="col-span-1 flex items-center gap-[8px]">
              <div class="">
                <Icon class="text-white" height="34px" icon="carbon:phone-filled" width="34px"/>
              </div>
              <div class="flex flex-col font-roboto">
                <p class="font-medium text-[0.8125em] text-text_secondary mb-[4px]">{{ $t('card.phone') }}</p>
                <p class="text-[1em] text-white">{{ leader.phone }}</p>
              </div>
            </div>
            <div class="col-span-1  flex items-center gap-[8px]">
              <div class="">
                <Icon class="text-white" height="34px" icon="cib:mail-ru" width="34px"/>
              </div>
              <div class="flex flex-col font-roboto">
                <p class="font-medium text-[0.8125em] text-text_secondary mb-[4px]">{{ $t('card.email') }}</p>
                <p class="text-[1em] text-white">{{ leader.mail }}</p>
              </div>
            </div>
            <div v-if="leader.working_time"
                 class="col-span-1 xl:col-span-2 flex items-center gap-[8px] overflow-hidden">
              <div class="">
                <Icon class="text-white" height="34px" icon="fa-solid:calendar-alt" width="34px"/>
              </div>
              <div class="flex flex-col font-roboto">
                <p class="font-medium text-[0.8125em] text-text_secondary mb-[4px]">{{ $t('card.receive-time') }}</p>
                <div class="text-[1em] text-white line-clamp-1 break-words" v-html="leader.working_time"></div>
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
  name: "LeaderCard",
  components: {HoverGradientBox, Icon},
  props: {
    leader: {
      type: Object,
      default: () => ({
        photo: '23e',
        father_name: 'Abdullayev',
        first_name: 'A’zam',
        last_name: 'Abdushukurovich',
        position: 'Boshliq vazifasini bajaruvchi',
        working_time: 'dasda',
        phone: '+998 (71) 202 69 80',
        mail: 'info@gis.uz'
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
