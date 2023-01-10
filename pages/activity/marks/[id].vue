<template>
  <main class="container_wrapper">
    <main v-if="mark" class="container_wrapper">
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-12 xl:col-span-9">
          <h1 class="section_title">{{ mark.title }}</h1>
          <section class="grid grid-cols-3 gap-[24px] overflow-hidden">
            <div class="relative col-span-3 xl:col-span-1">
              <div class="w-full h-full absolute z-[1] top-0 left-0 blur-[7px]"
                   :style="{
                     backgroundImage: `url(${mark.photo})`,
                     backgroundSize:'cover',
                     backgroundPosition:'center center'
                  }"
              >
              </div>
              <img v-if="mark?.photo"
                   :src="mark?.photo" alt="photo"
                   class="relative z-[2] w-full h-full object-contain"
              >
            </div>
            <div class="col-span-3 xl:col-span-2">
              <div class="flex flex-col">
                <div class="card_wrapper">
                  <div class="card_title">{{ $t('page-titles.activity.marks-detail.author') }}</div>
                  <div class="card_text">{{ mark.author }}</div>
                </div>
                <div class="card_wrapper">
                  <div class="card_title">{{ $t('page-titles.activity.marks-detail.designer') }}</div>
                  <div class="card_text">{{ mark.designer }}</div>
                </div>
                <div class="card_wrapper">
                  <div class="card_title">{{ $t('page-titles.activity.marks-detail.date_manufacture') }}</div>
                  <div class="card_text">{{ mark.date_manufacture }}</div>
                </div>
                <div class="card_wrapper">
                  <div class="card_title">{{ $t('page-titles.activity.marks-detail.size') }}</div>
                  <div class="card_text">{{ mark.size }}</div>
                </div>
                <div class="card_wrapper">
                  <div class="card_title">{{ $t('page-titles.activity.marks-detail.block_size') }}</div>
                  <div class="card_text">{{ mark.block_size }}</div>
                </div>
                <div class="card_wrapper">
                  <div class="card_title">{{ $t('page-titles.activity.marks-detail.copy_number') }}</div>
                  <div class="card_text">{{ mark.copy_number }}</div>
                </div>
                <div class="card_wrapper">
                  <div class="card_title">{{ $t('page-titles.activity.marks-detail.nominal') }}</div>
                  <div class="card_text">{{ mark.nominal }}</div>
                </div>
              </div>
            </div>
          </section>
          <section class="w-full mt-[2rem]">
            <p class="text-[1.8rem] text-white">{{ $t('page-titles.activity.marks-detail.description') }}</p>
            <p class="desc-html leading-[38 px] !text-text_secondary w-full text-[1em] leading-[22px] text-justify font-inter break-words"
               v-html="mark.description">

            </p>
          </section>
        </div>
        <div class="xl:col-span-3">
          <SideMenuNavigator/>
        </div>
      </div>

    </main>
  </main>
</template>

<script setup>

import {getMarkYearDetailsByYearId} from "~/api/marks.service";
import {useI18n} from "vue-i18n";
import {useHead} from "#app";
import SideMenuNavigator from "~/components/Menu/SideMenuNavigator.vue";

const route = useRoute()
const router = useRouter()
const markYear = computed(() => route.params.id)

const mark = ref(null)
const {locale, t: $t} = useI18n()

useHead({
  title: $t('page-titles.activity.marks')
})


watch(() => locale.value, async () => {
  await getItems(markYear.value)
}, {
  immediate: true
})

async function getItems(markId = markId.value) {
  if (markId) {
    try {
      const {data} = await getMarkYearDetailsByYearId(markId)
      console.table(data)
      if (data && data?.value) {
        mark.value = data.value
      }
    } catch (e) {
      console.log(e)
    }
  }

}

</script>

<style scoped>
.card_wrapper {
  @apply p-[12px] font-montserrat flex border-t border-b border-[#3C3971];
}

.card_title {
  @apply text-[1.1rem] font-semibold text-white basis-1/3;
}

.card_text {
  @apply text-[1rem] text-[#A2A0B3] w-full basis-2/3;
}
</style>
