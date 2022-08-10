import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { postRequest, putRequest, getRequest, deleteRequest } from './utils/api'
import store from './store/index'
import {initMenu} from "@/utils/menus";
import 'font-awesome/css/font-awesome.css'
import { downloadRequest } from './utils/download'

Vue.config.productionTip = false
// 插件形式使用请求
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

Vue.prototype.downloadRequest = downloadRequest

router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router, store)
    if (!window.sessionStorage.getItem('user')) {
      // 判断用户信息是否存在
      return getRequest('/api/admin/info').then(resp => {
        if (resp) {
          // 存入用户信息
          window.sessionStorage.setItem('user', JSON.stringify(resp))
          store.commit('INIT_ADMIN', resp)
          next('/home')
        }
      })
    }
    next()
  } else {
    if (to.path === '/') {
      next()
    }
  }
})
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
