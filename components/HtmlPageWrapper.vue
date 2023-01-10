<template>
  <div class="container_wrapper">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-col">
          <h2 class="text-white description-html font-semibold font-montserrat text-[1.35em] xl:text-[2em] leading-[32px] xl:leading-[44px] mb-[40px]">{{ pageData.title }}</h2>
          <div v-html="pageData.description" class="desc-html leading-[38 px] !text-text_secondary w-full text-[1em] leading-[22px] text-justify font-inter break-words"></div>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator/>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideMenuNavigator from "../components/Menu/SideMenuNavigator";


const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({
      title: '',
      description: ''
    })
  },
  navigationMenuName: {
    type: String
  },
})

const {pageData, navigationMenuName} = toRefs(props)
</script>

<style>

/*ul , ol{*/
/*  list-style: disc !important;*/
/*}*/
.desc-html {
  overflow: auto !important;
  line-height: 38px !important;
}

@media screen and (max-width: 728px) {
  .desc-html {
    line-height: 20px !important;
  }

  .desc-html p {
    line-height: 20px !important;
  }

  .desc-html a {
    line-height: 20px !important;
  }

  .desc-html span {
    line-height: 20px !important;
  }
}

.desc-html a {
  color: #D8AA63 !important;
  line-height: 38px !important;
  text-align: justify !important;
}

.desc-html p {
  text-align: justify !important;
  line-height: 38px !important;
  color: #A2A0B3 !important;
}

.desc-html span {
  text-align: justify !important;
  line-height: 38px !important;
  color: #A2A0B3 !important;
}

.desc-html td, tr {
  border-width: 1px !important;
  border-color: #484848 !important;
  background: transparent !important;
}

.desc-html ul {
  list-style-type: disc !important;
  list-style-position: inside !important;
}

.desc-html ol {
  list-style-type: decimal;
  list-style-position: inside !important;
}

.desc-html ul ul, ol ul {
  list-style-type: circle !important;
  list-style-position: inside !important;
}

.desc-html ol ol, ul ol {
  list-style-type: lower-latin !important;
  list-style-position: inside !important;
}

.desc-html table {
  background: transparent !important;
}

</style>
