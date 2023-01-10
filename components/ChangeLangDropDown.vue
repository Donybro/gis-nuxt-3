<template>
  <Dropdown :show-arrow="true" :isOpen="isOpen" @open="isOpen = true" @close="isOpen = false" id="changelangDropDown">
      <template #placeholder>
        <p class="text-white">{{langs[locale]}}</p>
      </template>
      <template #default>
        <div class="py-1" role="none">
          <a
              id="menu-item-1" class="list-item" role="menuitem"
              tabindex="-1"
              :class="{ 'bg-primary text-white': locale === 'uz'}"
              @click.prevent.stop="setAppLocale('uz')"
          >
            O`zbek tili
          </a>
          <a
              id="menu-item-4" class="list-item" role="menuitem"
              tabindex="-1"
              :class="{ 'bg-primary text-white': locale === 'uzb'}"
              @click.prevent.stop="setAppLocale('uzb')"
          >
            Ўзбек тили
          </a>
          <a
              id="menu-item-2"
              class="list-item" role="menuitem"
              tabindex="-1"
              :class="{ 'bg-primary text-white': locale==='ru'}"
              @click.prevent.stop="setAppLocale('ru')"
          >
            Русский язык
          </a>
          <a
              id="menu-item-0"
              class="list-item"
              :class="{ 'bg-primary text-white': locale==='en'}"
              role="menuitem"
              tabindex="-1"
              @click.prevent.stop="setAppLocale('en')"
          >
            English
          </a>
        </div>
      </template>
  </Dropdown>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import {useMenuStore} from "~/store/menu";
import Dropdown from "./Dropdown/DropDown";
const { locale,setLocale} = useI18n()
const localeCookie = useCookie('locale')
const setAppLocale = (l)=>{
  setLocale(l)
  localeCookie.value = l
  isOpen.value = false
}

const isOpen = ref(false)
const langs = {
  ru:"Ру",
  uz:"O'zb",
  uzb:"Ўзб",
  en:"En"
}
const menuStore = useMenuStore()

watch(()=>locale.value,async()=>{
  await menuStore.fetchMenuList()
})
</script>

<style scoped>
.list-item{
  @apply flex cursor-pointer block px-4 py-2 text-sm text-text_secondary hover:bg-primary hover:text-white
}
</style>
