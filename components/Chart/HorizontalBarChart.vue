<template>
  <v-chart ref="myChart" class="chart-container" :option="option" />
</template>

<script setup>
import 'echarts'
import { use } from "echarts/core";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);
import VChart, { THEME_KEY } from "vue-echarts";
provide(THEME_KEY,"dark")


const myChart = ref()
onMounted(()=>{
  window.addEventListener('resize', myChart.value.resize);
})

const props = defineProps({
  data:Array,
  series:Array
})
const {series:seriesVal,data:dataVal} = toRefs(props)

const option = computed(()=>({
  backgroundColor:'transparent',
  tooltip: {
    trigger: 'axis',
    appendToBody: true,
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: dataVal.value
  },
  series: seriesVal.value
}));
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.chart-container {
  position: relative;
  height: 500px;
  overflow: hidden;
}

</style>
