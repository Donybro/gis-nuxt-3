<template>
  <div class="">
    <h1 class="section_title">{{ $t('main-page.interactive-services') }}</h1>
    <div class="flex items-center gap-[24px]">
      <button @click="slidePrev">
        <Icon class="text-text_secondary w-[35px] h-[35px]" icon="akar-icons:chevron-left"/>
      </button>
      <div class="swiper swiper1">
        <div class="swiper-wrapper" :key="$i18n.locale || slidesPerView">
          <div class="swiper-slide" v-for="item in servicesList" :key="item">
            <InteractiveServiceCard :title="item.title" :text="item.text" :iconSource="item.iconSource"
                                    :slug="item.slug"
                                    @click="serviceCardClickHandler"/>
          </div>
        </div>
      </div>
      <button @click="slideNext">
        <Icon class="text-text_secondary w-[35px] h-[35px]" icon="akar-icons:chevron-right"/>
      </button>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
// import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation'
import InteractiveServiceCard from "./InteractiveServiceCard";
import {mapState} from "pinia";
import {useWindowSizeStore} from "../../store/window";
import {Icon} from "@iconify/vue";

export default {
  data() {
    return {
      swiperInstance: null
    }
  },
  components: {InteractiveServiceCard, Icon},
  methods: {
    serviceCardClickHandler(slug) {
      this.$router.push(slug)
    },
    createSwiper() {
      this.swiperInstance = new Swiper('.swiper1', {
        loop: true,
        slidesPerView: this.slidesPerView,
        spaceBetween: 24,
      });
    },
    slideNext() {
      console.log(this.swiperInstance)
      this.swiperInstance.slideNext()
    },
    slidePrev() {
      console.log(this.swiperInstance)
      this.swiperInstance.slidePrev()
    }
  },
  watch: {
    slidesPerView() {
      this.createSwiper()
    }
  },
  computed: {
    ...mapState(useWindowSizeStore, {
      slidesPerView: store => {
        if (store.isWindowSmallerThanMD) {
          return 1
        } else if (store.isWindowSmallerThanXL) {
          return 2
        } else return 4
      }
    }),
    servicesList() {
      return [
        {
          iconSource: '/icons/Ochiq_ma_lumotlar.svg',
          title: this.$t("interactive-services.open-data"),
          slug: '/interactive_service/open_data',
          text: this.$t("interactive-services.open-data-text")
        },
        {
          iconSource: '/icons/service1.svg',
          title: this.$t("interactive-services.check-table"),
          slug: '/events/schedule',
          text: this.$t("interactive-services.check-table-text")
        },
        {
          iconSource: '/icons/service2.svg',
          title: this.$t("interactive-services.for-entrepreneur"),
          slug: '/interactive_service/for_entrepreneur',
          text: this.$t("interactive-services.for-entrepreneur-text")
        },
        {
          iconSource: '/icons/service3.svg',
          title: this.$t("interactive-services.problem-solution"),
          slug: '/consumer_note/troubleshooting_guides',
          text: this.$t("interactive-services.problem-solution-text")
        },
        {
          iconSource: '/icons/service4.svg',
          title: this.$t("interactive-services.take-answer"),
          slug: '/connect/network#feedback',
          text: this.$t("interactive-services.take-answer-text")
        }
      ]
    },
  },
  mounted() {
    this.createSwiper()
  }
}

</script>

<style scoped>
.swiper {
  height: 400px;
}
</style>
