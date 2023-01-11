<template>
  <div
      v-if="isOpen"
      class="fixed inset-0 z-[9999] h-screen overflow-auto bg-gray-800 bg-opacity-80 flex items-center"
      :class="modalContentPosition"
      @click="clickAwayHandler"
  >
    <div
        class="overflow-y-auto modal_content"
        v-bind="$attrs"
        @click.stop
    >
      <slot name="header" />
      <div class="relative">
        <span
            v-if="!hideCloseButton"
            class="absolute clickEffectBtn right-1 top-1 cursor-pointer text-gray-300"
            @click="closeModal"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <slot
            name="slotBody"
            :closeModal="closeModal"
        />
      </div>
      <slot
          name="footer="
          :closeModal="closeModal"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalPosition: {
      type: String,
      default:'center',
      required: true,
    },
    closeOnClickAway: {
      type: Boolean,
      default: true
    },
    hideCloseButton: {
      type: Boolean,
      default: false
    }
  },
  inheritAttrs: false,
  emits:['open','close'],
  data() {
    return {
      isOpen: false,
      modalContentPosition: {
        'justify-center': this.modalPosition === 'center',
        'justify-end': this.modalPosition === 'right',
        'justify-start': this.modalPosition === 'left',
        'px-[20px] xl:px-[150px]': this.modalPosition === 'center',
      },
      modalContentMinWidth: {},
      externalData: {},
      modalName:''
    }
  },
  computed: {
    clickAwayHandler() {
      return this.$props.closeOnClickAway ? this.closeModal : null
    }
  },
  methods: {
    setExternalData(key,data){
      this.externalData[key] = data
    },
    getExternalData(key){
      return this.externalData[key]
    },
    closeModal() {
      this.isOpen = false;
      this.$emit('close')
    },
    openModal() {
      this.$emit('open')
      this.isOpen = true;
    },
  },
};

</script>

<style scoped>
.modal_content {
  animation: fadeInAnimation ease 200ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
