<template>
  <v-chart  ref="myChart" :key="key" class="chart-container" :option="option" />
</template>

<script setup>
import 'echarts'
import {use} from "echarts/core";
import {GridComponent, TitleComponent, TooltipComponent,} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import VChart, {THEME_KEY} from "vue-echarts";

const key = ref(1)
setInterval(()=>{
  key.value++
},4000)

use([
  TitleComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  TooltipComponent,
]);

provide(THEME_KEY,"dark")



const props = defineProps({
  titles:Array,
  seriesData:Array
})
const {titles,seriesData} = toRefs(props)

const option = computed(()=>({
  backgroundColor:'transparent',
  tooltip:{
    show:true,
    position: [10, 10],
    appendToBody: true
  },
  grid:{
    show:false,
    left : '0px',
    top : '0px',
    right : '0px',
    bottom : '0px',
    backgroundColor:'transparent',
    borderColor:'transparent'
  },
  color:['#3D8DFF','#3878DD','#3467C2','#325EB5','#3156A7','#2F4D9A','#3D8DFF','#3878DD'],
  colorBy:"data",
  xAxis: {
    data: titles.value,
    axisLabel: {
      inside: false,
      color: '#fff'
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10,
    splitLine:{
      show:false,
    },
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    },
    splitLine:{
      show:false
    }
  },
  series: [
    {
      type: 'bar',
      showBackground: false,
      itemStyle: {
        // color: '#92c921',
        borderRadius:5
      },
      emphasis: {
        itemStyle: {
          color: '#2378f7'
        }
      },
      data: seriesData.value,
      barCategoryGap:'15px'
    }
  ],
  animationDuration:2000,
  animationEasing:"cubicIn",
}));

const myChart = ref()
watch(()=>myChart.value , (myChart)=>{
  if(myChart){
    window.addEventListener('resize', myChart.resize);
  }
})

</script>
<style scoped>
.chart-container {
  position: relative;
  height: 170px;
  overflow: hidden;
}

</style>
