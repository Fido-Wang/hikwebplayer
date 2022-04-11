<template>
  <div>
    <ul id="imgviewer">
      <div class="sq-content" v-for="(item,index) in cllist" :key="index" >
        <Col span="4"   class="colstyle">
          <div class="sqdiv" style="display: inline-block;">
            <div>{{item.wjmc}}</div>
            <li >
              <img   :data-original="'Url .GSurl'+ '/wjgl.do? method=viewAttachPage&zlid=' + item.zlid "
                     @click="lookDetail(item)" :src="'Url .GSurl'+ '/wjgl.do?method=viewAttachPage&zlid=' + item.zlid" >
            </li>
          </div>
        </Col>
      </div>
    </ul>
  </div>
</template>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'
<script>
    export default {
        name: "index",
      data() {
          return {
            cllist: [
              {
                cllbbh:	"0006",
                zlid:	"bc7254b0-e720-4f25-be3b-1ce4899840bb",
                wjlx:	"01",
                wjmc:	"法定代表人居民身份证正面"
              },
              {
                cllbbh:	"0006",
                zlid:	"4716c4ca-768a-4d9d-9c80-061858ec77bb",
                wjlx:	"01",
                wjmc:	"法定代表人居民身份证正面"
              },
              {
                cllbbh:	"0006",
                zlid:	"975d7a34-8741-41da-a6db-ee93f89957a5",
                wjlx:	"01",
                wjmc:	"法定代表人居民身份证正面"
              },
            ]
          }
      },
      methods: {
        // viewer插件，对图片操作（放大 ，缩小 。旋转 ）
        lookDetail(item) {
          // var that=this;
          //（应该可以直接用this.  此处用that  指向this 该方法用来解决作用域的问题 ，此处不用this.$nextTick  没有任何影响）
          //  that.$nextTick(function(){
          var viewPhoto = new Viewer(document.getElementById("imgviewer"),{
            url: 'data-original',
            navbar: false,
            fullscreen: false,
            title:false,
            hide:function(){ //在图片消失的时候销毁viewer
              viewPhoto.destroy()
            }
          });
          viewPhoto.show()
          //   })
        },
      }
    }
</script>

<style scoped>

</style>
