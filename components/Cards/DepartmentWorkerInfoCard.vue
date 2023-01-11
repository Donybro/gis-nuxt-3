<template>
  <div class="p-[24px] border border-border_primary bg-secondary items-center flex flex-col gap-[24px] w-full">
    <div class="w-[366px] h-[388px]">
      <img :src="departmentWorker.photo" class="w-full h-full object-cover" alt="">
<!--      <nuxt-img  width="366p" height="388"  alt="worker"  format="webp" :src="departmentWorker.photo.replace('http://', 'https://')" />-->
    </div>
    <div class="flex flex-col gap-[12px]">
      <h2 class="font-semibold font-inter text-[1.25em] text-center text-text_secondary">{{`${departmentWorker.last_name} ${departmentWorker.first_name} ${departmentWorker.father_name}`}}</h2>
      <h3 class="text-[#3D8DFF] font-montserrat font-medium text-[1.12em] mb-[8px] text-center">{{departmentWorker.position}}</h3>
      <div class="font-inter !text-text_secondary text-[1em] max-h-[250px] overflow-y-auto break-words" v-html="departmentWorker.description"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepartmentWorkerInfoCard",
  props:{
    departmentWorker:{
      type:Object,
      default:()=>({
        photo:'',
        position:'Xalqaro aloqalar guruhi boshlig\'i',
        last_name:'Abdullayev',
        first_name:'A’zam',
        father_name:'Abdushukurovich',
        phone:'+998 (71) 202 69 80',
        mail:'info@gis.uz'
      })
    },
  },
}
</script>

<style scoped>

</style>
