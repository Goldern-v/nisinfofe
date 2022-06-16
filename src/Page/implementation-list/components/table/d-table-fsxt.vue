<template>
  <div class="d-table">
    <u-table
      style="width: 100%"
      border
      :height="wih - 123"
      v-loading="pageLoadng"
      :row-class-name="rowcb"
      use-virtual
      :big-data-checkbox="checked"
      :row-height="rowHeight"
      ref="retest"
      @selection-change="handleSelectionChange"
    >
      <u-table-column type="selection" width="55"></u-table-column>
      <u-table-column prop="executeDateTime" label="计划执行时间" min-width="140px" align="center" >
        <template slot-scope="scope" :title="(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.executeDateTime) : '' | ymdhm">
          <span :title="(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.executeDateTime) : '' | ymdhm">{{(scope.row.rowType == 1 || !scope.row.rowType) ? (scope.row.executeDateTime) : '' | ymdhm}}</span>
        </template>
      </u-table-column>

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

      <u-table-column label="医嘱内容" prop="itemName" min-width="250px">
        <template slot-scope="scope">
          <div :class="scope.row.rowType && `rowType-${scope.row.rowType}`" :title="scope.row.itemName">{{scope.row.itemName }}</div>
        </template>
      </u-table-column>

      <u-table-column prop="dosage" label="单次用量" min-width="80px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.dosage">{{scope.row.dosage }}</span>
        </template>
      </u-table-column>

      <u-table-column prop="dosageUnits" label="单位" min-width="50px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.dosageUnits">{{scope.row.dosageUnits }}</span>
        </template>
      </u-table-column>

      <u-table-column prop="administration" label="途径" min-width="120px" align="center" title="administration" >
      <template slot-scope="scope">
          <span :title="scope.row.administration">{{scope.row.administration }}</span>
        </template>
      </u-table-column>

      <u-table-column label="频次" prop="frequency" min-width="80px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.frequency">{{scope.row.frequency }}</span>
        </template>
      </u-table-column>

      <u-table-column label="执行时间说明" prop="performSchedule" min-width="100px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.performSchedule">{{scope.row.performSchedule }}</span>
        </template>
      </u-table-column>

      <u-table-column label="医生说明" prop="freqDetail" min-width="200px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.freqDetail">{{scope.row.freqDetail}}</span>
        </template>
      </u-table-column>

      <u-table-column prop="executeFlag" label="状态" min-width="80px" align="center">
        <template slot-scope="scope">
          <span
            :class="{
              yzx: scope.row.executeFlag == 2
              }"
           :title="getExecuteFlag(scope.row.executeFlag)">{{ getExecuteFlag(scope.row.executeFlag) }}</span>
        </template>
      </u-table-column>
      <u-table-column prop="beiNurse" label="摆药护士" min-width="80px" align="center">
        <!-- <template slot-scope="scope">
          <span :title="scope.row.realExecuteDateTime | ymdhms">{{scope.row.realExecuteDateTime | ymdhms}}</span>
        </template> -->
      </u-table-column>
      <u-table-column prop="beiHeNurse" label="摆药护士核对" min-width="90px" align="center">
        <!-- <template slot-scope="scope">
          <span :title="scope.row.realExecuteDateTime | ymdhms">{{scope.row.realExecuteDateTime | ymdhms}}</span>
        </template> -->
      </u-table-column>
      <u-table-column prop="dispenseNurse" label="配药护士" min-width="80px" align="center">
        <!-- <template slot-scope="scope">
          <span :title="scope.row.realExecuteDateTime | ymdhms">{{scope.row.realExecuteDateTime | ymdhms}}</span>
        </template> -->
      </u-table-column>

      <u-table-column prop="dispenseDateTime" label="配药时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.dispenseDateTime | ymdhms">{{scope.row.dispenseDateTime | ymdhms}}</span>
        </template>
       </u-table-column>

      <u-table-column prop="dispenseVerifyNurse" label="配药护士核对" min-width="90px" align="center">
        <!-- <template slot-scope="scope">
          <span :title="scope.row.realExecuteDateTime | ymdhms">{{scope.row.realExecuteDateTime | ymdhms}}</span>
        </template> -->
      </u-table-column>
      <u-table-column prop="realExecuteDateTime" label="执行时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.realExecuteDateTime | ymdhms">{{scope.row.realExecuteDateTime | ymdhms}}</span>
        </template>
       </u-table-column>

       <u-table-column prop="executeEndTime" label="结束时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.executeEndTime | ymdhms">{{scope.row.executeEndTime | ymdhms}}</span>
        </template>
       </u-table-column>

      <u-table-column prop="executeEndNurseName" title="executeEndNurseName" label="执行护士" min-width="80px" align="center">
      </u-table-column>

      <u-table-column prop="repeatIndicator" label="长/临" min-width="70px" align="center">
       <template slot-scope="scope">
          <span :title="scope.row.repeatIndicator == 1 ? '长期' : '临时'">{{scope.row.repeatIndicator == 1 ? '长期' : '临时'}}</span>
        </template>
      </u-table-column>

      <u-table-column prop="nurseMemo" label="备注" min-width="160px" align="center">
        <template slot-scope="scope">
          <el-input
            v-if="isEdit"
            :ref="`nurseMemo${scope.$index}`"
            autofocus
            size="small"
            v-model="scope.row.nurseMemo"
            @blur="save(scope.row.nurseMemo, scope.row.executeId)"
          />
          <div
            class="nurse-mark"
            v-else
            :title="scope.row.nurseMemo"
            @click="editMark(scope)"
          >
            {{ scope.row.nurseMemo }}
          </div>
          <!---->
        </template>
      </u-table-column>
<!--
      <u-table-column prop="orderNo" label="医嘱号" min-width="70px" align="center">
       <template slot-scope="scope">
          <span :title="scope.row.orderNo">{{scope.row.orderNo}}</span>
        </template>
      </u-table-column> -->

      <!-- <u-table-column prop="reqDateTime" label="开嘱时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.reqDateTime | ymdhms">{{scope.row.reqDateTime | ymdhms}}</span>
        </template>
      </u-table-column> -->

      <!-- <u-table-column prop="stopDateTime" label="停嘱时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.stopDateTime | ymdhms">{{scope.row.stopDateTime | ymdhms}}</span>
        </template>
      </u-table-column> -->

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
  >>>.umy-table-beyond {
    height: 100%;
  }
  >>>.nurse-mark {
    width: 100%;
    height: 100%!important;
  }
}
</style>
<script>
import { info, saveMark } from "@/api/task";
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
      selectedData: [],
      isEdit: false
    };
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
    getExecuteFlag(flag){
      let arr = ['未执行','执行中','已执行']
      return arr[flag] || '未执行'
    },
    editMark (row) {
      this.isEdit = true
      // if (this.isEdit) {
      //   this.$nextTick(() => {
      //     console.log(this.$refs[`nurseMemo${row.$index}`])
      //     this.$refs[`nurseMemo0`].focus()
      //   })
      // }
    },
    async save(mark, id) {
      this.isEdit = false
      const params = {
        executeId: id || 10,
        nurseMemo: mark
      }
      const res = await saveMark(params)
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
