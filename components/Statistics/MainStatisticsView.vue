<template>
  <div class="">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-4">
        <div class="flex flex-col justify-center gap-[24px] h-full">
          <h4 class="font-montserrat font-semibold text-[1.35em] xl:text-[2em] text-white">{{$t('main-page.statistics')}}</h4>
          <p class="font-inter text-[1em] text-text_secondary">{{$t('main-page.statistics-text')}}</p>
          <div class="">
            <button class="border-[2px] border-[#fff] text-white hover:text-primary hover:bg-white px-[47px] py-[13px]">
              <nuxt-link to="/activity/statistics">
                {{$t('button.more')}}
              </nuxt-link>
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-12  xl:col-span-8">
       <div class="grid grid-cols-1 xl:grid-cols-3 gap-[40px]" v-if="loaded">
         <ClientOnly>
         <div v-if="barChart" class="border border-[#474271] bg-[#252356] py-[33px] px-[16px] flex flex-col gap-[8px]">
<!--           <p class="font-inter font-medium leading-[140%] text-white">Stansiyalar soni</p>-->
           <StationsCountChart class="h-[170px] w-full" :titles="barChart.titles" :series-data="barChart.seriesData"/>
           <p class="line-clamp-4 text-text_secondary font-medium font-inter text-[1em]">{{barChart.name}}</p>
         </div>
         <div v-if="horizontalBarChart" class="border border-[#474271] bg-[#252356] py-[33px] px-[16px] flex flex-col gap-[8px]">
<!--           <p class="font-inter font-medium leading-[140%] text-white">Stansiyalar soni</p>-->
           <TeleObjectsChart class="h-[170px] w-full" :titles="horizontalBarChart.titles" :data="horizontalBarChart.data"/>
           <p class="line-clamp-4 text-text_secondary font-medium font-inter text-[1em]">{{horizontalBarChart.name}}</p>
         </div>
         <div v-if="pieChart" class="border border-[#474271] bg-[#252356] py-[33px] px-[16px] flex flex-col gap-[8px]">
<!--           <p class="font-inter font-medium leading-[140%] text-white">Stansiyalar soni</p>-->
           <StationsTypesPie :data="pieChart.data" :name="pieChart.name" class="h-[170px] w-full"/>
           <p class="line-clamp-4 text-text_secondary font-medium font-inter text-[1em]">{{pieChart.name}}</p>
         </div>
         </ClientOnly>
       </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatisticCard from "./StatisticCard";
import StationsCountChart from "../Chart/StationsCountChart";
import TeleObjectsChart from "../Chart/TeleObjectsChart";
import {getStatisticsByType, getStatisticsForMainPage} from "../../api/getStatistics";
import StationsTypesPie from "../Chart/StationsTypesPie";

defineComponent({StatisticCard,StationsCountChart,TeleObjectsChart,StationsTypesPie})

let gradientColors = ['#3D8DFF','#3878DD','#3467C2','#325EB5','#3156A7','#2F4D9A','#3D8DFF','#3878DD']
const loaded = ref(false)
setTimeout(()=>{
  loaded.value = true
},500)

const barChart = ref(null)
const horizontalBarChart = ref(null)
const pieChart = ref(null)

function createBarChartData(chart){
  let seriesData = []
  let titles = []
  chart.indicators.forEach(indicator=>{
    seriesData.push(indicator.indicator_number)
    titles.push(indicator.indicator_name)
  })
  return{
    seriesData,
    titles
  }
}

function generateBarChartItems(chart){
  const {titles,seriesData} = createBarChartData(chart)
  barChart.value = {
    titles,
    seriesData,
    name:chart.name
  }
}

function generateHorizontalBarChartItems(chart){
  const {titles,data} = createHorizontalBarChartData(chart)
  horizontalBarChart.value = {
    titles,
    data,
    name:chart.name
  }
}

function createHorizontalBarChartData(chart){
  let titles = []
  let data = []

  chart.indicators.forEach((indicator,indx)=>{
    data.push({
      value: indicator.indicator_number,
      itemStyle: {color:gradientColors[indx] },
    })
    titles.push(indicator.indicator_name)
  })
  return{
    data,
    titles
  }
}


function createPieChartData(chart){
  let data = []
  chart.indicators.forEach((indicator,indx)=>{
    data.push({name:indicator.indicator_name,value:indicator.indicator_number,itemStyle:{color:gradientColors[indx]}})
  })
  return{
    data
  }
}

function generatePieChartItems(chart){
  if(chart){
    const {data} = createPieChartData(chart)
    pieChart.value= {
      data,
      name:chart.name
    }
  }

}

const { data:statistics } = await getStatisticsForMainPage('bar')
if(statistics && statistics.value ){
  const [bar,horizontal,pie] = statistics?.value
  if(bar){
    generateBarChartItems(bar)
  }
  if(horizontal){
    generateHorizontalBarChartItems(horizontal)
  }
  if(pie){
    generatePieChartItems(pie)
  }
}





const { locale} = useI18n()

watch( () => locale.value, async()=>{
  const { data:statistics } = await getStatisticsForMainPage('bar')
  if(statistics && statistics.value ){
    const [bar,horizontal,pie] = statistics?.value
    if(bar){
      generateBarChartItems(bar)
    }
    if(horizontal){
      generateHorizontalBarChartItems(horizontal)
    }
    if(pie){
      generatePieChartItems(pie)
    }
  }


})








// console.log(barChart.value)
// console.log(horizontalBarChart.value)
// console.log(pieChart.value)


</script>

<style scoped>

</style>
