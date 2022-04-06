<template>
  <div>
    <div class="window-box">
      <div id="container"></div>
    </div>
    <div class="oprate-box">
      <el-input v-model="point.longitude"></el-input>
      <el-input v-model="point.latitude"></el-input>
      <el-button type="primary" @click="savePoint">添加点</el-button>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  name: 'mapEdit',
  data() {
    return {
      map: null,
      point: {
        longitude:'',
        latitude:''
      },
      pointList: []
    }
  },
  created() {

  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let that = this
      let mapObj = new AMap.Map('container', {//'map-location'是对应页面盒子的id
        resizeEnable: true, //自适应大小
        zoom: 13,//初始视窗
        // mapStyle: 'amap://styles/a54deef1dfec0233347bab73a7fae2a4', //设置地图的显示样式
        mapStyle:'amap://styles/a54deef1dfec0233347bab73a7fae2a4'
      });
      // AMap是高德地图的构造函数，这里.Map是创建地图，.Marker是创建坐标点
    },
    savePoint() {
      this.pointList.push([this.point.longitude, this.point.latitude])
      console.log(this.pointList)
    }
  }
}

</script>

<style scoped>
.window-box {
  width: 100%;
  height: 700px;
  border: 1px solid #111;
  /*background-color: #dddddd;*/
}
.oprate-box {
  display: flex;
  justify-content: left;
  margin-top: 15px;
}
#container {
  width: 100%;
  height: 100%;
}
.el-input--small {
  width: 240px;
  margin-left: 15px;
}
</style>
