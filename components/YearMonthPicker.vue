<template>
  <div class="">
    <Datepicker menuClassName="yearPicker_menu"  inputClassName="yearPicker_input" :locale="locale" :autoApply="true" v-model="date" :flow="['year','month']"  format="yyyy.MM" monthPicker />
  </div>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['update:dateValue'])
const {locale} = useI18n()
const props =  defineProps({
  dateValue:Object
})

const {dateValue} = toRefs(props)

const date = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
})

watch(()=>date.value,(val)=>{
  emit('update:dateValue',val)
})

</script>

<style>
.yearPicker_input{
  @apply text-text_secondary text-[1.25em] py-[18px] bg-secondary
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
