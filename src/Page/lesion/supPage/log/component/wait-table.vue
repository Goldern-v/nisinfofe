<template>
  <div>
    <!-- <div class="tool-con" flex="cross:center">
      <el-button size="small" class="del-btn" v-touch-ripple>删除</el-button>
    </div> -->
    <div style="height: 20px"></div>
    <el-table :data="tableData" stripe :show-header="true" style="width: 100%" border :height="height()">
      <el-table-column  label=" " width="70" type="index">
      </el-table-column>
      <el-table-column label="患者姓名" min-width="120px">
        <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="80px">
        <template slot-scope="scope">
              <span>{{scope.row.sex}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" min-width="80px">
        <template slot-scope="scope">
              <span>{{scope.row.age}}</span>
        </template>
      </el-table-column>
      <el-table-column label="患者ID" min-width="160px">
        <template slot-scope="scope">
              <span>{{scope.row.patientId}}</span>
        </template>
      </el-table-column>
       <el-table-column label="电话" min-width="160px">
        <template slot-scope="scope">
              <span>{{scope.row.phoneNumber}}</span>
        </template>
      </el-table-column>
       <el-table-column label="地址" min-width="160px">
        <template slot-scope="scope">
              <span>{{scope.row.mailingAddress}}</span>
        </template>
      </el-table-column>
       <el-table-column label="开单医生" min-width="120px">
        <template slot-scope="scope">
              <span>{{scope.row.consultingDoctor}}</span>
        </template>
      </el-table-column>
      <el-table-column label="诊断" min-width="160px">
        <template slot-scope="scope">
              <span>{{scope.row.clinicDiagnosis}}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记时间" min-width="160px">
        <template slot-scope="scope">
              <span>{{scope.row.registeringDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="入住科室" min-width="120px">
        <template slot-scope="scope">
              <span>{{scope.row.deptName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="入住病区" min-width="120px">
        <template slot-scope="scope">
              <span>{{scope.row.wardName}}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.tool-con
  background: #F8F8F8;
  height 30px;
  border 1px solid #CBD5DD
  margin-top 20px
  .del-btn
    height 32px
    width 64px
    margin-left 14px
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    box-shadow: 0 1px 2px 0 rgba(200,200,200,0.50);
    border-radius: 2px;
    font-size: 12px;
    color: #687179;
</style>

<script>
  export default {
    props: {
        tableData: Array
      },
    data() {
      return {
        msg: 'hello vue',
      }
    },
    computed: {
      wih() {
        return this.$store.state.common.wih
      }
    },
    methods: {
      height() {
        let height = this.wih - 200
        return height.toString()
      },
    },
    components: {}
  }
</script>
