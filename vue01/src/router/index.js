import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomePage from '@/views/HomePage.vue'
import StorePage from '@/views/StorePage.vue'
import { Store } from 'vuex'
import CartPage from '@/views/CartPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ProductDetail from '@/views/ProductDetail.vue'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/store',
    name: 'store',
    component: StorePage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/product/:id', // 动态路由，基于商品 ID
    name: 'ProductDetail',
    component: ProductDetail,
    props: true, // 传递路由参数作为组件的 props
  },
]

const router = new VueRouter({
  routes
})

export default router
