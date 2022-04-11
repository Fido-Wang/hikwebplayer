import Vue from 'vue'
import Router from 'vue-router'
import hikWebPlayer from './../components/hikWebPlayer/index.vue'
import mapEdit from './../components/mapEdit/index.vue'
import mapPoi from './../components/mapEdit/mapPoi.vue'
import position from './../components/PositionGet/index.vue'
import visualScreen from './../components/VisualScreen/index.vue'
import ProjectSteps from './../components/VisualScreen/ProjectSteps/index.vue'
import picviewer from './../components/PicViewer/index.vue'
import progres from './../components/ProgressSteps/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/hikWebPlayer',
      name: 'hikWebPlayer',
      component: hikWebPlayer
    },
    {
      path: '/mapEdit',
      name: 'mapEdit',
      component: mapEdit
    },
    {
      path: '/mapPoi',
      name: 'mapPoi',
      component: mapPoi
    },
    {
      path: '/position',
      name: 'position',
      component: position
    },
    {
      path: '/visualScreen',
      name: 'visualScreen',
      component: visualScreen
    },
    {
      path: '/ProjectSteps',
      name: 'ProjectSteps',
      component: ProjectSteps
    },
    {
      path: '/picviewer',
      name: 'picviewer',
      component: picviewer
    },
    {
      path: '/progres',
      name: 'progres',
      component: progres
    },
  ]
})
