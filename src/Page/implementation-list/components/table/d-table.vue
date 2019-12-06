<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="wih - 165"
      v-loading="pageLoadng"
      @row-dblclick="openDetail"
    >
      <el-table-column prop="wardName" label="床号" min-width="50px"></el-table-column>

      <el-table-column prop="bedLabel" label="执行时间" min-width="80px"></el-table-column>

      <el-table-column label="姓名" prop="name" min-width="80px"></el-table-column>

      <el-table-column label="医嘱内容" prop="doctorInCharge" min-width="200px"></el-table-column>

      <el-table-column prop="sex" label="计量" min-width="50px"></el-table-column>

      <el-table-column prop="patientId" label="单位" min-width="50px"></el-table-column>

      <el-table-column label="频次" prop="inpNo" min-width="50px"></el-table-column>

      <el-table-column prop="visitId" label="途径" min-width="10px" v-if="HOSPITAL_ID == 'gy'"></el-table-column>

      <el-table-column prop="visitId" label="执行状态" min-width="80px" v-else></el-table-column>

      <el-table-column prop="admissionDate" label="执行人" min-width="80px"></el-table-column>

      <el-table-column prop="dischargeDate" label="实际执行时间" min-width="150px"></el-table-column>
      <el-table-column prop="dischargeDate" label="开医嘱时间" min-width="150px"></el-table-column>
      <el-table-column prop="dischargeDate" label="长/临" min-width="50px"></el-table-column>
      <el-table-column prop="dischargeDate" label="校对护士" min-width="80px"></el-table-column>
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
