<template>
  <div class="main-contain">
    <div class="head-con">
      <span class="filterItem date">
        <span class="type-label">日期:</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="query.StartDateTime"
          clearable
        />
        <span>-</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="结束日期"
          v-model="query.EndDateTime"
          clearable
        />
      </span>
      <el-button @click="getTableData">搜索</el-button>
    </div>
    <dTable :tableData="tableData" :pageLoadng="pageLoadng"></dTable>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import dTable from "./components/table/d-table";
import { getProcedureData } from "@/api/common";
import moment from "moment";
export default {
  components: {
    dTable
  },
  mixins: [common],
  data() {
    return {
      query: {
        StartDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        EndDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      },
      tableHeight: 0,
      tableData: [],
      pageLoadng: false,
    };
  },
  mounted() {
    if (this.deptCode) {
      this.getTableData();
    }
  },
  watch: {
    deptCode(val, oldVal) {
      if (val && oldVal) this.query.page = 1;

      if (val) {
        this.getTableData();
      }
    }
  },
  methods: {
    // 获取列表
    getTableData() {
      this.pageLoadng = true;
      this.query.StartDateTime = this.query.StartDateTime ? moment(this.query.StartDateTime).format("YYYY-MM-DD") + " 00:00:00": moment(new Date()).format("YYYY-MM-DD") + " 00:00:00";
      this.query.EndDateTime =  this.query.EndDateTime ? moment(this.query.EndDateTime).format("YYYY-MM-DD") + " 23:59:59" : moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
      console.log(this.EndDateTime);
      let data = {
        tradeCode: "getPatientTransfer",//服务名
        ...this.query
      };
       getProcedureData(data).then(res => {
          this.tableData = res.data.data.data;
          this.pageLoadng = false;
        },
        err => {
          this.pageLoadng = false;
        }
      );
    }
  },
   filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    }
  },
};
</script>
<style lang="scss" scoped>
.main-contain {
  margin: 10px 10px 0px 10px;
  .head-con {
    height: 42px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    button {
      margin-left: 10px;
    }
  }
}
</style>



