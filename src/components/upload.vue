<template>
  <div class="upload">
    <div class="progress" v-if="progress">
      <span :style="'width:' + 300 * progress + 'px'">loading...</span>
    </div>
    <input class="input_text w300" v-model="imgUrl" type="text">
    <label>
      <input type="file" @change="upImg" name="file" class="none">
      <div class="btn save large"><i class="fa fa-picture-o"></i> 选择图片</div>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    value: null
  },
  data () {
    return {
      uploadUrl: process.env.API_ADDR + '/upload',
      imgUrl: null,
      progress: null
    }
  },
  created () {},
  watch: {
    value: function () { // 加载时，用于赋值显示
      if (this.value !== undefined) {
        this.imgUrl = this.value
      }
    }
  },
  methods: {
    upImg (e) {
      let v = this
      var xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open('POST', this.uploadUrl)
      xhr.onload = function () {
        if (xhr.status === 200) {
          let r = JSON.parse(this.responseText)
          if (r.code === 0) {
            v.imgUrl = r.data.url
            v.$emit('input', v.imgUrl)
            v.progress = null
          } else {
            v.progress = null
            window.alert(r.msg)
          }
        // 上传成功
        } else {
        // 处理其他情况
        }
      }
      xhr.onerror = function () {
        // 处理错误
      }
      xhr.upload.onprogress = function (e) {
        // 上传进度
        if (e.lengthComputable) {
          v.progress = ~~(e.loaded / e.total)
        }
      }
      let fd = new FormData()
      fd.append('file', e.target.files[0])
      // 添加参数和触发上传
      xhr.send(fd)
    }
  }
}
</script>
