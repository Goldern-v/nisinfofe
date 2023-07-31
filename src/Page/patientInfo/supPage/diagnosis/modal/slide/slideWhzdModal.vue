<template>
  <div>
    <div class="no-do-bg" v-show="show" @click="close"></div>
    <transition name="el-zoom-in-left">
      <div v-show="show" class="whzdslide-con">
        <h1 class="title">护理诊断</h1>
        <div class="search-con">
          <el-input v-model="keyword" icon="search"></el-input>
          <el-select
            v-model="deptType"
            placeholder="请选择"
            size="small"
            autocomplete="off"
          >
            <el-option
              v-for="item in typeList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button class="modal-btn" type="primary" @click="search"
            >查询</el-button
          >
        </div>
        <div class="content" v-loading="searchLoading">
          <el-table :data="tablelist" style="width: 100%">
            <el-table-column prop="name" label="护理诊断" width="300">
            </el-table-column>
            <el-table-column label="操作" header-align="center">
              <template slot-scope="scope">
                <div class="btnList">
                  <div
                    class="btn"
                    @click="toEdit(scope.row)"
                    style="color: blue"
                  >
                    编辑
                  </div>
                  <div
                    class="btn"
                    @click="toDelete(scope.row)"
                    style="color: red"
                  >
                    删除
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-con">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pageIndex"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
        <div class="addBtn" @click="() => openSetting()">+新建</div>
      </div>
    </transition>
  </div>
</template>
<style lang='scss' scoped>
.no-do-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2001;
}
.whzdslide-con {
  width: 500px;
  height: 100%;
  padding: 50px 20px 100px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  z-index: 1000000;
  background: #f7fafa;
  z-index: 10002;
  .search-con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
    /deep/ .el-input {
      height: 30px;
      .el-input__inner {
        height: 30px;
      }
    }
    /deep/ .el-select {
      margin: 10px;
    }
    .modal-btn {
      height: 30px;
    }
  }
  .btnList {
    display: flex;
    align-items: center;
    .btn {
      cursor: pointer;
      &:first-of-type {
        margin: 0 20px;
      }
    }
  }
  .addBtn {
    cursor: pointer;
    background-color: #4bb08d;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    &:hover {
      background: rgb(111, 192, 164);
      border-color: rgb(111, 192, 164);
    }
  }
  .page-con {
    display: flex;
    text-align: left;
    margin: 18px 0 5px;
  }
}
</style>
<script>
import { deleteDiagnosis, measure, nursingDiagsSearch } from "../../api/index";
import bus from "vue-happy-bus";

export default {
  inject: ["openWHSettingModal"],
  props: {},
  data() {
    return {
      show: false,
      deptType: "公共",
      bus: bus(this),
      keyword: "",
      pageSize: 13,
      list: [],
      pageIndex: 1,
      totalCount: 0,
      typeList: [
        {
          label: "公共",
          value: "公共",
        },
        {
          label: "科室",
          value: "科室",
        },
      ],
      searchLoading: false,
    };
  },
  created(){
    this.bus.$on(`refresh`,()=>{
      this.search()
    })
  },
  methods: {
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.search();
    },
    search() {
      this.searchLoading = true;
      nursingDiagsSearch(
        this.$route.query.patientId,
        this.$route.query.visitId,
        this.keyword,
        this.pageIndex,
        this.pageSize,
        this.wardCode
      ).then((res) => {
        this.searchLoading = false;
        this.totalCount = res.data.data.totalCount;
        this.list = res.data.data.list;
      });
    },
    openSetting(config) {
      this.openWHSettingModal(config);
    },
    toDelete(row) {
      this.$confirm("删除后数据无法修复，确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //删除接口
        deleteDiagnosis({ code: row.code })
          .then((res) => {
            this.search()
            this.$emit("refresh");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch((err) => {
            this.close();
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          });
      });
    },
    toEdit(row) {
      measure(row.code).then((res) => {
        if (res.data.code == "200") {
          let { factorList, measures, targetList } = res.data.data;
          let config = {
            factorList,
            measures,
            targetList,
            diagnosis: row,
          };
          this.openSetting(config);
        }
      });
    },
    open() {
      this.search();
      this.show = true;
    },
    close() {
      this.keyword = "";
      this.deptType = "公共";
      this.pageIndex = 1;
      this.show = false;
    },
  },
  watch: {},
  computed: {
    wardCode() {
      let code = localStorage.getItem("wardCode");
      return code;
    },
    tablelist() {
      let isdeptList = this.list.filter((li) => li.deptType === this.deptType);
      return isdeptList
    },
  },
  components: {},
};
</script>