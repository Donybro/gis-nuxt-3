<template>
  <div class="flex items-center">
    <button @click="setMenuOpen(true)">
      <Icon icon="entypo:menu" class="text-white w-[40px] h-[32px] md:w-[28px] md:h-[20px]"  />
    </button>
    <ClientOnly>
        <div v-if="isOpen" class="absolute h-screen w-full top-0 left-0 bg-primary z-[994] overflow-y-auto">
          <div class="w-full">
            <div class="">
              <div class="border-b border-text_secondary ">
              <div class="px-[8px] py-[8px] xl:py-[24px] container mx-auto">
                <NavbarTitle/>
              </div>
              </div>
              <BigMenuList class="my-[15px] xl:my-[60px] container mx-auto" @menu-list-click="setMenuOpen(false)"/>
            </div>
            <button class="fixed rounded bg-secondary bg-opacity-60 right-[20px] top-[20px]" type="button" @click="setMenuOpen(false)">
              <Icon class="text-text_secondary" width="32px" icon="ep:close-bold" />
            </button>
          </div>
        </div>
    </ClientOnly>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue";
import BigMenuList from "./BigMenuList";
import NavbarTitle from "../Navbar/NavbarTitle";
export default {
  name: "BigMenuButton",
  components:{NavbarTitle, BigMenuList, Icon},
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
  }
}
</script>

<style scoped>

</style>
