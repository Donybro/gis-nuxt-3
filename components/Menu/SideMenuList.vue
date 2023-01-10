<template>
  <div class="px-[12px] xl:px-0">
    <div class="h-[1px] bg-text_secondary w-full my-[12px]"></div>
    <div class="grid grid-cols-1">
      <div v-for="menu in sideMenuList" :key="menu.title">
        <HoverGradientBox>
          <div @click="goToRouteBySlug(menu)"
               class="text-text_secondary hover:bg-primary_hovered text-[1em] text-white font-medium font-inter py-[10px] px-[16px] cursor-pointer"
               :class="currentRoute === menu.slug ? 'bg-primary' : 'bg-secondary'">
            {{ menu.title }}
          </div>
        </HoverGradientBox>
      </div>
    </div>
    <div class="h-[1px] bg-text_secondary w-full my-[12px]"></div>
  </div>
</template>

<script setup>
import HoverGradientBox from "../Cards/HoverGradientBox";

const props = defineProps({
  sideMenuList: {
    type: Array,
    required: true
  }
})

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

</script>

<style scoped>
</style>
