<template>
  <div class="w-full h-full">
    <button @click="setMenuOpen(true)" class="border border-white rounded-full p-[5px]">
      <Icon class="text-white" width="25px" icon="majesticons:menu-expand-right-line" />
    </button>
    <ClientOnly>
        <div v-if="isOpen" class="absolute h-screen! w-full! top-0 left-0 bottom-0 right-0 bg-primary z-[994] overflow-y-auto">
          <div class="relative w-full">
            <div class="container mx-auto">
              <div class="border-b border-text_secondary py-[24px]">
                <NavbarTitle/>
                <SideMenuList :sideMenuList="sideMenuList"/>
              </div>
            </div>
            <button class="absolute top-0 right-0" type="button" @click="setMenuOpen(false)">
              <Icon class="text-text_secondary" width="32px" icon="carbon:close-filled" />
            </button>
          </div>
        </div>
    </ClientOnly>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue";
import NavbarTitle from "./Navbar/NavbarTitle";
import SideMenuList from "./Menu/SideMenuList";
export default {
  name: "SideBarMenuNavigatorButton",
  components:{SideMenuList, NavbarTitle, Icon},
  data() {
    return {
      isOpen: false
    }
  },
  methods:{
    setMenuOpen(cond){
      console.log(cond)
      this.isOpen = cond
    }
  },
  props:{
    sideMenuList:{
      type:Array,
      required:true
    }
  }
}
</script>

<style scoped>

</style>