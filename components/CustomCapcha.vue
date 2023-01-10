<template>
  <div class="h-full bg-primary text-[1.12em]" >
    <div class="flex h-full">
      <input type="text" class="base_input h-full w-[70%]" :class="{'ring ring-red-400 focus:ring-red-400':error && inputId}" maxlength="5" v-model="inputId">
      <span class="w-[1px] bg-text_secondary"></span>
      <input class="base_input h-full bg-gray-200 text-center w-[100px] select-none" disabled type="text" v-model="correctId">
      <div class="flex items-center">
        <button v-if="!inputIdIsCorrect" @click.prevent="generateId">
          <Icon icon="bx:refresh" class="text-text_secondary w-[40px]" width="40px" />
        </button>
        <Icon v-if="inputIdIsCorrect && showIcon"  icon="icon-park:success" class="w-[40px]" width="40px" />
        <Icon v-if="!inputIdIsCorrect && inputId.length >=4 && showIcon" icon="material-symbols:error-rounded" class="text-red-600 w-[40px]" width="40px" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {Icon} from "@iconify/vue";
import {toRefs} from "vue";
const correctId = ref('')
const inputId = ref('')
const emit = defineEmits(['change'])

const props = defineProps({
  modelValue:{
    type:Boolean,
    default:false
  },
  error:{
    type:Boolean,
    required:false
  },
  showIcon:{
    type:Boolean,
    required: false,
    default: true
  },
  clearForm:{
    type:Boolean,
    required:false
  }
})

const { clearForm} = toRefs(props)
generateId()
// const inputIdIsCorrect = ref(false)

let inputIdIsCorrect = computed(()=>{
  emitModelValue()
  return inputId.value === correctId.value
})

// watch(()=>inputId.value,(inputId)=>{
//   if(inputId.length>4){
//     emit('update:modelValue',inputId.value === correctId.value)
//     inputIdIsCorrect.value = inputId.value === correctId.value
//   }
// })

function emitModelValue(){
  emit('change',inputId.value === correctId.value)
}

function makeId() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function generateId(){
  correctId.value = makeId()
}

watch(()=>clearForm.value,(val)=>{
  if(val){
    generateId()
    inputId.value = ''
  }
})
</script>

<style scoped>

</style>
