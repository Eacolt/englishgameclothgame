// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import VueAxios from 'vue-axios'
import Axios from 'axios'

import router from './router'
import pixiCanvas from './components/pixiCanvas.js'


Vue.config.productionTip = false;
Vue.use(VueAxios,Axios)
Vue.use(pixiCanvas)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
