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
            @click="btn = 2"
            v-if="HOSPITAL_ID == 'liaocheng'"
            >单方传药</el-button
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
      </div>
      <component
        :tableData="tableDataSelect"
        :tableLoading="tableLoading"
        :is="currentAdviceTable"
      ></component>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  margin: 10px 15px 0;
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
import adviceTableWx from "./component/adviceTable_wx";
import adviceTableHd from "./component/adviceTable_hd";
import adviceTableGuizhou from "./component/adviceTable_guizhou";
import adviceTableCommon from "./component/adviceTable_common";
import { orders } from "@/api/patientInfo";
import { syncGetPatientOrders, getNurseOrderStatusDict } from "./api/index";
export default {
  data() {
    return {
      tableData: [],
      radio: "全部",
      btn: 1,
      tableLoading: false,
      statusList: [],
    };
  },
  computed: {
    infoData() {
      return this.$route.query;
    },
    tableDataSelect() {
      let data = this.tableData;
      data = data.filter((item) => {
        let selcet1 = item.repeatIndicator === this.btn.toString();
        let select2 =
          item.orderStatusName === this.radio.toString() ||
          this.radio === "全部";
        return selcet1 && select2;
      });
      if (
        this.HOSPITAL_ID == "liaocheng" ||
        this.HOSPITAL_ID == "fuyou" ||
        this.HOSPITAL_ID == "hengli"
      ) {
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
            } else if (currentRowId != nextRowId) {
              /** 最后条 */
              item.rowType = 3;
            } else {
              /** 中间条 */
              item.rowType = 2;
            }
          } else {
            item.rowType = 1;
          }
        });
      }
      return data;
    },
    currentAdviceTable() {
      let HOSPITAL_ID = this.HOSPITAL_ID;
      if (
        HOSPITAL_ID == "liaocheng" ||
        HOSPITAL_ID == "fuyou" ||
        HOSPITAL_ID == "hengli"
      ) {
        return "adviceTableCommon";
      } else if (HOSPITAL_ID == "weixian") {
        return "adviceTableWx";
      } else if (HOSPITAL_ID == "huadu") {
        return "adviceTableHd";
      } else if (HOSPITAL_ID == "guizhou") {
        return "adviceTableGuizhou";
      } else {
        return "adviceTable";
      }
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
    this.getData();
    this.getStatusList();
  },
  methods: {
    getData() {
      this.tableLoading = true;
      orders(this.infoData.patientId, this.infoData.visitId).then((res) => {
        this.tableLoading = false;
        this.tableData = res.data.data;
      });
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
      } else {
        this.statusList = ["新开", "提交", "执行", "停止", "作废"];
      }
    },
  },
  components: {
    adviceTable,
    adviceTableWx,
    adviceTableHd,
    adviceTableGuizhou,
    adviceTableCommon,
  },
};
</script>
