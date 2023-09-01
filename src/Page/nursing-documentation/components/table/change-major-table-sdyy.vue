<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%;"
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
         prop="inpNo"
         label="住院号"
         min-width="60"
         align="center"
      ></el-table-column>
       <el-table-column
         prop="name"
         label="姓名"
         min-width="80"
         align="center"
      ></el-table-column>

      <el-table-column
        prop="visitId"
        label="住院次数"
        min-width="60"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="sign"
        label="标志"
        min-width="90"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="operTime"
        label="日期"
        min-width="90"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="originalDeptName"
        label="原科室"
        min-width="120"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="originalWardName"
        label="原病区"
        min-width="120"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="originalBedLabel"
        label="原床号"
        min-width="60"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="currentDeptName"
        label="当前科室"
        min-width="120"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="currentWardName"
        label="当前病区"
        min-width="120"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="currentBedLabel"
        label="当前床号"
        min-width="60"
        align="center"
      ></el-table-column>

      <el-table-column label="操作" min-width="60">
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
  // >>>.el-table__body-wrapper {
  //   overflow-x: hidden
  // }
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
