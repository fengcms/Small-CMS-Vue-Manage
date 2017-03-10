<template>
  <div class="pagination">

    <template v-if="page > 1">
      <a @click="goPage(1)">首页</a>
      <a @click="goPage(page - 1)">上一页</a>
    </template>
    <template v-else>
      <a class="disable">首页</a>
      <a class="disable">上一页</a>
    </template>

    <a v-for="i in indexs()" :class="{'curr' : i === page}" @click="goPage(i)" v-text="i"></a>

    <template v-if="page < allPage()">
      <a @click="goPage(page + 1)">下一页</a>
      <a @click="goPage(allPage())">末页</a>
    </template>
    <template v-else>
      <a class="disable">下一页</a>
      <a class="disable">末页</a>
    </template>

  </div>
</template>
<script>
export default {
  props: {
    curr: null,
    total: null
  },
  data () {
    return {
      pagesize: 10,
      page: 1
    }
  },
  created () {
    this.page = this.curr
  },
  methods: {
    goPage (i) {
      this.page = i
      this.$emit('returnPage', i)
    },
    allPage () {
      let all = Math.ceil(this.total / this.pagesize)
      return all
    },
    indexs () {
      let arr = []
      let aP = this.allPage()
      let p = this.page
      let min = 0
      let max = aP
      if (aP > 5) {
        if (p < 3) {
          min = 0
          max = 5
        } else if ((aP - p) < 2) {
          min = aP - 5
          max = aP
        } else {
          min = p - 3
          max = p + 2
        }
      }
      for (let i = min; i < max; i++) {
        arr.push(i + 1)
      }
      return arr
    }
  }
}
</script>
