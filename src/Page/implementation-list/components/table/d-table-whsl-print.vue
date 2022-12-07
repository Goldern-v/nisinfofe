<template>
  <div class="d-table">
    <u-table
    :data="tableData"
      v-loading="pageLoading"
      :row-class-name="addRowClass"
      class="d-table-liaocheng"
      style="width: 100%"
    >
      <u-table-column
        prop="bedLabel"
        label="床号"
        min-width="55px"
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

      <u-table-column
        label="姓名"
        prop="patientName"
        min-width="70px"
        align="center"
      >
        <template slot-scope="scope">
          <div
            :title="
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.patientName
                : ''
            "
          >
            {{
              scope.row.rowType == 1 || !scope.row.rowType
                ? scope.row.patientName
                : ""
            }}
          </div>
        </template>
      </u-table-column>

      <u-table-column
        label="医嘱内容"
        prop="orderText"
        min-width="210px"
      >
        <template slot-scope="scope">
          <div
            :class="scope.row.rowType && `rowType-${scope.row.rowType}`"
            :title="scope.row.orderText"
          >
            {{ scope.row.orderText }}
          </div>
        </template>
      </u-table-column>

      <u-table-column prop="dosage" label="剂量" min-width="55px" align="center">
      </u-table-column>

      <u-table-column prop="administration" label="途径" min-width="80px">
      </u-table-column>
       <u-table-column prop="speed" label="滴速" min-width="60px" align="center">
      </u-table-column>

     <u-table-column
        prop="heNurse"
        label="核对人"
        min-width="70px"
        align="center"
        v-if="HOSPITAL_ID !== 'beihairenyi'"
      >
        <template slot-scope="scope">
          {{ scope.row.heNurse }} 
        </template>
      </u-table-column>
       <u-table-column
        prop="heNurse"
        label="核对时间"
        min-width="160px"
        align="center"
        v-if="HOSPITAL_ID !== 'beihairenyi'"
      >
        <template slot-scope="scope">
          {{ scope.row.heTime | ymdhm2 }}
        </template>
      </u-table-column>
      <u-table-column
        prop="startNurse"
        label="执行人"
        min-width="70px"
        align="center"
      >
      
      </u-table-column>
       <u-table-column
        prop="startNurse"
        label="执行时间"
        min-width="160px"
        align="center"
      >
        <template slot-scope="scope">
         {{ scope.row.realExecuteDateTime | ymdhm2 }}
        </template>
      </u-table-column>
     

      <u-table-column prop="nurseMemo" label="备注" >
        <template slot-scope="scope">
          <div v-show="scope.row.rowType == 1 || !scope.row.rowType">
            {{ scope.row.nurseMemo }}
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

    .el-button + .el-button {
      margin-left: 0px !important;
    }

    .green {
      background-color: #83d883;
    }

    .pink {
      background-color: pink;
    }
    .red {
      background-color: #ec7373;
    }
    tr.hover-row.current-row > td, tr.hover-row.el-table__row--striped.current-row > td, tr.hover-row.el-table__row--striped > td, tr.hover-row > td, tr.current-row > td {
      background-color: initial !important;
    }

    td {
      height: 65px !important;
      position: relative;
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

      div {
        min-height: 24px;
      }
    }

    th .cell {
      padding: 0 0px !important;
    }

    /* * 第一条 */
    .wrapRowType-1 {
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 10px;
        top: 50%;
        bottom: -5px;
      }
    }

    .wrapRowType-2 {
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 10px;
        top: -5px;
        bottom: -5px;
      }

      &:after {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 10px;
        top: 50%;
      }
    }

    .wrapRowType-3 {
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-bottom: 1px solid #333;
        left: 10px;
        bottom: 50%;
        top: -5px;
      }
    }
  }

  >>>.u-table::after, .u-table::before {
    background: #cbd5dd;
    display: none;
  }

  >>>.u-table__row td:first-child .cell, >>>.u-table__row td:last-child .cell {
    padding: 0 5px;
    text-align: center;

    >>>.cell {
      padding: 0px;
      text-align: center;
    }
  }

  >>>.u-table__body-wrapper {
    // overflow-x hidden
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
import commonMixin from "../../../../common/mixin/common.mixin";
import moment from "moment";
import {
  addRecord,
  cancelOrderExecuteApi,
  updateOrderExecutePc,
} from "../../api/index";
import editModal from "../common/edit-modal";
import bus from "vue-happy-bus";
export default {
  props: {
    tableData: Array,
    pageLoading: Boolean,
    tableH: Number,
    currentType: {
      type: Array,
      default: () => ([])
    },
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue",
      bus: bus(this),
      isEdit: false,
      // 时间选择权限：护长
      isTimeSelect: this.HOSPITAL_ID === 'beihairenyi' && this.isRoleManage,
      typeReason: "", //补执行的原因填写
    };
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("HH:mm") : "";
    },
    ymdhm2(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
    ymd(val) {
      return val ? moment(val).format("YYYY-MM-DD") : "";
    },
    hms(val) {
      return val ? moment(val).format("HH:mm:ss") : "";
    },
    ymdhms(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm") : "";
    },
    handleStatus(val) {
      if (process.env.HOSPITAL_ID == 'whsl') {
        return {
          '0': '未执行',
          '1': '执行中',
          '2': '暂停',
          '4': '已执行'
        }[val + ''] || ''
      }
      let allStatus = [
        {
          id: "",
          name: "全部",
        },
        {
          id: 0,
          name: "未执行",
        },
        {
          id: 1,
          name: "执行中",
        },
        {
          id: 2,
          name: "已执行",
        },
        {
          id: 3,
          name: "继续输液",
        },
        {
          id: 4,
          name: "已完成",
        },
      ];
      let status = parseInt(val);
      if (val == 5) return "";
      return typeof status == "number"
        ? allStatus[status + 1] && allStatus[status + 1].name
        : val;
    },
  },
  computed: {
    // 是否输液
    isInfusion() {
      return this.currentType.includes('输液') || this.currentType.includes('全部')
    }
  },
  watch: {
    isInfusion(val) {
       if (val) {
        this.$nextTick(() => {
          this.$refs.uTable.doLayout();
        })
      }
    }
  },
  components: {
    editModal,
  },
  methods: {
    // 取消执行
    cancelOrderExecute(item) {
      let user = JSON.parse(localStorage.getItem("user"));
      // console.log(user);
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
            console.log(cancelReason);
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
          let data = {
            barcode: item.barCode, //条码号
            empNO: this.empNo, //执行人
            type: 1, //是否补执行(pda默认传0正常执行  1补执行pc端)
            typeReason: value, //补执行的原因填写
          };
          let fn = updateOrderExecutePc
          if (this.HOSPITAL_ID == 'beihairenyi') {
            fn = addRecord
            data = {
              ...data,
              expand3: item.expand3,   // --患者住院流水号
              patientId: item.patientId,  // --患者id
              executeType: item.executeType,  // --执行单类型
              executeDateTime: item.executeDateTime
            }
          }
           if (this.HOSPITAL_ID == 'whsl') {
            fn = addRecord
            data = [{
              ...data,
              visitId: item.visitId,   // --患者住院流水号
              patientId: item.patientId,  // --患者id
              executeType: item.executeType,  // --执行单类型
              executeDateTime: moment().format("YYYY-MM-DD HH:mm:ss")
            }]
          }
          fn(data).then((res) => {
            this.$message.success("补录成功");
            this.bus.$emit("loadImplementationList");
          });
        })
        .catch(() => {});
    },
    editTime(data) {
      this.$refs.editModal.open(data);
    },
    addRowClass(row) {
      if (row.row.nurseMemo) {
        return 'red'
      }
      if (row.row.executeFlag == 2) {
        return "green";
      } else if (row.row.executeFlag == 1) {
        return "pink";
      }
      return ''
    },
    // 下拉树切换控制 包裹线显示
    toggleTreeExpand(row, treeExpanded, event) {
      row["showTree"] = !row["showTree"];
    },
    // 包裹线显示
    currentRowClass(row) {
      if (
        !row.children ||
        (row.children && row.children.length && row.showTree)
      ) {
        return `wrapRowType-${row.wrapRowType}`;
      }
    },
    // 备注
    handleRemarks(item) {
      this.$prompt("请输入备注", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
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
            this.$message.success(res.data.desc);
            this.bus.$emit("loadImplementationList");
          });
        })
        .catch((err) => {});
    },
  },
  mounted() {
    this.isEdit = JSON.parse(localStorage.user)
      ? // && JSON.parse(localStorage.user).post == "护长"
        true
      : false;
  },
};
</script>
