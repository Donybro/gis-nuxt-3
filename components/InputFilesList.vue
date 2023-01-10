<template>
  <div v-if="normalizedFiles.length" class="flex flex-wrap gap-4 mt-4">
    <div v-for="f in normalizedFiles" :key="f.id">
      <InputFileThumbWrapper :file-type="f.file.type" :file-source="f.thumb" :file-name="f.file.name" @delete-file="deleteSelectedFile" />
    </div>
  </div>
</template>

<script setup>


const emit = defineEmits(['update:files'])

function deleteSelectedFile(thumb){
  if (files.value && files.value.length){
    emit('update:files',files.value.filter((f)=>f.thumb !== thumb ))
  }else if( files.value && files.value.name){
    emit('update:files',null)
  }
}

const props =  defineProps({
  files:{
    required:true,
    validator: function (files) {
      return ['object'].indexOf( typeof files ) !== -1
    }
  }
})
const { files ,multipleFiles,initialFiles } = toRefs(props)

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

const normalizedFiles = computed(()=>{
  if (files.value && files.value.length){
    return files.value.map(f=>inputFilter(f))
  }else if( files.value && files.value.name){
    return  [ inputFilter(files.value) ]
  }
  return []
})

</script>

<style scoped>

</style>