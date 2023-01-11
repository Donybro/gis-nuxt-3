<template>
  <div class="bg-primary">
    <div class="h-screen flex flex-col">
      <div class="the_navbar bg-primary w-full border-b-[1px] border-[#5C587A]">
        <TheNavbar class=" "/>
      </div>
      <header class="hidden xl:block h-[calc(100%_-_153px)] xl:mt-[153px] relative shrink">
        <div class="fixed z-[10] top-0 mt-[153px] w-[60px] h-full hidden 3xl:block left-[43px]">
          <HeaderSocial :socials="getSocials"/>
        </div>
        <div class="gradient-overlay"></div>
        <video v-if="locale === 'uz'" autoplay class="object-cover" loop muted="muted" src="/video/uz.mp4"></video>
        <video v-if="locale === 'uzb'" autoplay class="object-cover" loop muted="muted" src="/video/uzb.mp4"></video>
        <video v-if="locale === 'ru'" autoplay class="object-cover" loop muted="muted" src="/video/ru.mp4"></video>
        <video v-if="locale === 'en'" autoplay class="object-cover" loop muted="muted" src="/video/en.mp4"></video>
      </header>
      <div
          class="h-full lg:py-[40px] px-[40px] xl:px-[0px] pt-[50px] xl:pt-[0px] flex items-center justify-center xl:hidden">
        <img alt="" class="w-full h-full object-contain" src="/icons/animatedLogo.png">
<!--        <nuxt-img src="/icons/animatedLogo.png" fit="contain" />-->
      </div>
    </div>
    <div class="min-h-[calc(100vh_-_152px)]">
      <NuxtPage/>
    </div>
    <div class="bg-secondary mt-[40px]">
      <Footer class="container mx-auto"/>
    </div>
    <div class="fixed bottom-0 right-0 bg-white w-[1px] h-[1px] anchorScrollButton">
      <button v-if="scrollButtonIsVisible" class="fixed z-[991] bottom-5 right-5" @click.stop.prevent="scrollToTop">
        <Icon class="text-text_secondary" icon="bi:arrow-up-circle-fill" width="40px"/>
      </button>
    </div>
    <ModalComponent ref="modalComponentRef" class="w-[70%] 2xl:w-[40%]" modal-position="center"
                    @close="clearCopiedText">
      <template #slotBody>
        <div v-if="modalName === 'Form'" class="flex flex-col gap-[22px] p-[21px] bg-primary">
          <div class="form_wrapper my-3">
            <label class="form_label" for="swal-input1"> {{ $t('modal.selected-text') }}</label>
            <input id="swal-input1" v-model="copiedText" class="base_input" disabled>
          </div>
          <div class="form_wrapper my-3">
            <label class="form_label" for="swal-input2"> {{ $t('modal.correct-text') }}</label>
            <input id="swal-input2" v-model="correctText" class="base_input">
          </div>
          <div class="flex justify-center mt-[12px]">
            <button
                class="px-[70px] py-[20px] hover:text-primary hover:bg-white text-white bg-primary border border-white"
                @click="sendErrorText">
              {{ $t('button.send') }}
            </button>
          </div>
        </div>
        <div v-if="modalName ==='Not_Selected'" class="flex flex-col gap-[22px] p-[21px] bg-primary">
          <h1 class="text-text_secondary text-center text-[1.35em] xl:text-[2em]">
            {{ $t('other.text-not-selected') }}</h1>
        </div>
      </template>
    </ModalComponent>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import TheNavbar from "../components/Navbar/TheNavbar";
import HeaderSocial from "../components/HeaderSocial";
import Footer from "../components/Footer/Footer";
import {Icon} from "@iconify/vue";
import ModalComponent from "../components/ModalComponent";
import {errorText} from "../api/createForms";
import {useSocialMediaStore} from "../store/socials";
import {mapActions, mapState} from "pinia";
import {useWindowSizeStore} from "../store/window";

export default {
  components: {ModalComponent, Footer, TheNavbar, Icon, HeaderSocial},
  inject: ['$swal'],
  mounted() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    this.handleDebouncedResize = debounce(this.windowSizeHandler, 200);
    window.addEventListener("scroll", this.handleDebouncedScroll);
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("mouseup", this.getSelectedText, false);
    window.addEventListener("resize", this.handleDebouncedResize);

    let width = window.innerWidth;
    this.setWindowSize(width)
  },
  data() {
    return {
      scrollButtonIsVisible: false,
      handleDebouncedScroll: null,
      handleDebouncedResize: null,
      copiedText: '',
      correctText: '',
      modalName: ''
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
    window.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("mouseup", this.getSelectedText, false);
    window.removeEventListener("resize", this.handleDebouncedResize);
  },
  methods: {
    ...mapActions(useWindowSizeStore, ['setWindowSize']),
    windowSizeHandler(e) {
      let width = window.innerWidth;
      this.setWindowSize(width)
    },
    clearCopiedText() {
      this.copiedText = ''
    },
    handleScroll() {
      const scrollBtn = this.$refs.scrollTopButton;
      if (window.scrollY > 0) {
        this.scrollButtonIsVisible = true
      } else {
        this.scrollButtonIsVisible = false
      }
    },
    getSelectedText() {
      if (window.getSelection().toString().length > 0) {
        const selection = window.getSelection().toString().replace(/[!'()*]/g)
        this.copiedText = selection
      }
    },
    onScroll() {
      let anchorScrollButton = document.getElementsByClassName('anchorScrollButton')

      if (document.body.clientHeight > window.innerHeight) {
        this.scrollButtonIsVisible = true
      }
    },
    scrollToTop() {
      window.scrollTo({top: 0, behavior: "smooth"});
    },
    async handleKeyDown(event) {
      if ((event.ctrlKey && event.keyCode === 13) || (event.metaKey && event.keyCode === 13)) {
        if (this.copiedText) {
          this.modalName = 'Form'
          await this.$nextTick()
          this.$refs.modalComponentRef.openModal()
        } else {
          this.modalName = 'Not_Selected'
          await this.$nextTick()
          this.$refs.modalComponentRef.openModal()
        }
      }
    },
    async sendErrorText() {
      try {
        await errorText({
          site_text: this.copiedText,
          suggested_text: this.correctText
        })
        this.$refs.modalComponentRef.closeModal()
        this.$swal.fire({
          color: '#A2A0B3',
          background: '#3A2F7D',
          timerProgressBar: true,
          icon: 'success',
          title: this.$t("modal.appeal-applied"),
          timer: 5500,
          showConfirmButton: false,
          customClass: {
            timerProgressBar: 'swal_timerProgressBar',
            popup: 'swal_popup',
          },
          didOpen: (toast) => {
            // toast.addEventListener('mouseenter', swal.stopTimer)
            // toast.addEventListener('mouseleave', swal.resumeTimer)
          }
        })
      } catch (e) {
        this.$swal.fire({
          color: '#A2A0B3',
          background: '#3A2F7D',
          timerProgressBar: true,
          icon: 'error',
          title: this.$t("modal.appeal-not-applied"),
          timer: 5500,
          showConfirmButton: false,
          customClass: {
            timerProgressBar: 'swal_timerProgressBar',
            popup: 'swal_popup',
          },
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', this.$swal.stopTimer)
            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
          }
        })
        console.log(e)
      }

    }
  },
  computed: {
    ...mapState(useSocialMediaStore, ['getSocials']),
  },
}
</script>
<script setup>


useHead({
  script: [
    {
      src: '/www.js',
      body: true
    }
  ]
})
const {locale, t: $t} = useI18n()
</script>
<style>

.the_navbar {
  width: 100% !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 990;
}

.gradient-overlay {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(83.34deg, rgba(23, 17, 66, 0.8) -4.52%, rgba(12, 47, 117, 0) 100%);
}

video {
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.swal2-confirm {
  padding: 20px 70px !important;
  background: transparent !important;
  color: #fff !important;
  border: 1px solid #fff !important;
}

.swal2-confirm:hover {
  background: #fff !important;
  color: #3A2F7D !important;
}


.logoRotation {
  perspective: 254rem;
  transform-style: preserve-3d;
}

.rotation {
  -webkit-animation-name: spinner;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 4s;
  animation-name: spinner;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 4s;
  animation-delay: 0.5s;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  transform-style: preserve-3d;

}

@keyframes spinner {
  from {
    -webkit-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
  to {
    -webkit-transform: rotateY(-360deg);
    transform: rotateY(-360deg);
  }
}
</style>
