// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store/store'
import moment from 'moment'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(Vuetify)

Vue.filter('formatTime', (value, format) => {
  if (value === '-') {
    return value
  }
  return moment(value).format(format)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
