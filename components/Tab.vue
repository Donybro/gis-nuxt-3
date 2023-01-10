<template>
  <div class="flex gap-[24px] relative">
    <div class="cursor-pointer text-[#8F8F8F] py-[12px]" :class="{'active': item.id === selectedItem}" v-for="item in tabItems" :key="item.id" @click="setSelectedItem(item)">
      {{item.title}}
    </div>
    <div class="absolute w-full h-[3px] bg-text_secondary bottom-0 left-0 z-10"></div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  emits:['update:selectedItem'],
  props:{
    selectedItem:{
      type:[Object,String,Number]
    },
    tabItems:{
      type:Array
    }
  },
  data() {
    return {
    }
  },
  methods: {
    setSelectedItem(item) {
      this.$emit('update:selectedItem',item.id)
    }
  },
}
</script>

<style scoped>

.active{
  @apply text-white border-b-[3px] border-white  z-[11]
}
</style>