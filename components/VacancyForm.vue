<template>
  <ClientOnly>
    <form @submit="onSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[6px] md:gap-[24px]">
        <div class="form_wrapper my-3">
          <label class="form_label" for="full_name">
            {{ $t('form.full-name') }}
          </label>
          <input class="base_input" id="full_name" type="text" name="full_name" v-model="full_name">
          <span class="error_message">{{ full_nameError }}</span>
        </div>
        <div class="form_wrapper my-3">
          <label class="form_label" for="email">
            {{ $t('form.email') }}
          </label>
          <input class="base_input" id="email" type="email" name="email" v-model="email">
          <span class="error_message">{{ emailError }}</span>
        </div>
        <div class="form_wrapper my-3">
          <label class="form_label" for="phone">
            {{ $t('form.phone') }}
          </label>
          <input v-maska="'+998 (##) ###-##-##'" placeholder="+998 (__) ___-__-__" class="base_input" id="phone" type="text" name="phone" v-model="phone">
          <span class="error_message">{{ phoneError }}</span>
        </div>
        <div class="">
          <div class="form_wrapper my-3">
            <label class="form_label" for="text">
              {{ $t('form.file') }} <span class="text-text_secondary">*{{ $t('form.pdf-format') }}</span>
            </label>
            <div class="base_input flex items-center justify-between">
              <p class="w-[90%] overflow-hidden">{{ file ? file.name : $t('form.upload-file') }}</p>
              <FileInput :extensions="['pdf']" :id="'file1'" v-model:files="file" :multiple-files="false">
                <template #icon>
              <span class="flex items-center justify-center h-full px-[10px]">
                <Icon icon="el:paper-clip" class="w-[24px] h-[24px] text-text_secondary"/>
              </span>
                </template>
              </FileInput>
            </div>
            <span class="error_message">{{ fileError }}</span>
          </div>
          <div class="">
            <InputFilesList v-model:files="file"/>
          </div>
        </div>
      </div>
      <div class="mt-[24px]">
        <button type="submit" class="px-[70px] py-[20px] hover:text-primary hover:bg-white text-white bg-primary border border-white">
          {{ $t('button.send') }}
        </button>
      </div>
    </form>
  </ClientOnly>
</template>

<script setup>
// import { VueRecaptcha } from 'vue-recaptcha';
import {useField, useForm} from 'vee-validate';
import {Icon} from "@iconify/vue";
import useValidatorMessages from "../composables/validatorMessages";
import * as yup from "yup";
import InputFilesList from "./InputFilesList";
import {getRegionsList} from "../api/getRegionsList";

const {
  checkIfFileIsTooBig,
  checkIfFileIsCorrectType,
  requiredValidatorMessage, fileSize, fileType, emailValidatorMessage
} = useValidatorMessages()


const {handleSubmit, isSubmitting, resetForm} = useForm();

const emit = defineEmits(['create-form'])
const props = defineProps({
  resetFormFields: Boolean
})

const {resetFormFields} = toRefs(props)
watch(() => resetFormFields.value, (val) => {
  if (val) {
    resetForm()
  }
})


function onInvalidSubmit({errors}) {
  console.log(errors, 'Errors')
  // scrollToError(Object.keys(errors)[0])
}

const onSubmit = handleSubmit(async ({file, ...values}) => {
  let payloadObj = {
    ...values
  }
  file ? payloadObj.file = file : null
  const formData = new FormData();
  Object.keys(payloadObj).forEach(k => {
    formData.append(k, payloadObj[k])
  })
  emit('create-form', formData)
}, onInvalidSubmit);

const regionsList = ref([])
const {data} = await getRegionsList()
if (data && data.value) {
  regionsList.value = data.value
}

const {
  value: full_name,
  errorMessage: full_nameError
} = useField('full_name', yup.string().required(requiredValidatorMessage), {initialValue: ''});


const {
  value: email,
  errorMessage: emailError
} = useField('email', yup.string().email(emailValidatorMessage).required(requiredValidatorMessage), {initialValue: ''});


const {
  value: phone,
  errorMessage: phoneError
} = useField('phone', yup.string().required(requiredValidatorMessage), {initialValue: ''});

const {
  value: file,
  errorMessage: fileError
} = useField('file', yup.mixed().nullable()
    .test('file', fileSize(undefined, {size: 10}), checkIfFileIsTooBig)
    .test('file', fileType(undefined, {type: '.pdf'}), checkIfFileIsCorrectType), {
  initialValue: null
});

watch(() => phone.value, (val) => {
  console.log(val.replace(/\D/g, ''))
})

</script>

<style scoped>

</style>
