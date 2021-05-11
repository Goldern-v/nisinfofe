<template>
  <div class="bed-record">
    <div class="main-contain">
      <div class="table-contain">
        <el-table
          :data="data"
          :height="tableHeight"
          border
          v-loading="pageLoadng"
          stripe
        >
          <el-table-column prop="index" label="序号"  min-width="50" align="center">
            <template slot-scope="scope">
              <span>{{(query.pageIndex-1)*query.pageSize+scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="住院号"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
          <el-table-column prop="fileName" label="姓名"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
          <el-table-column prop="fileName" label="转床时间"  min-width="150" align="center" class-name="rule-name">
            <template slot-scope="scope">
              <div class="rule-name-content">{{scope.row.fileName}}</div>
            </template>
          </el-table-column>
           <el-table-column prop="fileName" label="转出病区"  min-width="150" align="center" class-name="rule-name"> </el-table-column>
           <el-table-column prop="fileName" label="转出专科"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
           <el-table-column prop="fileName" label="转出床位号"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
           <el-table-column prop="fileName" label="转入病区"  min-width="150" align="center" class-name="rule-name"> </el-table-column>
           <el-table-column prop="fileName" label="转入专科"  min-width="150" align="center" class-name="rule-name"> </el-table-column>
           <el-table-column prop="fileName" label="转入床位号"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
           <el-table-column prop="fileName" label="操作员"  min-width="80" align="center" class-name="rule-name"> </el-table-column>
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
import commonMixin from "./../../common/mixin/common.mixin";
import pagination from "./components/pagination.vue";
import { getProcedureData } from "@/api/common";
import moment from "moment";
export default {
  components: {
    pagination
  },
  mixins: [commonMixin],
  data() {
    return {
      query: {
        StartDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        EndDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
      },
      total: 0,
      tableHeight: 0,
      data: [],
      pageLoadng: false,
    };
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener("resize", this.handelResize);
    if (this.deptCode) {
      this.setTableData();
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handelResize);
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
    handleSearch() {
      this.query.pageIndex = 1;
      this.setTableData();
    },
    // 获取列表
    setTableData() {
      this.pageLoadng = true;
      let data = {
        tradeCode: "getCurrentPatients",//服务名
        ...this.query
      };
       getProcedureData(data).then(res => {
          this.data = res.data.data.list;
          this.total = res.data.data.totalCount || 0;
          this.pageLoadng = false;
        },
        err => {
          this.pageLoadng = false;
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.bed-record {
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
</style>


<style lang="scss" scoped>
.bed-record {
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
      .search-el {
        width: 180px;
        display: inline-block;
      }
    }
  }

  .main-contain {
    position: absolute;
    top: 10px;
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
    td.rule-name {
      position: relative;
      .rule-name-content {
        position: absolute;
        line-height: 34px;
        left: 15px;
        right: 15px;
        top: 0;
        text-align: left;
        bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    td.align-left div {
      text-align: left;
    }
  }
}
</style>



