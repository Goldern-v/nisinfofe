<template>
  <div>
    <el-table class="con-table" :data="tableData" stripe :show-header="true" style="width: 100%" border :height="height">
      <el-table-column label=" " width="50" type="index" style="text-align: center">
        <!-- <template slot-scope="scope">
            <span>{{scope.row.orderNo}}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="申请时间" min-width="160px">
        <template slot-scope="scope">
            <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="患者姓名" min-width="120px">
        <template slot-scope="scope">
            <span>{{scope.row.patientName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="80px">
        <template slot-scope="scope">
            <span>{{scope.row.patientGender}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" min-width="80px">
        <template slot-scope="scope">
            <span>{{scope.row.patientAge}}</span>
        </template>
      </el-table-column>
      <el-table-column label="会诊目的" min-width="160px">
        <template slot-scope="scope">
            <span>{{scope.row.conGoal}}</span>
        </template>
      </el-table-column>
      <el-table-column label="目前主要诊断" min-width="160px">
        <template slot-scope="scope">
            <span>{{scope.row.diagnosis}}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" min-width="80px">
        <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请科室" min-width="200px">
        <template slot-scope="scope">
            <span>{{scope.row.deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" min-width="120px">
        <template slot-scope="scope">
            <span>{{scope.row.createName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请会诊时间" min-width="160px">
        <template slot-scope="scope">
            <span>{{scope.row.planDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="120px">
        <template slot-scope="scope">
            <span>{{scope.row.sugStatus || scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="doForm(scope.row)" type="text" size="small">操作</el-button>
      </template>
    </el-table-column>
    </el-table>

    <!-- 弹窗 -->
      <modalDetail ref="modalDetail" @refresh="refresh"></modalDetail>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.con-table
  &.el-table .cell, &.el-table th > div
    padding-left 10px;
    padding-right 10px;
  .el-table__row .el-table_1_column_1:nth-of-type(1)
    text-align center
</style>

<script>
import modalDetail from '../moadl/detail'
  export default {
    props: {
      tableData: Array
    },
    data() {
      return {}
    },
    computed: {
      wih() {
        return this.$store.state.common.wih
      },
      height() {
        return this.wih - 210
      }
    },
    methods: {
      doForm(item) {
        // 打开弹窗完成初始化
        this.$refs.modalDetail.open(item)
      },
      refresh() {
        this.$emit('refresh')
      }
    },
    components: {
      modalDetail
    }
  }
</script>
