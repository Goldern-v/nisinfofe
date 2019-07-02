<template lang="pug">
.contain
  .table-con
    .head-con(flex="main:justify cross:center")
      .left-part(flex="main:justify cross:center") 
        span(class="title-text") 交班日期：
        span.time-select-con-shift
          el-date-picker(v-model="selectTime[0]" type="date" placeholder="选择开始日期" @change="getData()")
        span(class="title-text" style="margin: 0 10px") 至  
        span.time-select-con-shift
          el-date-picker(v-model="selectTime[1]" type="date" placeholder="选择结束日期" @change="getData()")
        span(@click="getData" style="margin-left: 16px")
          whiteButton(text="查询")
        span(@click="opneAddModal" style="margin-left: 9px")
          whiteButton(text="添加")
    shiftTable(:data="tableData" :tableLoading="tableLoading")    
    addModal(ref="addModal")
    editModal(ref="editModal")
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 20px 20px 0
.table-con
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  background #fff
  .head-con
    height 50px
    padding 0 16px
    background: #F8F8F8;
    border-bottom 1px solid #CBD5DD
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
.title-text
  font-size: 12px;
  color: #687179;
</style>

<style lang="stylus">
.time-select-con-shift
  .el-input__inner
    height 32px
    width 130px
    background: #FFFFFF;  
    border: 1px solid #C2CBD2;
    border-radius: 4px;
    font-size: 12px;
    // color: #C4C8CF !important;
  .el-date-editor--date.el-input
    width 130px  
</style>

<script>
 import whiteButton from '@/components/button/white-button.vue'
 import shiftTable from './component/shift-table/shift-table.vue'
 import addModal from './component/add-modal/add-modal.vue'
 import editModal from './component/edit-modal/edit-modal.vue'
 import {list} from '@/api/shift'
  export default {
    data() {
      return {
        page: {},
        pageInput: '',
        selectTime: [
          new Date(), new Date()
        ],
        tableData: [],
        tableLoading: false
      }
    },
    methods: {
      getData() {
        try{
          let deptCode = this.deptCode
          let startDeliverDate = this.selectTime[0].Format('yyyy-MM-dd')
          let endDeliverDate = this.selectTime[1].Format('yyyy-MM-dd')
          if(deptCode && startDeliverDate && endDeliverDate) {
            this.tableLoading = true
           list(deptCode,startDeliverDate,endDeliverDate).then(res => {
             this.tableData = res.data.data
             this.tableLoading = false
           })
          }
        }
        catch(e) {
          console.log(e)
        }
      },
      opneAddModal() {
        this.$refs.addModal.open()
      },
      openEditModal() {
        this.$refs.editModal.open()
      }
    },
    computed: {
      deptCode() {
        return this.$store.state.lesion.deptCode
      },
    },
    watch: {
      deptCode() {
        this.getData()
      },
    },
    created() {
      this.getData()
    },
    mounted() {
    },
    components: {
      whiteButton, shiftTable, addModal, editModal
    }
  }
</script>
