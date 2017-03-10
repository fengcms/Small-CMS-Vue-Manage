<template>
  <section class="main">
    <header class="main_tool">
      <div class="main_tool_btn">
        <router-link class="btn" :to="'/article'"><i class="fa fa-chevron-left"></i>返回上一页</router-link>
        <div class="btn save" @click="goSubmit"><i class="fa fa-save"></i>保存文章</div>
      </div>
      <div class="crumbs">
        <router-link :to="'/'">管理后台</router-link> /
        <router-link :to="'/article'">文章列表</router-link> /
        <span v-if="id">编辑文章</span>
        <span v-else>添加文章</span>
      </div>
    </header>
    <table class="table_edit">
      <col width="100">
      <col>
      <tr>
        <th>文章标题</th>
        <td><input class="input_text w400" v-model="dat.title" type="text"></td>
      </tr>
      <tr>
        <th>归属栏目</th>
        <td>
          <select class="input_select w150" v-model="dat.channel_id">
            <option v-for="i in channel" :value="i.id" v-text="i.name"></option>
          </select>
        </td>
      </tr>
      <tr>
        <th>作者</th>
        <td><input class="input_text w400" v-model="dat.author" type="text"></td>
      </tr>
      <tr>
        <th>来源</th>
        <td><input class="input_text w400" v-model="dat.origin" type="text"></td>
      </tr>
      <tr>
        <th>编辑</th>
        <td><input class="input_text w400" v-model="dat.editor" type="text"></td>
      </tr>
      <tr>
        <th>文章内容</th>
        <td>
          <quill-editor ref="myTextEditor" :config="editor" v-model="dat.content"></quill-editor>
          <!-- <textarea class="input_textarea" id="content" v-model="dat.content"></textarea> -->
        </td>
      </tr>
      <tr>
        <th>文章图片</th>
        <td>
          <up-load v-model="dat.img"></up-load>
        </td>
      </tr>
    </table>
  </section>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      dat: {},
      channel: [],
      editor: {
        height: '350px'
      }
    }
  },
  created () {
    // 组件创建完后获取数据，
    this.getChannel()
  },
  methods: {
    getData () {
      // 获取文章信息
      this.$api.get('article/' + this.id, null, r => {
        this.dat = r.data
      })
    },
    getChannel () {
      // 获取栏目列表
      this.$api.get('channel', null, r => {
        this.channel = r.data.list
        // 根据路由是否包含ID来判断是否是添加文章，是添加，就默认显示第一个栏目
        if (!this.id) {
          this.dat.channel_id = this.channel[0].id
        } else {
          // 否则，就去获取文章信息
          this.getData()
        }
      })
    },
    goSubmit () {
      if (this.id) {
        this.$api.put('article/' + this.id, this.dat, r => {
          window.alert('编辑成功')
          this.$router.go(-1)
        })
      } else {
        this.$api.post('article', this.dat, r => {
          window.alert('添加成功')
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .ql-toolbar {
    background: #EFF2F7;border-radius: 5px 5px 0 0;
  }
  .ql-container {
    border-radius: 0 0 5px 5px;overflow: hidden;
    .ql-editor {
      min-height: 20em;
      padding-bottom: 1em;
      max-height: 25em;
      background: #fff;
    }
  }
</style>
