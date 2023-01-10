<template>
  <div class="relative">
    <a v-if="props.isForDownload" target="_blank" class="absolute top-0 left-0 h-full z-10 w-full" :href="props.downloadPath"></a>
    <div class="absolute top-1 right-1 z-20">
      <Icon icon="mdi:close-box" class="text-red-600 cursor-pointer" width="32" @click="$emit('delete-file',props.fileSource)" />
    </div>
    <img v-if="fileType === 'image/jpeg' || fileType==='image/png' || fileType==='image/webp' || fileType==='image/gif' " :src="fileSource" class="w-40 h-full object-cover" alt="">
    <Icon v-else-if="fileType === 'application/pdf'" class="w-40 bg-gray-100" height="100%" icon="mdi:file-pdf-box" />
    <Icon v-else-if="fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'" class="w-40 bg-gray-100" height="100%" icon="mdi:file-word" />
    <Icon v-else-if="fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" class="w-40 bg-gray-100" height="100%" icon="mdi:file-excel" />
    <Icon v-else class="w-40 bg-gray-100" height="100%" icon="mdi:file" />
<!--    <p class="w-40 truncate text-text_secondary ">-->
<!--      {{ fileName }}-->
<!--    </p>-->
  </div>
</template>

<script setup>
import {defineComponent,defineProps,defineEmits} from "vue";
import {Icon} from '@iconify/vue';
defineComponent({Icon})
const props = defineProps({
  fileType:{
    type:String
  },
  fileSource:{
    type:String
  },
  fileName:{
    type:String
  },
  isForDownload:{
    type:Boolean,
    default:false
  },
  downloadPath:{
    type:String,
    default:''
  }
})
defineEmits(['delete-file'])
</script>

<style scoped>

</style>
