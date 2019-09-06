<template>
  <div class="nursing-rules">
    <div class="search-topbar">
      <!-- <span class="title">护理制度</span> -->
      <div class="float-left">
        <h3>产科宣教视频设置</h3>
      </div>
      <div class="float-right">
        <el-button>添加</el-button>
        <el-button>保存</el-button>
        <el-button>返回</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <el-table :data="data" :height="tableHeight" border v-loading="pageLoadng" stripe>
          <el-table-column prop="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="checkDate" label="视频名称" align="center"></el-table-column>
          <el-table-column prop="wardName" label="上传者" width="120" align="center"></el-table-column>
          <el-table-column prop="inspectorName" label="上传时间" width="150" align="center"></el-table-column>
          <el-table-column prop="responsibleEmpName" label="加入播放列表" width="150" align="center">
            <template slot-scope="scope">
              <input type="checkbox" v-model="scope.row" />
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <span class="operation-text" @click="previewFile(scope.row)">预览</span>
              <span class="operation-text" @click="previewFile(scope.row)">删除</span>
              <span class="operation-text" @click="previewFile(scope.row)">修改</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <sweet-modal ref="preview-modal" class="nursing-rules-preview-modal" :title="preview.title">
      <div class="modal-content">111</div>
    </sweet-modal>
  </div>
</template>

<script>
import commonMixin from "./../../common/mixin/common.mixin";
import { getList, getTypeByDeptCode } from "./api/index-xin";
import dayjs from "dayjs";
export default {
  mixins: [commonMixin],
  data() {
    return {
      query: {
        typeId: "", //类型id
        deptCode: "", //科室代码
        status: "", //状态1:提交未审核，2：已审核
        checkDateStart: "", //检查日期开始日期（yyyy-MM-dd）
        checkDateEnd: "", //检查日期结束日期（yyyy-MM-dd
        pageIndex: 1, //页码
        pageSize: 20, //每页条数
        pageSize: 20
      },
      typeList: [], //类型
      statusList: [{ id: 1, name: "待审核" }, { id: 2, name: "已审核" }],
      tableHeight: 0,
      total: 0, //总条数
      data: [],
      preview: {},
      pageLoadng: true,
      isSelectedType: "", //选择类型
      isSelectedStatus: "" //选择状态
    };
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener("resize", this.handelResize);

    if (this.deptCode) {
      this.setTableData();
      this.getTypeByDeptCode();
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
        this.getTypeByDeptCode();
        this.setTableData();
      }
    }
  },
  methods: {
    // 获取类型
    getTypeByDeptCode() {
      getTypeByDeptCode({ deptCode: this.deptCode }).then(res => {
        if (res.data.data instanceof Array) this.typeList = res.data.data;
      });
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
      getList(this.query).then(
        res => {
          if (res.data && res.data.code == 200) {
            this.total = res.data.data.totalCount || 0;
            this.data = res.data.data.list;
          }
          this.pageLoadng = false;
        },
        err => {
          this.pageLoadng = false;
        }
      );
    },
    // 选择类型
    handleFileTypeChange(id) {
      if (!isNaN(Number(id))) {
        this.query.typeId = id;
        for (let i = 0; i < this.typeList.length; i++) {
          if (this.typeList[i].id == id) {
            this.isSelectedType = this.typeList[i].manageType;
            return;
          }
        }
      }
    },
    // 选择状态
    selectedStatus(id) {
      if (!isNaN(Number(id))) {
        this.query.status = id;
        for (let i = 0; i < this.statusList.length; i++) {
          if (this.statusList[i].id == id) {
            this.isSelectedStatus = this.statusList[i].name;
            return;
          }
        }
      }
    },
    // 设置默认日期
    getDate() {
      if (!this.query.checkDateStart) {
        let month = parseInt(new Date().getMonth()) + 1;
        if (month < 10) {
          this.query.checkDateStart =
            new Date().getFullYear() + "-0" + month + "-01";
        } else {
          this.query.checkDateStart =
            new Date().getFullYear() + "-" + month + "-01";
        }
      }
      this.query.checkDateEnd = this.query.checkDateEnd
        ? this.query.checkDateEnd
        : dayjs(new Date()).format("YYYY-MM-DD");
      this.query.checkDateStart = dayjs(this.query.checkDateStart).format(
        "YYYY-MM-DD"
      );
      this.query.checkDateEnd = dayjs(this.query.checkDateEnd).format(
        "YYYY-MM-DD"
      );
    }
  }
};
</script>
<style lang="scss">
.nursing-rules {
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
      .search-el {
        input {
          height: 31px;
        }
      }
      .el-button {
        width: 100px;
        margin-left: 1px;
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
.nursing-rules-preview-modal {
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
.nursing-rules {
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
