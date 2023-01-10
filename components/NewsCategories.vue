<template>
      <div class="border border-border_primary bg-secondary py-[12px] w-full flex flex-col">
        <h4 @click="toggle" class="flex justify-between font-montserrat font-semibold  px-[16px] text-[1.12em] text-white cursor-pointer">
          {{ $t('other.branches') }}
          <Icon  v-if="isOpen" icon="material-symbols:keyboard-arrow-up" />
          <Icon  v-else icon="material-symbols:keyboard-arrow-down" />
        </h4>
        <div v-if="isOpen" class="pt-[24px]">
          <HoverGradientBox>
            <div class="text-text_secondary hover:bg-primary_hovered text-[1em] font-medium font-inter py-[10px] px-[16px] cursor-pointer"
                 @click="$emit('update:category_id','')"
                 :class="category_id === '' ? 'bg-primary' : 'bg-secondary'"
            >
              {{ $t('other.all-branches') }}
            </div>
          </HoverGradientBox>
          <div v-for="cat in categoriesList" :key="cat.title">
          <HoverGradientBox>
          <div class="text-text_secondary hover:bg-primary_hovered text-[1em] font-medium font-inter py-[10px] px-[16px] cursor-pointer"
              @click="$emit('update:category_id',cat.id)"
              :class="category_id === cat.id ? 'bg-primary' : 'bg-secondary'"
          >
            {{cat.title}}
          </div>
          </HoverGradientBox>
          </div>
        </div>
      </div>
</template>

<script setup>
import HoverGradientBox from "./Cards/HoverGradientBox";
import {Icon} from "@iconify/vue";
const props = defineProps({
  categoriesList:{
    type:Array,
    default:()=>([])
  },
  category_id:{
    type:String
  }
})
const isOpen = ref(false)

const toggle = ()=>{
  isOpen.value = !isOpen.value
}

defineEmits(['update:category_id'])

</script>

<style scoped>

</style>
