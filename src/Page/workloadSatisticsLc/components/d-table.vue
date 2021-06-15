<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      :height="wih - 131"
      border
      v-loading="pageLoadng"
      stripe
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column prop="index" label="序号" width="70" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="empNo" label="工号" min-width="90" align="center"></el-table-column>
      <el-table-column prop="empName" label="护士姓名" min-width="120" align="center"></el-table-column>
      <el-table-column prop="sySum" label="输液" min-width="85" align="center"></el-table-column>
      <el-table-column prop="zsSum" label="注射" min-width="85" align="center"></el-table-column>
      <el-table-column prop="kfSum" label="口服" min-width="85" align="center"></el-table-column>
      <el-table-column prop="zlSum" label="治疗" min-width="85" align="center"></el-table-column>
      <el-table-column prop="whSum" label="雾化" min-width="85" align="center"></el-table-column>
      <el-table-column prop="bbSum" label="标本" min-width="85" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../common/mixin/common.mixin";
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
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 1 || index === 2) {
          sums[index] = "";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
      });

      return sums;
    },
  },
  components: {}
};
</script>
