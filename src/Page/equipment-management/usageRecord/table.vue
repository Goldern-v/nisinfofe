<template>
  <div class="usageRecord">
    <Header @getTableData='getData' ref="header" :multipleSelection='multipleSelection' />
    <div class="content">
      <el-table
        v-loading="loading"
        element-loading-text="加载中"
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="selectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          v-for="(item, index) in tableColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :minWidth="item.minWidth"
          :align="item.align"
          :fixed="item.fixed"
        >
        </el-table-column>
      </el-table>
      <Pagination
        :pageIndex="query.pageIndex"
        :size="query.pageSize"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Pagination from "@/components/pagination/pagination.vue";
import Header from './header'
import { getList } from '../api/usageRecord'


export default {
  components: {
    Pagination,
    Header
  },
  data() {
    return {
      tableColumn: [
        {
          prop: "code",
          label: "设备编码",
          minWidth: "80",
          align: "center",
        },
        {
          prop: "name",
          label: "设备名称",
          minWidth: "100",
          align: "center"
        },
        {
          prop: "registrationCode",
          label: "设备登记码",
          minWidth: "140",
          align: "center"
        },
        {
          prop: "wardName",
          label: "患者名称",
          minWidth: "160",
          align: "center"
        },
        {
          prop: "patientId",
          label: "患者ID",
          minWidth: "90",
          align: "center"
        },
        {
          prop: "status",
          label: "使用状态",
          minWidth: "80",
          align: "center"
        },
        {
          prop: "beginEmpName",
          label: "开始护士",
          minWidth: "160",
          align: "center"
        },
        {
          prop: "beginTime",
          label: "开始时间",
          minWidth: "140",
          align: "center"
        },
        {
          prop: "endEmpName",
          label: "结束护士",
          minWidth: "80",
          align: "center"
        },
        {
          prop: "endTime",
          label: "结束时间",
          minWidth: "140",
          align: "center"
        }
      ],
      tableData: [],
      loading: false,
      tableHeight: "",
      query: {
        pageSize: 20,
        pageIndex: 1
      },
      total: 0,
      multipleSelection: [],
    };
  },
  mounted() {
    this.tableHeight = window.innerHeight - 220;
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true;
      let params = {
        ...{ ...this.$refs.header.title, type: this.$refs.header.title.type === '全部' ? '' : this.$refs.header.title.type},
        beginTime: moment(this.$refs.header.time[0]).format('YYYY-MM-DD') + ' 00:00:00' || "",
        endTime: moment(this.$refs.header.time[1]).format('YYYY-MM-DD') + ' 23:59:59' || "",
        pageIndex: this.query.pageIndex,
        pageSize: this.query.pageSize,
      };
      getList(params).then(res => {
        this.loading = false;
        if (res.data.code === "200") {
          this.tableData = (res.data && res.data.data && res.data.data.list) || []
          this.total = (res.data && res.data.data && res.data.data.totalCount) || 0
        }
      });
    },
    selectionChange(val) {
      this.multipleSelection = val
    },
    sizeChange(newSize) {
      this.query.pageSize = newSize;
      this.$refs.header.getTableData();
    },
    currentChange(newPage) {
      this.query.pageIndex = newPage;
      this.$refs.header.getTableData();
    },
    
  }
};
</script>

<style lang="scss" scoped>
.usageRecord {
  height: calc(100vh - 82px);
  margin: 10px;
  background-color: #fff;
  .content {
    margin: 0px 20px;
  }
}
 /deep/.el-table .cell, /deep/.el-table th > div {
  padding-left: 5px !important;
  padding-right: 5px !important;
}
</style>
