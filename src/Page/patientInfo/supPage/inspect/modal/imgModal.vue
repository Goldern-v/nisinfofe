<template>
  <div>
    <sweet-modal ref="modal" size="record" :title="title" :fullBtn="true">
      <imageView :examNo="examNo" :name="name"></imageView>
      <div slot="button" style="text-align:center">
        <el-button class="modal-btn" @click="$refs.modal.close()">取消</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>
<script>
import imageView from '../../../../../Part/imageView/imageView'
  export default {
    data() {
      return {
        title: '查看检查图片',
        examNo: '',
        name: '',
      }
    },
    methods: {
      open(examNo, name) {
        this.examNo = examNo
        this.name = name
        this.$refs.modal.open()
      }
    },
    components: {
      imageView
    }
  }
</script>
