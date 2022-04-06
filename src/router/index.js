import Vue from 'vue'
import Router from 'vue-router'
import hikWebPlayer from './../components/hikWebPlayer/index.vue'
import mapEdit from './../components/mapEdit/index.vue'
import mapPoi from './../components/mapEdit/mapPoi.vue'
import position from './../components/PositionGet/index.vue'

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
  ]
})
