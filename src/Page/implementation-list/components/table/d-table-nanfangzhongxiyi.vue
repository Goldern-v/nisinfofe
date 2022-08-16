<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      border
      :height="tableH || wih - 134"
      v-loading="pageLoadng"
      :row-class-name="rowcb"
      @selection-change="handleSelectionChange"
      @select="select"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        label="序号"
        header-align="center"
        type="index"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="bedLabel"
        label="床号"
        min-width="50px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.bedLabel
                : ""
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="patientName"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.patientName
                : ""
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="住院号"
        min-width="65px"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            {{
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.patientId
                : ""
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="repeatIndicator"
        label="医嘱类型"
        min-width="80px"
        align="center"
      >
        <!-- <template slot-scope="scope">{{getRepeatIndicatorType(scope.row.repeatIndicator)}}</template> -->
      </el-table-column>
      <el-table-column
        prop="executeDateTime"
        label="计划执行时间"
        min-width="60px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.rowType == 1 || !scope.row.rowType
              ? scope.row.executeDateTime
              : "" | ymdhm
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="医嘱内容" prop="itemName" min-width="250px">
        <template slot-scope="scope">
          <div :class="scope.row.rowType && `rowType-${scope.row.rowType}`">
            {{ scope.row.itemName || scope.row.orderText }}
            <!-- {{ scope.row.barCode + '  ' + scope.row.rowType}} -->
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="dosage"
        label="剂量"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <span style="position: relative;right: -10px;">{{
            scope.row.dosage
          }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="dosageUnits" label="单位" min-width="50px">
        <template slot-scope="scope">
          <span style="position: relative;left: -10px;">{{
            scope.row.dosageUnits
          }}</span>
        </template>
      </el-table-column> -->

      <el-table-column
        label="频次"
        prop="frequency"
        min-width="60px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="administration"
        label="使用途径"
        min-width="100px"
      ></el-table-column>

      <el-table-column
        prop="executeFlag"
        label="执行状态"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <span
            :class="{
              yzx: scope.row.executeFlag == 4,
              zxz: scope.row.executeFlag == 1 || scope.row.executeFlag == 3
            }"
            >{{ scope.row.executeFlag | handleStatus }}</span
          >
          <span v-if="scope.row.type == 1">(补)</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="operationStatus"
        label="备药备管"
        min-width="250px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.operationStatus==11||scope.row.operationStatus==15||scope.row.operationStatus==16">执行人时间和名字</div>
        </template>
      </el-table-column> -->
      <el-table-column
        label="备药备管"
        min-width="135px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-html="timeAndNameFormat2(scope.row,'bai')"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="operationStatus"
        label="备药备管核对"
        min-width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.operationStatus==12">执行人时间和名字</div>
        </template>
      </el-table-column> -->
      <el-table-column
        label="备药备管核对"
        min-width="135px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-html="timeAndNameFormat2(scope.row,'beiHe')"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="operationStatus"
        label="加药"
        min-width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.operationStatus==13">执行人时间和名字</div>
        </template>
      </el-table-column> -->
      <el-table-column
        label="加药"
        min-width="135px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-html="timeAndNameFormat2(scope.row,'pei')"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="operationStatus"
        label="加药核对"
        min-width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.operationStatus==14">执行人时间和名字</div>
        </template>
      </el-table-column> -->
      <el-table-column
        label="加药核对"
        min-width="135px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-html="timeAndNameFormat2(scope.row,'he')"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="repeatIndicator"
        label="长/临"
        min-width="70px"
        align="center"
      ></el-table-column> -->

      <!-- <el-table-column prop="startDateTime" label="开始输液时间" min-width="80px" align="center"></el-table-column> -->
      <el-table-column
        label="输液开始"
         min-width="135px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-html="timeAndNameFormat(scope.row,'start')"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="执行完成"
         min-width="135px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-html="timeAndNameFormat(scope.row,'end')"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="取消"
        min-width="135px"
        align="center"
      >
        <template slot-scope="scope">
          <span v-html="timeAndNameFormat(scope.row,'stop')"></span>
        </template>
      </el-table-column>
       <el-table-column
        prop="stopReason"
        label="原因"
        min-width="200px"
        align="center"
      >
        <!-- <template slot-scope="scope">
          <span v-html="timeAndNameFormat(scope.row,'stopReason')"></span>
        </template> -->
      </el-table-column>
      <el-table-column label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="backTracking(scope.row)"
            >补录</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <sweet-modal ref="modal" title="确认补录" :modalWidth="400">
      补录时间：
      <el-date-picker
        type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择补录时间"
        size="small"
        v-model="backTrackingTime"
        style="margin-top: 30px;"
      ></el-date-picker>
      <div slot="button">
        <el-button class="modal-btn" type="primary" @click="isBackTracking"
          >补录</el-button
        >
        <el-button class="modal-btn" @click="close">取消</el-button>
      </div>
    </sweet-modal>
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

    .myCell {
      .el-checkbox__input {
        display: none
      }
    }


    &.d-table-liaocheng {

      .green {
        background-color: #83d883;
      }

      .pink {
        background-color: pink;
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
import { addRecord } from "../../api/index";
import { getUser } from "@/api/common";
import bus from "vue-happy-bus";
let repeatIndicatorType = {
  1:'长嘱',
  0:'临嘱'
}
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean,
    tableH: Number,
    currentType: String
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue",
      bus: bus(this),
      isEdit: false,
      typeReason: "", //补执行的原因填写
      backTrackingTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      barcode: ""
    };
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("HH:mm") : "";
    },
    ymdhm2(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
    handleStatus(val) {
      let allStatus = [
        {
          id: "",
          name: "全部"
        },
        {
          id: 0,
          name: "未执行"
        },
        {
          id: 1,
          name: "开始输液"
        },
        {
          id: 2,
          name: "暂停输液"
        },
        {
          id: 3,
          name: "继续输液"
        },
        {
          id: 4,
          name: "已完成"
        },
        {
          id: 5,
          name: "取消执行"
        },
        {
          id: 6,
          name: "巡视"
        },
        {
          id:9,
          name:"已停止或作废的执行单"
        }
      ];
      let status = parseInt(val);
      return typeof status == "number"
        ? allStatus[status + 1] && allStatus[status + 1].name
        : val;
    }
  },
  components: {},
  methods: {
    timeAndNameFormat(row,type){
      return row[`${type}DateTime`] && row[`${type}Nurse`] ? `${row[`${type}DateTime`]}<br>${row[`${type}Nurse`]}` : ''
    },
    timeAndNameFormat2(row,type){
      return row[`${type}Time`] && row[`${type}Nurse`] ? `${row[`${type}Time`]}<br>${row[`${type}Nurse`]}` : ''
    },
    getRepeatIndicatorType(type){
      return repeatIndicatorType[type] || ''
    },
    rowcb(obj) {
      // 如果该条执行单是一组多条的 或者该执行单是已完成的隐藏当前多选框
      if (obj.rowType > 1) {
        return "myCell";
      }
    },
    // 补录
    backTracking(item) {
      this.barcode = item.barcode;
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    isBackTracking() {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          let data = {
            labelId: this.barcode,
            empNo: empNo,
            pushRate: "",
            type: "1"
          };
          addRecord(data).then(res => {
            this.close();
            this.$message.success("补录成功");
            this.bus.$emit("loadImplementationList");
          });
        });
      });
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件,确保只能选中一项数据
    select(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length == 0) return;
      this.$refs.multipleTable.toggleRowSelection(row, true);
    },
    /* 勾选分诊，保存到数组进行群伤关联 */
    handleSelectionChange(val) {
      this.bus.$emit("updateMultipleSelection", val);
    }
  },
  mounted() {
    this.isEdit =
      JSON.parse(localStorage.user) &&
      JSON.parse(localStorage.user).post == "护长"
        ? true
        : false;
  }
};
</script>
