<template>
  <div class="p-[12px] md:p-[24px] border border-border_primary bg-secondary items-center flex flex-col gap-[12px] md:gap-[24px] w-full">
    <div class="w-[200px] h-[222px] md:w-[366px] md:h-[388px]">
      <nuxt-img height="488" width="366" class="w-full h-full object-cover object-top" alt="photo"  format="webp" :src="departmentWorker.photo.replace('http://', 'https://')" />
    </div>
    <div class="flex flex-col gap-[12px]">
      <h2 class="font-semibold font-inter text-[.9em] md:text-[1.25em] text-center text-text_secondary">{{departmentWorker.last_name}} {{departmentWorker.first_name}} {{departmentWorker.father_name}}</h2>
      <h3 class="text-[#3D8DFF] font-montserrat font-medium text-[.8em] md:text-[1.12em] md:mb-[8px] text-center">{{departmentWorker.position}}</h3>
      <div class="desc-html font-inter text-left !text-text_secondary text-[.7em] text-[1em] max-h-[350px] overflow-y-auto px-[12px]" v-html="departmentWorker.description">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepartmentWorkerCardForAlert",
  props:{
    departmentWorker:Object
  }
}
</script>

<style scoped>

</style>