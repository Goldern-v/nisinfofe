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
            v-model="query.operateStartDate"
            clearable
          />
          <span>-</span>
          <ElDatePicker
            class="date-picker"
            type="date"
            size="small"
            format="yyyy-MM-dd"
            placeholder="结束日期"
            v-model="query.operateEndDate"
            clearable
          />
        </span>
        <el-input
          size="small"
          style="width: 200px;margin-right: 15px;"
          placeholder="请输入工号或护士姓名关键字"
          v-model="query.empNo"
        ></el-input>
        <el-button @click="handleSearch">搜索</el-button>
        <el-button @click="onPrint" :disabled="pageLoadng">打印</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <el-table
          :data="data"
          :height="tableHeight"
          border
          v-loading="pageLoadng"
          stripe
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column prop="index" label="序号" width="80" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="empNo" label="工号" width="120" align="center"></el-table-column>
          <el-table-column prop="empName" label="护士姓名" min-width="150" align="center"></el-table-column>
          <el-table-column prop="sySum" label="输液" min-width="120" align="center"></el-table-column>
          <el-table-column prop="zsSum" label="注射" min-width="120" align="center"></el-table-column>
          <el-table-column prop="kfSum" label="口服" min-width="120" align="center"></el-table-column>
          <el-table-column prop="zlSum" label="治疗" min-width="120" align="center"></el-table-column>
          <el-table-column prop="bbSum" label="标本" min-width="120" align="center"></el-table-column>
          <el-table-column prop="visitSum" label="巡视" min-width="120" align="center"></el-table-column>
          <el-table-column prop="missionSum" label="宣教" min-width="120" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="printable"  ref="printable">
        <div class="header-con">
          <h2>工作量统计表</h2>
           <div class="filterItem date">
            <span class="type-label">日期:</span>
            <span>{{query.operateStartDate}}<span style="vertical-align: middle;">~</span>{{query.operateEndDate}}</span>
          </div>
        </div>
        <div class="table-contain">
          <el-table
            :data="data"
            border
            v-loading="pageLoadng"
            stripe
            show-summary
            :summary-method="getSummaries"
          >
            <el-table-column prop="index" label="序号" width="80" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="empNo" label="工号" width="80" align="center"></el-table-column>
            <el-table-column prop="empName" label="护士姓名" min-width="80" align="center"></el-table-column>
            <el-table-column prop="sySum" label="输液" min-width="60" align="center"></el-table-column>
            <el-table-column prop="zsSum" label="注射" min-width="60" align="center"></el-table-column>
            <el-table-column prop="kfSum" label="口服" min-width="60" align="center"></el-table-column>
            <el-table-column prop="zlSum" label="治疗" min-width="60" align="center"></el-table-column>
            <el-table-column prop="bbSum" label="标本" min-width="60" align="center"></el-table-column>
            <el-table-column prop="visitSum" label="巡视" min-width="60" align="center"></el-table-column>
            <el-table-column prop="missionSum" label="宣教" min-width="60" align="center"></el-table-column>
          </el-table>
        </div>
      </div>

      <!-- <pagination
        :pageIndex="query.pageIndex"
        :size="query.pageSize"
        :total="total"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      ></pagination>-->
    </div>
    <!-- <sweet-modal ref="preview-modal" class="workload-satistics-preview-modal" :title="preview.title">
      <div class="modal-content">
        <div>
          <span>检查日期：</span>
          <p>{{preview.checkDate}}</p>
        </div>
        <div>
          <span>检查者：</span>
          <p>{{preview.inspectorName}}</p>
        </div>
        <div>
          <span>存在问题：</span>
          <p>{{preview.problem}}</p>
        </div>
        <div>
          <span>责任人：</span>
          <p>{{preview.responsibleEmpName}}</p>
        </div>
        <div>
          <span>扣分：</span>
          <p>{{preview.deduction}}</p>
        </div>
        <div>
          <span>原因分析：</span>
          <p>{{preview.causeAnalysis}}</p>
        </div>
        <div>
          <span>整改措施：</span>
          <p>{{preview.measures}}</p>
        </div>
      </div>
    </sweet-modal>-->
  </div>
</template>

<script>
import commonMixin from "../../common/mixin/common.mixin";
// import pagination from "./components/pagination.vue";
import { getList,getListJMFY, getTypeByDeptCode } from "./api/api";
import dayjs from "dayjs";
import print from "printing";
import formatter from "./print-formatter";
export default {
  // components: {
  //   pagination
  // },
  mixins: [commonMixin],
  data() {
    return {
      query: {
        deptCode: "", //科室代码
        operateStartDate: "", //检查日期开始日期（yyyy-MM-dd）
        operateEndDate: "", //检查日期结束日期（yyyy-MM-dd
        empNo: ""
        // pageIndex: 1, //页码
        // pageSize: 20 //每页条数
      },
      tableHeight: 0,
      total: 0, //总条数
      data: [],
      preview: {},
      pageLoadng: true
    };
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener("resize", this.handelResize);

    if (this.deptCode) {
      console.log("hua")
      this.setTableData();
      //this.getTypeByDeptCode();
    }

    // 设置默认日期
    this.getDate();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handelResize);
  },
  watch: {
    deptCode(val, oldVal) {
      if (val && oldVal) this.query.page = 1;

      if (val) {
        //this.getTypeByDeptCode();
        this.setTableData();
      }
    }
  },
  methods: {
    // 获取类型
    getTypeByDeptCode() {
      // getTypeByDeptCode({ deptCode: this.deptCode }).then(res => {
      //   if (res.data.data instanceof Array) this.typeList = res.data.data;
      // });
    },
    handelResize() {
      let tableHeight = document.querySelector(".main-contain .table-contain")
        .offsetHeight;
      this.tableHeight = tableHeight;
    },
    previewFile(scope) {
      let {
        checkDate,
        inspectorName,
        problem,
        responsibleEmpName,
        deduction,
        causeAnalysis,
        measures
      } = scope;

      this.preview = {
        title: "问题详情",
        checkDate,
        inspectorName,
        problem,
        responsibleEmpName,
        deduction,
        causeAnalysis,
        measures
      };

      this.$refs["preview-modal"].open();
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.query.pageIndex = newPage;
      this.setTableData();
    },
    // 查询
    handleSearch() {
      this.query.pageIndex = 1;
      this.query.pageSize = 20;
      this.setTableData();
    },
    setTableData() {
      this.pageLoadng = true;
      this.query.deptCode = this.deptCode;
      this.getDate();
      getListJMFY(this.query).then(
        res => {
          if (res.data && res.data.code == 200) {
            this.data = res.data.data.list;
          }
          this.pageLoadng = false;
        },
        err => {
          this.pageLoadng = false;
        }
      );
    },
    getSummaries(param) {
      const { columns, data } = param;
      // console.log(columns)
      // console.log(data)
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 1) {
          sums[index] = "";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
      });
      console.log(sums)
       console.log("sums值")
      return sums;
    },
    // 设置默认日期
    getDate() {
      if (!this.query.operateStartDate) {
        let month = parseInt(new Date().getMonth()) + 1;
        if (month < 10) {
          this.query.operateStartDate =
            new Date().getFullYear() + "-0" + month + "-01";
        } else {
          this.query.operateStartDate =
            new Date().getFullYear() + "-" + month + "-01";
        }
      }
      this.query.operateEndDate = this.query.operateEndDate
        ? this.query.operateEndDate
        : dayjs(new Date()).format("YYYY-MM-DD");
      this.query.operateStartDate = dayjs(this.query.operateStartDate).format(
        "YYYY-MM-DD"
      );
      this.query.operateEndDate = dayjs(this.query.operateEndDate).format(
        "YYYY-MM-DD"
      );
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
        `,
        });
      });
      this.pageLoadng = false;
    },
  }
};
</script>
<style lang="scss">
.workload-satistics {
  .search-topbar {
    .float-right {
      float: right;
      .type-label {
        font-size: 13px;
        vertical-align: middle;
      }
      .type-content {
        margin-right: 15px;
        input {
          height: 31px;
        }
      }
      .date {
        margin-right: 15px;
      }
    }
  }
  .main-contain {
    div {
      cursor: default;
      .operation-text {
        cursor: pointer;
        color: #4bb08d;
        &:hover {
          font-weight: bold;
        }
      }
    }
    .el-table {
      border: 1px solid #cbd5dd;
      border-bottom: 0;
      td {
        height: 34px;
      }
    }
    .el-table th > div {
      padding: 0;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
.workload-satistics-preview-modal {
  .sweet-modal {
    width: 500px !important;
  }
  .sweet-content {
    max-height: none;
    padding: 20px;
    line-height: 24px;
  }
  span {
    float: left;
    min-width: 70px;
    font-size: 14px;
  }
  p {
    font-size: 14px;
    text-align: left;
    padding-left: 80px;
  }
}
</style>
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
