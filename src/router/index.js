import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Covid19-Char',
    component: () => import('../components/Covid19.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../components/Table.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
