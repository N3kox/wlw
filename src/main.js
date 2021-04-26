import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import VueResource from 'vue-resource'
import router from './router'
import utils from './utils'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(element)
Vue.use(VueResource)
Vue.use(utils)
Vue.prototype.$axios = axios
axios.defaults.baseURL="/query"
axios.defaults.headers.get['Content-Type'] = 'application/json';
// axios.defaults.baseURL = '/query'


new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount('#app')
