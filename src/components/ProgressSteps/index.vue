<template>
  <div style="width: 100vw; height: 100vh; background: pink; overflow: auto">

    <el-row v-for="item in dataList" :key="item.floor">
      <el-col :span="4" style="background: skyblue">
        {{ item.floor }}
      </el-col>
      <el-col :span="20" style="background-color:yellow;">
        <el-steps :active="item.list.active" align-center>
          <el-step title="基坑开挖" :description="item.list.time1"></el-step>
          <el-step title="主体施工" :description="item.list.time2"></el-step>
          <el-step title="二次结构" :description="item.list.time3"></el-step>
          <el-step title="装饰工程" :description="item.list.time4"></el-step>
          <el-step title="竣工验收" :description="item.list.time5"></el-step>
        </el-steps>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "index",
      data() {
          return {
            dataList: [
              {
                floor: '1#楼',
                list: {
                  time1: '2021-12-1',
                  time2: '2021-12-2',
                  time3: '2021-12-3',
                  time4: '2021-12-4',
                  time5: '2021-12-5',
                  name: '基坑开挖',
                  active: 0
                }
              },
              {
                floor: '2#楼',
                list: {
                  time1: '2021-10-1',
                  time2: '2021-10-2',
                  time3: '2021-10-3',
                  time4: '2021-10-4',
                  time5: '2021-10-6',
                  name: '主体施工',
                  active: 1
                }
              },
              {
                floor: '3#楼',
                list: {
                  time1: '2022-1-1',
                  time2: '2022-1-2',
                  time3: '2022-1-3',
                  time4: '2022-1-4',
                  time5: '2022-1-5',
                  name: '二次结构',
                  active: 2
                }
              },
              {
                floor: '4#楼',
                list: {
                  time1: '2022-11-1',
                  time2: '2022-11-2',
                  time3: '2022-11-3',
                  time4: '2022-11-4',
                  time5: '2022-11-5',
                  name: '装饰工程',
                  active: 3
                }
              },
              {
                floor: '5#楼',
                list: {
                  time1: '2021-5-1',
                  time2: '2021-5-2',
                  time3: '2021-5-3',
                  time4: '2021-5-4',
                  time5: '2021-5-5',
                  name: '竣工验收',
                  active: 4
                }
              },

            ]
          }
      }
    }
</script>

<style scoped>

  .el-row {
    height: 20%;
  }
  .el-col {
    height: 100%;
    border: 1px solid #fff;
  }
</style>
