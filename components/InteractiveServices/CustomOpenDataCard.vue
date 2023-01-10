<template>
  <div class="rounded-[8px] shadow p-[20px] bg-secondary border border-border_primary ">
    <h1 @click="goToData" class="cursor-pointer text-[.825em] xl:text-[1.285em] text-text_secondary font-montserrat">
      {{ openData?.title }}</h1>
    <p @click="goToData" class="cursor-pointer text-white text-[.7em] xl:text-[1.2em] my-[12px]">
      {{ openData?.sub_menu }}</p>
    <div class="w-[52px] relative h-[52px]">
      <a v-if="openData.file" class="w-full h-full absolute top-0 left-0"
         :href="openData.file" target="_blank">
        <Icon icon="fa6-solid:file-pdf" class="text-text_secondary" width="100%" height="100%"/>
      </a>
      <Icon v-else icon="clarity:no-access-solid" class="cursor-not-allowed text-text_secondary" width="100%"
            height="100%"/>
    </div>
  </div>
</template>

<script>
import Badge from "../Badge";
import {Icon} from "@iconify/vue";

export default {
  name: "CustomOpenDataCard",
  components: {Badge, Icon},
  props: {
    openData: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
