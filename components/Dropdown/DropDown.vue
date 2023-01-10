<template>
  <div v-click-away="closeDropdownHandler" class="relative inline-block flex items-center"
       :class="`DropDownForClickOutside${id}`">
    <div id="menu-button" class="text-[1em] font-inter inline-flex justify-between items-center w-full cursor-pointer"
         @click.stop="dropHandler">
      <slot name="placeholder"></slot>
      <div v-if="showArrow">
        <Icon v-if="isOpen" width="20px" icon="entypo:chevron-up" class="ml-2 text-white "/>
        <Icon v-else width="20px" icon="entypo:chevron-down" class="ml-2 text-white"/>
      </div>
    </div>
    <div v-if="isOpen" class="bg-secondary border border-border_primary z-20" :class="this.dropDownListPosition"
         role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1"
         @click.stop="closeDropdownHandler">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {Icon} from '@iconify/vue';

export default {
  name: 'Dropdown',
  emits: ['open', 'close'],
  props: {
    id: {
      type: String,
      required: true
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Icon
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  data() {
    return {
      dropDownListPosition: '',
      width: 0,
      height: 0
    };
  },
  mounted() {
    window?.addEventListener("resize", this.onResize)
    this.width = window.innerWidth;
    this.height = window.innerHeight
  },
  methods: {
    detectDropdownPosition({clientX: leftDistance, clientY: topDistance}) {
      let resultDropDownPosition = ''

      if (this.height - topDistance < 200) {
        // open top dropdown
        if (this.width - leftDistance < 200) {
          // open left side
          resultDropDownPosition = 'topLeftDropdownCommon'
        } else {
          // open right side
          resultDropDownPosition = 'topRightDropdownCommon'

        }
      } else {
        // open bottom dropdown
        if (this.width - leftDistance < 200) {
          // open left side
          resultDropDownPosition = 'bottomLeftDropdownCommon'
        } else {
          // not left , not right
          resultDropDownPosition = 'bottomRightDropdownCommon'
        }
      }
      return resultDropDownPosition

    },
    onResize(e) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    dropHandler(e) {
      if (!this.isOpen) {
        this.dropDownListPosition = this.detectDropdownPosition(e)
        this.openDropdownHandler()
      } else {
        this.closeDropdownHandler()
      }
    },
    closeDropdownHandler() {
      this.$emit('close')
    },
    openDropdownHandler() {
      this.$emit('open')
    },
  }
};
</script>

<style scoped>

</style>
