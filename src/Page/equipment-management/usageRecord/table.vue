<template>
  <div class="critical-value">
    <Header @getTableData='getData' ref="header" :query="query" :multipleSelection='multipleSelection' />
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
import Pagination from "@/components/pagination/pagination.vue";
import Header from './header'

export default {
  components: {
    Pagination,
    Header
  },
  data() {
    return {
      tableColumn: [
        {
          prop: "id",
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
          prop: "result",
          label: "设备登记码",
          minWidth: "100",
          align: "center"
        },
        {
          prop: "reference",
          label: "使用科室",
          minWidth: "160",
          align: "center"
        },
        {
          prop: "patientName",
          label: "使用人",
          minWidth: "80",
          align: "center"
        },
        {
          prop: "patientId",
          label: "使用状态",
          minWidth: "80",
          align: "center"
        },
        {
          prop: "reportTime",
          label: "开始时间",
          minWidth: "120",
          align: "center"
        },
        {
          prop: "reportTime",
          label: "结束时间",
          minWidth: "120",
          align: "center"
        }
      ],
      tableData: [{id: '111'}, {name: '设备'}],
      loading: false,
      tableHeight: "",
      query: {
        pageSize: 20,
        pageIndex: 1
      },
      total: 0,
      wardCode: '',
      multipleSelection: []
    };
  },
  mounted() {
    this.tableHeight = window.innerHeight - 220;
    // this.$refs.header.getTableData();
  },
  methods: {
    getData(data) {
      let { tableData, total } = data;
      this.tableData = tableData
      this.total = total
    },
    selectionChange(val) {
      this.multipleSelection = val
      console.log(val, 9999999)
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
.critical-value {
  height: calc(100vh - 81px);
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
