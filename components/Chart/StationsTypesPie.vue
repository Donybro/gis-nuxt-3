<template>
  <div class="">
    <v-chart :key="key" ref="myChart" class="chart-container" :option="option" />
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
provide(THEME_KEY,"dark")
const myChart = ref()
onMounted(()=>{
  window.addEventListener('resize', myChart.value.resize);
})

const key = ref(1)
setInterval(()=>{
  key.value++
},4000)

const props = defineProps({
  data:Array,
  name:String
})
const {data:dataVal,name:nameVal} = toRefs(props)

const option = computed(()=>({
  backgroundColor:'transparent',
  tooltip: {
    trigger: 'item',
    appendToBody: true
  },
  legend: {
    show:false
  },
  series: [
    {
      // name: nameVal.value,
      type: 'pie',
      tooltip:{
        show:true,
        position: [7, 7]
      },
      roseType: 'radius',
      radius: ['50%', '90%'],
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        }
      },
      labelLine: {
        show: false
      },
      data: dataVal.value
    }
  ],
  animationDuration:2000,
  animationEasing:"cubicIn",
}));



</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.chart-container {
  position: relative;
  height: 170px;
  overflow: hidden;
}

</style>
