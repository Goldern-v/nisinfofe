<template>
  <div>
    <div class="content">
      <div class="select-nav">
        <div class="select-btn-con">
          <el-button
            class="select-btn"
            :class="{ active: btn == '1' }"
            @click="changeType(1)"
            >长期医嘱</el-button
          >
          <el-button
            class="select-btn"
            :class="{ active: btn == '0' }"
            @click="changeType(0)"
            >临时医嘱</el-button
          >
        </div>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="radio">
            <el-radio class="radio" label="全部">全部</el-radio>
            <el-radio class="radio" label="新开">新开</el-radio>
            <el-radio class="radio" label="提交">提交</el-radio>
            <el-radio class="radio" label="执行">执行</el-radio>
            <el-radio class="radio" label="停止">停止</el-radio>
            <el-radio class="radio" label="作废">作废</el-radio>
          </el-radio-group>
        </el-row>
        <div class="date">
          <span class="type-label">日期:</span>
          <span class="type-content">
            <el-date-picker
              @change="changeDate"
              v-model="startDateTime"
              :clearable="false"
              type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择开始日期"
            />
            <span> - </span>
            <el-date-picker
              @change="changeDate"
              v-model="endDateTime"
              :clearable="false"
              type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择结束日期"
            />
          </span>
        </div>
        <el-input size="small" type="text" placeholder="输入打印起始页" id="start_pageIndex" style="width: 115px;"></el-input>
        <el-button @click="onPrint" :disabled="disPrint">打印</el-button>
      </div>
      <adviceTable :tableData="tableDataSelect" :pageLoadng="pageLoadng"></adviceTable>
      <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      <standingOrderTable
        :tableData="printTableDataSelect"
        class="print-advice-table"
        ref="standingOrderTable"
        v-show="btn == 1"
      ></standingOrderTable>
      <statOrderTable
        :tableData="printTableDataSelect"
        class="print-advice-table"
        ref="statOrderTable"
        v-show="btn == 0"
      ></statOrderTable>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px 20px 0;
  position: relative;
  overflow: hidden;

  .print-advice-table {
    position: absolute;
    z-index: -1;
    bottom: 0;
    top: 52px;
    width: 900px;
  }
}

.select-nav {
  height: 34px;
  margin-bottom: 18px;

  .select-btn-con {
    .select-btn {
      height: 34px;
      width: 86px;
      background: #FFFFFF;
      border: 1px solid #CBD5DD;
      box-shadow: 0 1px 2px 0 rgba(200, 200, 200, 0.5);
      border-radius: 2px 0 0 2px;
      font-size: 12px;
      color: #687179;
      margin: 0;
      float: left;
      position: relative;
      font-weight: lighter;

      &:last-child {
        margin-left: -1px;
        border-radius: 0 2px 2px 0;
      }

      &.active {
        background: #4BB08D;
        border: 1px solid #3D8B72;
        color: #fff;
        z-index: 2;
      }
    }
  }

  .select-btn-list {
    margin-left: 23px;
    height: 34px;
    background: #fff;
    padding: 0 16px;
    float: left;
    margin-right: 23px;

    .el-radio__label {
      color: #333;
      font-size: 12px;
    }
  }
}

.date {
  float: left;
  margin-right: 16px;
  >>>.el-input__inner {
    height: 34px;
    box-sizing: border-box;
  }
}

@media print {
  .print-advice-table {
    >>>.page-box {
      padding-top: 70px !important;
      box-sizing: border-box;

      .el-table {
        border: none !important;

        &::before, &::after {
          height: 0;
        }

        table {
          width: 100% !important;
        }

        th {
          border: none !important;
          border-top: 1px solid #000 !important;
          border-left: 1px solid #000 !important;
          border-bottom: 1px solid #000 !important;
          &:first-of-type {
            border-left: none !important;
          }
        }

        td {
          height:  30px !important;
          border: none !important;
          border-left: 1px solid #000 !important;
          padding: 0 !important;
          &:first-of-type {
            border-left: none !important;
          }
        }

        .cell {
           padding: 0 !important;
        }

        .gutter {
          border: none !important;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .img {
          height: 30px;
        }

        .el-table__body-wrapper {
          tr {
            &:last-of-type {
              td {
                border-bottom: 1px solid #000 !important;
              }
            }
          }
        }

        .el-table__header-wrapper, .el-table__body-wrapper {
          // margin-top: -1px;
          margin-left: 0;
        }

        .el-table__body-wrapper {
          height: auto !important;
        }
      }
    }
  }
}

@page {
  margin: 0 10mm;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.openbar {
  border: 0;

  .el-collapse-item {
    border: 1px solid #CBD5DD;
    border-radius: 2px;
    margin-bottom: 10px;
  }

  .el-collapse-item__header {
    height: 37px;
    background: #F7FAFA;
    line-height: 37px;
    border-color: #EAEEF1;
    color: #333333;
    font-size: 13px;
    font-weight: bold;
  }

  .el-collapse-item__wrap {
    border: 0;
  }

  .el-collapse-item__content {
    padding: 0;
  }

  .el-table {
    border: 0;
  }

  .el-table td, .el-table th {
    height: 37px;
    font-size: 12px;
    color: #333;
  }
}
</style>

<script>
import adviceTable from "./component/adviceTable";
import standingOrderTable from "./component/standingOrderTable";
import statOrderTable from "./component/statOrderTable";
import { orders,ordersPage } from "@/api/patientInfo";
import print from "printing";
import formatter from "./print-formatter";
import moment from "moment";
import pagination from "@/components/pagination/pagination";
export default {
  data() {
    let startDateTime = moment(new Date().setMonth(new Date().getMonth()-1)).format("YYYY-MM-DD HH:mm");
    let endDateTime = moment(new Date()).format("YYYY-MM-DD HH:mm");
    return {
      tableData: [],
      radio: "全部",
      btn: 1,
      startDateTime,
      endDateTime,
      newTableData: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      },
      disPrint: true,//是否禁用打印按钮
    };
  },
  computed: {
    infoData() {
      return this.$route.query;
    },
    tableDataSelect() {
      let data = this.newTableData;
      data = data.filter((item) => {
        let selcet1 = item.repeatIndicator === this.btn.toString();
        let select2 =
          item.orderStatusName.includes(this.radio.toString()) ||
          this.radio === "全部";
        return selcet1 && select2;
      });
      return data;
    },
    printTableDataSelect() {
      let data = this.tableData;
      data = data.filter((item) => {
        let selcet1 = item.repeatIndicator === this.btn.toString();
        let select2 =
          (item.orderStatusName.includes(this.radio.toString()) ||
          this.radio === "全部") && !item.orderStatusName.includes('作废');
        return selcet1 && select2;
      });
      return data;
    },
  },
  created() {
    // class TableItem {
    //   constructor(key1, value1, key2, value2) {
    //     return {
    //       data1: {
    //         key: key1,
    //         value: value1
    //       },
    //       data2: {
    //         key: key2,
    //         value: value2
    //       }
    //     }
    //   }
    // }
    this.getOrders();
    this.getPageSizeOrders();
  },
  methods: {
    async onPrint() {
      // const isPrint = this.tableDataSelect.map(item => {
      //   if(item.orderStatusName === '医生作废' || item.nurse){ /* 医生作废的医嘱不对校对护士做判断 */
      //     return true
      //   }else {
      //     return false
      //   }
      // }).every(val=>{
      //     return val == true
      // })
      // if(isPrint){
        let printEle =
          this.btn == "1"
            ? this.$refs.standingOrderTable.$el
            : this.$refs.statOrderTable.$el;
        this.$nextTick(async () => {
          await print(printEle, {
            beforePrint: formatter,
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: `
          .fixedTh {
            display: none !important;
            height: auto;
          }
          pre {
            white-space: pre-wrap;
          }
          table {
            width: 100% !important;
          }
          `,
          });
        });
      // }else{
      //   return this.$message.warning("存在未签名的记录，请全部签名后再打印");
      // }
    },
    getOrders(){
      let startDateType = Object.prototype.toString.call(this.startDateTime);
      if (startDateType == "[object Date]")
        this.startDateTime =
          moment(this.startDateTime).format("YYYY-MM-DD HH:mm");
      else if (!this.startDateTime) this.startDateTime = "";

      let endDateType = Object.prototype.toString.call(this.endDateTime);
      if (endDateType == "[object Date]")
        this.endDateTime = moment(this.endDateTime).format("YYYY-MM-DD HH:mm");
      else if (!this.endDateTime) this.endDateTime = "";
      orders(this.infoData.patientId, this.infoData.visitId,this.startDateTime+":00",this.endDateTime +
      ":59").then((res) => {
        this.disPrint = false;
        this.tableData = res.data.data;
      });
    },
    changeDate(){
      this.getOrders();
      this.getPageSizeOrders();
    },
    getPageSizeOrders(){
      this.pageLoadng = true;
      let query =  {
        endDateTime: this.endDateTime + ":59",
        startDateTime: this.startDateTime+":00",
        patientId: this.infoData.patientId,
        visitId: this.infoData.visitId,
        pageIndex: this.page.pageIndex,
        pageNum:this.page.pageNum,
        typeRepeat: this.btn
      };
      ordersPage(query).then((res) => {
        this.pageLoadng = false;
        this.newTableData = res.data.data.hisOrders;
        this.page.total = res.data.data.total &&  Number(res.data.data.total) ? Number(res.data.data.total) * this.page.pageNum : 0;
      });
    },
    changeType(val){
      this.btn = val;
      this.getPageSizeOrders();
    },
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.getPageSizeOrders();
    },
  },
  components: {
    adviceTable,
    standingOrderTable,
    statOrderTable,
    pagination
  },
};
</script>
