<template>
  <div class="h-full">
    <div class="flex flex-col">
      <div class="h-full">
        <label class="h-full" :for="props.id">
          <slot name="icon" />
        </label>
        <input
          :id="props.id"
          class="hidden"
          type="file"
          :multiple="true"
          :accept="availableExtensions"
          @input="setInputData"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import {Icon} from '@iconify/vue';
import {defineComponent, defineProps, defineEmits, ref, watch, toRefs, onMounted, computed} from "vue";
import InputFileThumbWrapper from "./InputFileThumbWrapper";
defineComponent({Icon,InputFileThumbWrapper})

const emit = defineEmits(['file-upload','update:files','delete-initial-file'])

const initialFilesFromServer = ref([])
const props =  defineProps({
  extensions:{
    type:Array
  },
  initialFiles:{
    type:Array,
    required:false,
    default:function(){
      return []
    }
  },
  id:{
    required:true,
    type:String
  },
  files:{
    required:true,
    validator: function (files) {
      return ['object'].indexOf( typeof files ) !== -1
    }
  },
  multipleFiles: {
    type:Boolean,
    default:false,
    required:false
  }
})
const { files ,multipleFiles,initialFiles,extensions } = toRefs(props)

watch(()=>initialFiles.value,(initialFilesFromProps)=>{
  if(initialFilesFromProps.length){
    initialFilesFromServer.value = initialFilesFromProps
  }
})

function inputFilter(newFile,oldFile) {
  newFile.file = newFile
  newFile.id = '_' + Math.random().toString(36).substr(2, 9)
  if (newFile && !oldFile) {
    if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
      return
    }
    if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
      return
    }
    if (newFile && newFile.file) {
      let URL = (window.URL || window.webkitURL)
      if (URL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
      newFile.thumb = ''
      if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
        newFile.thumb = newFile.blob
      }
    }

  }
  return newFile
}

function setInputData({target}){
  let fileInstance;
  if( multipleFiles.value ){
    if( files.value && files.value.length){
      fileInstance  = [...files.value ,...target.files]
    }else {
      fileInstance = [...target.files]
    }
  }else{
    fileInstance = target.files[0]
  }
  // console.log(fileInstance)
  emit('update:files',fileInstance)
}

const normalizedFiles = computed(()=>{
  if (files.value && files.value.length){
    return files.value.map(f=>inputFilter(f))
  }else if( files.value && files.value.name){
    return  [ inputFilter(files.value) ]
  }
  return []
})

  function deleteSelectedFile(thumb){
    if (files.value && files.value.length){
      emit('update:files',files.value.filter((f)=>f.thumb !== thumb ))
    }else if( files.value && files.value.name){
      emit('update:files',null)
    }
  }

function deleteSelectedServerFile(id){
  initialFilesFromServer.value = initialFilesFromServer.value.filter((f)=>f.id !== id )
  emit('delete-initial-file',id)
}

const availableExtensions= computed(()=>{
  let result = []
  extensions.value.map(ext=>{
    result.push(supportedExtensions[ext])
  })
  return result.join(',')
})

const supportedExtensions = {
  pdf:'application/pdf',
  word:'.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  excel:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
  png:'image/png',
  jpeg:'image/jpeg',
  gif:'image/gif',
  webp:'image/webp',
  csv:'.csv'
}

</script>
