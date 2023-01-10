<template>
  <Datepicker menuClassName="yearPicker_menu"  inputClassName="yearPicker_input" :locale="locale" :autoApply="true" v-model="date" :flow="['year']"  format="yyyy" yearPicker />
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const emit = defineEmits(['update:dateValue'])

defineProps({
  dateValue:Number
})

const date = ref( null)

watch(()=>date.value,(val)=>{
  emit('update:dateValue',val)
})
</script>

<style>
.yearPicker_input{
  @apply text-text_secondary placeholder:text-[1.25em] !py-[14px]  bg-secondary
}
.yearPicker_menu{
  @apply text-text_secondary  bg-secondary
}
.dp__overlay{
  @apply  bg-secondary text-text_secondary
}
.dp__button{
  @apply bg-secondary text-text_secondary hover:text-primary
}
.dp__menu{
  @apply border border-border_primary
}
.dp__input{
  @apply border border-border_primary
}
</style>