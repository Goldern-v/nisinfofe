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
      <u-table-column
        prop="executeDateTime"
        label="计划执行时间"
        min-width="140px"
        align="center"
      >
        <template
          slot-scope="scope"
          :title="
            scope.row.rowType == 1 || !scope.row.rowType
              ? scope.row.executeDateTime
              : '' | ymdhm
          "
        >
          <span
            :title="
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.executeDateTime
                : '' | ymdhm
            "
            >{{
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.executeDateTime
                : "" | ymdhm
            }}</span
          >
        </template>
      </u-table-column>

      <u-table-column
        prop="bedLabel"
        label="床号"
        min-width="50px"
        align="center"
      >
        <template slot-scope="scope">
          <div
            :title="
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.bedLabel
                : ''
            "
          >
            {{
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.bedLabel
                : ""
            }}
          </div>
        </template>
      </u-table-column>

      <u-table-column label="姓名" prop="name" width="80px" align="center">
        <template slot-scope="scope">
          <div
            :title="
              scope.row.rowType == 1 || !scope.row.rowType ? scope.row.name : ''
            "
          >
            {{
              scope.row.rowType == 1 || !scope.row.rowType ? scope.row.name : ""
            }}
          </div>
        </template>
      </u-table-column>

      <u-table-column label="医嘱内容" prop="itemName" min-width="250px">
        <template slot-scope="scope">
          <div
            :class="scope.row.rowType && `rowType-${scope.row.rowType}`"
            :title="scope.row.itemName"
          >
            {{ scope.row.itemName }}
          </div>
        </template>
      </u-table-column>

      <u-table-column
        prop="dosage"
        label="单次用量"
        min-width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.dosage">{{ scope.row.dosage }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="dosageUnits"
        label="单位"
        min-width="50px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.dosageUnits">{{
            scope.row.dosageUnits
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="administration"
        label="途径"
        min-width="120px"
        align="center"
        title="administration"
      >
        <template slot-scope="scope">
          <span :title="scope.row.administration">{{
            scope.row.administration
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        label="频次"
        prop="frequency"
        min-width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.frequency">{{ scope.row.frequency }}</span>
        </template>
      </u-table-column>

      <!-- <u-table-column prop="supplementaryRes" label="补录状态" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.supplementaryRes ?"已完成":"未补录" }}</span>
        </template>
      </u-table-column> -->

      <u-table-column
        label="执行时间说明"
        prop="performSchedule"
        min-width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.performSchedule">{{
            scope.row.performSchedule
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        label="摆药人"
        prop="beiNurse"
        width="80px"
        align="center"
        v-if="showPutMedicine"
      >
        <template slot-scope="scope">
          <span :title="scope.row.beiNurse">{{ scope.row.beiNurse }}</span>
        </template>
      </u-table-column>
      <u-table-column
        label="摆药时间"
        prop="beiTime"
        min-width="160px"
        align="center"
        v-if="showPutMedicine"
      >
        <template slot-scope="scope">
          <span :title="scope.row.beiTime">{{ scope.row.beiTime }}</span>
        </template>
      </u-table-column>
      <u-table-column
        label="配药人"
        prop="dispenseNurse"
        width="80px"
        align="center"
        v-if="showPutMedicine"
      >
        <template slot-scope="scope">
          <span :title="scope.row.dispenseNurse">{{
            scope.row.dispenseNurse
          }}</span>
        </template>
      </u-table-column>
      <u-table-column
        label="配药时间"
        prop="dispenseDateTime"
        min-width="160px"
        align="center"
        v-if="showPutMedicine"
      >
        <template slot-scope="scope">
          <span :title="scope.row.dispenseDateTime">{{
            scope.row.dispenseDateTime
          }}</span>
        </template>
      </u-table-column>
      <u-table-column
        label="核对人"
        prop="dispenseVerifyNurse"
        width="80px"
        align="center"
        v-if="showPutMedicine"
      >
        <template slot-scope="scope">
          <span :title="scope.row.dispenseVerifyNurse">{{
            scope.row.dispenseVerifyNurse
          }}</span>
        </template>
      </u-table-column>
      <u-table-column
        label="核对时间"
        prop="dispenseVerifyDateTime"
        min-width="160px"
        align="center"
        v-if="showPutMedicine"
      >
        <template slot-scope="scope">
          <span :title="scope.row.dispenseVerifyDateTime">{{
            scope.row.dispenseVerifyDateTime
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="executeFlag"
        label="状态"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <span
            :class="{
              yzx: scope.row.executeFlag == 2,
            }"
            :title="forMatExecuteFlag(scope.row.executeFlag)"
            >{{ forMatExecuteFlag(scope.row.executeFlag) }}</span
          >
          <span v-if="scope.row.supplementaryRes && scope.row.executeFlag == 2"
            >(补)</span
          >
          <!-- <span v-if="scope.row.type == 1">(补)</span> -->
          <!-- <p>{{scope.row.supplementaryRes ?"已完成":"未补录"}}</p> -->
        </template>
      </u-table-column>

      <u-table-column
        prop="realExecuteDateTime"
        label="执行时间"
        min-width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.realExecuteDateTime | ymdhms">{{
            scope.row.realExecuteDateTime | ymdhms
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="executeNurseName"
        title="executeNurseName"
        label="执行护士"
        min-width="80px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.executeNurseName">{{
            scope.row.executeNurseName
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        v-if="showInfusion"
        prop="stopDateTime"
        label="结束输液时间"
        min-width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.endInfusionTime | ymdhms">{{
            scope.row.endInfusionTime | ymdhms
          }}</span>
        </template>
      </u-table-column>
      <u-table-column
        v-if="showInfusion"
        prop="stopDateTime"
        label="结束输液护士"
        width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.executeEndNurseName">{{
            scope.row.executeEndNurseName
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="supplementaryRes"
        label="补录原因"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.supplementaryRes">{{
            scope.row.supplementaryRes
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="repeatIndicator"
        label="长/临"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.repeatIndicator == 1 ? '长期' : '临时'">{{
            scope.row.repeatIndicator == 1 ? "长期" : "临时"
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="orderNo"
        label="医嘱号"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.orderNo">{{ scope.row.orderNo }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="reqDateTime"
        label="开嘱时间"
        min-width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.reqDateTime | ymdhms">{{
            scope.row.reqDateTime | ymdhms
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        prop="stopDateTime"
        label="停嘱时间"
        min-width="160px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.stopDateTime | ymdhms">{{
            scope.row.stopDateTime | ymdhms
          }}</span>
        </template>
      </u-table-column>

      <u-table-column
        label="医生说明"
        prop="freqDetail"
        min-width="200px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.freqDetail">{{ scope.row.freqDetail }}</span>
        </template>
      </u-table-column>

      <u-table-column label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <div v-show="scope.row.executeDateTime">
            <el-button
              type="text"
              @click="backTracking(scope.row)"
              v-if="
                isEdit &&
                scope.row.executeDateTime &&
                scope.row.executeFlag == 0
              "
              >补录</el-button
            >
            <el-button
              type="text"
              @click="editTime(scope.row)"
              v-if="
                isEdit &&
                (scope.row.executeFlag > 0 || scope.row.executeFlag == 4)
              "
              >修改</el-button
            >
            <!-- <el-button
            type="text"
            @click="cancelOrderExecute(scope.row)"
            >取消</el-button
          > -->
          </div>
        </template>
      </u-table-column>
    </u-table>
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

    th, td {
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
        display: none;
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
    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #aaa;
    }
  }
}
</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
import moment from "moment";
import { addRecord, cancelOrderExecuteApi } from "../../api/index";
import editModal from "../common/edit-modal";
import bus from "vue-happy-bus";
export default {
  props: {
    pageLoadng: Boolean,
    currentType: String,
  },
  mixins: [commonMixin],
  data() {
    return {
      bus: bus(this),
      rowHeight: 30,
      checked: true,
      selectedData: [],
    };
  },
  computed: {
    showInfusion() {
      switch (this.HOSPITAL_ID) {
        case "whfk":
        case "ytll":
          return ["", "输液"].includes(this.currentType);
        default:
          return true;
      }
    },
    // 显示摆药
    showPutMedicine() {
      let filterArr = ["", "输液"];
      switch (this.HOSPITAL_ID) {
        case "ytll":
          filterArr = filterArr.concat(["注射", "雾化", "皮试"]);
          break;
        default:
          break;
      }
      return filterArr.includes(this.currentType);
    },
  },
  methods: {
    forMatExecuteFlag(flag) {
      switch (Number(flag)) {
        case 0:
          return "未执行";
        case 1:
          return "执行中";
        case 2:
          return "已完成";
        case 3:
          return "暂停";
        case 4:
          return "继续";
        case 5:
          return "取消";
        case 6:
          return "巡视";
        case 7:
          return "送出";
        default:
          return "";
      }
    },
    rowcb(obj) {
      // 如果该条执行单是一组多条的 或者该执行单是已完成的隐藏当前多选框
      if (obj.row.rowType > 1 || obj.row.executeFlag == 2) {
        return "myCell";
      }
    },
    handleSelectionChange(selection) {
      this.selectedData = selection;
    },
    // 取消执行
    cancelOrderExecute(item) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!["护长", "护士长"].includes(user.job)) {
        this.$message.error("没有权限！");
      } else {
        this.$prompt("请输入取消的原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            let { empNo } = user;
            let { barCode } = item;
            let cancelReason = value;
            cancelOrderExecuteApi({
              empNO: empNo,
              barcode: barCode,
              cancelReason,
            }).then((res) => {
              this.$message.success(res.data.desc);
              this.bus.$emit("loadImplementationList");
            });
          })
          .catch((err) => {
            this.$message.success(err.data.desc);
          });
      }
    },
    // 补录
    backTracking(item) {
      this.$prompt("请输入补执行的原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (value.trim() == "") {
            this.$message.warn("请填写补录原因");
            return;
          }
          let data = {
            patientId: item.patientId,
            visitId: item.visitId,
            orderNo: item.orderNo, //医嘱号
            barcode: item.barCode, //条码号
            executeNurse: this.empNo, //执行人
            verifyNurse: "", //核对人
            // type: 1, //是否补执行(pda默认传0正常执行  1补执行pc端)
            supplementaryRes: value, //补执行的原因填写
          };
          addRecord(data).then((res) => {
            this.$message.success("补录成功");
            this.bus.$emit("loadImplementationList");
          });
        })
        .catch(() => {});
    },
    editTime(data) {
      this.$refs.editModal.open(data);
    },
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm") : "";
    },
    ymdhms(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
  },
  mounted() {
    this.isEdit = JSON.parse(localStorage.user) && !this.$route.path.includes('patient') ? true : false;
  },
  components: {
    editModal,
  },
};
</script>
