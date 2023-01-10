<template>
  <div class="container_wrapper">
    <div class="flex justify-center">
      <SubscribeButton @submit="unsubscribeHandler" mode="UNSUBSCRIBE"/>
    </div>
  </div>
</template>

<script setup>
import SubscribeButton from "../components/SubscribeButton";
import {unsubscribe} from "../api/subscribe";
import {useI18n} from "vue-i18n";

const swal = inject("$swal");
const {t: $t} = useI18n()

async function unsubscribeHandler({email}) {
  try {
    const {error} = await unsubscribe(email)
    if (error.value) {
      swal.fire({
        color: '#A2A0B3',
        background: '#3A2F7D',
        timerProgressBar: true,
        icon: 'error',
        title: $t('other.unsubscription-error'),
        showConfirmButton: false,
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
    } else {
      swal.fire({
        color: '#A2A0B3',
        background: '#3A2F7D',
        timerProgressBar: true,
        icon: 'success',
        title: $t('other.unsubscription-success'),
        showConfirmButton: false,
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

  } catch (e) {
    swal.fire({
      color: '#A2A0B3',
      background: '#3A2F7D',
      timerProgressBar: true,
      icon: 'error',
      title: $t('other.unsubscription-error'),
      showConfirmButton: false,
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

<style scoped>

</style>
