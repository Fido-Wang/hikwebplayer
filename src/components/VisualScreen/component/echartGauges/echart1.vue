<template>
  <div id="container1">

  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "echart1",
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(()=> {
      this.init()
    })
  },
  methods: {
    init() {

      var chartDom = document.getElementById('container1');
      var myChart = echarts.init(chartDom);
      // 自适应
      window.onresize = function() {
        myChart.resize()
      }
      var option;

      option = {
        series: [
          {
            type: 'gauge',
            startAngle: -45,
            endAngle: 45,
            min: 0,
            max: 500,
            splitNumber: 1,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[1, '#cfcfcf']]
              }
            },
            progress: {
              show: true,
              itemStyle: {
                color: "#78a560"
              }
            },
            pointer: {
              show: false,
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              show: false,
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2
              }
            },
            splitLine: {
              show: false,
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 5
              }
            },
            axisLabel: {
              show: false,
              color: '#464646',
              fontSize: 20,
              distance: -60,
            },
            title: {
              show: false,
              offsetCenter: [0, '-20%'],
              fontSize: 30
            },
            detail: {
              fontSize: 16,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value );
              },
              color: '#fff'
            },
            data: [
              {
                value: 100,
                name: 'Grade Rating'
              }
            ]
          }
        ]
      };

      option && myChart.setOption(option);

    }
  }
}
</script>

<style scoped>
#container1 {
  width: 100%;
  height: 100%;
  /*background-color: pink;*/
}
</style>
