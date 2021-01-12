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
      <el-table-column label="姓名" prop="empName" min-width="80px" align="center">
        <template slot-scope="scope">
          <div>{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.empName) : ''}}</div>
        </template>
      </el-table-column>
      <el-table-column label="护理等级" prop="nursingClass" min-width="100px" align="center">
        <template slot-scope="scope">
          <div>{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.nursingClass) : ''}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="frequency" label="巡视频率" min-width="80px" align="center">
        <template slot-scope="scope">
          <div>{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.frequency) : ''}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="nextDate" label="下次巡视日期" min-width="120px" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.rowType == 1 || !scope.row.rowType">{{scope.row.nextDate | ymdhm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="巡视次数" min-width="80px" align="center">
        <template slot-scope="scope">
          <div>{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.num+'次') : ''}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="operateDate" label="巡视时间" min-width="120px" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.operateDate | ymdhm}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="visitContent" label="巡视内容" min-width="300px"></el-table-column>
      <el-table-column prop="operator" label="巡视护士" min-width="80px" align="center"></el-table-column>
      <el-table-column
        prop="操作"
        label="操作"
        align="center"
        min-width="80px"
        v-if="isNursingRoundsAuthority"
      >
        <template slot-scope="scope">
          <span
            :class="scope.row.num == '0' ? 'no-special' : 'btn-text'"
            @click="scope.row.num == '0' ? () => {} : openViewModal(scope.row)"
          >修改</span>
          <span
            :class="scope.row.num == '0' ? 'no-special' : 'btn-text'"
            @click="scope.row.num == '0' ? () => {} : deleteData(scope.row)"
          >删除</span>
        </template>
      </el-table-column>
    </el-table>
    <nursingRoundsModal ref="nursingRoundsModal" :getData="getData"></nursingRoundsModal>
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

  .btn-text {
    color: #4bb08d;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }

  .no-special {
    color: #ccc;
  }
}
</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
import moment from "moment";
import nursingRoundsModal from "../modal/nursingRoundsModal";
import { deleteOperateDateLingChen } from "../../api/index";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  props: {
    tableData: Array,
    pageLoadng: Boolean,
    getData: Function
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue"
    };
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : val;
    }
  },
  methods: {
    openViewModal(data) {
      this.$refs.nursingRoundsModal.open(data);
    },
    deleteData(data) {
      this.form = {
        empNo:this.empNo, // --工号
        empName:this.empName, //--护士姓名
        serialNo: data.serialNo,
        operateDate:data.operateDate ? moment(data.operateDate).format("YYYY-MM-DD HH:mm:ss"): '',//  --巡视日期
        operateDateNew: data.operateDateNew ? moment(data.operateDateNew).format("YYYY-MM-DD HH:mm:ss"): '',//  --巡视新日期
        visitContent:data.visitContent, //--巡视内容
        visitContentNew: data.visitContentNew,// --巡视新内容
      };
      this.$confirm(`确定要删除该条数据吗`, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteOperateDateLingChen(this.form)
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "删除失败"
              });
            });
          this.getData();
        })
        .catch(() => {
          console.log("删除取消");
        });
    }
  },
  components: {
    nursingRoundsModal
  }
};
</script>
