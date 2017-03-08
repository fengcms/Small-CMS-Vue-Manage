<template>
  <section class="main">
    <header class="main_tool">
      <div class="main_tool_btn">
        <router-link class="btn" :to="'/channel'"><i class="fa fa-chevron-left"></i>返回上一页</router-link>
        <div class="btn save" @click="goSubmit"><i class="fa fa-save"></i>保存栏目</div>
      </div>
      <div class="crumbs">
        <router-link :to="'/'">管理后台</router-link> /
        <router-link :to="'/channel'">栏目列表</router-link> /
        <span v-if="id">编辑栏目</span>
        <span v-else>添加栏目</span>
      </div>
    </header>
    <table class="table_edit">
      <col width="100">
      <col>
      <tr>
        <th>栏目名称</th>
        <td><input class="input_text w150" v-model="dat.name" type="text"></td>
      </tr>
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
      this.$api.get('channel/' + this.id, params, r => {
        this.dat = r.data
      })
    },
    goSubmit () {
      if (this.id) {
        this.$api.put('channel/' + this.id, this.dat, r => {
          window.alert('编辑成功')
          this.$router.go(-1)
        })
      } else {
        this.$api.post('channel', this.dat, r => {
          window.alert('添加成功')
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>
