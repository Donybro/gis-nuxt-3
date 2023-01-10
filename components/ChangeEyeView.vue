<template>
  <Dropdown :show-arrow="false" :isOpen="isOpen" @open="isOpen = true" @close="isOpen = false" id="eyeDropDown">
    <template #placeholder>
      <Icon class="text-white h-[20px] w-[20px]" icon="ion:eye" />
    </template>
    <template #default>
      <div class="p-[10px] flex flex-col gap-[12px]" role="none">
        <div class="flex flex-col gap-[8px]">
          <p class="form-label text-text_secondary">{{$t('navbar.site-view')}}</p>
          <div class="flex justify-around gap-[5px]">
            <a
                id="menu-item-0"
                class="list-item"
                :class="view==='normal' ? 'bg-primary text-white':'bg-white text-primary'"
                role="menuitem"
                tabindex="-1"
                @click.prevent.stop="setView('normal')"
            >
              A
            </a>
            <a
                id="menu-item-1"
                class="list-item" role="menuitem"
                tabindex="-1"
                :class="view === 'grayscale'?'bg-white text-primary':'bg-black text-white'"
                @click.prevent.stop="setView('grayscale')"
            >
              A
            </a>
            <a
                id="menu-item-4" class="list-item" role="menuitem"
                tabindex="-1"
                :class="view === 'grayscale1'?'bg-white text-primary':'bg-gray-300 text-primary'"
                @click.prevent.stop="setView('grayscale1')"
            >
              A
            </a>
          </div>
        </div>
        <span class="h-[1px] w-full bg-text_secondary"></span>
        <div class="flex flex-col gap-[8px]">
          <label for="customRange3" class="form-label text-text_secondary">{{$t('navbar.shrift-size')}}</label>
          <input
              v-model="size"
              type="range"
              class="form-range appearance-nonew-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
              min="14"
              max="20"
              step="2"
              id="customRange3"
          />
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script>

import { Icon } from '@iconify/vue';
import Dropdown from "./Dropdown/DropDown";
export default {
  name: "ChangeEyeViewDropDown",
  components: {
    Dropdown,
    Icon
  },
  setup(){
    const {t:$t} = useI18n()
    const isOpen = ref(false)
    const view = ref('')
    const size = ref('')

    watch(()=>size.value,(val)=>{
      document.getElementsByTagName('html')[0].style.fontSize  = val+'px'
    })

    async function setView(v){
      view.value = v
      let html = document.querySelector("html")
      // let navbar = document.querySelectorAll('.the_navbar')[0]

      if( v ==='normal'){
        html.style.filter =''
      }
      if( v === 'grayscale'){
        html.style.filter ='grayscale(100%) invert(100%)'
      }
      if( v ==='grayscale1'){
        html.style.filter ='grayscale(1)'
      }
    }

    return{
      setView,
      isOpen,
      view,
      size,
    }
  }
};
</script>

<style scoped>
.list-item{
  @apply flex cursor-pointer block px-4 py-2 text-sm
}
</style>
