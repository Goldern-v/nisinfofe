<template>
  <div class="contain">
    <p class="title">护理记录 {{title}} </p>
     <el-table
     class="dd-table"
    :data="tableData"
    :height="tableHeight - 34"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="100">
    </el-table-column>
    <el-table-column
      label="时间"
      width="180">
      <template slot-scope="scope">
        <span>{{scope.row.status == 1 ? scope.row.endTime: new Date(scope.row.beginTime).Format('yyyy-MM-dd') }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="executorName"
      label="执行人">
    </el-table-column>
  </el-table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.dd-table
  &.el-table td, &.el-table th
    height 36px
  .el-table__body-wrapper
    overflow-x hidden       
</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 0 0 0 20px
.title
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  margin-bottom 14px
</style>
<script>
import {patientDiag} from '@/api/home-top'
  export default {
    props: {
      diagId: Number,
      tableHeight: Number,
      title: String
    },
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      patientDiag(this.diagId).then(res => {
        this.tableData = res.data.data
      })
    },
    components: {}
  }
</script>
