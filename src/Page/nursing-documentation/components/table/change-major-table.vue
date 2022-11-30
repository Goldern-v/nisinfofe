<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%; overflow:hidden;"
      border
      :height="wih - 125"
      v-loading="pageLoadng"
      @row-dblclick="openDetail"
    >
      <el-table-column
        label=" "
        min-width="50px"
        type="index"
        align="center"
      ></el-table-column>

      <el-table-column
         v-if="['huadu','foshanrenyi'].includes(HOSPITAL_ID)"
         prop="patientId"
         label="住院号"
         min-width="60"
         align="center"
      ></el-table-column>
      <el-table-column
         v-else
         prop="inpNo"
         label="住院号"
         min-width="60"
         align="center"
      ></el-table-column>
       <el-table-column
         prop="name"
         label="姓名"
         min-width="45"
         align="center"
      ></el-table-column>

      <el-table-column
        prop="visitId"
        label="住院次数"
        min-width="22"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="wardName"
        label="护理单元"
        min-width="120"
        align="center"
      ></el-table-column>

      <el-table-column
        :prop="HOSPITAL_ID === 'beihairenyi' ? 'bedNo' : 'bedLabel'"
        label="床号"
        min-width="40"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="deptName"
        label="患者所在科室"
        min-width="80"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="transferFromName"
        label="来源科室"
        min-width="80"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="transferToName"
        label="去向科室"
        min-width="80"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="dischargeDateTime"
        label="出科时间"
        min-width="80"
        align="center"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.dischargeDateTime | formateYMDHMS }}</div>
        </template>
      </el-table-column>

      <el-table-column
       prop="admissionDateTime"
        label="入科时间"
        min-width="80"
        align="center"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.admissionDateTime | formateYMDHMS }}</div>
        </template>
      </el-table-column>

      <el-table-column
        prop="doctor"
        label="医生"
        min-width="45"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="nurse"
        label="责任护士"
        min-width="45"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" min-width="45">
        <template slot-scope="scope">
          <el-button type="text" @click="openDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
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
  >>>.el-table .cell, >>>.el-table th > div{
    padding:0 5px;
  }
  >>>.el-table__body-wrapper {
    overflow-x: hidden
  }
}
</style>
<script>
import moment from "moment";
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean,
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue",
    };
  },
  methods: {
    async openDetail(row) {
      if (row.notViewPatient) {
        this.$message.warning("患者已归档，用户无权查看");
        return;
      }
      let res = await info(row.patientId, row.visitId);
      if(res.data.code!='200'){
         this.$message.error(res.data.desc)
         return
       }
      for (let index in res.data.data) {
        if (!res.data.data[index]) {
          res.data.data[index] = "";
        }
      }
      window.open(
        `/crNursing/home?${qs.stringify({
          patientId: res.data.data.patientId,
          visitId: res.data.data.visitId,
        })}`
      );
    },
  },
  components: {},
  filters: {
    formateYMDHMS(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
  }
};
</script>
