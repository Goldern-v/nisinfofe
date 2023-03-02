<template>
  <div>
    <div class="content">
      <div class="select-nav">
        <div class="select-btn-con">
          <el-button
            class="select-btn"
            :class="{ active: btn == '1' }"
            @click="btn = 1"
            >长期医嘱</el-button
          >
          <el-button
            class="select-btn"
            :class="{ active: btn == '0' }"
            @click="btn = 0"
            >临时医嘱</el-button
          >
          <el-button
            class="select-btn"
            :class="{ active: btn == '2' }"
            @click="getLcOrder"
            v-if="HOSPITAL_ID == 'liaocheng'"
            >今日变更</el-button
          >
        </div>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="radio">
            <el-radio class="radio" label="全部">全部</el-radio>
            <el-radio
              class="radio"
              :key="idx"
              :label="status"
              v-for="(status, idx) in statusList"
            >
              {{ status }}
            </el-radio>
          </el-radio-group>
        </el-row>
        <!-- 模糊查询 -->
        <span class="newSearchBox" v-if="searchHisList.includes(HOSPITAL_ID)">
          <el-input
            placeholder="请输入医嘱内容"
            prefix-icon="el-icon-search"
            class="newSearch"
            v-model="orderText">
          </el-input>
          <el-button class="searchBt" type="primary" @click="getData">查询</el-button>
        </span>
         <el-button
          class="sync-btn"
          type="success"
          :class="{ active: btn == '1' }"
          v-if="syncHisList.includes(HOSPITAL_ID)"
          @click="syncPatientList"
          >同步患者医嘱</el-button
        >
        <div style="flex: 1"></div>
        <el-button
          class="select-btn"
          v-if="HOSPITAL_ID == 'weixian'"
          @click="syncGetPatientOrders"
          >同步数据</el-button
        >

        <a
          :href="`crprintorder://${infoData.patientId}/${infoData.visitId}`"
          v-if="HOSPITAL_ID == 'weixian'"
          style="margin-left: 10px"
        >
          <el-button class="select-btn" type="primary">打印执行单</el-button>
        </a>
        <el-button v-if="showPrint" @click="onPrint">打印</el-button>
      </div>
      <component
        :tableData="tableDataSelect"
        :tableLoading="tableLoading"
        :isMulti="isMulti"
        @handleCheckbox="(e) => { $emit('handleCheckbox', e)}"
        :is="currentAdviceTable"
      ></component>
      <component
        v-if="showPrint"
        class="print-advice-table"
        :tableData="printTableDataSelect"
        ref="printRef"
        :is="printTable"/>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 10px 15px 0;
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
          background-color: transparent !important;

          &:first-of-type {
            border-left: none !important;
          }
        }

        td {
          height: 30px !important;
          border: none !important;
          border-left: 1px solid #000 !important;
          padding: 0 !important;

          &:first-of-type {
            border-left: none !important;
          }
        }

        .cell {
          padding: 0 !important;
          * {
            color: #000 !important;
          }
        }

        .gutter {
          border: none !important;
        }

        img {
          width: auto;
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
.newSearchBox{
  .newSearch{
    width: 180px;
    margin-left: 10px;
    height: 70px;
    line-height: 70px;
  }
  .searchBt{
    position relative;
  }
}
.sync-btn{
  margin-left: 25px;
  background-color #4bb08d;
  border: 1px solid #3D8B72;
}


.select-nav {
  height: 34px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

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

    .el-radio__label {
      color: #333;
      font-size: 12px;
    }
  }
}
</style>

<script>

import adviceTable from "./component/adviceTable";
import adviceTableYc from "./component/adviceTable_yangchun";
import adviceTableWx from "./component/adviceTable_wx";
import adviceTableHd from "./component/adviceTable_hd";
import adviceTableNanfangzhongxiyi from "./component/adviceTable_nanfangzhongxiyi";
import adviceTableGuizhou from "./component/adviceTable_guizhou";
import adviceTableCommon from "./component/adviceTable_common";
import adviceTableLiaocheng from "./component/adviceTable_liaocheng";
import adviceTableFy from "./component/adviceTable_fuyou";
import adviceTableXiegang from "./component/adviceTable_xiegang.vue";
import adviceTableBeihairenyi from "./component/adviceTable_beihairenyi.vue";
import adviceTableWHFK from "./component/adviceTable_whfk.vue";
import adviceTableSDLJ from "./component/adviceTable_sdlj.vue";
import adviceTableWHSL from "./component/adviceTable_whsl.vue";
import standingOrderTable from "./component/print/standingOrderTable";
import statOrderTable from "./component/print/statOrderTable";
import { orders, newOrders } from "@/api/patientInfo";
import {getProcedureData} from '@/api/common'
import { syncGetPatientOrders, getNurseOrderStatusDict,getOrdersWithSync } from "./api/index";
import { hisMatch } from '@/utils/tool';
import print from "printing";
import formatter from "./print-formatter";

export default {
  data() {
    return {
      tableData: [],
      radio: "全部",
      btn: 1,
      tableLoading: false,
      statusList: [],
      dataRes:[],
      data2Res:[],
      orderText:"",//模糊查询值
      searchHisList:["beihairenyi"],//有模糊查询方法医院
      syncHisList:["nfyksdyy"],//同步患者医嘱医院
      duplicateRemoval:['liaocheng','fuyou','hengli','guizhou','nanfangzhongxiyi','whfk','ytll', '925', 'whsl'], // 需要添加rowType(同一医嘱内第几条记录)的医院
      specialSymbolsHos:['fuyou','guizhou','nanfangzhongxiyi', '925', 'whsl'], // 需要添加分组符号的医院(须同时定义在duplicateRemoval中)
      showPrint: ['925'].includes(this.HOSPITAL_ID),
    };
  },
  props: {
    isMulti: {
      type: Boolean,
      default: false,
    },
    handleCheckbox: {
      type: Function,
      default: (e)=> {},
    },
  },
  computed: {
    infoData() {
      return this.$route.query;
    },
    tableDataSelect() {
      let data = this.tableData;
      if(this.HOSPITAL_ID=='liaocheng'){
        switch(this.btn){
          case 1:
          case 0:
            data = this.dataRes;
            break;
          case 2:
            data = this.data2Res;
            break;
        }
      }
      if(this.btn==2){
        data = data.filter((item) => {
          return item.orderStatusName === this.radio.toString() || this.radio === "全部";
        })
      }else{
        data = data.filter((item) => {
          let selcet1 = item.repeatIndicator === this.btn.toString();
          let select2 =
            item.orderStatusName === this.radio.toString() ||
            this.radio === "全部";
          return selcet1 && select2;
        });
      }
      if (this.duplicateRemoval.includes(this.HOSPITAL_ID)) {
        data.map((item, index, array) => {
          let prevRowId =
            array[index - 1] &&
            array[index - 1].orderNo + array[index - 1].patientId;
          let currentRowId =
            array[index] && array[index].orderNo + array[index].patientId;
          let nextRowId =
            array[index + 1] &&
            array[index + 1].orderNo + array[index + 1].patientId;
          /** 判断是此记录是多条记录 */
          if (currentRowId == prevRowId || currentRowId == nextRowId) {
            if (currentRowId != prevRowId) {
              /** 第一条 */
              item.rowType = 1;
              this.specialSymbolsHos.includes(this.HOSPITAL_ID) && (item.specialSymbols ="┓")
            } else if (currentRowId != nextRowId) {
              /** 最后条 */
              item.rowType = 3;
              this.specialSymbolsHos.includes(this.HOSPITAL_ID) && (item.specialSymbols ="┛")
            } else {
              /** 中间条 */
              item.rowType = 2;
              this.specialSymbolsHos.includes(this.HOSPITAL_ID) && (item.specialSymbols ="┃")
            }
          } else {
            item.rowType = 1;
          }
        });
      }
      return data;
    },
    currentAdviceTable() {
      // 新医院注意 可以使用adviceTableSDLJ
      return hisMatch({
        map: {
          hengli:"adviceTableCommon",
          liaocheng:"adviceTableLiaocheng",
          fuyou:"adviceTableFy",
          weixian:"adviceTableWx",
          huadu:"adviceTableHd",
          nanfangzhongxiyi:"adviceTableNanfangzhongxiyi",
          guizhou:"adviceTableGuizhou",
          xiegang:"adviceTableXiegang",
          beihairenyi:"adviceTableBeihairenyi",
          whfk:'adviceTableWHFK',
          yangchunzhongyi:"adviceTableYc",
          'sdlj,ytll,,qhwy,zhzxy,925,gdtj':"adviceTableSDLJ",
          whsl:"adviceTableWHSL",
          default:"adviceTable",
        }
      })
      // let idToCom = {
      //   gdtj:"adviceTableSDLJ",
      //   ytll:"adviceTableWHFK",
      //   whsl:"adviceTableSDLJ",
      //   qhwy:"adviceTableSDLJ",
      //   qhwy:"adviceTableSDLJ",
      // }
      // if(idToCom[HOSPITAL_ID]){
      //   return idToCom[HOSPITAL_ID]
      // }else{
      //   return idToCom.default
      // }
    },
    // 打印数据
    printTableDataSelect() {
      let data = this.tableData;
      data = data.filter((item) => {
        let select1 = item.repeatIndicator === this.btn.toString();
        let select2 =
          (item.orderStatusName.includes(this.radio.toString()) ||
            this.radio === "全部") &&
          !item.orderStatusName.includes("作废");
        return select1 && select2;
      });
      return data;
    },
    // 打印组件
    printTable() {
      if (this.btn === 1) {
        return 'standingOrderTable'
      }
      return 'statOrderTable'
    },
  },
  created() {
    this.getData();
    this.getStatusList();
  },
  methods: {
    getLcOrder(){
      this.btn = 2
      let obj = {tradeCode:"getTodayOrders","PatientId":this.infoData.patientId,'VisitId':this.infoData.visitId}
      this.tableLoading = true;
      getProcedureData(obj).then(res=>{
        this.tableLoading = false;
        this.tableData = res.data.data.data;
        this.data2Res = res.data.data.data;
      })
    },
    getData() {
      this.tableLoading = true;
      //是否有模糊查询功能
      if(this.searchHisList.includes(this.HOSPITAL_ID)){
        newOrders(this.infoData.patientId, this.infoData.visitId,this.orderText).then((res) => {
          this.tableLoading = false;
          this.tableData = res.data.data;
          this.dataRes = res.data.data;
          this.btn="1";
          this.radio= "全部";
          //this.getStatusList();
        });
      }else {
        orders(this.infoData.patientId, this.infoData.visitId).then((res) => {
          this.tableLoading = false;
          this.tableData = res.data.data;
          this.dataRes = res.data.data
        }).catch((error)=>{
          this.tableLoading = false;
        });
      }
    },
    syncGetPatientOrders() {
      this.$message.info("正在同步数据...");
      this.tableLoading = true;
      syncGetPatientOrders(this.infoData.patientId, this.infoData.visitId).then(
        (res) => {
          this.$message.success("同步数据成功");
          this.getData();
        }
      );
    },
    syncPatientList() {
      this.$message.info("正在同步数据...");
      this.tableLoading = true;
      getOrdersWithSync(this.infoData.patientId, this.infoData.visitId).then(
        (res) => {
          this.$message.success("同步数据成功");
          this.getData();
        }
      );
    },

    print() {},
    getStatusList() {
      /**顶部状态筛选字典 暂时先上贵州 后面的医院确认后端部署后可上*/
      if (this.HOSPITAL_ID === "guizhou" || this.HOSPITAL_ID === "liaocheng") {
        getNurseOrderStatusDict().then((res) => {
          this.statusList = (res.data.data || []).map(
            (item) => item.orderStatusName
          );
        });
      } else if (this.HOSPITAL_ID === "beihairenyi") {
        this.statusList = ["核实", "执行", "停止", "作废","撤销"];
      } else {
        this.statusList = ["新开", "提交", "执行", "停止", "作废"];
      }
    },
    // 打印
    async onPrint() {
      // let printEle =
      //   this.btn == "1"
      //     ? this.$refs.standingOrderTable.$el
      //     : this.$refs.statOrderTable.$el;
      this.$nextTick(async () => {
        // 预览（用于调试）
        // print.preview(target, options)
        const printEle = this.$refs.printRef.$el
        await print.preview(printEle, {
          // 在打印之前修改DOM
          beforePrint: formatter,
          // 纸张方向，默认是'vertical'
          direction: "vertical",
          // 插入所有link和style标签到打印，默认是false
          injectGlobalCss: true,
          // 指定扫描样式，默认是true（全部）
          scanStyles: false,
          // 注入css样式，默认是''
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
    },
  },
  components: {
    adviceTable,
    adviceTableWx,
    adviceTableHd,
    adviceTableNanfangzhongxiyi,
    adviceTableGuizhou,
    adviceTableCommon,
    adviceTableLiaocheng,
    adviceTableXiegang,
    adviceTableBeihairenyi,
    adviceTableWHFK,
    adviceTableFy,
    adviceTableYc,
    adviceTableSDLJ,
    adviceTableWHSL,
    standingOrderTable,
    statOrderTable,
  },
};
</script>
