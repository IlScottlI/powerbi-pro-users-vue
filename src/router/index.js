import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Stepup Card',
      component: Home
    },
    {
      path: '/Leaderboard',
      name: 'Leaderboard',
      component: () => import(/* webpackChunkName: "about" */ '../views/Leaderboard.vue')
    }
  ]
})

export default router
