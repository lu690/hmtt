import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'

import '@/styles/index.less'

// import '@/styles/icon.less'
// import '@/styles/reset.less'

import ToutiaoIcon from '@/components/ToutiaoIcon.vue'

import '@/components'
// 一次性把filters / index.js中所有按需要导出全部导出来，作为obj的属性
import * as obj from '@/filters'
import FollowUser from '@/components/FollowUser.vue'
Vue.component('FollowUser', FollowUser)
// Vue.component(FollowUser.name, FollowUser)
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.config.productionTip = false
Vue.component('ToutiaoIcon', ToutiaoIcon)
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 给页面上所有的元素绑定滚动事件
//  只要谁滚动 就打印出来
const list = document.querySelectorAll('*')
list.forEach(item => {
  item.onscroll = function (e) {
    console.log(e.target)
  }
})
