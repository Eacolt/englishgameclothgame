import Vue from 'vue'
import VueRouter from 'vue-router'
import PixiGame from '@/components/PixiGame.vue'
Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'PixiGame',
      component: PixiGame
    }
  ]
})
