<template>
  <div class="p-[35px] w-full relative" :class=" {'bg-[#164e21] text-green-500':props.alertType === 'success', 'text-red-500 bg-[#6f1a1a]':props.alertType === 'error','text-text_secondary bg-secondary':props.alertType === 'done'} ">
    <button @click.prevent="$emit('close')" class="absolute right-[10px] top-[10px]">
      <Icon icon="carbon:close-outline" class="text-text_secondary" width="30px" height="30px" />
    </button>
    <p>{{alertData?.title}}</p>
    <p class="">{{alertData?.titleText}}</p>
    <slot></slot>
  </div>
</template>

<script setup>
import {Icon} from "@iconify/vue";
defineEmits(['close'])
const props = defineProps({
  alertType:{
    type:String,
    default:"success"
  },
  alertData:{
    type:Object,
    required:false
  },
})

</script>

<style scoped>
.acde{
  color: #6f1a1a;
}
</style>
