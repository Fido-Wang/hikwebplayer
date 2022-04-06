<template>
  <div class="container">
    <div class="right" ref="rightRef">
      <div id="playWnd" class="playWnd" ></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'hikWebPlayer',
    props:{
      cameraIndexCode: {
        type: Array,
        required: true
      },
      playMode: {
        type: Number,
        required: true
      },
      isPreview: {
        type: Boolean
      }
    },
    data(){
      return {
        startTimeStamp:'2022-03-19 00:00:00', // 回放开始时间
        endTimeStamp:'2022-03-19 23:59:59', // 回放结束时间
        width: 0,
        height: 0,
        layout: '2x2',
        initCount:0,
        pubKey:"",
        oWebControl:null,
        // cameraIndexCode:['cb2265433545440196d96fbd804f26aa','84fffd9dd3534681957c636b069efbc9','c95996eeca6d4edf8a9c5fab24cdb7e5','0f3e40428ccd4f79a06395fc61407f3b'],
        // cameraIndexCode:['cb2265433545440196d96fbd804f26aa'],
      };
    },
    created(){},
    mounted(){

      let that = this
      if(that.oWebControl) {
        that.oWebControl = null
      }
      if(that.isPreview) {
        that.width = that.$refs.rightRef.offsetHeight
        that.height = that.$refs.rightRef.offsetWidth
        that.initPlugin();
        setTimeout(function(){
          console.log('开始定时播放了')
          that.startPreviewClick()
        }, 1500)
      }else if(!that.isPreview) {
        that.width = that.$refs.rightRef.offsetHeight
        that.height = that.$refs.rightRef.offsetWidth
        that.initPlugin();
        setTimeout(function(){
          console.log('开始定时播放了')
          that.startPlayback()
        }, 1500)
      }

    },
    destroyed() {
      let that = this
      // 标签关闭
      if (that.oWebControl != null){
        that.oWebControl.JS_HideWnd();   // 先让窗口隐藏，规避插件窗口滞后于浏览器消失问题
        that.oWebControl.JS_Disconnect().then(function(){}, function() {});
      }

    },
    methods: {
      destroy() {
        let that = this
        // 标签关闭
        if (that.oWebControl != null){
          that.oWebControl.JS_HideWnd();   // 先让窗口隐藏，规避插件窗口滞后于浏览器消失问题
          that.oWebControl.JS_Disconnect().then(function(){}, function() {});
        }
      },
      clickPreview() {
        let that = this
        console.log(that.playMode)
        that.width = that.$refs.rightRef.offsetHeight
        that.height = that.$refs.rightRef.offsetWidth
        that.initPlugin();
        setTimeout(function(){
          that.startPreviewClick()
        }, 1500)
      },
      clickPlayback() {
        let that = this
        console.log(that.playMode)
        that.width = that.$refs.rightRef.offsetHeight
        that.height = that.$refs.rightRef.offsetWidth
        that.initPlugin();
        setTimeout(function(){
          that.startPlayback()
        }, 1500)
      },
      // 创建播放实例
      initPlugin () {
        console.log('this.initPulgin')
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

              that.oWebControl.JS_CreateWnd("playWnd", that.height, that.width).then(function () { //JS_CreateWnd创建视频播放窗口，宽高可设定
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
            // 异常断开：bNormalClose = false
            // JS_Disconnect正常断开：bNormalClose = true
            console.log("cbConnectClose");
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
        console.log('this.init')
        let that =this;
        console.log('this.init() this.playmode',that.playMode)
        that.getPubKey(function () {

          ////////////////////////////////// 请自行修改以下变量值	////////////////////////////////////
          var appkey = "26757088";                           //综合安防管理平台提供的appkey，必填
          var secret = that.setEncrypt("73yPdPZjTTrHMEXscha7");   //综合安防管理平台提供的secret，必填
          var ip = "39.171.38.189";                           //综合安防管理平台IP地址，必填
          var playMode = that.playMode;                        //初始播放模式：0-预览，1-回放
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
            that.oWebControl.JS_Resize(that.height, that.width);  // 初始化后resize一次，规避firefox下首次显示窗口后插件窗口未与DIV窗口重合问题
          });
        });
      },
      //获取公钥
      getPubKey (callback) {
        let that =this;
        that.oWebControl.JS_RequestInterface({
          funcName: "getRSAPubKey",
          argument: JSON.stringify({
            keyLength: 1024
          })
        }).then(function (oData) {
          console.log(oData);
          if (oData.responseMsg.data) {
            that.pubKey = oData.responseMsg.data;
            callback()
          }
        })
      },
      //RSA加密
      setEncrypt (value) {
        let that = this
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(that.pubKey);
        return encrypt.encrypt(value);
      },
      startPreviewClick() {
        let that = this
        console.log('that.startPreviewClick')
        var cameraIndexCode = that.cameraIndexCode     //获取输入的监控点编号值，必填
        var streamMode = 0;                                     //主子码流标识：0-主码流，1-子码流
        var transMode = 1;                                      //传输协议：0-UDP，1-TCP
        var gpuMode = 0;                                        //是否启用GPU硬解，0-不启用，1-启用
        var wndId = -1;                                         //播放窗口序号（在2x2以上布局下可指定播放窗口）

        // cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, "");
        // cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, "");

        if(that.layout ==1) {
          console.log('打印layout',that.layout)
          that.oWebControl.JS_RequestInterface({
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
          console.log('打印layout',that.layout)
          for(let i = 0; i <cameraIndexCode.length;i++){
            that.oWebControl.JS_RequestInterface({
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

      //录像回放功能
      startPlayback () {
        let that = this
        console.log('回放开始了')
        var cameraIndexCode  = that.cameraIndexCode[0];         //获取输入的监控点编号值，必填
        var startTimeStamp = new Date(that.startTimeStamp.replace('-', '/').replace('-', '/')).getTime();    //回放开始时间戳，必填
        var endTimeStamp = new Date(that.endTimeStamp.replace('-', '/').replace('-', '/')).getTime();        //回放结束时间戳，必填
        var recordLocation = 0;                                     //录像存储位置：0-中心存储，1-设备存储
        var transMode = 1;                                          //传输协议：0-UDP，1-TCP
        var gpuMode = 0;                                            //是否启用GPU硬解，0-不启用，1-启用
        var wndId = -1;                                             //播放窗口序号（在2x2以上布局下可指定播放窗口）

        that.oWebControl.JS_RequestInterface({
          funcName: "startPlayback",
          argument: JSON.stringify({
            cameraIndexCode: cameraIndexCode,                   //监控点编号
            startTimeStamp: Math.floor(startTimeStamp / 1000).toString(),  //录像查询开始时间戳，单位：秒
            endTimeStamp: Math.floor(endTimeStamp / 1000).toString(),      //录像结束开始时间戳，单位：秒
            recordLocation: recordLocation,                     //录像存储类型：0-中心存储，1-设备存储
            transMode: transMode,                               //传输协议：0-UDP，1-TCP
            gpuMode: gpuMode,                                   //是否启用GPU硬解，0-不启用，1-启用
            wndId:wndId                                         //可指定播放窗口
          })
        })
      }
    },
    watch:{

    }
  };
</script>
<style  scoped>
  html, body {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 100%;
    height: 100%;
  }
  .left {
    width: 20%;
    height: 90%;
    border: 1px solid #5f5d5d;
    background-color: #fdafaf;
  }
  .right {
    width: 100%;
    height: 100%;
    border: 1px solid #5f5d5d;
    background-color: #fdafaf;
  }
  .playWnd {
    width: 100%;                  /*播放容器的宽和高设定*/
    height: 100%;
    border: 1px solid red;
  }
  .operate {
    margin-top: 24px;
  }
  .operate::after {
    content: '';
    display: block;
    clear: both;
  }
  .module {
    float: left;
    width: 340px;
    /*min-height: 320px;*/
    margin-left: 16px;
    padding: 16px 8px;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
  }
  .module .item {
    margin-bottom: 4px;
  }
  .module input[type="text"] {
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0;
    width: 150px;
    min-height: 20px;
  }
  .module .btn {
    min-width: 80px;
    min-height: 24px;
    margin-top: 100px;
    margin-left: 80px;
  }
</style>
