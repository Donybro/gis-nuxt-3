<template>
  <div class="flex flex-col group gap-[8px] w-[300px] xl:w-[342px] cursor-pointer" @click="$emit('click',mark.id)">
    <div class="w-full h-[200px] relative overflow-hidden"
    >
      <div class="w-full h-full absolute z-[1] top-0 left-0 blur-[7px]"
           :style="{
             backgroundImage: `url(${mark.photo})`,
             backgroundSize:'cover',
             backgroundPosition:'center center'
          }"
      >
      </div>
      <img v-if="mark?.photo"
           :src="mark?.photo" alt="photo"
           class="relative z-[2] w-full h-full object-contain"
      >
      <Icon v-if="!mark?.photo" class="w-full h-full object-cover" icon="material-symbols:no-photography-rounded"/>
    </div>
    <div v-if="mark?.sub_menu" class="">
      <span class="inline py-[4px] px-[16px] text-white font-inter text-[1em] bg-secondary">{{ mark.sub_menu }}</span>
    </div>
    <p class="h-[84px] group-hover:text-[#3D8DFF] max-h-[84px] font-semibold font-montserrat text-white text-[1.25em] leading-[28px] line-clamp-3">
      {{ mark.title }}
    </p>

  </div>
</template>

<script setup>

import {Icon} from "@iconify/vue";

const emit = defineEmits(['click'])
const props = defineProps({
  mark: {
    type: Object,
    default: () => ({
      id: '',
      photo: '',
      sub_menu: 'Sohalar',
      title: '“Kiberxavfsizlikni taʼminlash va kiberjinoyatchilikka qarshi kurash dolzarb muammo” mavzusida davra suhbati',
    })
  }
})


function getActivePhotoSrc(images) {
  let activePhoto = images.find(img => img.active === true)
  return activePhoto
}

</script>

<style scoped>

</style>
