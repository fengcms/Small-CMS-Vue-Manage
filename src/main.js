// 引用 vue 没什么要说的
import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
// 光引用不成，还得使用
Vue.use(VueRouter)
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App.vue'
// 引用路由配置文件
import routes from './config/routes'
// 引用API文件
import api from './config/api'
// 引用utils工具文件
import utils from './utils'
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$utils = utils

// 全局组件

import UpLoad from './components/upload.vue'
import Pagination from './components/pagination.vue'
Vue.component('up-load', UpLoad)
Vue.component('pagination', Pagination)

// 引用和使用编辑器
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

// 使用配置文件规则
const router = new VueRouter({
  routes
})
// 跑起来吧
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
