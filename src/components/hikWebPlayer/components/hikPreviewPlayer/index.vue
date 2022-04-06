<template>
  <div class="videoContainer" ref="rightRef">
    <div id="playWnd" class="playWnd" ></div>
  </div>
</template>
<script>
export default {
  // import $ from 'jquery'
  name: 'hikPreviewPlayer',
  data(){
    return {
      width: 0,
      height: 0,
      // layout: '2x2',
      initCount:0,
      pubKey:"",
      oWebControl:null,
    };
  },
  props: {
    cameraIndexCode: {
      type: Array
    },
    layout : {
      type: String
    }
  },
  created(){},
  mounted(){
    let that = this
    that.height = that.$refs.rightRef.offsetHeight
    that.width = that.$refs.rightRef.offsetWidth
    that.initPlugin();
    // 监听窗口大小
    window.onresize = function(){
      console.log('1111')
      if (that.oWebControl != null) {
            that.oWebControl.JS_Resize(that.width, that.height);
            that.setWndCover();
          }
    }

  },
  // destroyed() {
  //   let that = this
  //   if (that.oWebControl != null){
  //     // that.oWebControl = nullla
  //     that.oWebControl.JS_HideWnd();   // 先让窗口隐藏，规避插件窗口滞后于浏览器消失问题
  //     that.oWebControl.JS_Disconnect().then(function(){}, function() {}); // 插件服务已启动，一般在前端 unload 事件、路由离开页面时调用
  //   }
  // },
  methods: {
    // 设置窗口裁剪，当因滚动条滚动导致窗口需要被遮住的情况下需要JS_CuttingPartWindow部分窗口
    setWndCover() {
      let that = this
      console.log('setWndCover')
      // console.log('setwndcover', window.innerWidth)
      // console.log('setwndcover', window.innerHeight)
      // console.log(document.getElementById('#playWnd').get(0).getBoundingClientRect())
      var iWidth = window.innerWidth;
      var iHeight = window.innerHeight;
      var oDivRect = $("#playWnd").get(0).getBoundingClientRect();

      // var iWidth = $(window).width();
      // var iHeight = $(window).height();
      // var oDivRect = $("#playWnd").getBoundingClientRect();
      console.log(iWidth)

      var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
      var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
      var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
      var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

      iCoverLeft = (iCoverLeft > that.width) ? that.width : iCoverLeft;
      iCoverTop = (iCoverTop > that.height) ? that.height : iCoverTop;
      iCoverRight = (iCoverRight > that.width) ? that.width : iCoverRight;
      iCoverBottom = (iCoverBottom > that.height) ? that.height : iCoverBottom;

      that.oWebControl.JS_RepairPartWindow(0, 0, that.width +1, that.height);    // 多1个像素点防止还原后边界缺失一个像素条
      if (iCoverLeft != 0) {
        taht.oWebControl.JS_CuttingPartWindow(0, 0, iCoverLeft, 600);
      }
      if (iCoverTop != 0) {
        that.oWebControl.JS_CuttingPartWindow(0, 0, that.width+1, iCoverTop);    // 多剪掉一个像素条，防止出现剪掉一部分窗口后出现一个像素条
      }
      if (iCoverRight != 0) {
        that.oWebControl.JS_CuttingPartWindow(that.width - iCoverRight, 0, iCoverRight, that.height);
      }
      if (iCoverBottom != 0) {
        that.oWebControl.JS_CuttingPartWindow(0, 600 - iCoverBottom, 1000, iCoverBottom);
      }
    },
    destoryDom() {
      let that = this
      if (that.oWebControl != null){
        that.oWebControl.JS_DestroyWnd().then(function(){ // oWebControl 为 WebControl 的对象
        // 销毁插件窗口成功
                },function(){
        // 销毁插件窗口失败
                });
        that.oWebControl.JS_HideWnd();// 先让窗口隐藏，规避插件窗口滞后于浏览器消失问题
        that.oWebControl.JS_Disconnect().then(function(){
        // 断开与插件服务连接成功
                  },
                  function() {
        // 断开与插件服务连接失败
          });
      }
    // debugger
    },
    destoryDom2() {
      let that = this
      if (that.oWebControl != null){
        that.oWebControl.JS_DestroyWnd().then(function(){ // oWebControl 为 WebControl 的对象
          // 销毁插件窗口成功
        },function(){
          // 销毁插件窗口失败
        });
        // that.oWebControl.JS_HideWnd();// 先让窗口隐藏，规避插件窗口滞后于浏览器消失问题
        // that.oWebControl.JS_Disconnect().then(function(){
        //     // 断开与插件服务连接成功
        //   },
        //   function() {
        //     // 断开与插件服务连接失败
        //   });
      }
    },
    // stopPreview
    stopPreview() {
      let that = this
      that.oWebControl.Js_RequestInterface ({
        funcName: "stopAllPreview"
      })
    },
    // 创建播放实例
    initPlugin () {
      console.log('111111 this.initplugin')
      let that =this;
      that.oWebControl = new WebControl({
        szPluginContainer: "playWnd",                       // 指定容器id
        iServicePortStart: 15900,                           // 指定起止端口号，建议使用该值
        iServicePortEnd: 15909,
        szClassId:"23BF3B0A-2C56-4D97-9C03-0CB103AA8F11",   // 用于IE10使用ActiveX的clsid
        cbConnectSuccess:  ()=> {                     // 创建WebControl实例成功
          that.oWebControl.JS_StartService("window", {         // WebControl实例创建成功后需要启动服务
            dllPath: "./VideoPluginConnect.dll"         // 值"./VideoPluginConnect.dll"写死
          }).then(function () {                           // 启动插件服务成功
            that.oWebControl.JS_SetWindowControlCallback({   // 设置消息回调
              cbIntegrationCallBack: that.cbIntegrationCallBack()
            });

            that.oWebControl.JS_CreateWnd("playWnd", that.width , that.height ).then(function () { //JS_CreateWnd创建视频播放窗口，宽高可设定
              that.init();  // 创建播放实例成功后初始化
            });
          }, function () { // 启动插件服务失败
          });
        },
        cbConnectError: function () { // 创建WebControl实例失败
          that.oWebControl = null;
          that.$message("插件未启动，正在尝试启动，请稍候...");
          WebControl.JS_WakeUp("VideoWebPlugin://"); // 程序未启动时执行error函数，采用wakeup来启动程序
          that.initCount ++;
          if (that.initCount < 3) {
            setTimeout(function () {
              that.initPlugin();
            }, 3000)
          } else {
            that.$message("插件启动失败，请检查插件是否安装！");
          }
        },
        cbConnectClose: function (bNormalClose) {
          that.oWebControl = null;
        }
      });
    },
    // 设置窗口控制回调
    setCallbacks() {
      let that = this
      that.oWebControl.JS_SetWindowControlCallback({
        cbIntegrationCallBack: that.cbIntegrationCallBack()
      });
    },

    // 推送消息
    cbIntegrationCallBack(oData) {
      let that = this
      if(oData){
        that.showCBInfo(JSON.stringify(oData.responseMsg));

      }
    },
    //初始化
    init() {
      console.log('22222 this.init()')
      let that =this;
      this.getPubKey(function () {

        ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////
        var appkey = "26757088";                           //综合安防管理平台提供的appkey，必填
        var secret = that.setEncrypt("73yPdPZjTTrHMEXscha7");   //综合安防管理平台提供的secret，必填
        var ip = "39.171.38.189";                           //综合安防管理平台IP地址，必填
        var playMode = 0;                                  //初始播放模式：0-预览，1-回放
        var port = 4433;                                    //综合安防管理平台端口，若启用HTTPS协议，默认443
        var snapDir = "D:\\SnapDir";                       //抓图存储路径
        var videoDir = "D:\\VideoDir";                     //紧急录像或录像剪辑存储路径
        // var layout = "1x1";                                //playMode指定模式的布局
        var layout = that.layout;                                //playMode指定模式的布局
        var enableHTTPS = 1;                               //是否启用HTTPS协议与综合安防管理平台交互，这里总是填1
        var encryptedFields = 'secret';					   //加密字段，默认加密领域为secret
        var showToolbar = 1;                               //是否显示工具栏，0-不显示，非0-显示
        var showSmart = 1;                                 //是否显示智能信息（如配置移动侦测后画面上的线框），0-不显示，非0-显示
        var buttonIDs = "0,16,256,257,258,259,260,512,513,514,515,516,517,768,769";  //自定义工具条按钮
        ////////////////////////////////// 请自行修改以上变量值	////////////////////////////////////

        that.oWebControl.JS_RequestInterface({
          funcName: "init",
          argument: JSON.stringify({
            appkey: appkey,                            //API网关提供的appkey
            secret: secret,                            //API网关提供的secret
            ip: ip,                                    //API网关IP地址
            playMode: playMode,                        //播放模式（决定显示预览还是回放界面）
            port: port,                                //端口
            snapDir: snapDir,                          //抓图存储路径
            videoDir: videoDir,                        //紧急录像或录像剪辑存储路径
            layout: layout,                            //布局
            enableHTTPS: enableHTTPS,                  //是否启用HTTPS协议
            encryptedFields: encryptedFields,          //加密字段
            showToolbar: showToolbar,                  //是否显示工具栏
            showSmart: showSmart,                      //是否显示智能信息
            buttonIDs: buttonIDs                       //自定义工具条按钮
          })
        }).then(function (oData) {
          that.oWebControl.JS_Resize(that.width , that.height);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
          // setTimeout(function(){
            that.startPreviewClick()
          // }, 1200)
        });
      });
    },
    //获取公钥
    getPubKey (callback) {
      let that =this;
      this.oWebControl.JS_RequestInterface({
        funcName: "getRSAPubKey",
        argument: JSON.stringify({
          keyLength: 1024
        })
      }).then(function (oData) {
        if (oData.responseMsg.data) {
          that.pubKey = oData.responseMsg.data;
          callback()
        }
      })
    },
    //RSA加密
    setEncrypt (value) {
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubKey);
      return encrypt.encrypt(value);
    },
    startPreviewClick() {
      console.log('33333 this.startPreviewClick')
      var cameraIndexCode = this.cameraIndexCode     //获取输入的监控点编号值，必填
      var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
      var transMode = 1;                                      //传输协议：0-UDP，1-TCP
      var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
      var wndId = -1;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）

      // cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
      // cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

      if(this.layout ==1) {
        console.log('44444 打印layout',this.layout)
        this.oWebControl.JS_RequestInterface({
          funcName: "startPreview",
          argument: JSON.stringify({
            cameraIndexCode: cameraIndexCode,                //监控点编号
            streamMode: streamMode,                         //主子码流标识
            transMode: transMode,                           //传输协议
            gpuMode: gpuMode,                               //是否开启GPU硬解
            wndId: wndId                                     //可指定播放窗口
          })
        })
      }else {
        console.log('44444 打印layout',this.layout)
        for(let i = 0; i <cameraIndexCode.length;i++){
          this.oWebControl.JS_RequestInterface({
            funcName: "startPreview",
            argument: JSON.stringify({
              cameraIndexCode : cameraIndexCode[i],
              streamMode: streamMode,
              transMode: transMode,
              gpuMode: gpuMode,
              wndId: i+1
            })
          })
        }
      }

    },
  }
};
</script>
<style  scoped>
html, body {
  padding: 0;
  margin: 0;
}
.videoContainer {
  width: 100%;
  height: 100%;
}

.playWnd {
  width: 100%;                  /*播放容器的宽和高设定*/
  height: 100%;
}

</style>
