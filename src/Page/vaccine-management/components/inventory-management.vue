<template>
  <div class="inventory-management">
    <div class="search-topbar">
      <div class="float-left">
        <span class="filterItem date">
          <span class="type-label">入库日期：</span>
          <ElDatePicker
            class="date-picker"
            type="datetime"
            size="small"
            format="yyyy-MM-dd HH:mm"
            placeholder="开始日期"
            v-model="query.startTime"
            clearable
          />
          <span>-</span>
          <ElDatePicker
            class="date-picker"
            type="datetime"
            size="small"
            format="yyyy-MM-dd HH:mm"
            placeholder="结束日期"
            v-model="query.endTime"
            clearable
          />
        </span>
        <span class="type-content">
          <span class="type-label">疫苗：</span>
          <span class="type-content">
            <el-select
              v-model="query.vaccineName"
              size="small"
              placeholder="全部"
              @change="selectedVaccineName"
            >
              <el-option value>全部</el-option>
              <el-option :key="item.id" v-for="item in allVaccine" :value="item.name">{{item.name}}</el-option>
            </el-select>
          </span>
          <span class="type-label">状态:</span>
          <el-select
            v-model="isSelectedStatus"
            size="small"
            placeholder="全部"
            @change="selectedStatus"
          >
            <el-option value>全部</el-option>
            <el-option :key="item.id" v-for="item in statusList" :value="item.id">{{item.name}}</el-option>
          </el-select>
        </span>
      </div>
      <div class="float-right">
        <span class="type-label">批号：</span>
        <el-input v-model="query.batchNumber" @keyup.enter.native="handleSearch"></el-input>
        <el-button @click="handleSearch">查询</el-button>
        <el-button @click="addVaccine" class="addVaccine">添加</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <el-table :data="data" :height="wih-172" border v-loading="pageLoadng" stripe>
          <el-table-column prop="index" label="序号" width="50" align="center">
            <template slot-scope="scope">
              <span>{{(query.pageIndex-1)*query.pageSize+scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="entryTime" label="入库时间" width="160" align="center"></el-table-column>
          <el-table-column prop="vaccineName" label="疫苗" width="100" align="center"></el-table-column>
          <el-table-column prop="vaccineSupplier" label="厂家" align="center"></el-table-column>
          <el-table-column prop="batchNumber" label="批号" width="130" align="center"></el-table-column>
          <el-table-column prop="numberOfEntries" label="入库数量" width="100" align="center"></el-table-column>
          <el-table-column prop="currentStock" label="当前库存" width="100" align="center">
            <template slot-scope="scope">
              <span
                :class="{markcolor1:scope.row.currentStock>0,markcolor2:scope.row.currentStock==0,}"
              >{{scope.row.currentStock}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="entryOperaterName" label="入库操作员" width="100" align="center"></el-table-column>

          <el-table-column prop="status" label="状态" width="100" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">有效</span>
              <span v-if="scope.row.status == 0">无效</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="130" align="center">
            <template slot-scope="scope">
              <span class="operation-text" @click="editVaccine(scope.row)">修改</span>
              <span class="operation-text" @click="delVaccine(scope.row.id)">删除</span>
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
    <vaccineModal
      :title="title"
      :saveVaccine="saveVaccine"
      :updateVaccine="updateVaccine"
      ref="vaccineModal"
    ></vaccineModal>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import pagination from "./pagination";
import {
  getPageList,
  saveVaccine,
  updateVaccine,
  deleteVaccine
} from "../api/api";
import dayjs from "dayjs";
import vaccineModal from "./vaccine-modal";
export default {
  components: {
    pagination,
    vaccineModal
  },
  mixins: [common],
  data() {
    return {
      query: {
        startTime: "", //检查日期开始日期格式为（格式为yyyy-MM-dd HH:mm:ss）
        endTime: "", //检查日期结束日期（格式为yyyy-MM-dd HH:mm:ss）
        vaccineName: "", //疫苗名称
        batchNumber: "", //批号
        status: "", //状态（1有效；0无效）
        pageIndex: 1, //页码
        pageSize: 20 //每页条数
      },
      allVaccine: [{ id: 1, name: "卡介苗" }, { id: 2, name: "乙肝疫苗" }], //全部疫苗
      statusList: [{ id: 1, name: "有效" }, { id: 0, name: "无效" }],
      total: 0, //总条数
      data: [],
      pageLoadng: true,
      isSelectedType: "", //选择类型
      isSelectedStatus: "", //选择状态
      title: ""
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

      this.getPageList();
    },
    getPageList() {
      this.getDate();
      getPageList(this.query).then(
        res => {
          if (res.data && res.data.code == 200) {
            this.total = res.data.data.totalCount || 0;
            let list = res.data.data.list;
            list.map(item => {
              if (item.entryTime) {
                item.entryTime = dayjs(item.entryTime).format(
                  "YYYY-MM-DD HH:mm"
                );
              }
            });
            this.data = list;
          }
          this.pageLoadng = false;
        },
        err => {
          this.pageLoadng = false;
        }
      );
    },
    // 选择疫苗
    selectedVaccineName(name) {
      this.query.vaccineName = name;
    },
    // 选择状态
    selectedStatus(id) {
      if (!isNaN(Number(id))) {
        this.query.status = id;
        if (id !== "") {
          for (let i = 0; i < this.statusList.length; i++) {
            if (this.statusList[i].id == id) {
              this.isSelectedStatus = this.statusList[i].name;
              return;
            }
          }
        }
      }
    },
    // 设置默认日期
    getDate() {
      if (!this.query.startTime) {
        let month = parseInt(new Date().getMonth()) + 1;
        if (month < 10) {
          this.query.startTime =
            new Date().getFullYear() + "-0" + month + "-01";
        } else {
          this.query.startTime = new Date().getFullYear() + "-" + month + "-01";
        }
      }
      this.query.endTime = this.query.endTime
        ? this.query.endTime
        : dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
      this.query.startTime = dayjs(this.query.startTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.query.endTime = dayjs(this.query.endTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    // 添加疫苗
    addVaccine() {
      this.title = "添加疫苗";
      this.$refs.vaccineModal.open();
    },
    saveVaccine(data) {
      saveVaccine(data).then(
        res => {
          this.$message.success("添加成功");

          this.$refs.vaccineModal.close();

          this.getPageList();
        },
        err => {}
      );
    },
    updateVaccine(data) {
      updateVaccine(data).then(
        res => {
          this.$message.success("修改成功");

          this.$refs.vaccineModal.close();

          this.getPageList();
        },
        err => {}
      );
    },
    // 修改疫苗
    editVaccine(item) {
      this.title = "修改疫苗";
      this.$refs.vaccineModal.open(item);
    },
    // 删除疫苗
    delVaccine(id) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteVaccine(id).then(
          res => {
            this.$message.success("删除成功");
            this.getPageList();
          },
          err => {}
        );
      });
    }
  }
};
</script>
<style lang="scss">
.inventory-management {
  .search-topbar {
    .float-left {
      float: left;
    }
    .float-right {
      float: right;
      .el-input {
        width: 110px;
      }
      input {
        width: 110px;
        height: 31px;
        border-radius: 4px;
      }
      button {
        font-size: 12px;

        width: 60px;
        height: 30px;
        border-radius: 4px;
      }
      .addBtn {
        color: #fff;
        background-color: #4bb08d;
      }
    }
    > span {
      display: inline-block;
      vertical-align: top;
    }
    .type-label {
      font-size: 12px;
      color: #333;
      vertical-align: middle;
    }
    .type-content {
      margin-right: 15px;
      input {
        width: 110px;
        height: 31px;
        border-radius: 4px;
      }
    }
    .date {
      margin-right: 15px;
    }
  }
  .main-contain {
    padding: 16px 14px 56px 14px;
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
.inventory-management {
  position: relative;
  width: 100%;
  .search-topbar {
    height: 41px;
    border-bottom: 1px solid #cbd5dd;
    overflow: hidden;
    padding: 5px 14px 5px 20px;
    background: linear-gradient(
      180deg,
      rgba(248, 248, 250, 1) 0%,
      rgba(235, 236, 240, 1) 100%
    );
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .title {
      font-size: 20px;
      display: inline-block;
      margin-left: 30px;
      margin-top: 20px;
    }
  }

  .main-contain {
    position: relative;
    .pagination {
      position: absolute;
      bottom: 16px;
      left: 14px;
      right: 14px;
      background: linear-gradient(
        180deg,
        rgba(242, 242, 242, 1) 0%,
        rgba(235, 235, 235, 1) 100%
      );
      border: 1px solid #cbd5dd;
      padding: 4px 15px;
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
  .el-date-editor.el-input {
    width: 154px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    input {
      height: 30px;
      border-radius: 4px;
      border: 1px solid rgba(194, 203, 210, 1);
      vertical-align: middle;
    }
  }
  .markcolor1 {
    color: #00f;
  }
  .markcolor2 {
    color: red;
  }
}
</style>