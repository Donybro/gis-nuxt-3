<template>
  <div class="py-[8px] flex justify-between container mx-auto">
    <nuxt-link class="inline xl:hidden" to="/">
      <div class="flex items-center gap-[8px] xl:hidden">
        <img src="/icons/Logo.svg" class="w-[30px] h-[30px]"/>
        <img src="/icons/Flag.png" class="h-[30px]"/>
        <h1 class="title">{{ $t('navbar.ozcom') }}</h1>
      </div>
    </nuxt-link>
    <div class="hidden  xl:flex items-center gap-[14px]">
      <div class="nav-content">
        <Icon icon="ic:baseline-location-on" class="icon"/>
        <p>{{ $t('navbar.address') }}</p>
      </div>
      <Devider/>
      <nuxt-link to="tel:+998712026965" class="nav-content">
        <Icon icon="ic:round-local-phone" class="icon"/>
        {{ $t('navbar.phone') }}
      </nuxt-link>
      <Devider/>
      <nuxt-link class="nav-content" to="mailto:info@gis.uz">
        <Icon icon="ic:round-email" class="icon"/>
        info@gis.uz
      </nuxt-link>
    </div>
    <div class="flex items-center gap-[14px]">
      <div class="hidden xl:flex  items-center">
        <nuxt-link v-if="socials.facebook" target="_blank" :to="socials.facebook">
          <Icon class="brand-icon" icon="brandico:facebook"/>
        </nuxt-link>
        <nuxt-link v-if="socials.instagram" target="_blank" :to="socials.instagram">
          <Icon class="brand-icon" icon="akar-icons:instagram-fill"/>
        </nuxt-link>
        <nuxt-link v-if="socials.telegram" target="_blank" :to="socials.telegram">
          <Icon class="brand-icon" icon="bxl:telegram"/>
        </nuxt-link>
        <nuxt-link title="youtube" v-if="socials.youtube" target="_blank" :to="socials.youtube">
          <Icon class="brand-icon" icon="bxl:youtube"/>
        </nuxt-link>
      </div>
      <Devider class="h-[20px]"/>
      <BigMenu class="block xl:hidden"/>
      <div class="hidden xl:flex items-center gap-[12px]">
        <ChangeEyeView/>
        <button @click="speechBtnClicked" class="speech_btn">
          <Icon class="brand-icon" icon="ion:volume-medium-sharp"/>
        </button>
        <ClientOnly>
          <ChangeLangDropDown/>
        </ClientOnly>
        <BigMenu/>
        <Devider class="h-[20px]"/>
        <SearchBox/>
      </div>
    </div>
  </div>
</template>

<script>
import {Icon} from '@iconify/vue';
import Devider from "../Devider";
import SearchBox from "../SearchBox";
import ChangeLangDropDown from "../ChangeLangDropDown";
import BigMenu from '../Menu/BigMenuButton'
import ChangeEyeView from "../ChangeEyeView";

export default {
  name: "NavbarTop",
  components: {ChangeEyeView, ChangeLangDropDown, Devider, SearchBox, Icon, BigMenu},
  props: {
    socials: {
      type: Object,
      default: () => ({
        facebook: '',
        instagram: '',
        telegram: '',
        youtube: ''
      })
    }
  },
  setup() {

    const {locale} = useI18n()

    function getSelectionText() {
      let text = "";
      if (window.getSelection) {
        text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
      }
      return text;
    }

    function speechBtnClicked(e) {
      console.log('speechBtnClicked')
      if (speechSynthesis.speaking) {
        responsiveVoice.cancel();
      } else {
        let text = getSelectionText();
        if (text) {
          responsiveVoice.speak(text, getVoice().name);
        }
      }
    }

    function getVoice() {
      if (responsiveVoice) {
        return responsiveVoice
            .getVoices()
            ?.find(n =>
                n?.name?.includes(
                    locale.value === "en"
                        ? "English Male"
                        : locale.value === "ru"
                            ? "Russian"
                            : "Turkish Male"
                )
            );
      }
    }

    return {
      speechBtnClicked
    }
  }
}
</script>

<style scoped>
.icon {
  @apply text-white h-[18px] w-[18px] mr-[6px]
}

.nav-content {
  @apply text-text_secondary flex items-center text-[0.875em] font-inter
}

.brand-icon {
  @apply text-white h-[18px] w-[18px]  mr-[20px]
}

h1 {
  color: transparent;
  background: linear-gradient(67.87deg, #F4D974 3.68%, #B88114 49.93%, #EFD26C 82.76%, rgba(255, 153, 42, 0) 118.99%),
  linear-gradient(0deg, #FFFFFF, #FFFFFF);
  background-clip: text;
}
</style>
