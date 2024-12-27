import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManage from '@/views/UserManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    name: 'user',
    component: UserManage
  },
 
]

const router = new VueRouter({
  routes
})

export default router
