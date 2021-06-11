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
    <el-table-column prop="patientId" label="患者ID"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
    <!-- <el-table-column prop="fileName" label="住院号"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
    <el-table-column prop="fileName" label="姓名"  min-width="80" align="center" class-name="rule-name"> </el-table-column> -->
    <el-table-column prop="logDateTime" label="转床时间"  min-width="100" align="center" class-name="rule-name">
      <template slot-scope="scope">
        <div>{{scope.row.logDateTime | ymdhm}}</div>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="fileName" label="转出病区"  min-width="150" align="center" class-name="rule-name"> </el-table-column>
    <el-table-column prop="fileName" label="转出专科"  min-width="80" align="center" class-name="rule-name"> </el-table-column> -->
    <el-table-column prop="bedLabelOld" label="转出床位号"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
    <!-- <el-table-column prop="fileName" label="转入病区"  min-width="150" align="center" class-name="rule-name"> </el-table-column>
    <el-table-column prop="fileName" label="转入专科"  min-width="150" align="center" class-name="rule-name"> </el-table-column> -->
    <el-table-column prop="bedLabelNew" label="转入床位号"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
    <el-table-column prop="operator" label="操作员"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
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
    pageLoadng: Boolean
  },
  mixins: [commonMixin],
  data() {
    return {
    };
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    }
  },
  components: {}
};
</script>
