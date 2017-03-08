<template>
  <div>
    <header class="header">
      <h1 class="logo"><a href="index.html"><i class="fa fa-list-alt"></i> Small CMS Manage System</a></h1>
      <div class="header_link">
        <a @click="logout">退出登录</a>
      </div>
    </header>
    <nav class="menu">
      <!-- <h2>导航菜单</h2> -->
      <dl v-for="i in nav">
        <dt><i class="fa" :class="i.icon"></i> {{i.name}}</dt>
        <dd v-for="ii in i.children">
          <router-link :to="ii.router" v-text="ii.name"></router-link>
        </dd>
      </dl>
    </nav>
    <router-view></router-view>
    <footer class="copy">
      Small CMS Manage System &copy; <a href="http://blog.csdn.net/fungleo">FungLeo </a>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nav: [
        {
          name: '文章管理',
          icon: 'fa-file-text-o',
          children: [
            {name: '文章列表', router: '/article'},
            {name: '添加文章', router: '/article/add'}
          ]
        },
        {
          name: '系统管理',
          icon: 'fa-cogs',
          children: [
            {name: '网站设置', router: '/site'},
            {name: '栏目管理', router: '/channel'},
            {name: '管理员管理', router: '/manage'}
          ]
        }
      ]
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    // this.get_data()
    // this.$api.get('article', null, r => {
    //   console.log(r)
    // })
  },
  methods: {
    logout () {
      this.$api.get('logout', this.dat, r => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
