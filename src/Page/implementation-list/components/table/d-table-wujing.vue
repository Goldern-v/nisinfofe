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

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="备药人" prop="beiNurse" min-width="70px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.beiNurse">{{scope.row.beiNurse}}</span>
        </template>
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="备药时间" prop="beiTime" min-width="140px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.beiTime">{{scope.row.beiTime}}</span>
        </template>
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="备药核对人" prop="beiHeNurse" min-width="120px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.beiHeNurse">{{scope.row.beiHeNurse}}</span>
        </template>
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="备药核对时间" prop="beiHeTime" min-width="140px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.beiHeTime">{{scope.row.beiHeTime}}</span>
        </template>
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="配液人" prop="dispenseNurse" min-width="70px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.dispenseNurse">{{scope.row.dispenseNurse}}</span>
        </template>
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="配液时间" prop="dispenseDateTime" min-width="140px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.dispenseDateTime">{{scope.row.dispenseDateTime}}</span>
        </template>
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="配液核对人" prop="dispenseVerifyNurse" min-width="120px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.dispenseVerifyNurse">{{scope.row.dispenseVerifyNurse}}</span>
        </template>
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="配液核对时间" prop="dispenseVerifyDateTime" min-width="140px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.dispenseVerifyDateTime">{{scope.row.dispenseVerifyDateTime}}</span>
        </template>
      </u-table-column>

      <u-table-column prop="executeFlag" label="状态" min-width="80px" align="center" v-if="HOSPITAL_ID == 'wujing'">
        <template slot-scope="scope">
          <span
            :class="{
              yzx: scope.row.executeFlag == 2
              }"
          :title="scope.row.executeFlag == 2 ? '已执行' : '未执行'">{{ scope.row.executeFlag == 2 ? '已执行' : '未执行' }}</span>
        </template>
      </u-table-column>
      <u-table-column prop="executeFlag" label="状态" min-width="80px" align="center" v-else>
        <template slot-scope="scope">
          <span
            :class="{
              yzx: scope.row.executeFlag == 2
              }"
          :title="forMatExecuteFlag(Number(scope.row.executeFlag))">{{ forMatExecuteFlag(Number(scope.row.executeFlag)) }}</span>
        </template>
      </u-table-column>

       <u-table-column prop="realExecuteDateTime" label="执行时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.realExecuteDateTime | ymdhms">{{scope.row.realExecuteDateTime | ymdhms}}</span>
        </template>
       </u-table-column>

      <u-table-column prop="executeNurseName" title="executeNurseName" label="执行护士" min-width="80px" align="center">
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="结束时间" prop="executeEndTime" min-width="160px" align="center">
      <template slot-scope="scope">
          <span :title="scope.row.executeEndTime">{{scope.row.executeEndTime}}</span>
        </template>
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" prop="executeEndNurseName" title="executeEndNurseName" label="结束护士" min-width="80px" align="center">
      </u-table-column>

      <u-table-column v-if="HOSPITAL_ID == 'sdlj'" label="输液时间/分钟" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.executeEndTime && scope.row.realExecuteDateTime ? (parseInt(new Date(scope.row.executeEndTime).getTime() - new Date(scope.row.realExecuteDateTime).getTime()) / 1000 / 60).toFixed(2) : '' }}</span>
        </template>
      </u-table-column>

      <u-table-column prop="repeatIndicator" label="长/临" min-width="70px" align="center">
       <template slot-scope="scope">
          <span :title="scope.row.repeatIndicator == 1 ? '长期' : '临时'">{{scope.row.repeatIndicator == 1 ? '长期' : '临时'}}</span>
        </template>
      </u-table-column>

      <u-table-column prop="orderNo" label="医嘱号" min-width="70px" align="center">
       <template slot-scope="scope">
          <span :title="scope.row.orderNo">{{scope.row.orderNo}}</span>
        </template>
      </u-table-column>

      <u-table-column prop="reqDateTime" label="开嘱时间" min-width="160px" align="center">
        <template slot-scope="scope">
          <span :title="scope.row.reqDateTime | ymdhms">{{scope.row.reqDateTime | ymdhms}}</span>
        </template>
      </u-table-column>

      <u-table-column prop="stopDateTime" label="停嘱时间" min-width="160px" align="center">
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
  methods: {
          forMatExecuteFlag(flag){
      switch (Number(flag)) {
            case 0:
              return '未执行'
            case 1:
              return '执行中'
            case 2:
              return '已完成'
            case 3:
              return '暂停'
            case 4:
              return '继续'
            case 5:
              return '取消'
            case 6:
              return '巡视'
            case 7:
              return '送出'
              default:
              return ''
          }
    },
    rowcb(obj){
      // 如果该条执行单是一组多条的 或者该执行单是已完成的隐藏当前多选框
      if(obj.row.rowType > 1 || obj.row.executeFlag == 2){
        return "myCell"
      }
    },
    handleSelectionChange(selection){
      this.selectedData = selection;
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
  components: {},
};
</script>
