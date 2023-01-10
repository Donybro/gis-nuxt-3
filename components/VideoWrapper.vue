<template>
  <div class="shadow cursor-pointer relative">
    <a :href="source" data-fancybox="gallery" :data-text="title" class="w-full h-full relative block">
      <img v-if="image" :src="image" class="w-full h-full object-cover" />
      <Icon v-else icon="dashicons:video-alt3" class="w-full h-full text-text_secondary" />
      <span class="absolute top-[calc(50%-26px)] left-[calc(50%-26px)] rounded-full">
         <img src="/icons/Play.svg" class="w-[60px] h-[60px]" alt="">
      </span>
      <span class="absolute bottom-0 bg-[#3C3971] bg-opacity-40">
        <p v-if="title" class="w-full text-white font-montserrat text-[1em] break-words  line-clamp-2" >
          {{title}}
        </p>
      </span>
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
    title:String,
  }
}
</script>
