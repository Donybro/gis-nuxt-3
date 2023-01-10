<template>
  <div class="py-[8px] flex justify-between">
    <NuxtLink to="/">
      <NavbarTitle/>
    </NuxtLink>
    <MenuList :key="locale" :menuList="shortMenuList"/>
  </div>

</template>

<script>
import NavbarTitle from "./NavbarTitle";
import MenuList from "../Menu/MenuList";
import '../Menu/menuList.css'
import {useMenuStore} from "../../store/menu";


export default {
  name: "NavbarBottom",
  components: {NavbarTitle,MenuList},
  async setup() {
    const {locale} = useI18n()
    const menuStore = useMenuStore()
    const shortMenuList = computed(() => menuStore.getShortMenuList)
    const route = useRouter()

    function goToMain() {
      route.push('/')
    }

    return {
      shortMenuList,
      goToMain,
      locale
    }
  }
}
</script>

<style>
</style>
