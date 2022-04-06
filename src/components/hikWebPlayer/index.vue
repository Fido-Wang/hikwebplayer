<template>
  <div class="container">
    <div class="left">
      <el-button @click="startPreview">预览</el-button>
      <el-button @click="startPlayback">回放</el-button>
      <div class="hole-btn" @click="clickBtn(camera1,1)">一支洞</div>
      <div class="hole-btn" @click="clickBtn(camera2,2)">二支洞</div>
      <div class="hole-btn" @click="clickBtn(camera3,3)">三支洞</div>
    </div>
    <div class="right">
      <hikPreview
        v-if="isPreview "
        ref="hikPreviewRef"
        :cameraIndexCode="cameraIndexCode"
        :layout="layout"
      ></hikPreview>
      <hikPlayback
        v-if="!isPreview "
        ref="hikPlaybackRef"
        :cameraIndexCode="cameraIndexCode"
        :layout="layout"
      ></hikPlayback>
    </div>

<!--      <hikPlayback-->
<!--        v-else-->
<!--        ref="hikPlaybackRef"-->
<!--        :cameraIndexCode="cameraIndexCode"-->
<!--        :layout="layout"-->
<!--      ></hikPlayback>-->
<!--    <div class="right">-->
<!--      <hikPreview-->
<!--        v-if="isPreview "-->
<!--        ref="hikPreviewRef"-->
<!--        :cameraIndexCode="cameraIndexCode"-->
<!--        :layout="layout"-->
<!--      ></hikPreview>-->


<!--    </div>-->
  </div>
</template>

<script>
import hikPreview from './components/hikPreviewPlayer/index.vue'
import hikPlayback from './components/hikPlaybackPlayer/index.vue'
export default {
  name:'',
  components: {
    hikPreview,
    hikPlayback
  },
  data() {
    return {
      isPreview: true,
      cameraIndexCode: [],
      layout: '2x2',
      camera1: ['b90f1e782a094fd3a1c445b407f8505c'],
      camera2: ['b90f1e782a094fd3a1c445b407f8505c','38ed2fc315b64d3e9bd3842bb784f062'],
      camera3: ['b3897949fc7f47a38dafdab69610dc06','0e56979c224540a0b6022fd7eaed493b','361b3a1267d74614b2d9a9571a946276','392375e3a9a04365a5379abd2454ac90']
    }
  },
  mounted() {
    let that = this
    that.cameraIndexCode = [...this.camera1]
    if(that.cameraIndexCode.length ==1) {
      that.layout = '1x1'
    }else if(that.cameraIndexCode.length >= 2) {
      that.layout = '2x2'
    }

  },
  beforeDestroy() {
    let that = this
    if(that.isPreview) {
      that.$refs.hikPreviewRef.destoryDom2()
    }else if(!that.isPreview) {
      that.$refs.hikPlaybackRef.destoryDom()
    }
    // debugger
  },
  methods: {
    clickBtn(list, index) {
      let that = this
      that.cameraIndexCode = [...list]
      if(that.cameraIndexCode.length ==1) {
        that.layout = '1x1'
      }else if(that.cameraIndexCode.length >= 2) {
        that.layout = '2x2'
      }
      if(that.isPreview) {
        that.$refs.hikPreviewRef.destoryDom2()
        that.$refs.hikPreviewRef.initPlugin()

      }else if(!that.isPreview) {
        that.$refs.hikPlaybackRef.destoryDom()
        that.isPreview = true
      }
    },

    startPreview() {
      this.$refs.hikPlaybackRef.destoryDom()
      this.isPreview = true
    },
    startPlayback() {
      this.$refs.hikPreviewRef.destoryDom()
      this.isPreview = false
    },
  }
}

</script>

<style scoped>
.container {
  width: 1600px;
  height: 800px;
  margin: 0 auto;
  display: flex;
  margin: 0;
  padding: 0;
  /*background-color: #e7d0a5;*/
}
  .left {
    width: 30%;
    height: 100%;
    background-color: #a1cb72;
  }
  .right {
    width: 70%;
    height: 100%;
    background-color: #91d9c2;
  }
  .hole-btn {
    width: 100%;
    height: 60px;
    background-color: #fff;
    border: 2px solid #eee;
    cursor: pointer;
  }
  .hole-btn:hover {
    background-color: cornflowerblue;
  }
</style>
