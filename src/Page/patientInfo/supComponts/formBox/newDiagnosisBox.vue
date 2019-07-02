<template>
  <div>
    <sweet-modal ref="newRecord" size="big-650" title="添加护理诊断">
      <div class="record-con">
        <div class="search-con">
          <div @keyup.enter.prevent="searchBybtn">
            <el-input placeholder="请输入诊断关键词" v-model="searchWord" class="diagnosis-search">
              <el-button type="primary" slot="append" v-touch-ripple @click="search">搜索</el-button>
            </el-input>
          </div>
        </div>
        <div class="tip">
          <span v-if="totalCount > -1">为您找到{{totalCount}}条相关诊断，请选择</span>
          <span else>请输入搜索关键词</span>
        </div>
        <div class="list-con">
          <diagnosisList v-for="item of list" :key="item.id" :data="item" :word="searchWord"></diagnosisList>
        </div>
      </div>
      <div class="page-con">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.diagnosis-search
  .el-input-group__append
    background: #4BB08D;
    border: 1px solid #4BB08D;
    color #fff
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.search-con
  height 50px
  padding-top 14px
  border-bottom: 1px solid #ECECEC
.tip
  font-size: 12px;
  color: #999999;
  margin 8px 0 0
.page-con
  text-align left  
  margin 18px 0 5px
.list-con
  min-height 366px  
</style>

<script>
  import {
    host
  } from '@/api/apiConfig'
  import {
    search
  } from '@/api/home'
  import diagnosisList from './list/diagnosisList.vue'
  export default {
    data() {
      return {
        searchWord: '',
        pageIndex: 0,
        pageSize: 6,
        totalCount: -1,
        list: []
      }
    },
    mounted() {},
    methods: {
      init() {
        this.searchWord = '',
          this.pageIndex = 1,
          this.pageSize = 6,
          this.totalCount = -1,
          this.list = []
      },
      open() {
        // this.init()
        this.$refs.newRecord.open()
      },
      close() {
        this.$refs.newRecord.close()
      },
      search() {
        if (!this.searchWord) {
          return 
        }
        search(this.$route.query.patientId, this.$route.query.visitId, this.searchWord, this.pageIndex, this.pageSize).then(res => {
          this.totalCount = res.data.data.totalCount
          this.list = res.data.data.list
        })
      },
      searchBybtn() {
        if (!this.searchWord) {
          return this.$message({
            showClose: true,
            message: '关键词不能为空',
            type: 'warning'
          })
        }
        this.pageIndex = 0
        this.search()
      },
      handleSizeChange() {},
      handleCurrentChange(val) {
        this.pageIndex = val
        this.search()
      }
    },
    components: {
      diagnosisList
    }
  }
</script>
