// 引入子路由
import Frame from '../frame/subroute.vue'
// 引用模板
import Login from '../page/login.vue'
import Index from '../page/index.vue'
// 文章系统
import articleIndex from '../page/article/index.vue'
import articleEdit from '../page/article/edit.vue'
// 栏目设置
import channelIndex from '../page/channel/index.vue'
import channelEdit from '../page/channel/edit.vue'
// 系统设置
import siteIndex from '../page/site/index.vue'
// 管理员管理
import manageIndex from '../page/manage/index.vue'
import manageEdit from '../page/manage/edit.vue'
// 配置路由
export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Frame,
    children: [
      {path: '/', component: Index}
    ]
  },
  {
    path: '/article',
    component: Frame,
    children: [
      {path: '/', component: articleIndex},
      {path: 'add', component: articleEdit},
      {path: 'edit/:id', component: articleEdit}
    ]
  },
  {
    path: '/channel',
    component: Frame,
    children: [
      {path: '/', component: channelIndex},
      {path: 'add', component: channelEdit},
      {path: 'edit/:id', component: channelEdit}
    ]
  },
  {
    path: '/manage',
    component: Frame,
    children: [
      {path: '/', component: manageIndex},
      {path: 'add', component: manageEdit},
      {path: 'edit/:id', component: manageEdit}
    ]
  },
  {
    path: '/site',
    component: Frame,
    children: [
      {path: '/', component: siteIndex}
    ]
  }
]
