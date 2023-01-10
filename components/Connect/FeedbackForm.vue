<template>
  <form @submit="onSubmit">
    <div class="grid grid-cols-1 xl:grid-cols-3 xl:gap-[24px]">
      <div class="form_wrapper my-3">
        <label class="form_label" for="full_name">
          {{$t('form.full-name')}}
        </label>
        <input class="base_input" id="full_name" type="text" name="full_name" v-model="full_name">
        <span class="error_message">{{ full_nameError }}</span>
      </div>
      <div class="form_wrapper my-3">
        <label class="form_label" for="email">
          {{$t('form.email')}}
        </label>
        <input class="base_input" id="email" type="text" name="email" v-model="email">
        <span class="error_message">{{ emailError }}</span>
      </div>
      <div class="form_wrapper my-3">
        <label class="form_label" for="phone">
          {{$t('form.phone')}}
        </label>
        <input v-maska="'+998 (##) ###-##-##'" placeholder="+998 (__) ___-__-__" class="base_input" id="phone" type="text" name="phone" v-model="phone">
        <span class="error_message">{{ phoneError }}</span>
      </div>
      <div class="form_wrapper my-3">
        <label class="form_label" for="text">
          {{$t('form.message-text')}}
        </label>
        <textarea ref="textareaRef" @input="resize" class="base_input h-[55px]" id="text" name="text" v-model="text"></textarea>
        <span class="error_message">{{ textError }}</span>
      </div>
      <div class="form_wrapper my-3">
        <label class="form_label" for="captcha_is_correct"></label>
        <CustomCapcha id="captcha_is_correct"  @change="setCaptcha"/>
        <span class="error_message">{{ captcha_is_correctError }}</span>
      </div>
    </div>
    <div class="mt-[24px]">
      <button class="px-[70px] py-[20px] hover:text-primary hover:bg-white text-white bg-primary border border-white">
        {{$t('button.send')}}
      </button>
    </div>
  </form>
</template>

<script setup>

import {useField, useForm} from 'vee-validate';
import {Icon} from "@iconify/vue";
import useValidatorMessages from "../../composables/validatorMessages";
const {emailValidatorMessage, requiredValidatorMessage} = useValidatorMessages()
import * as yup from "yup";
import CustomCapcha from "../CustomCapcha";


const {handleSubmit, isSubmitting, resetForm} = useForm();

const emit = defineEmits(['create-form'])

const props = defineProps({
  resetFormFields:Boolean
})

const {resetFormFields} = toRefs(props)
watch(()=>resetFormFields.value,(val)=>{
  if(val){
    resetForm()
  }
})
const textareaRef = ref()

function resize(){
    textareaRef.value.style.height = "25px";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
}

function onInvalidSubmit({errors}) {
  console.log(errors,'Errors')
  // scrollToError(Object.keys(errors)[0])
}
const onSubmit = handleSubmit(async (values) => {
    emit('create-form',values)
}, onInvalidSubmit);



const {
  value: full_name,
  errorMessage: full_nameError
} = useField('full_name',  yup.string().required(requiredValidatorMessage),{initialValue: ''});

const {
  value: text,
  errorMessage: textError
} = useField('text',  yup.string().required(requiredValidatorMessage),{initialValue: ''});

const {
  value: email,
  errorMessage: emailError
} = useField('email',  yup.string().email(emailValidatorMessage).required(requiredValidatorMessage),{initialValue: ''});

const {
  value: phone,
  errorMessage: phoneError
} = useField('phone',  yup.string().required(requiredValidatorMessage),{initialValue: '+998'});

const {
  value: captcha_is_correct,
  errorMessage: captcha_is_correctError
} = useField('captcha_is_correct',  yup.boolean().oneOf([true],requiredValidatorMessage).required(requiredValidatorMessage),{initialValue: undefined});
// oneOf([true],requiredValidatorMessage)
function setCaptcha(val) {
  captcha_is_correct.value = val
}

</script>

<style scoped>

</style>
