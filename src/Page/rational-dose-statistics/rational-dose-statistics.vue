<template>
  <div class="rational-dose-statistics">
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
          placeholder="请输入护士姓名关键字"
          v-model="query.empName"
        ></el-input>
        <el-input
          size="small"
          style="width: 200px;margin-right: 15px;"
          placeholder="请输入床号关键字"
          v-model="query.bedLabel"
        ></el-input>
        <el-button @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <div class="main-contain">
      <div class="table-contain">
        <dTable :tableData="data" :pageLoadng="pageLoadng"></dTable>
      </div>
      <div class="printable"  ref="printable">
        <div class="header-con">
          <h2>工作量统计表</h2>
           <div class="filterItem date">
            <span class="type-label">日期:</span>
            <span>{{query.startDate}}<span style="vertical-align: middle;">~</span>{{query.endDate}}</span>
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
import dTable from './components/d-table'
export default {
  components: {
    dTable
  },
  mixins: [commonMixin],
  data() {
    return {
      query: {
        wardCode:"",
        startDate: "",
        endDate: "",
        patientName:"",
        bedLabel: "",
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
            let data = res.data.data;
            data['rational'] = data['rational'] ? `${(data['rational'] / data['allNum'] * 100).toFixed()}%` : `${data['rational']}%`;
            data['noRational'] = data['noRational'] ? `${(data['noRational'] / data['allNum'] * 100).toFixed()}%` : `${data['noRational']}%`;
            this.data = [data];
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
<style lang="scss" scoped>
.rational-dose-statistics {
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
