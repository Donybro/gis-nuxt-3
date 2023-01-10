<template>
  <section class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-col">
          <div id="feedback" class="mb-[40px]">
            <h2 class="text-white font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
              {{ $t('page-titles.connect.feedback') }}
            </h2>
            <FeedbackForm :reset-form-fields="resetFormTrigger" @create-form="handleCreateForm"/>
          </div>
          <h2 class="text-white font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">
            {{ $t('page-titles.connect.info-for-connect') }}</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
            <div class="wrapper">
              <div class="label">{{ $t('card.address') }}:</div>
              <div class="content_white">{{ staticFields.address }}</div>
            </div>
            <div class="wrapper">
              <div class="label">{{ $t('card.near-place') }}:</div>
              <div class="content_white">{{ staticFields.landmark }}</div>
            </div>
            <div class="wrapper">
              <div class="label">{{ $t('card.work-time') }}:</div>
              <div class="content_white">{{ staticFields.working_hours }}</div>
            </div>
            <div class="wrapper">
              <div class="label">{{ $t('card.phone') }}:</div>
              <div class="">
                <div class="content_blue">{{ staticFields.phone }}</div>
                <div class="content_blue">{{ staticFields.phone2 }}</div>
              </div>
            </div>
            <div class="wrapper">
              <div class="label">{{ $t('card.email') }}:</div>
              <div class="">
                <div class="content_blue">{{ staticFields.email }}</div>
                <div class="content_blue">{{ staticFields.email2 }}</div>
              </div>
            </div>
            <div class="wrapper">
              <div class="label">{{ $t('card.helpline') }}:</div>
              <div class="content_blue">{{ staticFields.helpline }}</div>
            </div>
          </div>
          <div class="flex items-center mt-[40px]">
            <nuxt-link v-if="staticFields.facebook" :to="staticFields.facebook" target="_blank" title="facebook">
              <Icon class="brand-icon" icon="brandico:facebook"/>
            </nuxt-link>
            <nuxt-link v-if="staticFields.instagram" :to="staticFields.instagram" target="_blank" title="instagram">
              <Icon class="brand-icon" icon="akar-icons:instagram-fill"/>
            </nuxt-link>
            <nuxt-link v-if="staticFields.telegram" :to="staticFields.telegram" target="_blank" title="telegram">
              <Icon class="brand-icon" icon="bxl:telegram"/>
            </nuxt-link>
            <nuxt-link v-if="staticFields.youtube" :to="staticFields.youtube" target="_blank" title="youtube">
              <Icon class="brand-icon" icon="bxl:youtube"/>
            </nuxt-link>
          </div>
          <div class="mt-[40px] w-full h-[50%]">
            <iframe
                allowfullscreen=""
                height="500px" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d961.2460978475756!2d65.37299707605176!3d40.10292592842759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c6ce5c8b998f%3A0xfa10e2d214121092!2z0JPQvtGB0YPQtNCw0YDRgdGC0LLQtdC90L3QsNGPINC40L3RgdC_0LXQutGG0LjRjyDRgdCy0Y_Qt9C4!5e0!3m2!1sru!2s!4v1656310397670!5m2!1sru!2s"
                style="border:0;"
                width="100%"></iframe>
          </div>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getConnectionStaticFields} from "../../api/getConnectionData";
import {createContactForm} from "../../api/createForms";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {Icon} from "@iconify/vue";
import FeedbackForm from "../../components/Connect/FeedbackForm";
import {useI18n} from "vue-i18n";
import {useHead} from "nuxt/app";

const {t: $t, locale} = useI18n({useScope: 'global'})
useHead({
  title: $t('navbar.ozcom-full')
})
const route = useRoute()
const staticFields = ref(null)
const {data} = await getConnectionStaticFields()
if (data && data?.value) {
  staticFields.value = data?.value[0]
}

watch(() => locale.value, async () => {
  const {data} = await getConnectionStaticFields()
  if (data && data?.value) {
    staticFields.value = data?.value[0]
  }

})

const resetFormTrigger = ref(false)
const swal = inject("$swal");

async function handleCreateForm(formData) {
  try {
    await createContactForm(formData)
    resetFormTrigger.value = true
    swal.fire({
      color: '#A2A0B3',
      background: '#3A2F7D',
      timerProgressBar: true,
      icon: 'success',
      title: $t('modal.appeal-applied'),
      timer: 5500,
      showConfirmButton: false,
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
      title: $t('modal.appeal-not-applied'),
      timer: 5500,
      showConfirmButton: false,
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
.wrapper {
  @apply flex flex-col gap-[8px]
}

.label {
  @apply text-[1em] font-medium text-text_secondary font-inter
}

.content_white {
  @apply text-[1em] font-medium text-white font-inter
}

.content_blue {
  @apply text-[1em] font-medium text-[#3D8DFF] font-inter
}

.brand-icon {
  @apply text-white h-[18px] w-[18px]  mr-[20px]
}
</style>
