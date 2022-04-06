<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="isShow"
      width="80%"
      height="80%"
      @close="close"
      @open="init">
      <div id="container">
        <div class="coordinateMap_input">
          <div class="top">
            <div>线段1</div>
            <div><el-button type="primary">+</el-button></div>
          </div>
          <div>

          </div>
          <el-input
            v-model="lng"
            placeholder="点击地图或输入经度"
          ></el-input>
          <el-input
            v-model="lat"
            placeholder="点击地图或输入纬度"
          ></el-input>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  name: 'mapDialogRef',
  data() {
    return {
      isShow: false,
      lng: '',
      lat: '',
      map: null,
      pointList: [
        {
          lat:'111',
          lng:'111'
        },
        {
          lat:'222',
          lng:'222'
        },
        {
          lat:'333',
          lng:'333'
        },
      ]
    }
  },
  created() {

  },
  mounted() {
    // this.init()
  },
  methods: {
    close() {
      this.isShow = false
    },
    open() {
      this.isShow = true
    },
    init() {
      this.$nextTick(()=> {
        let that = this
        let map = new AMap.Map('container', {//'map-location'是对应页面盒子的id
          resizeEnable: true, //自适应大小
          zoom: 13,//初始视窗
          mapStyle: 'amap://styles/a54deef1dfec0233347bab73a7fae2a4', //设置地图的显示样式
        });
        map.on('click', function(e) {
          console.log('eee',e)
          that.lat = e.lnglat.lat
          that.lng = e.lnglat.lng
        });
      })
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
  position: relative;
  border: 1px solid #fff;
}


.coordinateMap_input {
  position: absolute;
  display: flex;
  z-index: 99;
}
/*/deep/.el-dialog {*/
/*  width: 80%;*/
/*  height: 80%;*/
/*}*/
/deep/ .el-dialog .el-dialog__body {
  /*height: 700px!important;*/
}
.top {
  display: flex;
  justify-content: space-between;
  width: 200px;
  height: 100px;
  border: 1px solid #111;
  font-weight: 700;
}
</style>
