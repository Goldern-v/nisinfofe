<template lang="pug">
  div
    .search-con
      p(class="title") 输液巡视统计报表
      searchCon(ref="searchCon" :tableData="tableData" @print="onPrint")
    .main-contain
      dTable(:tableData="tableData" :pageLoadng="pageLoadng" ref="area" )
      .head-con(flex="main:justify cross:center")
        pagination(:size="page.pageNum" :pageIndex="page.pageIndex" :total="page.pageCount" @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange")

</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.title {
  font-size: 18px;
  line-height: 31px;
  font-weight: bold;
  padding: 5px 0 0 10px;
}

.main-contain {
  margin: 10px 10px 0px 10px;

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
  display: flex;
  align-items: center;
  height: 50px;
  border-left: 1px solid #D4DADE;
  background: #fff;
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
        pageNum: 20,
        pageIndex: 1,
        pageCount: 0
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
      let data = {...this.$refs.searchCon.data, ...this.page,
        beginTime: this.$refs.searchCon.data.beginTime && moment(this.$refs.searchCon.data.beginTime).format("YYYY-MM-DD"),
      endTime: this.$refs.searchCon.data.endTime && moment(this.$refs.searchCon.data.endTime).format("YYYY-MM-DD")};
      this.pageLoadng = true;
      getList(data).then(res => {
        let tableData = res.data.data.list.map((item, index, array) => {
          let prevRowId =
            array[index - 1] &&
            array[index - 1].patientId +
              array[index - 1].visitId +
              array[index - 1].orderNo +
              array[index - 1].executeDateTime;
          let nextRowId =
            array[index + 1] &&
            array[index + 1].patientId +
              array[index + 1].visitId +
              array[index + 1].orderNo +
              array[index + 1].executeDateTime;
          let currentRowId =
            array[index] &&
            array[index].patientId +
              array[index].visitId +
              array[index].orderNo +
              array[index].executeDateTime;

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
          }
          return item;
        });
        this.tableData = tableData;
        // this.tableData = res.data.data.list;
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
      let data = {...this.$refs.searchCon.data, ...this.page};
      exportExcel(data).then(res => {
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
