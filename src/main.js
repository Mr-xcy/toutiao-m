
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import Vant from 'vant';
import 'vant/lib/index.css';
import "./styles/index.less"

import './utils/dayjs'

// 自动设置REM基准值（html标签字体大小）
import 'amfe-flexible'


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
