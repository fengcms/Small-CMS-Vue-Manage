<template>
  <section class="main">
    <header class="main_tool">
      <div class="main_tool_btn">
        <div class="btn save" @click="goSubmit"><i class="fa fa-save"></i> 保存设置</div>
      </div>
      <div class="crumbs">
        <router-link :to="'/'">管理后台</router-link> /
        <span>网站基础信息设置</span>
      </div>
    </header>
    <table class="table_edit">
      <col width="100">
      <col>
      <tr>
        <th>网站名称</th>
        <td><input class="input_text w400" v-model="dat.name" type="text"></td>
      </tr>
      <tr>
        <th>网站标题</th>
        <td><input class="input_text w400" v-model="dat.title" type="text"></td>
      </tr>
      <tr>
        <th>网站LOGO</th>
        <td>
          <up-load v-model="dat.logo"></up-load>
        </td>
      </tr>
      <tr>
        <th>网站版权</th>
        <td><textarea class="input_textarea" v-model="dat.copyright"></textarea></td>
      </tr>
    </table>
  </section>
</template>
<script>
export default {
  data () {
    return {
      dat: {}
    }
  },
  created () {
    // 组件创建完后获取数据，
    this.getData()
  },
  methods: {
    getData (params) {
      if (!params) params = {}
      this.$api.get('site', params, r => {
        this.dat = r.data
      })
    },
    goSubmit () {
      this.$api.put('site', this.dat, r => {
        window.alert('编辑成功')
        this.getData()
      })
    }
  }
}
</script>
