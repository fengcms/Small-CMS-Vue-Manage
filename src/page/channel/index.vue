<template>
  <section class="main">
    <header class="main_tool">
      <div class="main_tool_btn">
        <router-link class="btn" :to="'/'"><i class="fa fa-chevron-left"></i>返回上一页</router-link>
        <router-link class="btn add" :to="'/channel/add'"><i class="fa fa-plus"></i>添加栏目</router-link>
      </div>
      <div class="crumbs">
        <router-link :to="'/'">管理后台</router-link>
        / 栏目管理
      </div>
    </header>
    <table class="table_list">
      <col width="50">
      <col>
      <col width="120">
      <col width="120">
      <col width="100">
      <tr>
        <th>ID</th>
        <th class="tl">栏目名称</th>
        <th>添加时间</th>
        <th>操作</th>
      </tr>
      <tr v-for="i in list">
        <td v-text="i.id">1</td>
        <td class="tl" v-text="i.name"></td>
        <td v-text="$utils.formatDate(i.time)">2017-03-02</td>
        <td class="control">
          <router-link class="btn edit mini" :to="'/channel/edit/'+i.id">编辑</router-link>
          <div class="btn detele mini" @click="delChannel(i.id)">删除</div>
        </td>
      </tr>
    </table>
  </section>
</template>
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    // 组件创建完后获取数据，
    this.getData()
  },
  methods: {
    getData (param) {
      if (!param) param = {}
      this.$api.get('channel', param, r => {
        this.list = r.data.list
      })
    },
    delChannel (id) {
      if (window.confirm('确定删除该栏目吗？')) {
        this.$api.delete('channel/' + id, null, r => {
          this.getData()
        })
      }
    }
  }
}
</script>
