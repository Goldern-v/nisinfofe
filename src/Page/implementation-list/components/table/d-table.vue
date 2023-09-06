<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="wih - 165"
      v-loading="pageLoadng"
    >
      <el-table-column prop="bedLabel" label="床号" min-width="50px" align="center">
        <template slot-scope="scope">
          <div>{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.bedLabel) : ''}}</div>
        </template>
      </el-table-column>

      <el-table-column prop="executeDateTime" label="执行时间" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.executeDateTime) : '' | ymdhm}}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" prop="patientName" min-width="70px" align="center">
        <template slot-scope="scope">
          <div>{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.patientName) : ''}}</div>
        </template>
      </el-table-column>

      <el-table-column label="医嘱内容" prop="orderText" min-width="250px">
        <template slot-scope="scope">
          <div :class="scope.row.rowType && `rowType-${scope.row.rowType}`">{{scope.row.orderText }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="dosage" label="剂量" min-width="50px" align="right">
        <template slot-scope="scope">
          <span style="position: relative;right: -10px;">{{scope.row.dosage }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="dosageUnits" label="单位" min-width="50px">
        <template slot-scope="scope">
          <span style="position: relative;left: -10px;">{{scope.row.dosageUnits }}</span>
        </template>
      </el-table-column>

      <el-table-column label="频次" prop="frequency" min-width="50px" align="center"></el-table-column>

      <el-table-column prop="administration" label="途径" min-width="100px" align="center"></el-table-column>

      <el-table-column prop="executeFlag" label="执行状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span
            :class="{
              yzx: scope.row.executeFlag == '已执行',
              zxz: scope.row.executeFlag == '执行中',
              }"
          >{{ scope.row.executeFlag }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="executeNurseName" label="执行人" min-width="80px" align="center"></el-table-column>

      <el-table-column prop="realExecuteDateTime" label="实际执行时间" min-width="150px" align="center"></el-table-column>
      <el-table-column prop="performSchedule" label="开医嘱时间" min-width="90px" align="center"></el-table-column>
      <el-table-column prop="repeatIndicator" label="长/临" min-width="70px" align="center"></el-table-column>
      <el-table-column prop="startNurse" label="校对护士" min-width="80px" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <div v-show="scope.row.executeDateTime">
            <el-button
              type="text"
              @click="backTracking(scope.row)"
              v-if="
                scope.row.executeDateTime &&
                scope.row.executeFlag != '未执行'
              "
              >补执行</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <editModal ref="editModal"></editModal>
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

      .yzx {
        color: red;
      }

      .zxz {
        color: blue;
      }
    }

    th .cell {
      padding: 0 0px !important;
    }

    /* * 第一条 */
    .rowType-1 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0px;
        top: 50%;
        bottom: -5px;
      }
    }

    .rowType-2 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0px;
        top: -5px;
        bottom: -5px;
      }

      &:after {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0;
        top: 50%;
      }
    }

    .rowType-3 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-bottom: 1px solid #333;
        left: 0px;
        bottom: 50%;
        top: -5px;
      }
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
import editModal from "../common/edit-modal";
import moment from "moment";
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
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("HH:mm") : "";
    }
  },
  methods:{
     // 补录
    backTracking(item) {
      this.$refs.editModal.open(item,'补执行');
    },
  },
  components: {editModal}
};
</script>
