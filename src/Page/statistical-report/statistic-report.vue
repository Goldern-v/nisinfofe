<template lang="pug">
  div
    p(class="title") 危重症病例统计表
    .main-contain
      dTable(:tableData="tableData" :pageLoadng="pageLoadng" ref="area" )
      .head-con(flex="main:justify cross:center")
        pagination(:size="page.pageSize" :pageIndex="page.pageIndex" @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange")

    .search-con
      searchCon(ref="searchCon" :tableData="tableData" @print="onPrint")
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title {
  font-size: 18px;
  line-height: 31px;
  font-weight: bold;
  padding: 5px 0 0 10px;
}

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
<script>
import searchCon from "./components/search-con/search-con";
import dTable from "./components/table/d-table";
import pagination from "./components/common/pagination";
import { getList, exportExcel} from "./api/patientStatistics";
import print from "printing";
import moment from "moment";
import { fileDownload } from "@/utils/fileExport.js";
export default {
  data() {
    return {
      printing: false,
      pageInput: "",
      tableData: [],
      pageLoadng: false,
      page: {
        pageSize: 20,
        pageIndex: 1,
        pageCount: 0
      }
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.page.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.getData();
    },
    getData() {
      let data = {...this.$refs.searchCon.data, ...this.page,
      startDate: this.$refs.searchCon.data.startDate && moment(this.$refs.searchCon.data.startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: this.$refs.searchCon.data.endDate && moment(this.$refs.searchCon.data.endDate).format("YYYY-MM-DD HH:mm:ss")
      };
      this.pageLoadng = true;
      getList(data).then(res => {
        this.tableData = res.data.data.list;
        this.page.pageSize = res.data.data.pageSize
        this.page.pageIndex = res.data.data.pageIndex
        this.page.pageCount = res.data.data.pageCount
        this.pageLoadng = false;
      });
    },
    async onPrint(val) {
      this.printing = val;

      await this.$nextTick();
      const area = this.$refs.area;
      await print([area.$el], {
        direction: "vertical",
        injectGlobalCss: true,
        scanStyles: false,
        css: `
            .el-table__header,
            .el-table__body {
              transform-origin: top left !important;
              transform: scale(0.5, 0.5);
            }
          `
      });

      this.printing = val;
    },
    getexportExcel() {
      let data = {...this.$refs.searchCon.data, ...this.page,
      startDate: this.$refs.searchCon.data.startDate && moment(this.$refs.searchCon.data.startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: this.$refs.searchCon.data.endDate && moment(this.$refs.searchCon.data.endDate).format("YYYY-MM-DD HH:mm:ss")
      };
      exportExcel(obj).then(res => {
        fileDownload(res);
      });
    }
  },
  components: {
    searchCon,
    dTable,
    pagination
  }
};
</script>
