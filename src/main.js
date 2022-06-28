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

Vue.config.productionTip = false
Vue.component('ToutiaoIcon', ToutiaoIcon)

Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
