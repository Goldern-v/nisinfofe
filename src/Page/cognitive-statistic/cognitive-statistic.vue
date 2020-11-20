<template lang="pug">
  div
    .main-contain
      dTable(:tableData="tableData" :pageLoadng="pageLoadng" ref="area")
      dTable(:tableData="tableData" :pageLoadng="pageLoadng" ref="area" class="all-cognitive-statistic-print")
      .head-con(flex="main:justify cross:center")
        pagination(:pageIndex="page.pageIndex" :size="page.pageNum" :total="page.total" @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange")
      
    .search-con
      searchCon(ref="searchCon" :tableData="tableData" @print="onPrint")
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain {
  margin: 10px 250px 0px 10px;

  .head-con {
    height: 41px;
    position: relative;

    .pagination {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #eaeaea;
      border: 1px solid #cbd5dd;
      padding: 4px 15px;
      background: rgba(0, 0, 0, 0);
      z-index: 1;
    }

    .right-part {
      span {
        margin-right: 12px;
        font-size: 12px;
        color: #687179;
        cursor: pointer;
        user-select: none;

        &.useLess {
          color: #999 !important;
          cursor: not-allowed;
        }

        input {
          width: 25px;
          height: 16px;
          background: #FFFFFF;
          border: 1px solid #CBD5DD;
          border-radius: 2px;
          outline: none;
          text-align: center;
        }

        &:hover {
          color: #333;
        }
      }
    }
  }
}

.search-con {
  width: 240px;
  position: fixed;
  border-left: 1px solid #D4DADE;
  background: #f8f8f8;
  top: 60px;
  bottom: 0;
  right: 0;
  z-index: 10;
}
</style>
<style lang="stylus">
@media print {
  .all-cognitive-statistic-print {
    .page-box {
      padding-top: 40px !important;
      box-sizing: border-box;
    }

    .el-table th {
      height: 30px;

      .cell {
        font-size: 12px;
        font-weight: 400;
        color: #000;
        background: #fff;
      }
    }

    .el-table {
      border: none !important;

      &::before, &::after {
        height: 0;
      }

      table {
        width: 100% !important;
      }

      th {
        border: 1px solid #000 !important;
      }

      td {
        height: 34px;
        border-right: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
        border-left: 1px solid #000 !important;
      }

      .el-input__inner {
        height: 24px;
        border-color: #000;
      }

      .cell {
        padding: 0 5px;
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

@page {
  margin: 0 10mm;
}
</style>
<script>
import searchCon from "./components/search-con/search-con";
import dTable from "./components/table/d-table";
import pagination from "./components/common/pagination";
import { getList } from "./api/patientStatistics";
import print from "printing";
import formatter from "./print-formatter";
export default {
  data() {
    return {
      printing: false,
      pageInput: "",
      tableData: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      }
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.getData();
    },
    getData() {
      let data = this.$refs.searchCon.data;
      let obj = {};
      if (data.deptValue) {
        obj.deptCode = data.deptValue;
      }
      if (data.status) {
        obj.type = data.status == 1 ? "在院" : "出院";
      }
      if (data.name) {
        obj.name = data.name;
      }
      if (data.patientId) {
        obj.patientId = data.patientId;
      }
      if (data.inpNo) {
        obj.inpNo = data.inpNo;
      }
      if (data.bedLabel) {
        obj.bedLabel = data.bedLabel;
      }
      if (data.admissionDate[0] && data.status == 1) {
        obj.startDate = new Date(data.admissionDate[0]).Format("yyyy-MM-dd");
      }
      if (data.admissionDate[1] && data.status == 1) {
        obj.endDate = new Date(data.admissionDate[1]).Format("yyyy-MM-dd");
      }
      if (data.dischargeDate[0] && data.status == 2) {
        obj.startDate = new Date(data.dischargeDate[0]).Format("yyyy-MM-dd");
      }
      if (data.dischargeDate[1] && data.status == 2) {
        obj.endDate = new Date(data.dischargeDate[1]).Format("yyyy-MM-dd");
      }
      this.pageLoadng = true;
      getList(obj).then(res => {
        this.tableData = res.data.data;
        // this.page.total = res.data.data.page
        //   ? parseInt(res.data.data.page) * this.page.pageNum
        //   : 0;
        this.pageLoadng = false;
      });
    },
    async onPrint(val) {
      this.printing = val;

      await this.$nextTick();
      const area = this.$refs.area;
      console.log("area", area.$el.querySelectorAll(".el-table"));
      const els = Array.from(area.$el.querySelectorAll(".el-table"));
      await print(els, {
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
          `
      });

      this.printing = val;
    }
  },
  components: {
    searchCon,
    dTable,
    pagination
  }
};
</script>
