<template>
  <div>
    <div class="window-box">
      <el-button @click="openMap">打开对话框</el-button>
    </div>

    <MapDialog ref="mapDialogRef"></MapDialog>

  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import MapDialog from "./MapDialog.vue";
export default {
  name: 'Position',
  components: {
    MapDialog
  },
  data() {
    return {
      lng: '',
      lat: '',
      map: null,
      pointList: []
    }
  },
  created() {

  },
  mounted() {
    // this.init()


  },
  methods: {
    openMap() {
      this.$refs.mapDialogRef.open()
    },
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
/deep/.el-dialog {
  width: 80%;
  height: 80%;
}
/deep/ .el-dialog .el-dialog__body {
  height: 700px!important;
}
</style>
