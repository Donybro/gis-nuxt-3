<template>
  <form @submit="onSubmit">
    <div class="grid grid-cols-12 gap-[8px]">
      <!--      <div class="col-span-12 xl:col-span-2 ">-->
      <!--        <SelectBox v-model="siteProtocol" showBy="label" trackBy="id" :placeholder="$t('other.select-protocol')" :options="options" class="w-full h-full"/>-->
      <!--      </div>-->
      <div
          class="col-span-12 xl:col-span-7 border w-full border-border_primary p-[14px] flex items-center bg-secondary mr-[24px]">
        <Icon icon="akar-icons:search" class="w-[28px] h-[28px] mr-[24px] text-text_secondary"/>
        <input @keypress.enter="onSubmit" v-model="websiteDomen" name="websiteDomen" id="websiteDomen" type="text"
               class="input" :placeholder="$t('other.paste-url')">
      </div>
      <div class="col-span-12 xl:col-span-3 h-full">
        <CustomCapcha id="captcha_is_correct" :clearForm="clearForm" :showIcon="false"
                      :error="!!captcha_is_correctError" @change="setCaptcha"/>
      </div>
      <button type="submit"
              class="col-span-12 xl:col-span-2 bg-primary text-white border-[2px] border-white py-[10px] px-[25px]">
        {{ $t('button.check') }}
      </button>
    </div>
    <div class="flex flex-col text-[1.12em] mt-[20px] px-[35px] font-medium whitespace-pre-line">
      <!--    <p v-if="exist === false  && exist !== undefined && requestSent && conclusionNumber === null" class="font-montserrat text-[#FF0000]">-->
      <!--      {{$t('other.web-site-not-valid',{number:conclusionNumber,mail:'soft@gis.uz'})}}-->
      <!--    </p>-->
      <i18n-t v-if="exist === true && exist !== undefined && requestSent && conclusionNumber"
              :keypath="'other.web-site-not-valid'" tag="p" class="font-montserrat text-[#d8aa63]">
        <template #number>
          {{ conclusionNumber }}
        </template>
        <template #date>
          <span>{{ dayjs(conclusionDate).format('DD.MM.YYYY') }}</span>
        </template>
        <template #mail>
          {{ 'soft@gis.uz' }}
        </template>

      </i18n-t>
      <p v-if="exist === false  && exist !== undefined && requestSent" class="font-montserrat text-[#19B31C]">
        {{ $t('other.site-valid') }}</p>
    </div>
  </form>
</template>

<script setup>
import dayjs from "dayjs";
import {useField, useForm} from 'vee-validate';
import {Icon} from "@iconify/vue";
import useValidatorMessages from "../../composables/validatorMessages";
import * as yup from "yup";

const {requiredValidatorMessage} = useValidatorMessages()

const {handleSubmit, isSubmitting, resetForm} = useForm();
const emit = defineEmits(['submit'])
const props = defineProps({
  exist: {
    type: Boolean
  },
  clearForm: {
    type: Boolean
  },
  conclusionNumber: {
    type: Number,
  },
  conclusionDate: {
    type: Number,
  },
})

const {exist, conclusionNumber, clearForm, conclusionDate} = toRefs(props)

// const options = [
//   {
//     label: 'http',
//     id: 'http',
//   }, {
//     label: 'https',
//     id: 'https',
//   }
// ]
// const siteProtocol = ref('https')

function onInvalidSubmit({errors}) {
  console.log(errors, 'Errors')
  // scrollToError(Object.keys(errors)[0])
}

const onSubmit = handleSubmit(async ({websiteDomen}) => {
  // const websiteFullUrl = `${siteProtocol.value}://${websiteDomen}`
  emit('submit', websiteDomen)
  requestSent.value = true
}, onInvalidSubmit);

const requestSent = ref(false)


const {
  value: websiteDomen,
  errorMessage: websiteDomenError
} = useField('websiteDomen', yup.string().required(requiredValidatorMessage), {initialValue: ''});

const {
  value: captcha_is_correct,
  errorMessage: captcha_is_correctError
} = useField('captcha_is_correct', yup.boolean().oneOf([true]).required(), {initialValue: undefined});

watch(() => websiteDomen.value, (val) => {
  if (val && requestSent.value) {
    requestSent.value = false
  }
})

watch(() => clearForm.value, (val) => {
  if (val) {
    resetForm()
  }
})


function setCaptcha(val) {
  captcha_is_correct.value = val
}


</script>

<style scoped>
.input {
  @apply w-full text-white text-[1.12em] focus:outline-none bg-transparent placeholder:text-[1.12em] placeholder:font-inter placeholder:text-text_secondary
}

</style>
