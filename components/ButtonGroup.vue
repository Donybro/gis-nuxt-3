<template>
  <div class="flex justify-around border rounded w-full p-[2px] box-border bg-white">
    <button
        v-for="item in titles"
        :key="item.title"
        tabindex="0"
        :style="`width: ${(100/titles.length)-1}%`"
        class="text-center text-sm py-2 h-full box-border rounded"
        :class="{'bg-primary text-white shadow' : item.title === activeBtnTitle , 'text-gray-900 bg-white':item.title!==activeBtnTitle}"
        @click.prevent="setItem(item)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  titles: {
    type:Array,
  },
  selectedItem: {
    type:[Object,Boolean,String]
  }
})
const emit = defineEmits(['update:selected-item'])
const activeBtnTitle = ref('')
const {selectedItem,titles} = toRefs(props)

console.log(selectedItem.value)

watch(()=>selectedItem.value,val=>{
  if(typeof val !== 'undefined'){
    console.log(val)
    console.log(titles.value.filter(t=>t.type === val)[0])
    setItem(titles.value.filter(t=>t.type === val)[0])
  }
},{
  immediate:true
})

function setItem(item) {
  activeBtnTitle.value = item.title;
  emit('update:selected-item', item.type);
}

</script>

<style scoped>

</style>
