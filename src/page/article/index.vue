<template>
  <section class="main">
    <header class="main_tool">
      <div class="main_tool_btn">
        <router-link class="btn" :to="'/'"><i class="fa fa-chevron-left"></i>返回上一页</router-link>
        <router-link class="btn add" :to="'/article/add'"><i class="fa fa-plus"></i>添加文章</router-link>
      </div>
      <div class="crumbs">
        <router-link :to="'/'">管理后台</router-link>
        / 文章列表
      </div>
    </header>
    <section class="search">
      <div class="item"><strong>标题：</strong><input v-model="param.title" class="input_text" type="text"></div>
      <div class="item">
        <strong>归属栏目：</strong>
        <select class="input_select" v-model="param.channel_id" placeholder="选择栏目">
          <option value="">全部</option>
          <option v-for="i in channel" :value="i.id" v-text="i.name"></option>
        </select>
      </div>
      <div class="item"><input @click="goSearch()" class="input_submit" value="搜索" type="button"></div>
    </section>
    <table class="table_list">
      <col width="50">
      <col>
      <col width="120">
      <col width="120">
      <col width="100">
      <tr>
        <th>ID</th>
        <th class="tl">文章标题</th>
        <th>归属栏目</th>
        <th>发表时间</th>
        <th>操作</th>
      </tr>
      <tr v-for="i in list">
        <td v-text="i.id">1</td>
        <td class="tl" v-text="i.title">今天天气真心不错1</td>
        <td v-text="i.channel.name">最新资讯</td>
        <td v-text="$utils.formatDate(i.time)">2017-03-02</td>
        <td class="control">
          <router-link class="btn edit mini" :to="'/article/edit/'+i.id">编辑</router-link>
          <div class="btn detele mini" @click="delArticle(i.id)">删除</div>
        </td>
      </tr>
    </table>
    <pagination :curr="param.page" :total="total" @returnPage="goPage"></pagination>
  </section>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      channel: [],
      param: {
        title: '',
        channel_id: '',
        page: 1
      },
      total: 1
    }
  },
  created () {
    // 组件创建完后获取数据，
    this.getData()
    this.getChannel()
  },
  methods: {
    getData () {
      this.$api.get('article', this.param, r => {
        this.list = r.data.list
        this.total = r.data.total
      })
    },
    getChannel () {
      // 获取栏目列表
      this.$api.get('channel', null, r => {
        this.channel = r.data.list
      })
    },
    delArticle (id) {
      if (window.confirm('确定删除该文章吗？')) {
        this.$api.delete('article/' + id, null, r => {
          this.getData()
        })
      }
    },
    goPage (e) {
      this.param.page = e
      this.getData()
    },
    goSearch () {
      this.param.page = 1
      this.getData()
    }
  }
}
</script>
