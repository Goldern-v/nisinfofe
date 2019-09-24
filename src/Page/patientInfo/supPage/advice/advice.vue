<template>
  <div>
    <div class="content">
      <div class="select-nav">
        <div class="select-btn-con">
          <el-button class="select-btn" :class="{active: btn=='1'}" @click="btn=1">长期医嘱</el-button>
          <el-button class="select-btn" :class="{active: btn=='0'}" @click="btn=0">临时医嘱</el-button>
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
        <div style="flex:1"></div>
        <el-button
          class="select-btn"
          v-if="HOSPITAL_ID == 'weixian'"
          @click="syncGetPatientOrders"
        >同步数据</el-button>
        <el-button
          class="select-btn"
          type="primary"
          v-if="HOSPITAL_ID == 'weixian'"
          @click="print"
        >打印</el-button>
      </div>
      <adviceTableWx
        :tableData="tableDataSelect"
        v-if="HOSPITAL_ID == 'weixian'"
        :tableLoading="tableLoading"
      ></adviceTableWx>
      <adviceTable :tableData="tableDataSelect" :tableLoading="tableLoading" v-else></adviceTable>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 20px 20px 0;
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

.select-nav {
  height: 34px;
  margin-bottom: 18px;
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
import adviceTableWx from "./component/adviceTable_wx";
import { orders } from "@/api/patientInfo";
import { syncGetPatientOrders } from "./api/index";
export default {
  data() {
    return {
      tableData: [],
      radio: "全部",
      btn: 1,
      tableLoading: false
    };
  },
  computed: {
    infoData() {
      return this.$route.query;
    },
    tableDataSelect() {
      let data = this.tableData;
      data = data.filter(item => {
        let selcet1 = item.repeatIndicator === this.btn.toString();
        let select2 =
          item.orderStatusName === this.radio.toString() ||
          this.radio === "全部";
        return selcet1 && select2;
      });
      return data;
    }
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
  },
  methods: {
    getData() {
      this.tableLoading = true;
      orders(this.infoData.patientId, this.infoData.visitId).then(res => {
        this.tableLoading = false;
        this.tableData = res.data.data;
      });
    },
    syncGetPatientOrders() {
      this.$message.info("正在同步数据...");
      this.tableLoading = true;
      syncGetPatientOrders(this.infoData.patientId, this.infoData.visitId).then(
        res => {
          this.$message.success("同步数据成功");
          this.getData();
        }
      );
    },
    print() {}
  },
  components: {
    adviceTable,
    adviceTableWx
  }
};
</script>
