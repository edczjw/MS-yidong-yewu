// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import axios from 'axios'
import animate from 'animate.css'
Vue.prototype.$axios = axios
import fileDownload from 'js-file-download'

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(animate)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$store = store

// 跳转后返回顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  fileDownload,
  components: { App },
  template: '<App/>'
})
