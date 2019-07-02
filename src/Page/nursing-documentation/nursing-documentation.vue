<template lang="pug">
  div
    .main-contain
      dTable(:tableData="tableData" :pageLoadng="pageLoadng")
      .head-con(flex="main:justify cross:center")
        .left-part 
        .right-part
          span(v-if="page.totalPage") {{page.pageIndex}}/{{page.totalPage}}页
          span(@click="prePage" :class="{useLess: page.pageIndex <= 1}") 上一页
          span(@click="nextPage" :class="{useLess: page.pageIndex >= page.totalPage}") 下一页
          span
            input(type="text" v-model="pageInput" @keyup.enter="gotoPage")
          span(@click="gotoPage") 跳转
    .search-con
      searchCon(ref="searchCon")
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain
  margin 10px 250px 0px 10px
  // border 1px solid #CBD5DD
  .head-con
    height 40px
    padding 0 16px
    background: #F8F8F8;
    border 1px solid #CBD5DD;
    border-top 0
    .right-part
      span 
        margin-right 12px
        font-size: 12px;
        color: #687179;  
        cursor pointer
        user-select: none
        &.useLess
          color #999 !important
          cursor: not-allowed;
        input 
          width 25px;
          height 16px;
          background: #FFFFFF;
          border: 1px solid #CBD5DD;
          border-radius: 2px;
          outline none
          text-align center
        &:hover
          color #333    
.search-con
  width 240px
  position fixed
  border-left: 1px solid #D4DADE;     
  background #f8f8f8     
  top 60px
  bottom 0
  right 0
  z-index 10
</style>
<script>
import searchCon from './components/search-con/search-con'
import dTable from './components/table/d-table'
import {patEmrList} from '@/api/document'
  export default {
    data() {
      return {
        pageInput: '',
        tableData: [],
        pageLoadng: false,
        page: {
          pageIndex: 1,
          pageNum: 20,
          totalPage: 1,
        },
      }
    },
    methods: {
      prePage() {
        if (this.page.pageIndex <= 1) return
        this.page.pageIndex --
        this.getData()
      },
      nextPage() {
        if (this.page.pageIndex >= this.page.totalPage) return
        this.page.pageIndex ++
        this.getData()
      },
      gotoPage() {
        this.page.pageIndex = this.pageInput
        this.getData()
      },
      getData() {
        let data = this.$refs.searchCon.data
        let obj = {}
        if(data.deptValue) {
          obj.wardCode = data.deptValue || data.deptList.join(',')
        }
        if(data.status) {
          obj.status = data.status
        }
        if(data.name) {
          obj.name = data.name
        }
        if(data.patientId) {
          obj.patientId = data.patientId
        }
        if(data.inpNo) {
          obj.inpNo = data.inpNo
        }
        if(data.bedLabel) {
           obj.bedLabel = data.bedLabel
        }
        if(data.admissionDate[0]) {
          obj.admissionDateBegin = new Date(data.admissionDate[0]).Format('yyyy-MM-dd')
        }
        if(data.admissionDate[1]) {
          obj.admissionDateEnd = new Date(data.admissionDate[1]).Format('yyyy-MM-dd')
        }
        if(data.dischargeDate[0]) {
          obj.dischargeDateBegin = new Date(data.dischargeDate[0]).Format('yyyy-MM-dd')
        }
        if(data.dischargeDate[1]) {
          obj.dischargeDateEnd = new Date(data.dischargeDate[1]).Format('yyyy-MM-dd')
        }
        if(data.status == 1) {
          obj.dischargeDateBegin = ''
          obj.dischargeDateEnd = ''
        }
        if(data.status == 2) {
          obj.admissionDateBegin = ''
          obj.admissionDateEnd = ''
        }
        obj.pageIndex = this.page.pageIndex
        obj.pageNum = this.page.pageNum
        this.pageLoadng = true
        patEmrList(obj).then(res => {
          this.tableData = res.data.data.list
          this.page.totalPage = res.data.data.page
          this.pageLoadng = false
        })
      }
    },
    components: {
      searchCon,
      dTable
    }
  }
</script>
