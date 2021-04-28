<template>
  <!-- 签名确认 -->
  <sweet-modal ref="modalName" size="small" title="设置标题">
    <p for="" class="name-title">设置自定义标题</p>
    <div action="" @keyup.13="post" ref="titleInput">
      <!-- <el-input size="small" type="text" placeholder="输入标题名称" v-model="title"></el-input> -->
      <el-autocomplete style="width: 100%" v-model="title" :fetch-suggestions="querySearch" placeholder="输入标题名称"></el-autocomplete>
    </div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title
  font-size 14px;
  margin 5px 0 10px  
  font-weight bold
</style>

<script>
  import {
    listItem
  } from '../../api/recordDesc'
  import sheetInfo from '../config/sheetInfo/index.js'
  export default {
    data() {
      return {
        title: '',
        callback: ''
      }
    },
    methods: {
      open(callback, title) {
        this.callback = callback
        this.title = title.indexOf('标题') > -1 ? '' : title
        this.$refs.modalName.open()
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.titleInput.querySelector('input').focus()
          }, 200)
        })
      },
      post() {
        this.$refs.modalName.close()
        this.callback(this.title)
      },
      async querySearch(queryString, cb) {
        let {
          data: {
            data
          }
        } = await listItem('自定义表单', sheetInfo.sheetType)
        // 调用 callback 返回建议列表的数据
        let autoList = []
        if (!queryString) {
          autoList = data.map(item => {
            return {
              value: item.name
            }
          })
        } else {
          autoList = data.filter(item => item.name.indexOf(queryString) > -1).map(item => {
            return {
              value: item.name
            }
          })
        }
        cb(autoList);
      }
    },
    components: {}
  }
</script>
