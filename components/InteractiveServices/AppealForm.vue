<template>
  <ClientOnly>
    <form @submit="onSubmit">
      <section class="grid grid-cols-1 xl:grid-cols-2 gap-[6px] xl:gap-[24px]">
        <div class="form_wrapper">
          <label class="form_label" for="region">
            {{ $t('form.your-region') }}
          </label>
          <SelectBox class="h-[52px]" :searchBox="true" id="region" v-model="region" :options="regionsList" show-by="name" track-by="id"/>
          <span class="error_message">{{ regionError }}</span>
        </div>
        <div class="form_wrapper">
          <label class="form_label" for="district">
            {{ $t('form.your-district') }}
          </label>
          <SelectBox class="h-[52px]" :searchBox="true" id="district" v-model="district" :options="districtsList" show-by="name" track-by="id"/>
          <span class="error_message">{{ districtError }}</span>
        </div>
        <div class="form_wrapper">
          <label class="form_label" for="full_name">
            {{ $t('form.full-name') }}
          </label>
          <input class="base_input h-[52px]" id="full_name" type="text" name="full_name" v-model="full_name">
          <span class="error_message">{{ full_nameError }}</span>
        </div>
        <div class="form_wrapper">
          <label class="form_label" for="address">
            {{ $t('form.address') }}
          </label>
          <input class="base_input h-[52px]" id="address" type="text" name="address" v-model="address">
          <span class="error_message">{{ addressError }}</span>
        </div>
        <div class="form_wrapper">
          <label class="form_label" for="email">
            {{ $t('form.email') }}
          </label>
          <input class="base_input h-[52px]" id="email" type="email" name="email" v-model="email">
          <span class="error_message">{{ emailError }}</span>
        </div>
        <div class="form_wrapper">
          <label class="form_label" for="phone">
            {{ $t('form.phone') }}
          </label>
          <input v-maska="'+998 (##) ###-##-##'" placeholder="+998 (__) ___-__-__" class="base_input h-[52px]" id="phone" type="text" name="phone" v-model="phone">
          <span class="error_message">{{ phoneError }}</span>
        </div>
        <div class="form_wrapper">
          <label class="form_label" for="text">
            {{ $t('form.message-text') }}
          </label>
          <textarea ref="textareaRef" @input="resize" class="base_input min-h-[104px] h-[104px]" id="text" name="text" v-model="text"></textarea>
          <span class="error_message">{{ textError }}</span>
        </div>
        <div class="h-full">
          <div class="form_wrapper">
            <label class="form_label" for="text">
              {{ $t('form.file') }} <span class="text-text_secondary">*{{ $t('form.pdf-format') }}</span>
            </label>
            <div class="base_input h-[52px] ">
              <div class="flex items-center justify-between h-full">
                <p class="w-[90%] overflow-hidden h-full">{{ file ? file.name : $t('form.upload-file') }}</p>
                <FileInput :extensions="['pdf']" :id="'file1'" v-model:files="file" :multiple-files="false">
                  <template #icon>
                    <div class="h-full">
                    <span class="flex items-center justify-center px-[10px]">
                      <Icon icon="el:paper-clip" class="w-[24px] h-[24px] text-text_secondary"/>
                    </span>
                    </div>
                  </template>
                </FileInput>
              </div>
            </div>
            <span class="error_message">{{ fileError }}</span>
          </div>
          <div class="">
            <InputFilesList v-model:files="file"/>
          </div>
        </div>
        <div class="form_wrapper">
          <label class="form_label w-full" for="captcha_is_correct">
            <br>
          </label>
          <CustomCapcha :clearForm="clearCaptcha" id="captcha_is_correct" class="h-[52px]" @change="setCaptcha"/>
          <span class="error_message">{{ captcha_is_correctError }}</span>
        </div>
      </section>
      <div class="mt-[24px]">
        <button type="submit" class="px-[70px] py-[20px] hover:text-primary hover:bg-white text-white bg-primary border border-white">
          {{ $t('button.send') }}
        </button>
      </div>
    </form>
  </ClientOnly>
</template>

<script setup>
import {useField, useForm} from 'vee-validate';
import {Icon} from "@iconify/vue";
import * as yup from "yup";
import InputFilesList from "../InputFilesList";
import {getDistrictsByRegionId, getRegionsList} from "../../api/getRegionsList";
import CustomCapcha from "../CustomCapcha";
import useValidatorMessages from "../../composables/validatorMessages";


const {requiredValidatorMessage, checkIfFileIsTooBig, checkIfFileIsCorrectType, fileSize, fileType, emailValidatorMessage} = useValidatorMessages()
const {handleSubmit, isSubmitting, resetForm} = useForm();

// const phoneMask = computed(()=>)

const emit = defineEmits(['create-form'])
const props = defineProps({
  resetFormFields: Boolean
})

const clearCaptcha = ref(false)

const {resetFormFields} = toRefs(props)
watch(() => resetFormFields.value, (val) => {
  if (val) {
    clearCaptcha.value = true
    resetForm()
  }
})
const textareaRef = ref()

function resize() {
  textareaRef.value.style.height = "25px";
  textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
}


function onInvalidSubmit({errors}) {
  console.log(errors, 'Errors')
  // scrollToError(Object.keys(errors)[0])
}

const onSubmit = handleSubmit(async ({file, ...values}) => {
  let payloadObj = {
    ...values
  }
  console.log(values)
  file ? payloadObj.file = file : null
  const formData = new FormData();
  Object.keys(payloadObj).forEach(k => {
    formData.append(k, payloadObj[k])
  })
  emit('create-form', formData)
}, onInvalidSubmit);

const regionsList = ref([])
const districtsList = ref([])
const {locale} = useI18n()

watch(() => locale.value, async () => {
  const {data} = await getRegionsList()
  if (region.value) {
    const {data} = await getDistrictsByRegionId(region.value)
    if (data) {
      districtsList.value = data.value
    }
  }
  if (data && data.value) {
    regionsList.value = data.value
  }
}, {
  immediate: true
})


const {
  value: full_name,
  errorMessage: full_nameError
} = useField('full_name', yup.string().required(requiredValidatorMessage), {initialValue: ''});

const {
  value: text,
  errorMessage: textError
} = useField('text', yup.string().required(requiredValidatorMessage), {initialValue: ''});

const {
  value: email,
  errorMessage: emailError
} = useField('email', yup.string().email(emailValidatorMessage).required(requiredValidatorMessage), {initialValue: ''});

const {
  value: address,
  errorMessage: addressError
} = useField('address', yup.string().required(requiredValidatorMessage), {initialValue: ''});


const {
  value: phone,
  errorMessage: phoneError
} = useField('phone', yup.string().required(requiredValidatorMessage), {initialValue: '+998'});

const {
  value: captcha_is_correct,
  errorMessage: captcha_is_correctError
} = useField('captcha_is_correct', yup.boolean().oneOf([true], requiredValidatorMessage).required(requiredValidatorMessage), {initialValue: undefined});
// oneOf([true],requiredValidatorMessage)
const {
  value: file,
  errorMessage: fileError
} = useField('file', yup.mixed().nullable()
    .test('file', fileSize(undefined, {size: 10}), checkIfFileIsTooBig)
    .test('file', fileType(undefined, {type: '.pdf'}), checkIfFileIsCorrectType), {
  initialValue: null
});

// watch(()=>captcha_is_correct.value,(val)=>{
//   console.log(val)
// })

const {
  value: region,
  errorMessage: regionError
} = useField('region', yup.string().required(requiredValidatorMessage), {initialValue: ''});

const {
  value: district,
  errorMessage: districtError
} = useField('district', yup.string().required(requiredValidatorMessage), {initialValue: ''});

watch(() => region.value, async (regId) => {
  if (regId) {
    try {
      district.value = ''
      const {data} = await getDistrictsByRegionId(regId)
      if (data) {
        districtsList.value = data.value
      }
    } catch (e) {

    }
  }
})

function setCaptcha(val) {
  captcha_is_correct.value = val
}

</script>

<style scoped>

</style>
