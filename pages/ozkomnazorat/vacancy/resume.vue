<template>
  <div class="container_wrapper">
    <h1 class="section_title">{{ $t('page-titles.ozcom.send-resume') }}</h1>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12">
        <VacancyForm :resetFormFields="resetFormFields" @create-form="sendResumeForm"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import VacancyForm from "../../../components/VacancyForm";
import {sendResume} from "../../../api/getOzkomnazoratData";

import {useHead} from "nuxt/app";

const {t: $t} = useI18n({useScope: 'global'})

useHead({
  title: $t('page-titles.ozcom.send-resume')
})

const resetFormFields = ref(false)
const swal = inject('$swal')

async function sendResumeForm(formData) {
  try {
    const resp = await sendResume(formData)
    resetFormFields.value = true
    swal.fire({
      color: '#A2A0B3',
      background: '#3A2F7D',
      timerProgressBar: true,
      icon: 'success',
      showConfirmButton: false,
      title: $t('modal.resume-sent'),
      timer: 5500,
      customClass: {
        timerProgressBar: 'swal_timerProgressBar',
        popup: 'swal_popup',
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
  } catch (e) {
    swal.fire({
      color: '#A2A0B3',
      background: '#3A2F7D',
      timerProgressBar: true,
      icon: 'error',
      showConfirmButton: false,
      title: $t('modal.resume-not-sent'),
      timer: 5500,
      customClass: {
        timerProgressBar: 'swal_timerProgressBar',
        popup: 'swal_popup',
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
  }
}

</script>

