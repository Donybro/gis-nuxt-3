<template>
  <div :class="{'sticky top-[197px]':isFixed,'relative':!isFixed}">
    <div :key="locale" class="border border-border_primary bg-secondary py-[12px] w-full hidden xl:flex flex-col">
      <h4 class="font-montserrat font-semibold  px-[16px] text-[1.12em] text-white mb-[24px]">
        {{ currentMenuByPagePath?.menuTitle }}</h4>
      <div class="">
        <div v-for="menu in currentMenuByPagePath?.submenuList" :key="menu.title">
          <HoverGradientBox>
            <div @click="goToRouteBySlug(menu)"
                 class="hover:text-white hover:bg-primary_hovered text-[1em] font-medium font-inter py-[10px] px-[16px] cursor-pointer"
                 :class="currentRoute === menu.slug ? 'bg-primary text-white' : 'bg-secondary text-text_secondary'">
              {{ menu.title }}
            </div>
          </HoverGradientBox>
        </div>
      </div>
    </div>
    <!--        <SideBarMenuNavigatorButton class="xl:hidden sticky right-0 top-[100px]" :sideMenuList="currentMenuByPagePath?.submenuList"/>-->
  </div>
</template>

<script setup>
import HoverGradientBox from "../Cards/HoverGradientBox";
import {useMenuStore} from "../../store/menu";


const route = useRoute()

const props = defineProps({
  preLoadedMenuName: String,
  isFixed: {
    type: Boolean,
    required: false,
    default: true
  }
})
const {locale} = useI18n({useScope: 'global'})
const {preLoadedMenuName} = toRefs(props)
const currentRoute = computed(() => route.path)
const menuStore = useMenuStore()

function goToRouteBySlug(menu) {
  if (menu.link) {
    window.open(menu.link, '_blank').focus();
    // window.location.href = menu.link
  } else if (menu.slug) {
    navigateTo({
      path: menu.slug
    })
  }

}

const currentMenuByPagePath = ref({
  menuTitle: '',
  submenuList: []
})

watch(() => menuStore.fullMenuList, () => {
  getMenuList()
})

onMounted(() => {
  getMenuList()
})


const fullMenuList = computed(() => menuStore.fullMenuList)


function getMenuList() {
  if (preLoadedMenuName.value) {
    const {title, submenu} = fullMenuList.value.find(m => m.name === preLoadedMenuName.value)
    currentMenuByPagePath.value = {
      menuTitle: title,
      submenuList: submenu
    }
  } else {
    const allSubmenus = []
    fullMenuList.value.forEach(menu => menu.submenu.forEach(sm => allSubmenus.push(sm)))
    const currentSubmenu = allSubmenus.find(submenu => currentRoute.value.includes(submenu.slug))
    if (currentSubmenu) {
      const {title, submenu} = fullMenuList.value.find((menu) => menu.id === currentSubmenu.menu)
      currentMenuByPagePath.value = {
        menuTitle: title,
        submenuList: submenu
      }
    }
  }
}

</script>
