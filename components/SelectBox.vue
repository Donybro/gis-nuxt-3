<template>
  <div v-click-away="closeSelectBox" class="relative cursor-pointer w-full h-full">
    <button v-bind="$attrs" tabindex="0" class="relative w-full h-full bg-secondary border border-border_primary  focus:outline-none offset_ring_when_focus" @keydown="handleListKeyDown" @click.prevent="selectBoxClickHandler">
        <span class="flex justify-between items-center h-full">
          <span class="textMain" v-if="optionsIsEmpty && !searchBox">
            {{ placeholder }}
          </span>
          <input v-if="searchBox && optionsIsEmpty" class="text-text_secondary bg-transparent placeholder:text-[1.12em] text-[1.12em] h-full w-full pl-[12px] pr-[37px]" @focusout="searchFocusOut" @focusin="searchFocusIn"  type="text"  v-model="search">
          <span v-if="modelValue && selectedOption" class="whitespace-nowrap text-[1.12em] py-[10px] px-[12px] overflow-hidden overflow-ellipsis textMain">
            {{ selectedOption[showBy] }}
          </span>
        <span v-if="selectedOptions.length" class="flex flex-wrap gap-4">
          <span v-for="option in selectedOptions" :key="option[trackBy]" class="px-[6px] text-[1.12em] textMain bg-primary  flex items-center">
            {{ option[showBy] }}
            <button class="bg-primary" @click.stop.prevent="deleteItemFromSelectedOptions(option)">
              <Icon icon="mdi:close" class="text-white ml-3" width="20" />
            </button>
          </span>
        </span>
        <span class="absolute right-[10px] h-full">
          <span class="flex items-center h-full">
            <button tabindex="-1" @click.stop.prevent="clearSelectedValue">
              <Icon v-if="searchBox && !optionsIsEmpty" icon="mdi:close-circle" class="text-gray-600"  height="25px" width="25px" />
            </button>
            <Icon @click.stop.prevent="toggleSelectBox" v-if="isOpen" icon="mdi:chevron-up" class="text-gray-600" height="35px" width="35px" />
            <Icon @click.stop.prevent="toggleSelectBox" v-else icon="mdi:chevron-down" class="text-gray-600" height="35px" width="35px" />
          </span>
      </span>
      </span>
    </button>
    <ul v-if="options" :tabindex="-1" class="absolute top-full left-0 w-full bg-secondary py-[10px] shadow border border-border_primary  z-10" :class="{'hidden': !isOpen}">
      <li
        v-for="(item) in filteredOptions" :key="item" :tabindex="0"
        class="py-[8px] px-[10px] textMain  hover:bg-primary hover:text-white cursor-pointer"
        :class="{
          'text-white bg-gray-200 hover:text-white hover:bg-red-600': optionIsSelected(item),
          'bg-primary text-white': selectedOption && item[showBy] === selectedOption[showBy]
        }"
        @click="setSelectedThenCloseDropdown(item)"
      >
        {{ item ? item[showBy] : '' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'SelectBox',
  inheritAttrs:false,
}
</script>
<script setup>
import {Icon} from "@iconify/vue";
import {computed, defineComponent, defineEmits, defineProps, ref, toRefs, watch} from "vue";

const props = defineProps({
  placeholder:{
    type:String,
    default:'',
    required:false
  },
  trackBy:{
    type:String,
    required:true
  },
  showBy:{
    type:String,
    required:true
  },
  modelValue:{
    validator: function (value) {
      return ['object','string','number','null'].indexOf( typeof value ) !== -1
    },
    // type:[String,Number,Object,Array],
    default:null,
    required:true
  },
  isMultiselect:{
    type:Boolean,
    default:false
  },
  options:{
    type:[Array],
    required:true
  },
  searchBox:{
    type:Boolean,
    default:false,
    required:false
  }
})
const {placeholder,trackBy,showBy,modelValue,options,isMultiselect,searchBox} = toRefs(props)

defineComponent({Icon})

const isOpen = ref(false)
const selectedOption = ref(null)
const selectedOptions = ref([])

const search = ref('')

const emit = defineEmits(['input','update:modelValue'],)

const optionsIsEmpty = computed(()=>{
  if(isMultiselect.value === true){
    return !selectedOptions.value.length
  } else return !modelValue.value
})

function setSelectedThenCloseDropdown(item){
  setSelectedItem(item);
  closeSelectBox()
}

function deleteItemFromSelectedOptions(item){
  return selectedOptions.value = selectedOptions.value.filter((val)=>val[trackBy.value] !== item[trackBy.value] )
}
function clearSelectedValue(){
  emit('update:modelValue','')
}

function optionIsSelected(item){
  if(selectedOptions?.value && selectedOptions.value.length){
    let selectedOptionsItemsByTrack = selectedOptions?.value.map(opt=>opt[trackBy.value])
    return selectedOptionsItemsByTrack.includes(item[trackBy.value])
  }
  return  false
}

function setSelectedItemToOptions(item){
  if(!optionIsSelected(item)){
    selectedOptions.value = [...selectedOptions.value,item]
  }else{
    deleteItemFromSelectedOptions(item)
  }
  emit('update:modelValue',selectedOptions.value.map(opt=>opt[trackBy.value]))
}

function selectBoxClickHandler(){
  if(searchBox.value === true){
    return null
  }else toggleSelectBox()
}

function setSelectedItem(item){
  if(item === null){
    selectedOption.value = null
    emit('update:modelValue',null)
    emit('input',{
      target:{
        value:null
      }
    })
  }
  if( isMultiselect.value === true ){
    setSelectedItemToOptions(item)
  }else{
    selectedOption.value = item
    emit('update:modelValue',selectedOption.value[trackBy.value])
    emit('input',{
      target:{
        value:selectedOption.value[trackBy.value]
      }
    })
  }

}
function nextOption(arrowType){
  let returnableOption;
  if( selectedOption.value ){
    if( arrowType === 'ArrowUp' ){
      let index =  options.value.findIndex(opt => opt[trackBy.value] === selectedOption.value[trackBy.value])
      if (index === 0){
        returnableOption = options.value[options.value.length - 1]
      } else returnableOption =  options.value[ index - 1 ]
    }
    else if(arrowType === 'ArrowDown') {
      let index =  options.value.findIndex(opt => opt[trackBy.value] === selectedOption.value[trackBy.value])
      if (index === options.value.length - 1){
        returnableOption =  options.value[0]
      } else returnableOption = options.value[ index+1 ]
    }
  }
  else {
    if( arrowType === 'ArrowUp' ){
      returnableOption = options.value[options.value.length - 1]
    }
    else if(arrowType === 'ArrowDown') {
      returnableOption = options.value[0]
    }
  }
  return returnableOption
}
function handleListKeyDown(e){
  switch (e.key) {
    case "Enter":
      e.preventDefault();
      isOpen.value = false;
      break;
    case " ":
      e.preventDefault();
      isOpen.value = true;
      break;
    case "Tab":
      if(isOpen.value){
        e.preventDefault();
        isOpen.value = false
      }else {
        return null
      }
      break;
    case "Escape":
      e.preventDefault();
      isOpen.value = false;
      break;
    case "ArrowUp":
      e.preventDefault();
      setSelectedItem( nextOption('ArrowUp') )
      break;
    case "ArrowDown":
      e.preventDefault();
      setSelectedItem( nextOption('ArrowDown') )
      break;
    default:
      break;
  }
}
function closeSelectBox() {
  isOpen.value = false
}
function toggleSelectBox(){
  isOpen.value =! isOpen.value
}

watch(()=>options.value,options => {
  if(options.length && modelValue.value){
    let item = options.find(opt=>opt[trackBy.value] === modelValue.value)
    if(item){
      setSelectedItem(options.find(opt=>opt[trackBy.value] === modelValue.value))
    }

  }
},{
  immediate:true
})

const isSearchFocused = ref(false)

function searchFocusOut(){
  isSearchFocused.value = false
}
function searchFocusIn(){
  isSearchFocused.value = true
  isOpen.value = true
}

const filteredOptions = computed(()=>{
  if(searchBox.value && search.value){
    return  options.value.filter((opt)=>{
      return opt[showBy.value].toLowerCase().includes(search.value.toLowerCase())
    })
  }else{
    return options.value
  }
})

</script>


<style scoped>
.textMain{
  @apply  text-text_secondary
}
</style>
