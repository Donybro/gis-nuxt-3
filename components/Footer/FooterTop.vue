<template>
  <div
      class="bg-secondary border-b border-text_secondary py-[16px] flex flex-col md:flex-row justify-start md:justify-between  items-center">
    <div class="hidden xl:flex items-center my-auto gap-[16px]">
      <img src="/icons/Logo.png" class="w-[40px] h-[40px]" alt="logo">
      <h5 class="font-roboto text-white font-bold text-[1.15em] xl:text-[1.5em]">{{ $t('navbar.ozcom-short') }}</h5>
    </div>
    <div class="grid grid-cols-1 gap-[12px] xl:flex xl:items-center xl:gap-[24px]">
      <SubscribeButton @submit="subscribeHandler"/>
      <div class="flex justify-center xl:justify-start  gap-[20px]">
        <nuxt-link to="/interactive_service/appeal">
          <button
              class="px-[21px] py-[10px] hover:text-primary hover:bg-white text-white bg-primary border border-white">
            {{ $t('button.send-appeal') }}
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>

import SubscribeButton from "../SubscribeButton";
import {subscribe} from "../../api/subscribe";

const {t: $t} = useI18n()
const swal = inject("$swal");

async function subscribeHandler(email) {
  try {
    const {error} = await subscribe(email)
    if (error.value) {
      swal.fire({
        color: '#A2A0B3',
        background: '#3A2F7D',
        timerProgressBar: true,
        icon: 'error',
        title: $t('other.subscription-error'),
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
        title: $t('other.subscription-success'),
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
      title: $t('other.subscription-error'),
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
