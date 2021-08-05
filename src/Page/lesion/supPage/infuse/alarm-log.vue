<template>
  <div class="alarm-log">
    <div class="search-topbar">
      <div class="float-left">
        <el-button @click="goBack">返回</el-button>
      </div>
      <div class="float-right">
        <el-button @click="toggleAllSelection">批量处理</el-button>
        <el-button @click="ignoreAllSelection">忽略</el-button>
        <span class="filterItem date">
          <span class="type-label">日志时间:</span>
          <ElDatePicker
            class="date-picker"
            type="date"
            format="yyyy-MM-dd"
            placeholder="开始日期"
            v-model="checkDateStart"
            clearable
          />
          <span>-</span>
          <ElDatePicker
            class="date-picker"
            type="date"
            format="yyyy-MM-dd"
            placeholder="结束日期"
            v-model="checkDateEnd"
            clearable
          />
        </span>
        <span class="type-content">
          <span class="type-label">类型:</span>
          <span class="type-content">
            <el-select
              v-model="query.repeatIndicator"
              size="small"
              placeholder="全部"
              @change="handleChange"
            >
              <el-option value>全部</el-option>
              <el-option
                :key="item.id"
                v-for="item in typeList"
                :value="item.value"
              >{{ item.value }}</el-option>
            </el-select>
          </span>
        </span>
        <el-input placeholder="床号/姓名" v-model="query.keyword" />
        <el-button @click="handleSearch">查询</el-button>
        <el-button @click="clear">清空</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <el-table
          :data="tableData"
          :height="tableHeight"
          border
          v-loading="pageLoadng"
          ref="multipleTable"
          @selection-change="changeFun"
        >
          <el-table-column type="selection" width="55" :selectable="checkSelectable"></el-table-column>
          <el-table-column prop="index" label="序号" min-width="50px" align="center">
            <template slot-scope="scope">
              <span>
                {{
                (query.pageIndex - 1) * query.pageSize + scope.$index + 1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="bedLabel" label="床号" min-width="80px" align="center"></el-table-column>
          <el-table-column prop="name" label="患者姓名" min-width="100px" align="center"></el-table-column>
          <el-table-column prop="repeatIndicator" label="类型" min-width="100px" align="center"></el-table-column>
          <el-table-column prop="administration" label="方式" min-width="160px" align="center"></el-table-column>
          <el-table-column prop="orderText" label="内容" min-width="300px"></el-table-column>
          <el-table-column prop="dosage" label="容量" min-width="100px" align="center"></el-table-column>
          <el-table-column prop="warningDate" label="报警时间" min-width="160px" align="center"></el-table-column>
          <el-table-column label="操作" min-width="150px" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.status==0">
                <span class="operation-text" @click="toHandle(scope.row)">处理</span>
                <span class="operation-text" @click="ignore(scope.row)">忽略</span>
              </div>
              <div class="is-deal" v-else>
                <span class="operation-text">{{scope.row.status==1?'已处理':'已忽略'}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        :pageIndex="query.pageIndex"
        :size="query.pageSize"
        :total="total"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
import commonMixin from "@/common/mixin/common.mixin";
import pagination from "@/components/pagination/pagination.vue";
import {
  dealWarningLog,
  deleteWarningLog,
  getWarningLogList
} from "@/api/infuse";
import dayjs from "dayjs";
export default {
  components: {
    pagination
  },
  mixins: [commonMixin],
  data() {
    return {
      query: {
        wardCode: "", //科室代码
        repeatIndicator: "", //类型
        keyword: "", //关键字，支持姓名，床号
        beginTime: "", //开始时间yyyy-MM-dd HH:mm:ss
        endTime: "", //结束时间yyyy-MM-dd HH:mm:ss
        pageIndex: 1, //页码
        pageSize: 20 //每页条数
      },
      typeList: [
        {
          id: 1,
          value: "长期"
        },
        {
          id: 2,
          value: "短期"
        }
      ], //类型
      tableHeight: 0,
      total: 0, //总条数
      tableData: [],
      pageLoadng: false,
      checkDateStart: "",
      checkDateEnd: "",
      multipleSelection: [] //选中的数据
    };
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener("resize", this.handelResize);

    // 设置默认日期
    if (!this.checkDateStart) {
      this.checkDateStart = this.getDateStr(-2);
    }
    this.checkDateEnd = this.checkDateEnd
      ? dayjs(this.checkDateEnd).format("YYYY-MM-DD")
      : dayjs(new Date()).format("YYYY-MM-DD");

    if (this.deptCode) {
      this.setTableData();
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handelResize);
  },
  watch: {
    deptCode(val, oldVal) {
      if (val && oldVal) this.query.pageIndex = 1;
      if (val) {
        this.setTableData();
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handelResize() {
      let tableHeight = document.querySelector(".main-contain .table-contain")
        .offsetHeight;
      this.tableHeight = tableHeight;
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
    // 获取表格数据
    setTableData() {
      this.pageLoadng = true;
      this.query.wardCode = this.deptCode;
      this.query.beginTime = dayjs(this.checkDateStart).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.query.endTime =
        dayjs(this.checkDateEnd).format("YYYY-MM-DD") + " 23:59:59";
      getWarningLogList(this.query)
        .then(res => {
          if (res.data && res.data.code == 200) {
            this.total = res.data.data.totalCount || 0;
            this.tableData = res.data.data.list;
            this.tableData.map(item => {
              item.orderText = item.orderText.slice(1);
            });
          }
          this.pageLoadng = false;
        })
        .catch(err => {
          console.dir(err);
          this.pageLoadng = false;
        });
    },
    // 选择类型
    handleChange(value) {
      this.query.repeatIndicator = value;
    },
    // 获取当前时间前后N天日期
    getDateStr(addDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
      return y + "-" + m + "-" + d;
    },
    // 清空
    clear() {
      this.$confirm("是否清空所有报警日志？清空后无法恢复", "提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = [];
        this.tableData.map(item => {
          ids.push(item.id);
        });
        deleteWarningLog(ids).then(res => {
          this.$message({
            type: "success",
            message: "成功清空!"
          });
          this.setTableData();
        });
      });
    },
    // 批量处理
    toggleAllSelection() {
      // this.tableData.map((item, index) => {
      //   if (item.status == 0) {
      //     this.$refs.multipleTable.toggleRowSelection(item, true);
      //   }
      // });
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: "warning",
          message: "请先勾选要处理的选项!"
        });
        return;
      }
      this.$confirm("确定处理勾选的选项吗", "处理", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //修改状态//0：未处理，1：已处理，-1：已忽略
        let logList = [];
        this.multipleSelection.map(item => {
          if (item.status == 0) {
            logList.push({
              id: item.id,
              status: 1
            });
          }
        });
        this.delWarning(logList, "处理成功");
      });
    },
    changeFun(val) {
      this.multipleSelection = val;
    },
    // 忽略全部
    ignoreAllSelection() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          type: "warning",
          message: "请先勾选要忽略的选项!"
        });
        return;
      }
      this.$confirm("确定忽略勾选的选项吗", "忽略", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //修改状态//0：未处理，1：已处理，-1：已忽略
        let logList = [];
        this.multipleSelection.map(item => {
          if (item.status == 0) {
            logList.push({
              id: item.id,
              status: -1
            });
          }
        });
        this.delWarning(logList, "忽略成功");
      });
    },
    checkSelectable(row, index) {
      return row.status == 0;
    },
    // 去处理
    toHandle(item) {
      this.$confirm("处理该条报警日志", "处理", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      }).then(() => {
        let logList = [
          {
            id: item.id,
            status: 1
          }
        ];
        this.delWarning(logList, "处理成功");
      });
    },
    // 忽略日志
    ignore(item) {
      this.$confirm("确定忽略该条报警日志", "忽略", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let logList = [
          {
            id: item.id,
            status: -1
          }
        ];
        this.delWarning(logList, "忽略成功");
      });
    },
    //处理日志
    delWarning(logList, tips) {
      //修改状态//0：未处理，1：已处理，-1：已忽略
      dealWarningLog({ logList }).then(res => {
        this.$message({
          type: "success",
          message: tips
        });
        this.setTableData();
      });
    }
  }
};
</script>
<style lang="scss">
.alarm-log {
  .search-topbar {
    .float-right {
      float: right;
      .type-label {
        font-size: 13px;
        vertical-align: middle;
      }
      .type-content {
        margin-right: 15px;
      }
      input {
        height: 31px;
      }
      .date {
        margin-left: 15px;
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
      &.is-deal {
        .operation-text {
          color: #999;
          cursor: default;
        }
      }
    }
    .el-table {
      border: 1px solid #cbd5dd;
      border-bottom: 0;
      td {
        height: 34px;
        &.el-table-column--selection {
          text-align: center;
        }
      }
      th {
        &.is-leaf {
          text-align: center;
        }
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
.alarm-log-preview-modal {
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

<style lang="scss" scoped>
.alarm-log {
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
      .el-select {
        width: 80px;
      }
      .el-input {
        width: 150px;
      }
    }
    .el-button {
      font-size: 13px;
    }
  }

  .main-contain {
    position: absolute;
    top: 51px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    .table-contain {
      position: absolute;
      top: 0;
      bottom: 41px;
      left: 0;
      right: 0;
    }
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
}
</style>
