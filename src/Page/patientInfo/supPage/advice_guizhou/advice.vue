<template>
  <div>
    <div class="content">
      <!-- <div class="select-nav"> -->
        <!-- <span>查询时间：</span>
        <masked-input 
          type="text"
          class="mask-input"
          style="width: 108px;"
          :showMask="false"
          v-model="searchDate"
          :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
          :guide="true"
          placeholderChar=" "
        /> -->
        <!-- <div class="select-btn-con">
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
        </div> -->
        <!-- <el-row class="select-btn-list" type="flex" align="middle">
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
        </el-row> -->
        <!-- 模糊查询 -->
        <!-- <span class="newSearchBox" v-if="searchHisList.includes(HOSPITAL_ID)">
          <el-input
            placeholder="请输入医嘱内容"
            prefix-icon="el-icon-search"
            class="newSearch"
            v-model="orderText">
          </el-input>
          <el-button class="searchBt" type="primary" @click="getData">查询</el-button>
        </span>
        <div style="flex: 1"></div> -->
        <!-- <el-button
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
        </a> -->
      <!-- </div> -->
      <!-- <component
        :tableData="tableDataSelect"
        :tableLoading="tableLoading"
        :is="currentAdviceTable"
      ></component> -->
      <!-- <adviceTableGuizhou
        :tableData="tableDataSelect"
        :tableLoading="tableLoading"
      ></adviceTableGuizhou> -->
      <implementation />
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 10px 15px 0;
}
.mask-input {
  height: 24px;
  background: #fff;
  border: 1px solid #c2cbd2;
  border-radius: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgb(191, 217, 210);
  box-sizing: border-box;
  color: rgb(31, 61, 53);
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
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
// import adviceTableGuizhou from "./component/adviceTable_guizhou";
import implementation from '@/Page/implementation-list/implementation-list-guizhou.vue'
import { orders, newOrders } from "@/api/patientInfo";
import {getProcedureData} from '@/api/common'
import { syncGetPatientOrders, getNurseOrderStatusDict } from "./api/index";
import moment from 'moment'
export default {
  data() {
    return {
      tableData: [],
      radio: "全部",
      btn: 2,
      tableLoading: false,
      statusList: [],
      dataRes:[],
      data2Res:[],
      orderText:"",//模糊查询值
      searchHisList:["beihairenyi"],//有模糊查询方法医院
      duplicateRemoval:['guizhou'], // 需要添加rowType(同一医嘱内第几条记录)的医院
      specialSymbolsHos:['fuyou','guizhou','nanfangzhongxiyi'], // 需要添加分组符号的医院(须同时定义在duplicateRemoval中)
      searchDate:moment().format('YYYY-MM')
    };
  },
  computed: {
    infoData() {
      let infoData = this.$route.query.patientId?this.$route.query:this.$route.params
      console.log(this.$route.query.patientId,this.$route.query,this.$route.params);
      return infoData;
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
          // console.log(selcet1);
          return selcet1 && select2;
        });
      }
      // console.log(data);
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
    // currentAdviceTable() {
    //   let HOSPITAL_ID = this.HOSPITAL_ID;
    //   // 通过 this.HOSPITAL_ID 对应组件
    //   let idToCom = {
    //     guizhou:"adviceTableGuizhou",
    //   }
    //   if(idToCom[HOSPITAL_ID]){
    //     return idToCom[HOSPITAL_ID]
    //   }else{
    //     return idToCom.default
    //   }
    // },
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
  },
  watch:{
    'infoData.patientId'(newId,oldId){
      this.getData();
      this.getStatusList();
    }
  },
  components: {
    // adviceTableGuizhou,
    implementation
  },
};
</script>
