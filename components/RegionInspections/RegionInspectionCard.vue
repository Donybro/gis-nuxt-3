<template>
  <div class="bg-secondary pt-[42px] pb-[35px] px-[32px] border border-border_primary">
      <h3 class="font-roboto font-bold text-[1.15em] xl:text-[1.5em] leading-[31px] text-white mb-[48px]">{{inspectionInfo?.region}}</h3>
      <div class="flex flex-col gap-[48px]">
        <div class="card_wrapper">
            <div class="icon_wrapper">
              <Icon  icon="bi:person-fill" class="icon"  width="28" height="28" />
            </div>
            <div class="content_wrapper">
              <div class="title">{{$t('region-inspections.boss')}}</div>
              <div class="text">{{`${inspectionInfo?.last_name} ${inspectionInfo?.first_name} ${inspectionInfo?.father_name}`}}</div>
            </div>
        </div>
        <div class="card_wrapper">
            <div class="icon_wrapper">
              <Icon  icon="carbon:location-filled" class="icon"  width="28" height="28" />
            </div>
            <div class="content_wrapper">
              <div class="title">{{$t('card.address')}}</div>
              <div class="text">{{inspectionInfo?.address}}</div>
            </div>
        </div>
        <div class="card_wrapper">
            <div class="icon_wrapper">
              <Icon  icon="carbon:phone-filled" class="icon"   width="28" height="28" />
            </div>
            <div class="content_wrapper">
              <div class="title">{{$t('card.phone')}}</div>
              <div class="text">{{inspectionInfo?.phone}}</div>
            </div>
        </div>
        <div class="card_wrapper">
            <div class="icon_wrapper">
              <Icon  icon="ic:round-mail" class="icon"   width="28" height="28" />
            </div>
            <div class="content_wrapper">
              <div class="title">{{$t('card.email')}}</div>
              <div class="text">{{inspectionInfo?.mail}}</div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue";
export default {
  name: "RegionInspectorCard",
  components:{Icon},
  props:{
    inspectionInfo:{
      type:Object,
      default:()=>({
        first_name:'',
        last_name:'',
        father_name:'',
        address:'',
        phone:'',
        mail:''
      })
    }
  }
}
</script>

<style scoped>
.card_wrapper{
  @apply flex items-center gap-[12px]
}
.icon_wrapper{
  @apply p-[14px] bg-[#3C3976] my-[9px]
}
.icon{
  @apply w-[28px] h-[28px] text-white
}
.content_wrapper{
  @apply flex flex-col gap-[8px]
}
.title{
  @apply font-inter text-[1em] text-white leading-[24px]
}
.text{
  @apply text-text_secondary font-medium text-[1em] leading-[24px]
}
</style>
