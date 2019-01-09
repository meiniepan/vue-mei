import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import service from '@/http/service'
import 'vue-area-linkage/dist/index.css';
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(VueAreaLinkage)
Vue.use(ElementUI);

import './style/base.css'
import './style/index.scss'

Vue.prototype.$http = service
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
