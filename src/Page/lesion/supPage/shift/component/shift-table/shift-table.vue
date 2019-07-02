<template>
  <div>
    <el-table :data="data"  style="width: 100%" border :height="height()" class="shift-table" v-loading="tableLoading">
      <el-table-column  label=" " min-width="50px" type="index">
      </el-table-column>
      
      <el-table-column
        prop="deliverDate"
        label="交班日期"
        min-width="100px">
      </el-table-column>

      <!-- <el-table-column
        prop="deptName"
        label="科室"
        min-width="100px">
      </el-table-column> -->

      <el-table-column
        prop="rangeBeginTime"
        label="班次开始时间"
        min-width="140px">
      </el-table-column>

      <el-table-column
        prop="rangeEndTime"
        label="班次结束时间"
        min-width="140px">
      </el-table-column>

       <el-table-column
        label="班次"
        min-width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.range}}</span>
        </template>

      </el-table-column>

      <el-table-column
        label="交班人"
        min-width="180px">
        <template slot-scope="scope">
          <span v-if="scope.row.status != '0'">{{scope.row.delivererName}}</span>
          <span v-else style="color: #E62C2C">{{scope.row.creatorName}}(未签名)</span>
        </template>
      </el-table-column>  

      <el-table-column
        prop="receiverName"
        label="接班人"
        min-width="180px">
      </el-table-column>

      <el-table-column
        label="状态"
        min-width="180px">
        <template slot-scope="scope">
          <span>{{scope.row.status | toStatus}}</span>
        </template>
      </el-table-column> 



      <el-table-column label="操作" min-width="150px">
        <template slot-scope="scope">
              <div flex="main:justify" class="do-box">
                <span flex-box="1" class="do-item" @click="getDeatils(scope.row)">查看</span>
                <span flex-box="1" class="do-item"  @click="print(scope.row)">打印</span>
                <span flex-box="1" class="do-item" @click="del(scope.row)" v-if="scope.row.status == 0 || isCreator(scope.row)">删除</span>
                <span v-else flex-box="1" class="do-item"></span>
              </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.do-box
  font-size: 13px;
  color: #4BB08D;
  .do-item
    padding 5px
    cursor pointer
    text-align center
    width 0
    &:hover
      font-weight bold
</style>

<style lang="stylus">
.shift-table
  border 0 !important
  .el-table__row td:first-child .cell
    text-align center
    padding 0 5px  
  .cell
    padding 0 8px 
</style>

<script>
import {get, del} from '@/api/shift'
  export default {
    props: {
        data: Array,
        tableLoading: Boolean
      },
    data() {
      return {
      }
    },
    computed: {
      wih() {
        return this.$store.state.common.wih
      },
    },
    methods: {
      height() {
        let height = this.wih - 215
        return height.toString()
      },
      async getDeatils(row) {
       let {data:{data}} = await get(row.id)
       this.$parent.$refs.editModal.open(data)
      },
      async del(row) {
        await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                  })
       await del(row.id)
       this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      this.$parent.getData()  
      },
      print(row) {
        let date = row.deliverDate
        let data = this.data.filter(item => item.deliverDate == date)
        let deptName = this.$store.state.lesion.deptName
        let print_wid = window.open(`/crNursing/print/shift`)
        print_wid.onload = () => {
          print_wid.getShiftData(data, date, deptName)
        }
      },
      isCreator(form) {
         return (form.creator == JSON.parse(localStorage.user).empNo) || JSON.parse(localStorage.user).auditor
    }
    },
    filters: {
      toStatus(val) {
        if(val == 0) {
          return '保存'
        } else if(val == 1) {
          return '交班签名'
        } else if(val == 2) {
          return '接班签名'
        } else {
          return '未知'
        }
      }
    },
    components: {}
  }
</script>
