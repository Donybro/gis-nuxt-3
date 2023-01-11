<template>
  <div class="shadow cursor-pointer group h-full">
    <a :href="source" data-fancybox="gallery" class="w-full h-full block">
      <nuxt-img v-if="image"  width="342" height="200" class="mb-[8px] object-cover"  alt="image"  format="webp" :src="image.replace('http://', 'https://')" />
      <Icon v-else icon="bi:image-fill" class="w-[342px] h-[200px] text-text_secondary" />
      <span class="text-text_secondary font-semibold font-montserrat group-hover:text-[#3D8DFF] text-[1.25em] h-[90px] min-h-[83px] line-clamp-3">{{title}}</span>
    </a>
  </div>
</template>

<script>
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import {Icon} from "@iconify/vue";

export default {
  components:{
    Icon
  },
  props:{
    source:String,
    image:String,
    type:String,
    title:String
  }
}
</script>
