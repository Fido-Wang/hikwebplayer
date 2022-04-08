<template>
  <div style="width: 100vw; height: 100vh; background-color:pink;">
    <div style="width: 80%;height: 20%; margin: 0 auto; border: 1px solid #fff">
      <el-steps :active="2">
        <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤 3" description="这段就没那么长了"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectSteps",
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
