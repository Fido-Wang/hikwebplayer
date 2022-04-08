<template>
  <div class="container">
    <div class="header">
      header
    </div>
    <div class="main">
      <div class="left">
        left
      </div>
      <div class="right">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item time_line_box">
            <Progress></Progress>
          </div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item item8">
            <environment></environment>
          </div>
          <div class="item"></div>
        </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import environment from './component/Environment/index.vue'
import Progress from './component/Progress/index.vue'
export default {
  name: "VisualScreen",
  components: {
    environment,
    Progress
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
      activities: [
        {
        content: '基坑开挖',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-check'
      }, {
        content: '主体施工',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87',
        icon: 'el-icon-check'
      }, {
        content: '二次结构',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        icon: 'el-icon-check'
      }, {
        content: '装饰工程',
        timestamp: '2018-04-03 20:46'
      },
      {
        content: '竣工验收',
        timestamp: '2018-04-03 20:46'
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
                color: [
                  [0.25, '#FF6E76'],
                  [0.5, '#FDDD60'],
                  [0.75, '#58D9F9'],
                  [1, '#7CFFB2']
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
              '40%'],
              fontSize: 18,
              color: '#e57f0c'
            },
            detail: {
              fontSize: 20,
              offsetCenter: [0, '0%'],
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

<style scoped >
.container {
  width: 100vw;
  height: 100vh;
  background-color: #39486e;
}
.header {
  width: 100%;
  height: 6%;
  background-color: pink;
}
.main {
  width: 100%;
  height: 94%;
  background-color: skyblue;
  display: flex;
}
.left {
  height: 100%;
  width: 5%;
  background-color: #dbc485;
}
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
.time_line_box {
  padding: 20px;
  background-color: #2f5d94;
}
.item8 {
  background-color: #2b5385;
}


/deep/.el-timeline-item .el-timeline-item__wrapper {
    display: flex;
}
/*.environment_test_top {*/
/*  width: 80%;*/
/*  height: 50%;*/
/*  margin: 0 auto;*/
/*  !*border: 1px solid #fff;*!*/
/*  display: grid;*/
/*  grid-template-columns: 30% 30% 30%;*/
/*  grid-column-gap: 5%;*/

/*}*/
/*.environment_test_top_item {*/
/*  !*background-color: pink;*!*/
/*  !*border: 1px solid #eee;*!*/
/*}*/
/*.environment_test_middle {*/
/*  margin: 0 auto;*/
/*  width: 80%;*/
/*  height: 20%;*/
/*  !*border: 1px solid #fff;*!*/
/*  !*background-color: skyblue;*!*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/
/*.line-step {*/
/*  width: 16.7%;*/
/*  height: 100%;*/
/*  !*background-color: #fff;*!*/
/*  !*height: 10px;*!*/
/*}*/
/*.line-step-number {*/
/*  color: #fff;*/
/*  font-size: 14px;*/
/*  float: left;*/
/*  text-shadow: 0 0 18px #3e3e3e;*/
/*}*/
/*.line-step-number2 {*/
/*  color: #fff;*/
/*  font-size: 14px;*/
/*  float: right;*/
/*  text-shadow: 0 0 18px #3e3e3e;*/
/*}*/
/*.line-step-midele {*/
/*  width: 100%;*/
/*  height: 10px;*/
/*  !*background-color: yellow;*!*/
/*  margin-top: 16px;*/
/*  !*border: 1px solid #111;*!*/
/*  box-shadow: 0 2px 4px #4a4a4a;*/
/*}*/
.line-step p {
  font-size: 14px;
  height: 20px;
  line-height: 14px;
  /*background-color: yellow;*/
  margin-top: 4px;
  color: #fff;
  text-shadow: 0 0 18px #404040;

}
/*.environment_test_bottom {*/
/*  width: 100%;*/
/*  height: 30%;*/
/*  !*border: 1px solid #fff;*!*/
/*}*/
/*.environment_test_bottom_title {*/
/*  width: 90%;*/
/*  height: 20%;*/
/*  margin: 0 auto;*/
/*  !*background-color: #eee;*!*/
/*  text-align: left;*/
/*  color: #fff;*/
/*  text-shadow: 0 0 18px #353535;*/

/*}*/
/*.environment_test_bottom_title_items {*/
/*  height: 80%;*/
/*  width: 80%;*/
/*  margin: 0 auto;*/
/*  !*background-color: pink;*!*/
/*  display: grid;*/
/*  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% ;*/
/*  grid-column-gap: 5%;*/
/*}*/
/*.days_environment {*/
/*  height: 100%;*/
/*  text-shadow: 0 0 6px #303030;*/
/*  !*background-color: skyblue;*!*/
/*}*/
/*.days_item {*/
/*  width: 70%;*/
/*  height: 30%;*/
/*  !*height: 40%;*!*/
/*  border-radius: 14px;*/
/*  background-color: orange;*/
/*  margin: 0 auto;*/
/*  transform: translateY(10px);*/
/*  text-align: center;*/
/*  color: #fff;*/
/*  box-shadow: 0 0 6px #323232;*/

/*}*/
/*.days_date {*/
/*  color: #fff;*/
/*  font-weight: 500;*/
/*  text-shadow: 0 0 18px #000000;*/
/*}*/


/*.el-timeline-item__node--normal {*/
/*  width: 20px!important;*/
/*  height: 20px!important;*/
/*}*/
/*/deep/.el-timeline-item__node .el-timeline-item__node--normal .el-timeline-item__node {*/
/*  width: 50px!important;*/
/*  height: 30px!important;*/
/*}*/
/deep/.el-timeline-item__node {
  width: 50px!important;
  height: 30px!important;
}
</style>
