<template>
  <HoverGradientBox @click="$emit('click',slug)" class="cursor-pointer group">
    <div class="bg-secondary hover:bg-primary_hovered p-[24px] flex flex-col items-center">
      <div class="w-[120px] h-[120px] p-[20px] bg-[#3C3976] mb-[40px]">
        <nuxt-img v-if="iconSource"  width="80" height="80"   alt="image"  format="webp" :src="iconSource.replace('http://', 'https://')" />
      </div>
      <h4 class="font-semibold text-center text-[1.25em] leading-[24px] font-inter h-[48px] line-clamp-2  text-white mb-[18px]">
        {{ title }}</h4>
      <p :title="text"
         class="text-text_secondary text-center text-[1em] leading-[22px] font-inter line-clamp-4 min-h-[90px] max-h-[90px]">
        {{ text }}
      </p>
    </div>
  </HoverGradientBox>
</template>

<script>
import HoverGradientBox from "../Cards/HoverGradientBox";

export default {
  name: "InteractiveServiceCard",
  components: {HoverGradientBox},
  emits: ['click'],
  props: {
    iconSource: {
      type: String,
      default: 'https://i.picsum.photos/id/1018/3914/2935.jpg?hmac=3N43cQcvTE8NItexePvXvYBrAoGbRssNMpuvuWlwMKg'
    },
    title: {
      type: String,
      default: 'Tekshirishlar jadvali'
    },
    text: {
      type: String,
      default: 'Davlat organlari va boshqa tashkilotlarda AKT va axborot xavfsizlikni joriy etish va rivojlantirish holati bo‘yicha tekshirishlar jadvali'
    },
    slug: {
      type: String,
      default: ''
    },
  }

}
</script>

<style>
:root {
  --popper-theme-background-color: #3C3971;
  --popper-theme-background-color-hover: #4a468c;
  --popper-theme-text-color: #A2A0B3;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 5px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>