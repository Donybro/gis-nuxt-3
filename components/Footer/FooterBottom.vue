<template>
  <div class="grid grid-cols-3 gap-[22px] font-inter py-[24px]">
    <p class="text-[0.875em] text-text_secondary">
      {{ $t('footer.copyright') }}
    </p>
    <i18n-t class="text-[0.875em] text-text_secondary" keypath="footer.attention-text" tag="p">
      <span>{{ $t('other.ctrl') }}</span>
    </i18n-t>
    <div class="flex flex-col">
      <p class="text-text_secondary w-[100%] self-end text-right text-[0.87em]">{{ $t('footer.remind') }}</p>
      <div v-if="locale">
        <div v-if="locale === 'ru'" class="text-white text-right">
          {{ $t('footer.created-by') }}
          <a :href="'https://technocorp.uz/ru'"
             class="font-semibold text-[#45A57D]"
             target="_blank">
            TECHNOCORP
          </a>
        </div>
        <div v-else class="text-white text-right">
          <a :href="'https://technocorp.uz'" class="font-semibold text-[#45A57D]"
             target="_blank">TECHNOCORP
          </a>
          {{ $t('footer.created-by') }}
        </div>
      </div>
    </div>
    <i18n-t class="text-[0.875em] text-text_secondary" keypath="footer.licence" tag="p">
      <a class="col-span-2 text-[0.875em] text-text_secondary hover:text-blue-500 hover:underline"
         href="https://creativecommons.org/licenses/by/4.0/legalcode"
         target="_blank">
        Creative Commons Attribution 4.0 Internationals
      </a>
    </i18n-t>
    <nuxt-link target="_blank" to="https://old1.gis.uz/">
      <button
          class="bg-primary shadow-md hover:shadow-2xl transition duration-150 px-[16px] py-[4px] hover-opacity-40 text-text_secondary">
        {{ $t('other.site-old-version') }}
      </button>
    </nuxt-link>
    <div class="flex justify-end">
      <div id="rated"></div>
    </div>
  </div>

</template>

<script setup>


const {locale} = useI18n()
console.log(locale.value, 'locale')
</script>

<style scoped>
span {
  font-weight: 600 !important;
  color: white !important;
}
</style>
