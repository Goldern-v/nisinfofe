<template>
  <div class="d-table">
    <u-table
      style="width: 100%"
      border
      :height="tableH"
      v-loading="pageLoadng"
      :data="tableData"
      use-virtual
      showBodyOverflow="title"
      showHeaderOverflow="title"
      :row-height="rowHeight"
    >
      <u-table-column prop="bedLabel" label="床号" min-width="50px" align="center">
        <template slot-scope="scope">
          <div :title="(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.bedLabel) : ''">{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.bedLabel) : ''}}</div>
        </template>
      </u-table-column>
      <u-table-column label="姓名" prop="patientName" min-width="70px" align="center">
        <template slot-scope="scope">
          <div :title="(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.patientName) : ''">{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.patientName) : ''}}</div>
        </template>
      </u-table-column>
      <u-table-column label="性别" prop="patientSex" min-width="70px" align="center" >
        <template slot-scope="scope">
          <div :title="scope.row.patientSex">{{(scope.row.rowType == 1 || !scope.row.rowType) ? scope.row.patientSex:''}}</div>
        </template>
      </u-table-column>
      <u-table-column label="内容" prop="dosage" min-width="380px">
        <template slot-scope="scope" >
          <div :title="scope.row.itemName" :class="scope.row.rowType && `rowType-${scope.row.rowType}`">{{scope.row.itemName }}</div>
        </template>
      </u-table-column>
      <u-table-column label="剂量" prop="dosage" min-width="60px">
        <template slot-scope="scope">
          <div :title="scope.row.dosage">{{scope.row.dosage }}</div>
        </template>
      </u-table-column>

      <u-table-column prop="adminstration" label="给药途径" min-width="80px" align="center"></u-table-column>

      <u-table-column prop="frequency" label="频次" min-width="50px" align="center"></u-table-column>

      <u-table-column  label="开始时间" prop="startDate" min-width="120px" align="center"></u-table-column>

      <u-table-column label="结束时间" prop="stopDate" min-width="120px" align="center"></u-table-column>

      <u-table-column label="滴速" prop="speed" min-width="50px" align="center"></u-table-column>

      <u-table-column label="执行护士" prop="startNurse" min-width="80px" align="center"></u-table-column>

      <u-table-column label="巡视时间" prop="operationDate"  min-width="70px" align="center"></u-table-column>
      <u-table-column prop="dropSpeed" label="滴速" min-width="70px" align="center"></u-table-column>

      <u-table-column  label="巡视内容"  prop="visitContent" min-width="100px" align="center"></u-table-column>

      <u-table-column label="巡视护士" prop="visitNurse"  min-width="80px" align="center"></u-table-column>

    </u-table>
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
    th,td {
      padding: 0px;
    }

    th >.cell, th >div {
      padding: 0px;
      text-align: center;
    }

    th {
      .cell {
        height: 100%;
        line-height: 40px;
      }
    }

    .cell {
      padding: 0 10px !important;
      overflow: visible !important;
      font-size: 13px !important;
      white-space: normal !important;

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
    .myCell {
      .el-checkbox__input {
        display: none
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
import commonMixin from "../../../../common/mixin/common.mixin";
import moment from "moment";
export default {
  props: {
    pageLoadng: Boolean,
    tableData: Array,
  },
  mixins: [commonMixin],
  data() {
    return {
      rowHeight: 30,
      checked: true,
      selectedData: []
    };
  },
  computed: {
    tableH() {
      return this.wih - 173
    }
  },
  methods: {
    rowcb(obj){
      // 如果该条执行单是一组多条的 或者该执行单是已完成的隐藏当前多选框
      if(obj.row.rowType > 1 || obj.row.executeFlag == 2){
        return "myCell"
      }
    },
    handleSelectionChange(selection){
      this.selectedData = selection;

    },
    toggleRowSelection(selection,row){
       console.log(selection);
      console.log(row);
    }
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm") : "";
    },
    ymdhms(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    }
  },
  components: {}
};
</script>
