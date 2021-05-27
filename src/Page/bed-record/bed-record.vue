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
          v-model="query.startDate"
          clearable
        />
        <span>-</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="结束日期"
          v-model="query.endDate"
          clearable
        />
      </span>
      <el-button @click="getTableData">搜索</el-button>
    </div>
    <dTable :tableData="tableData" :pageLoadng="pageLoadng"></dTable>
    <pagination
    :pageIndex="query.pageIndex"
    :size="query.pageSize"
    :total="total"
    @sizeChange="handleSizeChange"
    @currentChange="handleCurrentChange"
  ></pagination>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import dTable from "./components/table/d-table";
import { getListNurseBedExchange } from "./api/";
import moment from "moment";
import pagination from "@/components/pagination/pagination.vue";
export default {
  components: {
    dTable,
    pagination
  },
  mixins: [common],
  data() {
    return {
      query: {
        wardCode:"",
        startDate:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        endDate:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        pageIndex:1,
        pageSize:20
      },
      tableHeight: 0,
      tableData: [],
      pageLoadng: false,
      total: 0
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
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.query.pageIndex = newPage;
      this.getArchiveList();
    },
    // 获取列表
    getTableData() {
      this.pageLoadng = true;
      this.query.startDate = this.query.startDate ? moment(this.query.startDate).format("YYYY-MM-DD") + " 00:00:00": moment(new Date()).format("YYYY-MM-DD") + " 00:00:00";
      this.query.endDate =  this.query.endDate ? moment(this.query.endDate).format("YYYY-MM-DD") + " 23:59:59" : moment(new Date()).format("YYYY-MM-DD") + " 23:59:59";
      this.query.wardCode = this.deptCode;
      getListNurseBedExchange(this.query).then(res => {
          this.tableData = res.data.data.list;
          this.total = res.data.data.totalCount || 0;
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



