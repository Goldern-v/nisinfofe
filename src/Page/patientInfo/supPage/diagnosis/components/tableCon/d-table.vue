<template>
  <div class="diagnosis-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="wih - 290"
      @row-click="selectedRow"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="序号" width="60" type="index" align="center"></el-table-column>
      <el-table-column prop="beginTime" label="开始时间" width="150" align="center"></el-table-column>
      <el-table-column prop="creatorName" label="护士" width="100" align="center"></el-table-column>
      <el-table-column prop="diagName" label="护理诊断" width="200" align="center"></el-table-column>
      <el-table-column label="护理措施" width="400" header-align="center">
        <template slot-scope="scope">
          <span
            v-for="(item, index) in scope.row.measuresName"
            :key="index"
          >{{item && item.measureDetail}}</span>
        </template>
      </el-table-column>
      <el-table-column label="护理目标" width="300" header-align="center">
        <template slot-scope="scope">
          <span
            v-for="(item, index) in scope.row.targetsName"
            :key="index"
          >{{item && item.parameter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="evalType" label="评价" width="150" header-align="center"></el-table-column>
      <el-table-column prop="endTime" label="停止时间" width="150" align="center"></el-table-column>
      <el-table-column prop="operatorName" label="结束护士签名" width="120" align="center"></el-table-column>
    </el-table>
  </div>
</template>

  <script>
import common from "@/common/mixin/common.mixin";
import { nursingDiagsPatient } from "../../api/index";
import { model } from "../../diagnosisViewModel";
export default {
  mixins: [common],
  props: ["tableData"],
  data() {
    return {
      model
    };
  },
  methods: {
    selectedRow(row) {
      model.selectedRow = row;
    },
    tableRowClassName(row) {
      if (row.id == (this.model.selectedRow && this.model.selectedRow.id)) {
        return "selected-row";
      }
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.diagnosis-table {
  /deep/ .el-table th {
    height: 30px;
    .cell {
      font-size: 12px;
      font-weight: 400;
      color: #000;
      background: #f4f2f4;
    }
  }
  /deep/ *::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: #eaeaea;
  }
  /deep/ *::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
    background-color: #eaeaea;
  }
  /deep/ *::-webkit-scrollbar-thumb {
    border-radius: 50px; // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #c2c2c2;
  }
  /deep/ .el-table {
    border: 1px solid #000 !important;
    th {
      border-left: 1px solid #000 !important;
      border-right: 1px solid #000 !important;
      border-bottom: 1px solid #000 !important;
    }
    td {
      border: 1px solid #000 !important;
    }
    .cell {
      padding: 0 10px;
    }
    .selected-row td {
      background: #fff8b1 !important;
    }
    .el-table__body-wrapper {
      margin-top: -1px;
    }
  }
}
</style>
