<template>
  <v-chart ref="myChart" class="chart-container" :option="option" />
</template>

<script>
import 'echarts'
import * as echarts from 'echarts/core';
import { use } from "echarts/core";


import VChart, { THEME_KEY } from "vue-echarts";
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

use([GaugeChart, CanvasRenderer]);

export default defineComponent({
  name: "RequestCountChart",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  setup() {
    const option = ref({
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
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: false,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              color: '#3D8DFF'
            }
          },
          axisLine: {
            lineStyle: {
              width: 15
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [
              {
                value: 22,
                name: 'MUROJAATLAR',
                title: {
                  offsetCenter: ['0%', '30%']
                },
                detail: {
                  valueAnimation: false,
                  offsetCenter: ['0%', '-10%']
                }
              },
          ],
          title: {
            fontSize: 10,
            color: '#A2A0B3',
            fontFamily: 'Montserrat',
          },
          detail: {
            show:true,
          },
          radius:"78px"
        },
      ]
    });
    const myChart = ref()
    onMounted(()=>{
      window.addEventListener('resize', myChart.value.resize);
    })
    return { option,myChart };

  }
});
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

