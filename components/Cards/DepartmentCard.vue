<template>
  <div class="w-full cursor-pointer">
    <HoverGradientBox>
      <div
          class="p-[24px] border border-border_primary bg-secondary flex flex-col items-center xl:flex-row xl:items-start xl:flex-row  gap-[24px] w-full">
        <div class="w-[118px] sm:w-[236px] h-[125px] sm:h-[250px]">
          <img :src="department.photo" class="w-full h-full object-cover object-top" alt="">
        </div>
        <div class="flex flex-col justify-between w-full">
          <div class="">
            <h3 class="text-white text-center xl:text-left font-montserrat font-medium text-[1.12em] mb-[8px]">
              {{ department.position }}</h3>
            <!--      <h1 class="font-bold font-roboto text-[1.15em] xl:text-[1.5em] xl:text-[1.15em] xl:text-[1.5em] text-white">{{}}</h1>-->
            <h2 class="font-semibold text-center xl:text-left font-inter text-[1.25em] h-[90px] max-h-[90px] text-text_secondary">
              {{ `${department.last_name} ${department.first_name} ${department.father_name}` }}</h2>
          </div>
          <div class="text-center xl:text-left mb-[12px]">
            <button
                class="px-[21px] py-[10px] hover:text-primary hover:bg-white text-white bg-secondary border border-white"
                @click.prevent="$emit('click',department)">
              {{ $t('card.main-tasks') }}
            </button>
          </div>
          <!--      <h3 class="text-[#3D8DFF] font-montserrat font-medium text-[1.12em] pb-[8px] border-b border-text_secondary" v-html="department.working_time"></h3>-->
          <div class="flex justify-center xl:justify-start border-t border-text_secondary">
            <div class="grid grid-cols-1 sm:grid-cols-2  gap-[24px] pt-[16px]">
              <div class=" col-span-1 flex items-center gap-[8px]">
                <div class="">
                  <Icon width="34px" height="34px" class="text-white" icon="carbon:phone-filled"/>
                </div>
                <div class="flex flex-col font-roboto">
                  <p class="font-medium text-[0.81em] text-text_secondary mb-[4px]">{{ $t('card.phone') }}</p>
                  <p class="text-[1em] text-white">{{ department.phone }}</p>
                </div>
              </div>
              <div class=" col-span-1 flex items-center gap-[8px]">
                <div class="">
                  <Icon width="34px" height="34px" class="text-white" icon="cib:mail-ru"/>
                </div>
                <div class="flex flex-col font-roboto">
                  <p class="font-medium text-[0.8125em] text-text_secondary mb-[4px]">{{ $t('card.email') }}</p>
                  <p class="text-[1em] text-white">{{ department.mail }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HoverGradientBox>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue";
import HoverGradientBox from "./HoverGradientBox";

export default {
  name: "DepartmentCard",
  components: {HoverGradientBox, Icon},
  props: {
    department: {
      type: Object,
      default: () => ({
        photo: "",
        thumbnail: "",
        position: "Xalqaro aloqalar guruhi boshlig'i",
        last_name: "Abdullayev",
        first_name: "A’zam",
        father_name: "Abdushukurovich",
        phone: "+998 (71) 202 69 80",
        mail: "info@gis.uz",
      }),
    },
  },
  emits: ["click"],
};
</script>

<style scoped></style>
