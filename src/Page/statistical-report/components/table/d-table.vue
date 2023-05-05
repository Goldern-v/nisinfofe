<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="wih - 150"
      v-loading="pageLoadng"
      @row-dblclick="openDetail"
      class="tablePrint"
    >
      <el-table-column
        label="序号"
        min-width="50px"
        type="index"
      ></el-table-column>

      <el-table-column
        prop="admissionDeptName"
        label="科室"
        min-width="150px"
      ></el-table-column>

      <el-table-column
        prop="name"
        label="姓名"
        min-width="80px"
      ></el-table-column>

      <el-table-column
        prop="patientId"
        label="病人ID"
        min-width="100px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="inpNo"
        label="住院号"
        min-width="80px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="sex"
        label="性别"
        min-width="60px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="age"
        label="年龄"
        min-width="90px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="educationLevel"
        label="受教育程度"
        min-width="120px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="mmseScore"
        label="MMSE得分"
        min-width="90px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="admissionDateTime"
        label="入院日期"
        min-width="120px"
      ></el-table-column>

      <el-table-column
        prop="dischargeDateTime"
        label="出院日期"
        min-width="120px"
      ></el-table-column>

      <el-table-column
        prop="diagnosis"
        label="诊断"
        min-width="200px"
      ></el-table-column>

      <el-table-column
        prop="operName"
        label="手术名称"
        min-width="120px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="doctor"
        label="主管医生"
        min-width="80px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="phone"
        label="现电话"
        min-width="120px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop=""
        label="随诊期限"
        min-width="90px"
      ></el-table-column>

      <el-table-column
        prop="companyPhone"
        label="单位电话"
        min-width="100px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="contactPhone"
        label="联系人电话"
        min-width="100px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="contactName"
        label="联系人"
        min-width="90px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="idNo"
        label="身份证号"
        min-width="120px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="address"
        label="户口地址"
        min-width="100px"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.d-table {
  border: 1px solid #cbd5dd;

  >>>.el-table {
    border: 0 !important;

    td {
      height: 30px;
    }

    th >.cell, th >div {
      padding: 0px;
      text-align: center;
    }
  }

  >>>.el-table::after, .el-table::before {
    background: #cbd5dd;
    display: none;
  }

  >>>.el-table__row td:first-child .cell, >>>.el-table__row td:last-child .cell {
    padding: 0 5px;
    text-align: center;

    >>>.cell {
      padding: 0px;
      text-align: center;
    }
  }

  >>>.el-table__body-wrapper {
    // overflow-x hidden
  }
}
</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue"
    };
  },
  methods: {
    async openDetail(row) {
      let res = await info(row.patientId, row.visitId);
      for (let index in res.data.data) {
        if (!res.data.data[index]) {
          res.data.data[index] = "";
        }
      }
      window.open(
        `/crNursing/home?${qs.stringify({
          patientId: res.data.data.patientId,
          visitId: res.data.data.visitId
        })}`
      );
    }
  },
  components: {}
};
</script>
