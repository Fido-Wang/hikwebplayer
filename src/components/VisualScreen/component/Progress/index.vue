<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activities: [
        {
          content: '基坑开挖',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-check'
        }, {
          content: '主体施工',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87',
          icon: 'el-icon-check'
        }, {
          content: '二次结构',
          timestamp: '2018-04-03 20:46',
          size: 'large',
          icon: 'el-icon-check'
        }, {
          content: '装饰工程',
          timestamp: '2018-04-03 20:46'
        },
        {
          content: '竣工验收',
          timestamp: '2018-04-03 20:46'
        },
      ]

    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
