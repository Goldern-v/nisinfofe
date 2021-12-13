<template>
  <div class="infuse-stat">
    <div class="search-topbar">
      <div class="float-left">
        <el-button @click="goBack">返回</el-button>
      </div>
      <div class="float-right">
        <span class="filterItem date">
          <span class="type-label">统计时间:</span>
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
        <span class="type-content">
          <span class="type-label">科室:</span>
          <span class="type-content">
            <el-select
                v-model="deptValue"
                filterable
                remote
                placeholder="请选择"
                size="small"
                class="dept-select"
                :remote-method="remoteMethod"
                @change="changeDept(deptValue)"
            >
              <el-option
                  v-for="item in deptOptionList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
              ></el-option>
            </el-select>
          </span>
        </span>
        <el-button @click="handleSearch">查询</el-button>
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
        >
          <el-table-column prop="index" label="序号" min-width="50px" align="center">
            <template slot-scope="scope">
              <span>{{(query.pageIndex-1)*query.pageSize+scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="wardName" label="科室" min-width="200px" align="center"></el-table-column>
          <el-table-column prop="infusionNow" label="总输液袋数" min-width="300px" align="center"></el-table-column>
          <el-table-column prop="infusionTotal" label="总输液量" min-width="300px" align="center"></el-table-column>
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
import { pdaGetSYStatusCountWithWardcodeAndTimeApi } from "@/api/infuse";
import dayjs from "dayjs";
import {nursingUnit} from "@/api/lesion";
export default {
  components: {
    pagination
  },
  mixins: [commonMixin],
  data() {
    return {
      query: {
        typeId: "", //类型id
        deptCode: "", //科室代码
        status: "", //状态1:提交未审核，2：已审核
        startDate: "", //检查日期开始日期（yyyy-MM-dd）
        endDate: "", //检查日期结束日期（yyyy-MM-dd
        pageIndex: 1, //页码
        pageSize: 20, //每页条数
        pageSize: 20
      },
      tableHeight: 0,
      total: 0, //总条数
      data: [],
      pageLoadng: false,
      deptValue: "",
      deptList: [],
      deptOptionList: [],
      currentDeptName: ''
    };
  },
  mounted() {
    this.handelResize = this.handelResize.bind(this);
    this.handelResize();
    window.addEventListener("resize", this.handelResize);

    if (this.deptCode) {
      this.setTableData();
    }

    // 设置默认日期
    this.getDate();

    nursingUnit().then(res => {
      this.deptList = res.data.data.deptList;
      this.deptList = this.deptList.map(dept => {
        dept["pinyin"] = dept.name.getPinyin() || "";
        return dept;
      });
      this.deptOptionList = JSON.parse(JSON.stringify(this.deptList));
      this.deptValue =
          localStorage.selectDeptValue ||
          this.$store.state.lesion.deptCode ||
          res.data.data.defaultDept ||
          res.data.data.deptList[0].code;
    });
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
    goBack() {
      this.$router.go(-1);
    },
    remoteMethod(query) {
      if (query !== "") {
        let upperCaseQuery = query.toUpperCase();
        this.deptOptionList = this.deptList.filter(item => {
          return (
              item.name.includes(query) ||
              item.code == query ||
              item.pinyin.indexOf(upperCaseQuery) != -1 ||
              (item.pinyin + "").includes(upperCaseQuery)
          );
        });
      }
      if (!query || this.deptOptionList.length == 0 || this.currentDeptName == query) {
        this.deptOptionList = JSON.parse(JSON.stringify(this.deptList));
      }
    },
    changeDept(value) {
      let deptName = this.deptList.filter(item => {
        return (
            item.code == value ||
            item.pinyin.indexOf(value.toUpperCase()) != -1 ||
            (item.pinyin + "").includes(value.toUpperCase())
        );
      })[0].name;

      this.currentDeptName = deptName;
      // try {
      //   this.mewsId && WebSocketService.unsubscribe(this.mewsId);
      // } catch (error) {}
      // this.subscribe();
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
    setTableData() {
        this.pageLoadng = true;
        this.query.deptCode = this.deptCode;
        this.getDate();
        this.query.wardCode = this.query.deptCode
        pdaGetSYStatusCountWithWardcodeAndTimeApi(this.query).then(
          res => {
            if (res.data && res.data.code == 200) {
              console.log(this.query.wardCode);
              let {infusionNow,infusionTotal} = res.data.data.excuteToday
              let obj = this.$store.state.lesion.deptList.find((item)=>{
                return item.code == this.query.wardCode
                })
                console.log(JSON.stringify(obj));
              let  wardName = obj.name
              // let wardNode = this.deptOptionList.find((item)=>{return item.code==this.query.wardCode}).name
              this.data = [{index:0,wardName,infusionNow,infusionTotal}]
              // this.total = res.data.data.totalCount || 0;
              // this.data = res.data.data.list;
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
          this.query.startDate =
            new Date().getFullYear() + "-" + month + "-01";
        }
      }
      this.query.endDate = this.query.endDate
        ? this.query.endDate
        : dayjs(new Date()).format("YYYY-MM-DD");
      this.query.startDate = dayjs(this.query.startDate).format(
        "YYYY-MM-DD"
      );
      this.query.endDate = dayjs(this.query.endDate).format(
        "YYYY-MM-DD"
      );
    }
  }
};
</script>
<style lang="scss">
.infuse-stat {
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
.infuse-stat-preview-modal {
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
.infuse-stat {
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
