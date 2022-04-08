<template>
  <div class="item item8">
    <div class="environment_test_top">
      <div class="environment_test_top_item">
        <echart1></echart1>
      </div>
      <div class="environment_test_top_item">
         <div id="gauge_echartdom" style="width: 100%;height: 100%"></div>
      </div>
      <div class="environment_test_top_item">
        <echart2></echart2>
      </div>
    </div>
    <div class="environment_test_middle">
      <div v-for="(item, index) in colors" :key="index" class="line-step">
        <div class="line-step-number">{{ item.text }}</div>
        <div v-if="item.text=='300'" class="line-step-number2">500</div>
        <div :style="{ backgroundColor: item.color}"  class="line-step-midele"></div>
        <p>{{ item.step }}</p>
      </div>
    </div>
    <div class="environment_test_bottom">
      <div class="environment_test_bottom_title">近7日空气质量</div>
      <div class="environment_test_bottom_title_items">
        <div v-for="(item , index) in sevenAirQuality" :key="index" class="days_environment">
          <div class="days_item">{{ item.value }}</div>
          <p class="days_date">{{ item.num }}</p>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import * as echarts from "echarts";
import echart1 from "../echartGauges/echart1.vue";
import echart2 from "../echartGauges/echart2.vue";

export default {
  name: "environment",
  components: {
    echart1,
    echart2
  },
  data() {
    return {
      colors: [
        {
          color: '#60cd6d',
          text: '0',
          step: '优'
        },{
          color: '#e0b96b',
          text: '50',
          step: '良'
        },{
          color: '#e28c47',
          text: '100',
          step: '轻度污染'
        },{
          color: '#e572ad',
          text: '150',
          step: '中度污染'
        },{
          color: '#c64242',
          text: '200',
          step: '重度污染'
        },{
          color: '#640808',
          text: '300',
          step: '严重污染'
        }
      ],
      sevenAirQuality: [
        {
          value: '轻度',
          num: 12.3
        },
        {
          value: '良',
          num: 12.3
        },
        {
          value: '优',
          num: 11.3
        },
        {
          value: '优',
          num: 42.3
        },
        {
          value: '重度',
          num: 12.6
        },
        {
          value: '优',
          num: 19.1
        },
        {
          value: '优',
          num: 12.3
        },

      ]
    }
  },
  mounted() {
    let that = this
    that.gaugeInit()
  },
  methods: {
    gaugeInit() {
      var chartDom = document.getElementById('gauge_echartdom');
      var myChart = echarts.init(chartDom);
      // 自适应
      window.onresize = function() {
        myChart.resize()
      }
      var colorTemplate1 = [[0.2, "rgba(255,0,0,0.8)"], [0.8, "rgba(0,255,255,0.8)"], [1, "rgba(0,255,0,0.8)"]];
      var option;
      option = {
        series: [
          {
            type: 'gauge',
            radius: '100%' ,
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 500,
            splitNumber: 4,
            center: ['50%', '70%'],
            axisLine: {
              lineStyle: {
                width: 8,
                // color: [
                //   [0.167, '#FF6E76'],
                //   [0.334, '#FDDD60'],
                //   [0.501, '#58D9F9'],
                //   [0.668, '#7CFFB2'],
                //   [0.835, '#FDDD60'],
                //   [1, '#58D9F9']
                // ]
                color: [
                  [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0.167,
                      color: "#60cd6d"
                    },
                    {
                      offset: 0.334,
                      color: "#e0b96b"
                    },
                    {
                      offset: 0.501,
                      color: "#e28c47"
                    }
                    ,{
                      offset: 0.668,
                      color: "#e572ad"
                    },
                    {
                      offset: 0.835,
                      color: "#c64242"
                    },
                    {
                      offset: 1,
                      color: "#640808"
                    }
                  ])
                  ]
                ]
              }
            },
            // 指针
            pointer: {
              showAbove: true,
              keepAspect: false,
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '50%',
              width: 6,
              offsetCenter: [0, '-40%'],
              itemStyle: {
                color: '#dedede'
              }
            },
            axisTick: {
              distance: 4,
              length: 6,
              lineStyle: {
                color: 'auto',
                width: 1
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 0
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 14,
              distance: -52,
            },
            title: {
              offsetCenter: ['0%', '' +
              '' +
              '30%'],
              fontSize: 18,
              color: '#e57f0c',
              fontWeight: 600
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, '-10%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value ) ;
              },
              color: 'auto'
            },
            data: [
              {
                value: 100,
                name: '良'
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


.right {
  flex: 1;
  background-color: #eaa483;
  display: grid;
  grid-template-columns: 20% 56% 20%;
  grid-template-rows: 32% 32% 32%;
  grid-row-gap: 2%;
  grid-column-gap: 2%;
}
.item {
  background-color: #fff;
  border: 1px solid #111;
}

.item8 {
  width: 100%;
  height: 100%;
  background-color: #2b5385;
}


/deep/.el-timeline-item .el-timeline-item__wrapper {
  display: flex;
}
.environment_test_top {
  width: 80%;
  height: 50%;
  margin: 0 auto;
  /*border: 1px solid #fff;*/
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-column-gap: 5%;

}
.environment_test_top_item {
  /*background-color: pink;*/
  /*border: 1px solid #eee;*/
}
.environment_test_middle {
  margin: 0 auto;
  width: 80%;
  height: 20%;
  /*border: 1px solid #fff;*/
  /*background-color: skyblue;*/
  display: flex;
  align-items: center;
}
.line-step {
  width: 16.7%;
  height: 100%;
  /*background-color: #fff;*/
  /*height: 10px;*/
}
.line-step-number {
  color: #fff;
  font-size: 14px;
  float: left;
  text-shadow: 0 0 18px #3e3e3e;

}
.line-step-number2 {
  color: #fff;
  font-size: 14px;
  float: right;
  text-shadow: 0 0 18px #3e3e3e;
}
.line-step-midele {
  width: 100%;
  height: 10px;
  /*background-color: yellow;*/
  margin-top: 16px;
  /*border: 1px solid #111;*/
  box-shadow: 0 2px 4px #4a4a4a;
}
.line-step p {
  font-size: 14px;
  height: 20px;
  line-height: 14px;
  /*background-color: yellow;*/
  margin-top: 4px;
  color: #fff;
  text-shadow: 0 0 18px #404040;

}
.environment_test_bottom {
  width: 100%;
  height: 30%;
  /*border: 1px solid #fff;*/
}
.environment_test_bottom_title {
  width: 90%;
  height: 20%;
  margin: 0 auto;
  /*background-color: #eee;*/
  text-align: left;
  color: #fff;
  text-shadow: 0 0 18px #353535;

}
.environment_test_bottom_title_items {
  height: 80%;
  width: 80%;
  margin: 0 auto;
  /*background-color: pink;*/
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% ;
  grid-column-gap: 5%;
}
.days_environment {
  height: 100%;
  text-shadow: 0 0 6px #303030;
  /*background-color: skyblue;*/
}
.days_item {
  width: 70%;
  height: 30%;
  /*height: 40%;*/
  border-radius: 14px;
  background-color: orange;
  margin: 0 auto;
  transform: translateY(10px);
  text-align: center;
  color: #fff;
  box-shadow: 0 0 6px #323232;

}
.days_date {
  color: #fff;
  font-weight: 500;
  text-shadow: 0 0 18px #000000;
}

/deep/.el-timeline-item__node {
  width: 50px!important;
  height: 30px!important;
}
</style>
