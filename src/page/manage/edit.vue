<template>
  <section class="main">
    <header class="main_tool">
      <div class="main_tool_btn">
        <router-link class="btn" :to="'/manage'"><i class="fa fa-chevron-left"></i>返回上一页</router-link>
        <div class="btn save" @click="goSubmit"><i class="fa fa-save"></i>保存管理员</div>
      </div>
      <div class="crumbs">
        <router-link :to="'/'">管理后台</router-link> /
        <router-link :to="'/manage'">管理员列表</router-link> /
        <span v-if="id">编辑管理员</span>
        <span v-else>添加管理员</span>
      </div>
    </header>
    <table class="table_edit">
      <col width="100">
      <col>
      <tr>
        <th>管理员名称</th>
        <td><input class="input_text w150" v-model="dat.username" type="text"></td>
      </tr>
      <template v-if="id">
        <tr v-if="id">
          <th>老密码</th>
          <td><input class="input_text w150" v-model="dat.old_password" type="password"></td>
        </tr>
        <tr>
          <th>新密码</th>
          <td><input class="input_text w150" v-model="dat.new_password" type="password"></td>
        </tr>
        <tr>
          <th>重复新密码</th>
          <td><input class="input_text w150" v-model="dat.re_password" type="password"></td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <th>管理员密码</th>
          <td><input class="input_text w150" v-model="dat.password" type="password"></td>
        </tr>
      </template>
    </table>
  </section>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      dat: {}
    }
  },
  created () {
    // 组件创建完后获取数据，
    if (this.id) {
      this.getData()
    }
  },
  methods: {
    getData (params) {
      if (!params) params = {}
      this.$api.get('manage/' + this.id, params, r => {
        this.dat = r.data
      })
    },
    goSubmit () {
      if (this.id) {
        let d = this.dat
        if (!d.old_password) {
          window.alert('老密码不能为空')
          return
        }
        if (!d.new_password) {
          window.alert('新密码不能为空')
          return
        }
        if (d.old_password === d.new_password) {
          window.alert('老密码和新密码相同')
          return
        }
        if (d.new_password !== d.re_password) {
          window.alert('两次密码不一致')
          return
        }
        this.$api.put('manage/' + this.id, d, r => {
          window.alert('编辑成功')
          this.$router.go(-1)
        })
      } else {
        this.$api.post('manage', this.dat, r => {
          window.alert('添加成功')
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>
