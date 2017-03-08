<template>
  <div class="login_body">
    <section class="login_box">
      <header>Small CMS Manage System</header>
      <ul>
        <li><input class="input_text" v-model="dat.account" placeholder="请输入用户名" type="text"></li>
        <li><input class="input_text" v-model="dat.password" @keyup.enter="goSubmit" placeholder="请输入密码" type="password"></li>
        <li><input class="input_submit" @click="goSubmit" type="button" value="登录"></li>
      </ul>
      <footer>
        Small CMS Manage System &copy; <a href="http://blog.csdn.net/fungleo">FungLeo </a>
      </footer>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dat: {
        account: null,
        password: null
      }
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
    goSubmit () {
      this.$api.post('login', this.dat, r => {
        this.$router.push('/')
        console.log(r)
        // this.$api.get('profile', null, r => {
        //   console.log(r)
        // })
      })
    }
  }
}
</script>
