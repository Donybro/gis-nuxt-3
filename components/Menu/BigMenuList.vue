<template>
  <div class="px-[12px] xl:px-0">
    <div class=" flex items-center xl:hidden gap-[16px] mb-[18px]">
      <SearchBox/>
      <ChangeEyeViewDropDown/>
      <button class="speech_btn">
        <Icon class="brand-icon" icon="ion:volume-medium-sharp" />
      </button>
      <ClientOnly>
        <ChangeLangDropDown/>
      </ClientOnly>
    </div>
    <div class="xl:hidden h-[1px] bg-text_secondary w-full my-[12px]"></div>
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-[24px] flex-wrap ">
      <div v-for="menu in fullMenuList" :key="menu.id" class="flex flex-col gap-[32px]">
        <h5 class="text-white text-[1.15em] xl:text-[1.5em] font-roboto font-bold">{{menu.title}}</h5>
        <ul class="pl-[12px] xl:pl-0 flex flex-col gap-[15px]">
          <li
              class="text-[1.12em] font-montserrat  hover:text-white cursor-pointer"
              v-for="submenu in menu.submenu"
              :key="submenu.id"
              :class="currentRoute === submenu.slug ? 'text-white font-bold bg-secondary' : 'text-text_secondary font-semibold '"
              @click="menuListClickHandler(submenu.slug)">
            {{submenu.title}}
          </li>
        </ul>
      </div>
    </div>
    <div class="xl:hidden h-[1px] bg-text_secondary w-full my-[12px]"></div>
    <div class="mt-[30px]  flex flex-wrap items-center xl:hidden gap-[14px] w-full">
      <div class="nav-content">
        <Icon icon="ic:baseline-location-on" class="icon" />
        <p>{{$t('navbar.address')}}</p>
      </div>
      <Devider/>
      <nuxt-link to="tel:+998712026965" class="nav-content">
        <Icon icon="ic:round-local-phone" class="icon" />
        +998 (71) 202-69-65
      </nuxt-link>
      <Devider/>
      <nuxt-link class="nav-content" to="mailto:info@gis.uz">
        <Icon icon="ic:round-email" class="icon" />
        info@gis.uz
      </nuxt-link>
    </div>
    <div class="mt-[30px] flex items-center xl:hidden">
      <nuxt-link v-if="socials.facebook" target="_blank" :to="socials.facebook">
        <Icon class="brand-icon" icon="brandico:facebook" />
      </nuxt-link>
      <nuxt-link v-if="socials.instagram" target="_blank" :to="socials.instagram">
        <Icon class="brand-icon" icon="akar-icons:instagram-fill" />
      </nuxt-link>
      <nuxt-link v-if="socials.telegram"  target="_blank" :to="socials.telegram">
        <Icon class="brand-icon" icon="bxl:telegram" />
      </nuxt-link>
      <nuxt-link title="youtube"  v-if="socials.youtube" target="_blank" :to="socials.youtube">
        <Icon class="brand-icon" icon="bxl:youtube" />
      </nuxt-link>
    </div>
    <div class=" h-[1px] bg-text_secondary w-full my-[12px]"></div>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-[22px] font-inter py-[24px]">
      <p class="text-[0.875em] text-text_secondary">
        {{$t('footer.copyright')}}
      </p>
      <p class="text-[0.875em] text-text_secondary">
        {{$t('footer.attention-text')}}
      </p>
      <div class="flex flex-col">
        <p v-if="locale === 'ru' || locale === 'en'" class="text-white text-right">{{$t('footer.created-by')}} <nuxt-link target="_blank" :href="technocorpUrl" class="font-semibold text-[#45A57D]">TECHNOCORP </nuxt-link></p>
        <p v-else class="text-white text-right"><nuxt-link target="_blank" :href="technocorpUrl" class="font-semibold text-[#45A57D]">TECHNOCORP </nuxt-link>{{$t('footer.created-by')}}</p>
        <p class="text-text_secondary w-[100%] self-end text-right text-[0.87em]">{{$t('footer.remind')}}</p>
      </div>
    </div>
  </div>

</template>

<script setup>
import { Icon } from '@iconify/vue';
import {useMenuStore} from "../../store/menu";
import {useSocialMediaStore} from "../../store/socials";
import SearchBox from "../SearchBox";
import ChangeEyeViewDropDown from "../ChangeEyeView";
import ChangeLangDropDown from "../ChangeLangDropDown";

const { locale} = useI18n()
const emit = defineEmits(['menu-list-click'])
const menuStore = useMenuStore()
const fullMenuList  = computed(()=>menuStore.fullMenuList)
const socialsStore = useSocialMediaStore()
const route = useRoute()
const currentRoute = computed(()=>route.path)
const socials = computed(()=>socialsStore.getSocials)

function menuListClickHandler(path){
  if(path){
    navigateTo(path)
    emit('menu-list-click')
  }
}

const technocorpUrl = computed(()=>{
  return locale.value === 'ru' ? 'https://technocorp.uz/ru' : 'https://technocorp.uz'
})
</script>

<style scoped>
.icon{
  @apply  text-white h-[18px] w-[18px] mr-[6px]
}
.brand-icon{
  @apply text-white h-[18px] w-[18px]  mr-[20px]
}
.nav-content{
  @apply text-text_secondary flex items-center text-[0.875em] font-inter
}
</style>
