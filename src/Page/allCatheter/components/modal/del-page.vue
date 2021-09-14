<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="300" title="选择删除的页数">
      <div class="check-con">
        <el-checkbox-group v-model="checkList">
          <el-checkbox :label="item" :key="item" v-for="item in index" class="check-box">第 {{item}} 页</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.check-con
  overflow hidden
  .check-box
    float left
    width 33.3%
    margin-left 0
</style>

<script>
  export default {
    props: {
      index: Number
    },
    data() {
      return {
        checkList: [],
        callback: ''
      }
    },
    methods: {
      open(callback) {
        this.checkList = []
        this.callback = callback
        this.$refs.modal.open()
      },
      close() {
        this.$refs.modal.close()
      },
      post() {
        if(this.checkList.length == 0) {
          return this.$message.warning('请至少选择一页')
        }
        this.callback(this.checkList)
        this.close()
      }
    },
    components: {}
  }
</script>
