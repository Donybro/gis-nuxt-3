<template>
  <div class="">
    <v-chart ref="myChart" class="chart-container" :option="option"/>
  </div>
</template>

<script setup>
import 'echarts'
import {use} from "echarts/core";
import {LegendComponent, TitleComponent, TooltipComponent} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts';
import {LabelLayout} from 'echarts/features';
import VChart, {THEME_KEY} from "vue-echarts";

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

provide(THEME_KEY, "dark")
const myChart = ref()

onMounted(() => {
  window.addEventListener('resize', myChart.value.resize);
})

const props = defineProps({
  data: Array,
  radius: Array
})
const {data: dataVal, radius: radiusVal} = toRefs(props)
const option = computed(() => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    appendToBody: true
  },
  legend: {
    show: false
  },
  series: [
    {
      type: 'pie',
      radius: radiusVal.value,
      data: dataVal.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
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
