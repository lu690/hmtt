import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

// 懒加载写法
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/search')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home', // 路由重定向
    children: [
      { path: 'home', component: Home },
      { path: 'video', component: Video },
      { path: 'question', component: Question },
      { path: 'my', component: My, name: 'my' }]
  },
  { path: '/login', component: Login, name: 'login' },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
