<template>
  <div class="flex bg-white items-center justify-between font-light text-sm xl:text-md py-3 px-4">
    <div class="flex items-center">
      <div class="relative inline-block text-left">
        <div>
          <button
            id="menu-button"
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            aria-expanded="true" aria-haspopup="true"
            @click="isOpen = !isOpen"
          >
            {{ pageSize }}
            <svg
              class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          v-if="isOpen"
          class="origin-top-right absolute z-30 left-0 mt-2 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
        >
          <div class="py-1" role="none">
            <a
              v-for="option in pageSizeOptions"
              id="menu-item-0" :key="option"
              class="text-gray-700 block px-4 py-2 text-sm active:bg-gray-100 active:text-gray-900"
              role="menuitem"
              tabindex="-1"
              @click="changePageSize(option)"
            >
              {{ option }}
            </a>
          </div>
        </div>
      </div>
      <span class="ml-4">Ko‘rsatish soni</span>
    </div>
    <div class="flex items-center">
      <p>
        <span
          class="mx-2 px-2 py-1 rounded border border-blue-500 ring-1 ring-indigo-600 ring-opacity-70"
        >{{ currentPage }}</span>
        dan <span class="mx-2">{{ allPagesCount }}</span>
      </p>
      <button
        class="px-1 py-1 mr-3 rounded bg-gray-200"
        :class="{'opacity-40 cursor-not-allowed hover:bg-gray-200 hover:text-black':prevBtnDisabled,'hover:bg-indigo-600 hover:text-white':!prevBtnDisabled}"
        :disabled="prevBtnDisabled"
        @click="prevBtnClicked"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        class="px-1 py-1 rounded bg-gray-200"
        :class="{'opacity-40 cursor-not-allowed hover:bg-gray-200 hover:text-black':nextBtnDisabled,'hover:bg-indigo-600 hover:text-white':!nextBtnDisabled}"
        :disabled="nextBtnDisabled"
        @click="nextBtnClicked"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  allPagesCount: {
    required: true,
    type: Number,
  },
  pageSize: {
    required: true,
    type: Number,
  },
  currentPage: {
    required: true,
    type: Number,
  },
  pageSizeOptions: {
    type:Array,
    required:true
  }
})

const emit = defineEmits(['page-size-changed','pagination-btn-clicked'])

const isOpen = ref(false)

const nextBtnDisabled = computed(() => {
  return (props.currentPage === props.allPagesCount) || (props.allPagesCount === 0);
})
const prevBtnDisabled = computed(() => {
  return (props.currentPage === 1) || (props.allPagesCount === 0);
})

function prevBtnClicked() {
  emit('pagination-btn-clicked', 'PREV');
}

function nextBtnClicked() {
  emit('pagination-btn-clicked', 'NEXT');
}

function changePageSize(val) {
  emit('page-size-changed', val);

  isOpen.value = false
}

</script>

<style scoped>

</style>
