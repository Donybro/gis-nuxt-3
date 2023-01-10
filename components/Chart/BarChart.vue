<template>
  <v-chart ref="myChart" class="chart-container" :option="option" />
</template>

<script setup>
import 'echarts'
import { use } from "echarts/core";
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);
import VChart, { THEME_KEY } from "vue-echarts";
import {useWindowSizeStore} from "../../store/window";

provide(THEME_KEY,"dark")

const props = defineProps({
  source:Array,
  series:Array,
})
const {series:seriesVal,source:sourceVal} = toRefs(props)
const windowSizeStore = useWindowSizeStore()

const topPaddingGrid = computed(()=>{
  if(windowSizeStore.isWindowSmallerThanMD){
    return '30%'
  }else return '10%'
})
const leftRightPaddingGrid = computed(()=>{
  if(windowSizeStore.isWindowSmallerThanMD){
    return '20%'
  }else return '5%'
})

const option = computed(()=>({
  legend: {},
  backgroundColor:'transparent',
  tooltip: {
    show:true,
    appendToBody: true
  },
  dataset: {
    source:sourceVal.value
  },
  xAxis: { type: 'category'},
  yAxis: { type: 'value'},
  grid:{
    show:true,
    left : leftRightPaddingGrid.value,
    top : topPaddingGrid.value,
    right : leftRightPaddingGrid.value,
    bottom : '10%',
    backgroundColor:'transparent',
    borderColor:'#565561'
  },
  series: seriesVal.value
}));
const myChart = ref()
onMounted(()=>{
  window.addEventListener('resize', myChart.value.resize);
})
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.chart-container {
  height: 500px;
  position: relative;
  overflow: hidden;
}

</style>
