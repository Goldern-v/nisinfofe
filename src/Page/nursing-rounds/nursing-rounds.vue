<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <span class="label" style="margin-left: 0">巡视日期:</span>
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择巡视日期"
          size="small"
          v-model="startDate"
          style="width:150px"
        ></el-date-picker>
        <span class="label">护理等级:</span>
        <el-select
          clearable
          v-model="query.nursingClass"
          placeholder="请选择"
          size="small"
          style="width:150px"
        >
          <el-option
            :label="nursingClass.name"
            :value="nursingClass.code"
            v-for="nursingClass in allNursingClass"
            :key="nursingClass.code"
          ></el-option>
        </el-select>
        <template v-if="['925'].includes(HOSPITAL_ID)">
          <span class="label">巡视类别:</span>
          <el-select
            clearable
            v-model="query.visitType"
            placeholder="请选择"
            size="small"
            style="width:150px"
          >
            <el-option
              :label="item.name"
              :value="item.code"
              v-for="item in Patrolcategory"
              :key="item.code"
            ></el-option>
          </el-select>
        </template>
        <el-checkbox
          style="margin-left: 15px"
          v-if="HOSPITAL_ID == 'whhk'"
          label="今日无需巡视"
          v-model="notVisit"
          @change="onFilteVisitChange"
        ></el-checkbox>
        <div style="flex: 1"></div>
        <el-button
          size="small"
          v-if="isAdminOrNursingDepartment"
          @click="openViewModal"
          style="margin-right: 15px;display:none;"
          >权限分配</el-button
        >
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入床号进行搜索"
          v-model="query.bedLabel"
        ></el-input>
        <el-button size="small" type="primary" @click="search">查询</el-button>
        <el-button
          size="small"
          type="primary"
          v-if="HOSPITAL_ID == 'beihairenyi'"
          @click="exportExcel"
          >导出</el-button
        >
        <el-button size="small" @click="handlePrint" v-if="showPrint"
          >打印</el-button
        >
      </div>
      <component
        :is="tableCon"
        :tableData="tableData"
        :pageLoadng="pageLoadng"
        :getData="onLoad"
        ref="plTable"
      ></component>
      <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="query.pageIndex"
          :size="query.pageSize"
          :total="total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>
      <printTable v-if="showPrint" ref="printRef" :tableData="allTableData" />
    </div>
    <authorityModal ref="authorityModal"></authorityModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain {
  margin: 10px 10px 0px 10px;
  position: relative;
  overflow: hidden;

  .pagination-con {
    height: 41px;
    position: relative;
    background: #f2f2f2;

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
  >>> .plTableBox {
    .tree--btn-wrapper {
      position: absolute;
      top: 50%;
      width: 1em;
      height: 1em;
      line-height: 1em;
      margin-top: -.5em;
      transition: transform .2s ease-in-out;
      z-index: 1;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      color: #333!important;
      font-size: 16px;
      cursor: pointer;
    }
    .pl-tree-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      padding-left: 1.5em;
    }

    .el-icon-folder-add:before {
      font-family: element-icons;
      content: "\E61C";
    }
    .el-icon-folder-remove:before {
      font-family: element-icons;
      content: "\E619";
    }
    .ivu-table-cell-tree-empty {
      cursor: default;
      color: transparent;
      background-color: transparent;
      border-color: transparent;
    }
  }
}

.head-con {
  height: 42px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  .label {
    font-size: 13px;
    margin-left: 15px;
    margin-right: 5px;
  }
}

.select-btn-list {
  height: 30px;
  padding-top: 2px;
  background: #fff;
  padding: 0 16px;

  >>>.el-radio__input {
    position: relative;
    top: 1px;
  }

  >>>.el-radio__label {
    color: #333;
    font-size: 12px;
    position: relative;
    top: 2px;
  }
}
</style>
<script>
import dTable from "./components/table/d-table";
import dTableLyxrm from "./components/table/d-table-lyxrm";
import pagination from "./components/common/pagination";
import printTable from "./components/print-table-sdlj";
import { getNursingVisitLc, exportExcel } from "./api/index";
import { multiDictInfo } from "@/api/common";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import authorityModal from "./components/modal/authorityModal";
import print from "printing";
import formatter from "./utils/print-formatter";

import { fileDownload } from "@/utils/fileExport.js";

const pageSize = ["lyxrm", "whsl", "whhk", "stmz"].includes(
  process.env.HOSPITAL_ID
)
  ? 1000
  : 20;
export default {
  mixins: [common],
  data() {
    return {
      tableData: [],
      pageLoadng: false,
      startDate: moment().format("YYYY-MM-DD"),
      query: {
        deptCode: "",
        operateDate: "", //操作日期
        nursingClass: "", //护理等级
        visitType: "", //巡视类别
        bedLabel: "",
        pageIndex: 1,
        pageSize
      },
      total: 0,
      allNursingClass: [],
      Patrolcategory: [
        { name: "全部", code: "" },
        { name: "级别巡视", code: "0" },
        { name: "输液巡视", code: "1" },
        { name: "其他巡视", code: "3" }
      ],
      allTableData: [],
      showPrint: this.HOSPITAL_ID === "sdlj",
      notVisit: false,
      filterTableData: []
    };
  },
  methods: {
    onFilteVisitChange() {
      this.tableData = this.filterTableData.filter(item => {
        return item.notVisitFlag === this.notVisit;
      });
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.query.pageIndex = newPage;
      this.onLoad();
    },
    onLoad(ifOnload) {
      if (!this.deptCode) return;
      // if(!this.query.bedLabel.trim() && ifOnload!=='onload') return
      this.pageLoadng = true;
      this.query.deptCode = this.deptCode;
      (this.query.operateDate = moment(this.startDate).format("YYYY-MM-DD")), //操作日期
        getNursingVisitLc({
          ...this.query,
          bedLabel: this.query.bedLabel.trim()
        }).then(res => {
          if (["lyxrm", "whsl", "whhk", "stmz"].includes(this.HOSPITAL_ID)) {
            let child = [],
              tableData = [];
            res.data.data.list.map((item, index, array) => {
              let prevRowId, nextRowId, currentRowId;

              prevRowId = array[index - 1] && array[index - 1].patientId;
              nextRowId = array[index + 1] && array[index + 1].patientId;
              currentRowId = array[index] && array[index].patientId;

              item.id = index;

              /** 判断是此记录是多条记录 */
              if (currentRowId == prevRowId || currentRowId == nextRowId) {
                child.push(item);
                if (currentRowId != prevRowId) {
                  /** 第一条 */
                  item.rowType = 1;
                  child.pop();
                  tableData.push(item);
                } else if (currentRowId != nextRowId) {
                  /** 最后条 */
                  item.rowType = 3;

                  tableData[tableData.length - 1].children = JSON.parse(
                    JSON.stringify(child)
                  );
                  child = [];
                } else {
                  /** 中间条 */
                  item.rowType = 2;
                }
              } else {
                tableData.push(item);
              }
            });

            // tableData.map(item => {
            //   item.child = item.child ? item.child : [{ ...item }];
            // });
            this.tableData = [...tableData];
            this.filterTableData = [...tableData];
            if (this.HOSPITAL_ID === "whhk") {
              this.tableData = [...tableData].filter(
                item => item.notVisitFlag === this.notVisit
              );
            }
            if (
              this.$refs.plTable.$children &&
              this.$refs.plTable.$children[0] &&
              this.$refs.plTable.$children[0].reloadData
            ) {
              this.$refs.plTable.$children[0].reloadData(tableData);
            }
          } else {
            this.tableData = res.data.data.list.map((item, index, array) => {
              let prevRowId = array[index - 1] && array[index - 1].patientId;
              let nextRowId = array[index + 1] && array[index + 1].patientId;
              let currentRowId = array[index] && array[index].patientId;
              /** 判断是此记录是多条记录 */
              if (currentRowId == prevRowId || currentRowId == nextRowId) {
                if (currentRowId != prevRowId) {
                  /** 第一条 */
                  item.rowType = 1;
                } else {
                  /** 最后条 */
                  item.rowType = 2;
                }
              }
              return item;
            });
          }
          this.total = res.data.data.totalCount || this.total;
          this.pageLoadng = false;
        });
    },
    search() {
      this.query.pageIndex = 1;
      this.onLoad();
      this.onLoadAll();
      console.log(1);
    },
    getNursingClass() {
      let list = ["nurse_nursing_class"];
      multiDictInfo(list).then(res => {
        this.allNursingClass = res.data.data.nurse_nursing_class;
        if (["lyxrm", "whsl", "whhk", "stmz"].includes(this.HOSPITAL_ID))
          this.allNursingClass.unshift({ name: "全部", code: "" });
      });
    },
    openViewModal() {
      this.$refs.authorityModal.open(this.deptCode);
    },
    onLoadAll(ifOnload) {
      if (!this.deptCode) return;
      // if(!this.query.bedLabel.trim() && ifOnload!=='onload') return
      this.pageLoadng = true;
      this.query.deptCode = this.deptCode;
      (this.query.operateDate = moment(this.startDate).format("YYYY-MM-DD")), //操作日期
        getNursingVisitLc({
          ...this.query,
          bedLabel: this.query.bedLabel.trim(),
          pageSize: 9999
        }).then(res => {
          if (["lyxrm", "whsl", "whhk", "stmz"].includes(this.HOSPITAL_ID)) {
            let child = [],
              tableData = [];
            res.data.data.list.map((item, index, array) => {
              let prevRowId, nextRowId, currentRowId;

              prevRowId = array[index - 1] && array[index - 1].patientId;
              nextRowId = array[index + 1] && array[index + 1].patientId;
              currentRowId = array[index] && array[index].patientId;

              item.id = index;

              /** 判断是此记录是多条记录 */
              if (currentRowId == prevRowId || currentRowId == nextRowId) {
                child.push(item);
                if (currentRowId != prevRowId) {
                  /** 第一条 */
                  item.rowType = 1;
                  child.pop();
                  tableData.push(item);
                } else if (currentRowId != nextRowId) {
                  /** 最后条 */
                  item.rowType = 3;

                  tableData[tableData.length - 1].children = JSON.parse(
                    JSON.stringify(child)
                  );
                  child = [];
                } else {
                  /** 中间条 */
                  item.rowType = 2;
                }
              } else {
                tableData.push(item);
              }
            });

            this.allTableData = [...tableData];
          } else {
            this.allTableData = res.data.data.list.map((item, index, array) => {
              let prevRowId = array[index - 1] && array[index - 1].patientId;
              let nextRowId = array[index + 1] && array[index + 1].patientId;
              let currentRowId = array[index] && array[index].patientId;
              /** 判断是此记录是多条记录 */
              if (currentRowId == prevRowId || currentRowId == nextRowId) {
                if (currentRowId != prevRowId) {
                  /** 第一条 */
                  item.rowType = 1;
                } else {
                  /** 最后条 */
                  item.rowType = 2;
                }
              }
              return item;
            });
          }
          this.pageLoadng = false;
        });
    },
    handlePrint() {
      this.$nextTick(() => {
        const printEle = this.$refs.printRef.$el;
        print(printEle, {
          beforePrint: formatter,
          direction: "horizontal",
          injectGlobalCss: true,
          scanStyles: false,
          css: `
          @page {
            margin: 0 5mm;
          }
          .print-table {
            top: 0px !important;
          }

          pre {
            white-space: pre-wrap;
          }
          `
        });
      });
    },
    exportExcel() {
      exportExcel({ ...this.query, pageSize: 9999 }).then(res => {
        fileDownload(res);
      });
    }
  },
  created() {
    this.onLoad("onload");
    this.onLoadAll("onload");
    this.getNursingClass();
  },
  watch: {
    deptCode() {
      this.search();
    },
    startDate() {
      this.search();
    },
    "query.nursingClass"() {
      this.search();
    },
    "query.visitType"() {
      this.search();
    }
  },
  computed: {
    tableCon() {
      switch (this.HOSPITAL_ID) {
        case "lyxrm":
        case "whsl":
        case "stmz":
          return "dTableLyxrm";
        default:
          return "dTable";
      }
    }
  },
  components: {
    dTable,
    dTableLyxrm,
    pagination,
    authorityModal,
    printTable
  }
};
</script>
