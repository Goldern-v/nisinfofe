<template>
  <div class="workload-satistics">
    <div class="search-topbar">
      <div class="float-left">
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
        <el-input
          size="small"
          style="width: 200px;margin-right: 15px;"
          placeholder="请输入工号关键字"
          v-model="query.empNo"
        ></el-input>
        <el-input
          size="small"
          style="width: 200px;margin-right: 15px;"
          placeholder="请输入护士姓名关键字"
          v-model="query.empName"
        ></el-input>
        <el-button @click="handleSearch">搜索</el-button>
        <el-button @click="onPrint" :disabled="pageLoadng">打印</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <dTable :tableData="data" :pageLoadng="pageLoadng"></dTable>
      </div>
      <div class="printable" ref="printable">
        <div class="header-con">
          <h2>工作量统计表</h2>
          <div class="filterItem date">
            <span class="type-label">日期:</span>
            <span
              >{{ query.startDate
              }}<span style="vertical-align: middle;">~</span
              >{{ query.endDate }}</span
            >
          </div>
        </div>
        <div class="table-contain">
          <dTable :tableData="data" :pageLoadng="pageLoadng"></dTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixin from "./../../common/mixin/common.mixin";
import { getListZSQ } from "./api/api";
import dayjs from "dayjs";
import print from "printing";
import formatter from "./print-formatter";
import dTable from "./components/d-table";
export default {
  components: {
    dTable
  },
  mixins: [commonMixin],
  data() {
    return {
      query: {
        wardCode: "",
        startDate: "",
        endDate: "",
        empNo: "",
        empName: ""
      },
      data: [],
      pageLoadng: true
    };
  },
  mounted() {
    if (this.deptCode) {
      this.setTableData();
    }

    // 设置默认日期
    this.getDate();
  },
  watch: {
    deptCode(val, oldVal) {
      if (val && oldVal) this.query.page = 1;

      if (val) {
        this.setTableData();
      }
    }
  },
  methods: {
    // 查询
    handleSearch() {
      this.setTableData();
    },
    setTableData() {
      this.pageLoadng = true;
      this.query.wardCode = this.deptCode;
      this.getDate();
      getListZSQ(this.query).then(
        res => {
          if (res.data && res.data.code == 200) {
            this.data = res.data.data;
          }
          this.pageLoadng = false;
        },
        err => {
          this.pageLoadng = false;
        }
      );
    },
    // 设置默认日期
    getDate() {
      if (!this.query.startDate) {
        let month = parseInt(new Date().getMonth()) + 1;
        if (month < 10) {
          this.query.startDate =
            new Date().getFullYear() + "-0" + month + "-01";
        } else {
          this.query.startDate = new Date().getFullYear() + "-" + month + "-01";
        }
      }
      this.query.endDate = this.query.endDate
        ? this.query.endDate
        : dayjs(new Date()).format("YYYY-MM-DD");
      this.query.startDate = dayjs(this.query.startDate).format("YYYY-MM-DD");
      this.query.endDate = dayjs(this.query.endDate).format("YYYY-MM-DD");
    },
    async onPrint() {
      this.pageLoadng = true;
      this.$nextTick(async () => {
        await print(this.$refs.printable, {
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
      });
      this.pageLoadng = false;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@media print {
  .printable {
    >>>.page-box {
      padding-top: 80px !important;
      box-sizing: border-box;
      .header-con {
        h2 {
          font-size: 24px;
          text-align: center;
          padding-bottom: 20px;
        }
        padding-bottom: 20px;
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

        .el-table__header-wrapper, .el-table__body-wrapper,.el-table__footer-wrapper {
          // margin-top: -1px;
          margin-left: 0;
        }

        .el-table__body-wrapper {
          height: auto !important;
        }
      }
    }
  }
}

@page {
  margin: 0 10mm;
}
</style>

<style lang="scss" scoped>
.workload-satistics {
  position: absolute;
  width: 100%;
  top: 60px;
  bottom: 0;
  .search-topbar {
    height: 41px;
    background-image: linear-gradient(-180deg, #f8f8fa 0%, #ebecf0 100%);
    border-bottom: 1px solid #cbd5dd;
    overflow: hidden;
    .title {
      font-size: 20px;
      display: inline-block;
      margin-left: 30px;
      margin-top: 20px;
    }
    .float-left {
      margin-top: 6px;
      margin-left: 10px;
      display: inline-block;
      h3 {
        font-size: 18px;
        line-height: 31px;
      }
    }
    .float-right {
      margin-top: 5px;
      margin-right: 10px;
    }
  }

  .main-contain {
    position: absolute;
    top: 51px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    overflow: hidden;
    .table-contain {
      position: absolute;
      top: 0;
      bottom: 41px;
      left: 0;
      right: 0;
    }
    // .pagination {
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   right: 0;
    //   background: #eaeaea;
    //   border: 1px solid #cbd5dd;
    //   padding: 4px 15px;
    //   background: rgba(0, 0, 0, 0);
    //   z-index: 1;
    // }
  }

  .el-table {
    th > .cell,
    th > div {
      padding: 0px;
      text-align: center;
    }
    td.align-left div {
      text-align: left;
    }
  }
  .printable {
    position: absolute;
    left: 0;
    top: 1000px;
    z-index: -1;
    width: 850px;
    .header-con {
      h2 {
        font-size: 24px;
        text-align: center;
        padding-bottom: 20px;
      }
      padding-bottom: 20px;
    }
    .table-contain {
      position: static !important;
    }
  }
}
</style>
