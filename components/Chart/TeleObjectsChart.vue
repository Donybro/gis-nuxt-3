<template>
  <v-chart :key="key" ref="myChart" class="chart-container" :option="option" />
</template>

<script setup>
import 'echarts'
import {use} from "echarts/core";
import {GridComponent, TitleComponent, TooltipComponent,} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import VChart, {THEME_KEY} from "vue-echarts";

use([
  TitleComponent,
  GridComponent,
  TooltipComponent,
  BarChart,
  CanvasRenderer
]);
provide(THEME_KEY,"dark")

const key = ref(1)
setInterval(()=>{
  key.value++
},4000)

const props = defineProps({
  titles:Array,
  data:Array
})
const {titles,data} = toRefs(props)

const option = computed(()=>({
  tooltip:{
    show:true,
    position: [10, 10],
    appendToBody: true
  },
  backgroundColor:'transparent',
  grid:{
    show:false,
    left : '0px',
    top : '0px',
    right : '0px',
    bottom : '0px',
    backgroundColor:'transparent',
    borderColor:'transparent'
  },
  xAxis: {
    type:'value',
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    splitLine:{
      show:false,
    },
  },
  yAxis: {
    z: 10,
    type:'category',
    data: titles.value,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#fff',
      inside:true,
      fontFamily: 'Montserrat',
      fontWeight: 'lighter' ,
    },
    splitLine:{
      show:false
    },
    nameTextStyle:{
      color:'#000'
    }
  },
  series: [
    {
      type: 'bar',
      showBackground: false,
      data: data.value,
      barCategoryGap:'0px',
      barGap:'0px',
    }
  ],
  animationDuration:2000,
  animationEasing:"cubicIn",

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
  position: relative;
  height: 170px;
  overflow: hidden;
}

</style>
