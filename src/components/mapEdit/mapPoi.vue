<template>
  <div>
    <el-input
      v-model="input"
      placeholder="请输入内容"
      id="tipinput"
    ></el-input>
    <div>经度：{{ info.la }} 维度：{{ info.wd }}</div>
    <div id="map001"></div>
  </div>
</template>
<script>
const AMap = window.AMap;
export default {
  name:'mapPoi',
  components: {},
  data() {
    return {
      input: "",
      map: null,
      info: {},
    };
  },
  mounted() {
    // this.init();
    this.initMap();
  },
  methods: {
    // 地图初始化
    initMap() {
      let that = this
      that.map = new AMap.Map("map001", {
        center: [116.397428, 39.90923], //中心点坐标
        zoom: 18, //级别
      });

      var placeSearch = new AMap.PlaceSearch({
        // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        city: '021'
      })

      placeSearch.search('东方明珠', function (status, result) {
        // 查询成功时，result即对应匹配的POI信息
        console.log(result)
        var pois = result.poiList.pois;
        for(var i = 0; i < pois.length; i++){
          var poi = pois[i];
          var marker = [];
          marker[i] = new AMap.Marker({
            position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: poi.name
          });
          // 将创建的点标记添加到已有的地图实例：
          map.add(marker[i]);
        }
        map.setFitView();

      });

      AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "010", // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search('深圳大学');
      });

      // 获取搜索信息
      function autoInput(){
        var keywords = '北京大学';
        AMap.plugin('AMap.PlaceSearch', function(){
          var autoOptions = {
            city: '全国'
          }
          var placeSearch = new AMap.PlaceSearch(autoOptions);
          placeSearch.search(keywords, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
            var node = new PrettyJSON.view.Node({
              el: document.querySelector("#tipinput"),
              data: result
            });
          })
        })
      }
    },
  },
};
</script>
<style scoped>
#map001 {
  width: 800px;
  height: 600px;
}
</style>

