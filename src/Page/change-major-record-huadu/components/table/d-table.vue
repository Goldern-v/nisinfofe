<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      :height="wih - 180"
      border
      v-loading="pageLoadng"
      stripe
    >
      <el-table-column
        label="序号"
        header-align="center"
        type="index"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="inpNo"
        label="患者ID"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
      </el-table-column>
      <!-- <el-table-column prop="fileName" label="姓名"  min-width="80" align="center" class-name="rule-name"> </el-table-column> -->
      <el-table-column
        prop="visitId"
        label="住院次数"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
      </el-table-column>
      <el-table-column
        prop="wardName"
        label="护理单元"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
      </el-table-column>
      <el-table-column
        prop="bedNo"
        label="床号"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="患者所在科室"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
      </el-table-column>
      <el-table-column
        prop="transferFromName"
        label="来源科室"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
      </el-table-column>
      <el-table-column
        prop="transferToName"
        label="去向科室"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
      </el-table-column>
      <el-table-column
        prop="dischargeDateTime"
        label="出科时间"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.dischargeDateTime | ymdhm }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="admissionDateTime"
        label="入科时间"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.admissionDateTime | ymdhm }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="doctor"
        label="医生"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
      </el-table-column>
      <el-table-column
        prop="nurse"
        label="责任护士"
        min-width="80"
        align="center"
        class-name="rule-name"
      >
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

    .cell {
      padding: 0 10px !important;
      overflow: visible !important;
      font-size: 13px !important;
    }

    th .cell {
      padding: 0 0px !important;
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
import moment from "moment";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean,
  },
  mixins: [commonMixin],
  data() {
    return {};
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
  },
  components: {},
};
</script>
