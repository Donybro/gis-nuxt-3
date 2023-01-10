<template>
  <div class="">
    <form @submit="onSubmit" class="px-[18px] grid grid-cols-1 xl:flex xl:items-center ">
      <input :placeholder="$t('form.appeal-placeholder')" :class="{'' : emailError}" type="email" name="email" v-model="email" class="outline-none bg-secondary w-[240px] xl:w-[300px] placeholder:text-[0.89em] text-[1em] px-[12px] text-white border border-border_primary focus:ring-offset-1 focus:ring-2 focus:ring-primary focus:z-[22] placeholder:text-text_secondary  py-[10px]">
      <button class="bg-secondary placeholder:text-[1em] text-[1em] px-[12px] text-white border border-border_primary placeholder:text-text_secondary focus:ring-offset-1 focus:ring-2 focus:ring-primary py-[10px] text-[1em] focus:z-[22] hover:bg-white hover:text-primary" type="submit">
        {{ mode === 'SUBSCRIBE' ? $t('button.subscribe') : $t('button.unsubscribe') }}
      </button>
    </form>
  </div>
</template>

<script setup>


import {useField, useForm} from 'vee-validate';
import * as yup from "yup";
import useValidatorMessages from "../composables/validatorMessages";

defineProps({
  mode:{
    type:String,
    default:'SUBSCRIBE'
  }
})
const emit = defineEmits(['submit'])
const {t:$t} = useI18n()

const {handleSubmit, isSubmitting, resetForm} = useForm();
const {requiredValidatorMessage, emailValidatorMessage} = useValidatorMessages()
const {
  value: email,
  errorMessage: emailError
} = useField('email',  yup.string().email(emailValidatorMessage).required(requiredValidatorMessage),{initialValue: ''});

const onSubmit = handleSubmit(async (email) => {
  emit('submit',email)
  resetForm()
});
</script>

<style scoped>

</style>
