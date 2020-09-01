import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router.js'
import axios from './axios.js'
import store from './store.js'

Vue.use(Vuetify);

Vue.prototype.$http = axios;
Vue.prototype.$store = store;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
