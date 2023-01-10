<template>
  <div class="flex items-center justify-center gap-[8px] md:gap-[12px]">
    <button
        class="arrow_button"
        :class="{'opacity-40 cursor-not-allowed hover:bg-gray-200 hover:text-black':prevBtnDisabled,'hover:bg-indigo-600 hover:text-white':!prevBtnDisabled}"
        :disabled="prevBtnDisabled"
        @click.prevent.stop="prevBtnClicked"
    >
      <Icon width="16px" height="16px" icon="ooui:previous-ltr" />
    </button>
    <button @click.prevent.stop="paginationBtnClicked(p)" class="pagination_button" :class="{'active_btn':currentPage===p}" v-for="p in chunkedPages[currentPageChunk]">
      {{p}}
    </button>
    <button
        class="arrow_button"
        :class="{'opacity-40 cursor-not-allowed hover:bg-gray-200 hover:text-black':nextBtnDisabled,'hover:bg-indigo-600 hover:text-white':!nextBtnDisabled}"
        :disabled="nextBtnDisabled"
        @click.prevent.stop="nextBtnClicked"
    >
      <Icon class="w-[16px] h-[16px]" icon="ooui:previous-rtl" />
    </button>
    <span v-if="currentPage !== allPagesCount && (chunkedPages.length>1) && !chunkedPages[currentPageChunk].includes(allPagesCount)" class="text-text_secondary">
      ...
    </span>
    <button v-if="currentPage !== allPagesCount && (chunkedPages.length>1) && !chunkedPages[currentPageChunk].includes(allPagesCount)" class="pagination_button" @click.prevent.stop="paginationBtnClicked(allPagesCount)">
      <span class="w-[16px] h-[16px]">{{allPagesCount}}</span>
    </button>
  </div>
</template>

<script setup>
import chunk  from 'lodash.chunk'
import {Icon} from "@iconify/vue";

const props = defineProps({
  allPagesCount: {
    required: true,
    type: Number,
  },
  currentPage: {
    required: true,
    type: Number,
  }
})

let pageChunkSize = 4


const {allPagesCount,currentPage} = toRefs(props)


const emit = defineEmits(['pagination-btn-clicked'])


const currentPageChunk = ref(0)

let pages = []
for(let i = 1; i<=allPagesCount.value ;i++){
  pages.push(i)
}
const chunkedPages= ref(chunk(pages,pageChunkSize))

// [ [1,2,3,4],[5,6,7,8] ]

watch(()=>currentPage.value,(val)=>{
  if(val > chunkedPages.value[currentPageChunk.value][pageChunkSize-1]){
    currentPageChunk.value++
  }else if(val < chunkedPages.value[currentPageChunk.value][0]){
    currentPageChunk.value--
  }
})


const nextBtnDisabled = computed(() => {
  return (props.currentPage === props.allPagesCount) || (props.allPagesCount === 0);
})
const prevBtnDisabled = computed(() => {
  return (props.currentPage === 1) || (props.allPagesCount === 0);
})

function prevBtnClicked() {
  emit('pagination-btn-clicked', currentPage.value - 1);
}

function nextBtnClicked() {
  emit('pagination-btn-clicked', currentPage.value + 1);
}
function paginationBtnClicked(val){
  emit('pagination-btn-clicked', val);
}

</script>

<style scoped>
.pagination_button{
  @apply py-[8px] px-[8px] md:px-[15px] text-text_secondary text-[1em] border border-[#A2A0B3]
}
.arrow_button{
  @apply py-[12px] px-[8px] md:px-[15px] text-text_secondary text-[1em] border border-[#A2A0B3]
}
.active_btn{
  @apply bg-[#7F7ADD] text-white
}
</style>
