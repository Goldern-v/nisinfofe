<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      v-loading="pageLoadng"
      :row-class-name="addRowClass"
      :class="{ 'd-table-liaocheng': HOSPITAL_ID == 'liaocheng' }"
    >
      <el-table-column
        label="序号"
        header-align="center"
        type="index"
        min-width="60px"
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
        prop="executeDateTime"
        label="计划执行时间"
        min-width="70px"
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

      <el-table-column
        label="姓名"
        prop="name"
        min-width="60px"
        align="center"
      >
        <!-- <template slot-scope="scope">
          <div>
            {{
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.patientName
                : ""
            }}
          </div>
        </template> -->
      </el-table-column>

      <el-table-column label="医嘱内容" prop="itemName" min-width="150px">
        <template slot-scope="scope">
          <div :class="scope.row.rowType && `rowType-${scope.row.rowType}`">
            {{ scope.row.itemName || scope.row.orderText}}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="dosage"
        label="剂量"
        min-width="50px"
        align="right"
      >
        <template slot-scope="scope">
          <span style="position: relative;right: 0px;">{{
            scope.row.dosage
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="dosageUnits" label="单位" min-width="50px">
        <template slot-scope="scope">
          <span style="position: relative;left: 0px;">{{
            scope.row.dosageUnits
          }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="频次"
        prop="frequency"
        min-width="50px"
        align="center"
      ></el-table-column>

      <el-table-column
        prop="administration"
        label="途径"
        min-width="80px"
      ></el-table-column>

      <!-- <el-table-column
        prop="executeFlag"
        label="执行状态"
        min-width="80px"
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
      </el-table-column> -->

      <el-table-column
        prop="repeatIndicator"
        label="长/临"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <span :title="scope.row.repeatIndicator == 1 ? '长期' : '临时'">{{scope.row.repeatIndicator == 1 ? '长期' : '临时'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderText"
        label="医生嘱托"
        min-width="70px"
        align="center"
      >
      <!-- <template slot-scope="scope">
        <span>{{getExecuteFlag(scope.row.executeFlag)}}</span>
      </template> -->
      </el-table-column>
      <el-table-column
        prop="dispenseNurse"
        label="配药人"
        min-width="70px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="dispenseVerifyNurse"
        label="核对人"
        min-width="70px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="executeEndNurseName"
        label="执行人"
        min-width="70px"
        align="center"
      ></el-table-column>
      <!-- <el-table-column prop="startDateTime" label="开始输液时间" min-width="80px" align="center"></el-table-column> -->

      <!-- <el-table-column
        prop="startDateTime"
        label="执行时间"
        min-width="130px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.startDateTime | ymdhm2 }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        prop="endNurse"
        label="执行人"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.endNurse }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        prop="reason"
        label="异常说明"
        min-width="100px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.reason }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="操作" min-width="100px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="backTracking(scope.row)" v-if="scope.row.executeFlag==='' && currentType !='输液'">补录</el-button>
        </template>
      </el-table-column> -->
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

    .cell {
      padding: 0 5px !important;
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
import bus from "vue-happy-bus";
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
      typeReason: "" //补执行的原因填写
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
    // 补录
    backTracking(item) {
      this.$confirm("是否补录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        let data = {
          labelId: item.barcode,
          empNo: this.empNo,
          pushRate: "",
          type: "1"
        };
        addRecord(data).then(res => {
          this.$message.success("补录成功");
          this.bus.$emit("loadImplementationList");
        });
      });
    },
    addRowClass(row) {
      if (row.executeFlag == 4) {
        return "green";
      } else if (row.executeFlag == 1) {
        return "pink";
      }
    },
    getExecuteFlag(flag){
      let arr = ['未执行','执行中','已执行']
      return arr[flag] || '未执行'
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
