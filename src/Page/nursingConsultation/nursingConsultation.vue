<template>
  <div>
    <div class="content">
      <div class="select-nav">
        <div class="select-btn-con">
          <el-button class="select-btn" :class="{active: isManySubject=='全部'}" @click="isManySubject = '全部'">全部</el-button>
          <el-button class="select-btn" :class="{active: isManySubject=='多科会诊'}" @click="isManySubject = '多科会诊'">多科会诊</el-button>
          <el-button class="select-btn" :class="{active: isManySubject=='单科会诊'}" @click="isManySubject = '单科会诊'">单科会诊</el-button>
        </div>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="status">
            <el-radio class="radio" label="全部">全部</el-radio>
            <el-radio class="radio" label="等待确认">等待确认</el-radio>
            <el-radio class="radio" label="申请确认">申请确认</el-radio>
            <el-radio class="radio" label="完成">完成</el-radio>
          </el-radio-group>
        </el-row>
      </div>
      <consultationTable :tableData="tableDataSelect" @refresh="refresh"></consultationTable>
      <div class="page-con">
        <el-pagination 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="tableInfo.pageIndex" 
          :page-sizes="[10, 20, 30, 40]" 
          :pageSize="tableInfo.pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="tableInfo.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px;
}
.page-con
  margin-top 20px;
  text-align right   
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.openbar
  border 0
  .el-collapse-item 
    border: 1px solid #CBD5DD;
    border-radius: 2px;
    margin-bottom  10px 
  .el-collapse-item__header
    height 37px
    background: #F7FAFA
    line-height 37px
    border-color #EAEEF1
    color #333333
    font-size 13px
    font-weight bold
  .el-collapse-item__wrap
    border 0 
  .el-collapse-item__content
    padding 0
  .el-table
    border 0
  .el-table td, .el-table th
    height 37px
    font-size 12px
    color #333 
.select-nav
    height 34px  
    margin-bottom 18px
    .select-btn-con
      .select-btn
        height 34px
        background: #FFFFFF;
        width 100px
        text-align center
        border 0
        border-radius 0
        border-top: 1px solid #CBD5DD;
        border-bottom: 1px solid #CBD5DD;
        border-right: 1px solid #CBD5DD;
        box-shadow: 0 1px 2px 0 rgba(200,200,200,0.50);
        font-size: 12px;
        color: #687179;
        margin 0
        float left
        position relative 
        font-weight lighter
        &:first-child
          border-radius: 2px 0px 0px 2px;
        &:last-child
          margin-left -1px
          border-radius: 0 2px 2px 0;
        &.active
          background: #4BB08D;
          border: 1px solid #3D8B72;  
          color: #fff
          z-index 2
    .select-btn-list
      margin-left 23px
      height 34px
      background #fff
      padding 0 16px
      float left
      .el-radio__label     
        color #333
        font-size 12px            
</style>

<script>
  import consultationTable from './component/consultationTable'
  import {
    nurseList
  } from '@/api/consultation'
  export default {
    data() {
      return {
        tableData: [],
        status: '全部',
        isManySubject: '全部',
        tableInfo: {
          pageIndex: 1,
          pageSize: 10,
          total: 10,
        }
      }
    },
    computed: {
      infoData() {
        return this.$route.query
      },
      tableDataSelect() {
        let data = this.tableData
        return data
      }
    },
    created() {
      this.getTableData()
    },
    watch: {
      isManySubject() {
        this.initPage()
        this.getTableData()
      },
      status() {
        this.initPage()
        this.getTableData()
      }
    },
    methods: {
      initPage() {
        this.tableInfo = {
          pageIndex: 1,
          pageSize: 10,
          total: 10,
        }
      },
      getTableData() {
        nurseList(this.isManySubject, this.status, this.tableInfo.pageIndex, this.tableInfo.pageSize).then((res) => {
        this.tableInfo.total = res.data.data.totalCount
        this.tableInfo.pageIndex = res.data.data.pageIndex
        this.tableData = res.data.data.list
       })
      },
      handleCurrentChange(val) {
        this.tableInfo.pageIndex = val
        this.getTableData()
      },
      handleSizeChange(val) {
        this.tableInfo.pageSize = val
        this.getTableData()
      },
      refresh() {
        // this.initPage()
        this.getTableData()
      }
    },
    components: {
      consultationTable
    }
  }
</script>
