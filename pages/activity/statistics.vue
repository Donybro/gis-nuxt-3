<template>
  <div class="container mx-auto px-[8px] md:px-[12px] py-[100px]">
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-12 xl:col-span-9">
        <div class="flex flex-col gap-[30px]">
          <section v-if="loaded">
            <div v-for="bar in barChartItems" :key="bar.name" class="mb-[30px]">
              <h1 class="text-[1.35em] xl:text-[2em] text-text_secondary py-[10px]">{{ bar.name }}</h1>
              <BarChart :series="bar.series" :source="bar.source"/>
            </div>
            <div v-for="pie in pieChartItems" :key="pie.name" class="mb-[30px]">
              <h1 class="text-[1.35em] xl:text-[2em] text-text_secondary py-[10px]">{{ pie.name }}</h1>
              <PieChart :data="pie.data" :name="pie.name" :radius="pieChartRadius"/>
            </div>
            <div v-for="hbar in horizontalBarChartItems" :key="hbar.name" class="mb-[30px]">
              <h1 class="text-[1.35em] xl:text-[2em] text-text_secondary py-[10px]">{{ hbar.name }}</h1>
              <HorizontalBarChart :data="hbar.data" :name="hbar.name" :series="hbar.series"/>
            </div>
          </section>
        </div>
      </div>
      <div class="xl:col-span-3">
        <SideMenuNavigator :preLoadedMenuName="'ACTIVITY'"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import BarChart from "../../components/Chart/BarChart";
import PieChart from "../../components/Chart/PieChart";
import HorizontalBarChart from "../../components/Chart/HorizontalBarChart";
import {getStatisticsByType} from "../../api/getStatistics";
import SideMenuNavigator from "../../components/Menu/SideMenuNavigator";
import {useI18n} from "vue-i18n";
import {useWindowSizeStore} from "../../store/window";
import {useHead} from "nuxt/app";

const loaded = ref(false)

const {t: $t} = useI18n()

useHead({
  title: $t('navbar.ozcom-full')
})

function createBarChartData(chart) {
  let source = []
  let series = []
  source.push(['product', chart.year])
  chart.indicators.forEach(indicator => {
    source.push([indicator.indicator_name, indicator.indicator_number])
    series.push({type: 'bar', seriesLayoutBy: 'row'})
  })
  return {
    source,
    series
  }
}

function createPieChartData(chart) {
  let data = []
  chart.indicators.forEach(indicator => {
    data.push({name: indicator.indicator_name, value: indicator.indicator_number})
  })
  return {
    data
  }
}

function createHorizontalBarChartData(chart) {
  let series = []
  chart.indicators.forEach(indicator => {
    series.push({
      name: indicator.indicator_name,
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [indicator.indicator_number]
    })
  })
  return {
    series
  }
}

function generateBarChartItems(charts) {
  barChartItems.value = []
  charts.forEach((chart) => {
    const {series, source} = createBarChartData(chart)
    barChartItems.value.push({
      id: chart.id,
      name: chart.name,
      series,
      source
    })
  })
}

function generatePieChartItems(charts) {
  pieChartItems.value = []
  charts.forEach((chart) => {
    const {data} = createPieChartData(chart)
    pieChartItems.value.push({
      id: chart.id,
      name: chart.name,
      data
    })
  })
}

function generateHorizontalBarChartItems(charts) {
  horizontalBarChartItems.value = []
  charts.forEach((chart) => {
    const {series} = createHorizontalBarChartData(chart)
    horizontalBarChartItems.value.push({
      id: chart.id,
      name: chart.name,
      data: [chart.year],
      series
    })
  })
}

const barChartItems = ref([])
const pieChartItems = ref([])
const horizontalBarChartItems = ref([])

const {data: barCharts} = await getStatisticsByType('bar')
if (barCharts?.value) {
  generateBarChartItems(barCharts.value)
}


const {data: pieCharts} = await getStatisticsByType('pie')
if (pieCharts?.value) {
  console.log(pieCharts, 'pieCharts')
  generatePieChartItems(pieCharts.value)
}

const {data: horizontalBarCharts} = await getStatisticsByType('horizontal-bar')
if (horizontalBarCharts?.value) {
  generateHorizontalBarChartItems(horizontalBarCharts.value)
}

const {locale} = useI18n()

watch(() => locale.value, async () => {
  loaded.value = false
  const {data: barCharts} = await getStatisticsByType('bar')
  if (barCharts?.value) {
    generateBarChartItems(barCharts.value)
  }


  const {data: pieCharts} = await getStatisticsByType('pie')
  if (pieCharts?.value) {
    generatePieChartItems(pieCharts.value)
  }

  const {data: horizontalBarCharts} = await getStatisticsByType('horizontal-bar')
  if (horizontalBarCharts?.value) {
    generateHorizontalBarChartItems(horizontalBarCharts.value)
  }

  setTimeout(() => {
    loaded.value = true
  }, 500)
})


const windowSizeStore = useWindowSizeStore()

const pieChartRadius = computed(() => {
  if (windowSizeStore.isWindowSmallerThanMD) {
    return [37, 67]
  } else return [75, 136]
})

setTimeout(() => {
  loaded.value = true
}, 500)
</script>
