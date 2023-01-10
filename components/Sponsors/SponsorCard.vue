<template>
      <div class="bg-secondary hover:bg-primary_hovered  p-[12px] flex flex-col items-center gap-[16px] border border-border_primary">
        <div class="">
          <img :src="iconSource" class="w-full h-[62px] object-contain" alt="">
        </div>
        <p class="text-text_secondary text-center text-[1em] leading-[22px] font-inter line-clamp-3 h-[70px]">{{text}}</p>
      </div>
</template>

<script>
import HoverSolidGradientBox from "../Cards/HoverSolidGradientBox";
export default {
  name: "SponsorCard",
  components: {HoverSolidGradientBox},
  props:{
    iconSource:{
      type:String,
      default:'https://i.picsum.photos/id/1018/3914/2935.jpg?hmac=3N43cQcvTE8NItexePvXvYBrAoGbRssNMpuvuWlwMKg'
    },
    text:{
      type:String,
      default:'Geologiya sohasidagi ilmiy tadqiqotlar tashkiloti'
    },
  }
}
</script>

<style scoped>

</style>