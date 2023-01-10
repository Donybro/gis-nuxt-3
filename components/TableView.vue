<template>
  <div class="bg-white p-3">
    <div class="bg-white flex justify-between items-center">
      <slot name="filter-additional-content" />
    </div>
    <slot name="loading"></slot>
    <slot name="table-content" />
    <Pagination
      :page-size-options="pageSizeOptions"
      :page-size="pageSize"
      :all-pages-count="allPagesCount"
      :current-page="currentPage"
      @pagination-btn-clicked="paginationBtnClicked"
      @page-size-changed="changePageSize"
    />
  </div>
</template>

<script setup>
import dayjs from "dayjs";


const emit = defineEmits(['table-options-changed','update:current-page','update:page-size'])
const props = defineProps({
  allPagesCount: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    required:true,
    default: 1
  },
  showStatusTab: {
    type: Boolean,
    default: true,
  },
  pageSizeOptions:{
    type:Array,
    default:function (){
      return [10,15,20]
    }
  }
});


onMounted(() => {
  // initializeQueriesFromURL();
})

const route = useRoute();
const router = useRouter();

// function setQueryToURL(queryName, queryValue) {
//   router.push({
//     path: route.path,
//     query: {
//       ...route.query,
//       [queryName]: queryValue,
//     },
//   });
// }
// function initializeQueriesFromURL() {
//   const {page, page_size} = route?.query;
//   if (page) {
//     emit('table-options-changed', {
//       page
//     })
//   }
//   if (page_size) {
//     pageSize.value = (+page_size)
//     emit('table-options-changed', {
//       page_size
//     })
//   }
// }

async function paginationBtnClicked(val) {
  if (val === 'PREV') {
    emit('update:current-page',props.currentPage - 1)
    // await setQueryToURL('page', props.currentPage - 1);
  }
  if (val === 'NEXT') {
    emit('update:current-page',props.currentPage + 1)
    // await setQueryToURL('page', props.currentPage + 1);
  }
}


async function changePageSize(selectedPageSize) {
  emit('update:page-size',selectedPageSize)
  // await setQueryToURL('page_size', selectedPageSize)
  // await setQueryToURL('page_size', val);
}

function normalizeDate(date) {
  return dayjs(date).format('DD.MM.YYYY').split('.').reverse().join('-');
}

</script>

<style scoped>

</style>
