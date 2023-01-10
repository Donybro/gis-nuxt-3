 <template>
   <div class="h-full">
     <div class="flex flex-col items-center h-full">
       <span  class="!bg-white h-full w-[3px]"></span>
       <div class="flex flex-col inline-block items-center gap-[30px] my-[40px]">
         <nuxt-link to='/connect/hotline'>
             <button :title="$t('page-titles.connect.hotline')" class="social_button hover:drop-shadow-[0_5px_30px_#3D8DFF] group">
               <Icon class="brand-icon group-hover:text-[#3D8DFF]"  icon="mdi:card-account-mail" />
             </button>
         </nuxt-link>
         <nuxt-link title="facebook" v-if="socials.facebook" target="_blank" :to="socials.facebook">
           <button class="social_button hover:drop-shadow-[0_5px_30px_#3D8DFF] group"><Icon class="brand-icon group-hover:text-[#3D8DFF]" icon="brandico:facebook" /></button>
         </nuxt-link>
         <nuxt-link title="instagram" v-if="socials.instagram" target="_blank" :to="socials.instagram">
           <button class="social_button hover:drop-shadow-[0_5px_30px_#3D8DFF] group"><Icon class="brand-icon group-hover:text-[#3D8DFF]" icon="akar-icons:instagram-fill" /></button>
         </nuxt-link>
         <nuxt-link title="telegram" v-if="socials.telegram"  target="_blank" :to="socials.telegram">
           <button class="social_button hover:drop-shadow-[0_5px_30px_#3D8DFF] group"><Icon class="brand-icon group-hover:text-[#3D8DFF]" icon="bxl:telegram" /></button>
         </nuxt-link>
         <nuxt-link title="youtube"  v-if="socials.youtube" target="_blank" :to="socials.youtube">
           <button class="social_button hover:drop-shadow-[0_5px_30px_#3D8DFF] group"><Icon class="brand-icon group-hover:text-[#3D8DFF]" icon="bxl:youtube" /></button>
         </nuxt-link>
       </div>
       <span  class="!bg-white h-full  w-[3px]"></span>
     </div>
   </div>
</template>

<script>
import {Icon} from "@iconify/vue";
import Devider from "./Devider";
export default {
  name: "HeaderSocial",
  components: {Devider,Icon},
  props:{
    socials:{
      type:Object,
      default:()=>({
        facebook:'',
        instagram:'',
        telegram:'',
        youtube:''
      })
    }
  }
}
</script>

<style scoped>
.social_button{
  @apply p-[15px] rounded-full border-[2px] border-white hover:border-[#3D8DFF]
}

.brand-icon{
  @apply text-white h-[30px] w-[30px]
}
</style>
