<template>
  <div class="bg-secondary px-[22px] py-[7px]">
    <h1 class="text-text_secondary font-bold font-montserrat text-[1.375em] my-[12px]">
      {{ $t('modal.your-appeal') }}</h1>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label">{{ $t('modal.appeal-sent-data') }}</p>
      <p class="appeal_content_text">{{ dayjs(alertData.created_at).format('DD.MM.YYYY HH:mm') }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label">{{ $t('modal.from-who') }}</p>
      <p class="appeal_content_text">{{ alertData.full_name }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('modal.appeal-text') }}</p>
      <p class="appeal_content_text">{{ alertData.text }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('modal.appeal-answer') }}</p>
      <p class="appeal_content_text">{{ alertData.answer_text }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('modal.appeal-status') }}</p>
      <p class="appeal_content_text">{{ alertData.status }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('card.email') }}</p>
      <p class="appeal_content_text">{{ alertData.email }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('card.phone') }}</p>
      <p class="appeal_content_text">{{ alertData.phone }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('card.region') }}</p>
      <p class="appeal_content_text">{{ alertData.region }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('card.district') }}</p>
      <p class="appeal_content_text">{{ alertData.district }}</p>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('modal.appeal-file') }}</p>
      <div class="w-[52px] relative h-[52px]">
        <a v-if="alertData.file" class="w-full h-full absolute top-0 left-0" :href="alertData.file" target="_blank">
          <Icon icon="fa6-solid:file-pdf" class="text-text_secondary" width="100%" height="100%"/>
        </a>
        <Icon v-else icon="clarity:no-access-solid" class="cursor-not-allowed" width="100%" height="100%"/>
      </div>
    </div>
    <div class="appeal_content_wrapper">
      <p class="appeal_content_label"> {{ $t('modal.attachment-file') }}</p>
      <div class="w-[52px] relative h-[52px]">
        <a v-if="alertData.attachment_file" class="w-full h-full absolute top-0 left-0"
           :href="alertData.attachment_file" target="_blank">
          <Icon icon="fa6-solid:file-pdf" class="text-text_secondary" width="100%" height="100%"/>
        </a>
        <Icon v-else icon="clarity:no-access-solid" class="cursor-not-allowed" width="100%" height="100%"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Icon} from "@iconify/vue";
import dayjs from 'dayjs'

defineProps({
  alertData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.appeal_content_wrapper {
  @apply flex flex-col md:flex-row items-center justify-between gap-[12px] font-montserrat py-[12px] border border-b border-text_secondary
}

.appeal_content_label {
  @apply text-text_secondary text-[1.12em] px-[12px]
}

.appeal_content_text {
  @apply text-white text-[1.25em] px-[12px] break-all
}
</style>
