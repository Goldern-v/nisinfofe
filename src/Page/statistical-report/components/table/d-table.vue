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
        v-for="(item, index) in columnObj"
        :key="index.type"
        :label="item.label"
        :min-width="item.width"
        :type="item.type"
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
import { columnObj } from './tableObject.js'
import qs from "qs";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue",
      columnObj,
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
