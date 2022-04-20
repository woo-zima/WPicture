import Vue from 'vue'
 import api from './api'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import resetMessage from './util/restMessage.js'

Vue.config.productionTip = false
Vue.prototype.$message = resetMessage;
 Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
