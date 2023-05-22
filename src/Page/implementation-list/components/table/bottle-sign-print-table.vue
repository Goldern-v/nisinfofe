<template>
  <div class="d-table">
    <u-table
      style="width: 100%"
      border
      :height="tableH"
      v-loading="pageLoadng"
      :row-class-name="rowcb"
      use-virtual
      :big-data-checkbox="checked"
      showBodyOverflow="title"
      showHeaderOverflow="title"
      :row-height="rowHeight"
      @selection-change="handleSelectionChange"
      @select="toggleRowSelection"
    >
      <u-table-column type="selection" width="55"></u-table-column>

      <u-table-column prop="bedLabel" label="床号" min-width="50px" align="center">
        <template slot-scope="scope">
          <div :title="(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.bedLabel) : ''">{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.bedLabel) : ''}}</div>
        </template>
      </u-table-column>

      <u-table-column label="姓名" prop="name" min-width="70px" align="center">
        <template slot-scope="scope">
          <div :title="(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.name) : ''">{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.name) : ''}}</div>
        </template>
      </u-table-column>
      <u-table-column label="性别" prop="sex" min-width="70px" align="center" v-if="['sdlj', 'gdtj'].includes(HOSPITAL_ID)">
        <template slot-scope="scope">
          <div :title="scope.row.sex">{{(scope.row.rowType == 1 || !scope.row.rowType) ? scope.row.sex:''}}</div>
        </template>
      </u-table-column>
      <u-table-column label="年龄" prop="age" min-width="70px" align="center" v-if="['sdlj', 'gdtj'].includes(HOSPITAL_ID)">
        <template slot-scope="scope">
          <div :title="scope.row.age">{{(scope.row.rowType == 1 || !scope.row.rowType) ? scope.row.age:''}}</div>
        </template>
      </u-table-column>

      <u-table-column label="医嘱内容" prop="orderText" min-width="250px">
        <template slot-scope="scope">
          <div :class="scope.row.rowType && `rowType-${scope.row.rowType}`" :title="scope.row.orderText">{{scope.row.orderText }}</div>
        </template>
      </u-table-column>
      <u-table-column prop="expand4" label="静配标识" min-width="120px" align="center">
        <template slot-scope="scope">
          <!-- <span :title="scope.row.expand4 ">{{scope.row.expand4 }}</span> -->
          <!-- {{ scope.row.expand4}} -->
          <span :title="scope.row.expand4 == '20010404' ? '是': '否'">{{ scope.row.expand4 == '20010404' ? '是': '否' }}</span>
        </template>
      </u-table-column>
      <u-table-column prop="dosage" label="单次用量" min-width="80px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.dosage ">{{scope.row.dosage }}</span>
        </template>
      </u-table-column>

      <u-table-column prop="dosageUnits" label="单位" min-width="50px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.dosageUnits">{{scope.row.dosageUnits }}</span>
        </template>
      </u-table-column>

      <u-table-column prop="administration" label="途径" min-width="100px" align="center"></u-table-column>

      <u-table-column label="频次" prop="frequency" min-width="80px" align="center"></u-table-column>

      <u-table-column label="预计执行时间" prop="executeDateTime" min-width="140px" align="center"></u-table-column>

      <u-table-column label="医生说明" prop="freqDetail" min-width="200px" align="center"></u-table-column>

      <u-table-column prop="printFlag" label="打印标志" min-width="80px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.printFlag == 1 ? '已打印': '未打印'">{{ scope.row.printFlag == 1 ? '已打印': '未打印' }}</span>
        </template>
      </u-table-column>

      <u-table-column prop="repeatIndicator" label="长/临" min-width="70px" align="center">
       <template slot-scope="scope">
          <span :title="scope.row.repeatIndicator == 1 ? '长期' : '临时'">{{scope.row.repeatIndicator == 1 ? '长期' : '临时'}}</span>
        </template>
      </u-table-column>
      <u-table-column prop="orderNo" label="医嘱号" min-width="70px" align="center"></u-table-column>

      <u-table-column prop="startDateTime" label="开嘱时间" min-width="140px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.startDateTime | ymdhms">{{scope.row.startDateTime | ymdhms}}</span>
        </template>
      </u-table-column>

      <u-table-column prop="stopDateTime" label="停嘱时间" min-width="140px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.stopDateTime | ymdhms">{{scope.row.stopDateTime | ymdhms}}</span>
        </template>
      </u-table-column>

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
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
import moment from "moment";
export default {
  props: {
    pageLoadng: Boolean
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
      if (['lyxrm', 'whhk', 'stmz'].includes(this.HOSPITAL_ID)) {
        return this.wih - 197
      }
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
