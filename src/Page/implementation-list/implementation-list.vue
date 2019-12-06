<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <span class="label" style="margin-left: 0">执行日期:</span>
        <el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择入院起始时间" size="small"></el-date-picker>
        <span class="label">长/临:</span>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="radio">
            <el-radio class="radio" label="全部">全部</el-radio>
            <el-radio class="radio" label="全部">长期</el-radio>
            <el-radio class="radio" label="全部">临时</el-radio>
          </el-radio-group>
        </el-row>
        <span class="label">状态:</span>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="radio">
            <el-radio class="radio" label="全部">全部</el-radio>
            <el-radio class="radio" label="全部">已执行</el-radio>
            <el-radio class="radio" label="新开">执行中</el-radio>
            <el-radio class="radio" label="提交">未执行</el-radio>
          </el-radio-group>
        </el-row>
        <span class="label">类型:</span>
        <el-select v-model="value" placeholder="请选择" size="small">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="输液" value="全部"></el-option>
          <el-option label="注射" value="全部"></el-option>
          <el-option label="口服" value="全部"></el-option>
          <el-option label="雾化" value="全部"></el-option>
          <el-option label="皮试" value="全部"></el-option>
          <el-option label="治疗" value="全部"></el-option>
          <el-option label="理疗" value="全部"></el-option>
          <el-option label="护理" value="全部"></el-option>
          <el-option label="其他" value="全部"></el-option>
        </el-select>
        <div style="flex: 1"></div>
        <el-input size="small" style="width: 150px;margin-right: 15px;" placeholder="输入床号进行搜索"></el-input>
        <el-button size="small" type="primary">查询</el-button>
      </div>
      <dTable :tableData="tableData" :pageLoadng="pageLoadng"></dTable>
      <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="page.pageIndex"
          :size="page.pageNum"
          :total="page.total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.main-contain {
  margin: 10px 10px 0px 10px;

  .pagination-con {
    height: 41px;
    position: relative;

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
import pagination from "./components/common/pagination";
import { patEmrList } from "@/api/document";
export default {
  data() {
    return {
      pageInput: "",
      tableData: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      }
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.getData();
    },
    getData() {
      let obj = {};

      obj.pageIndex = this.page.pageIndex;
      obj.pageNum = this.page.pageNum;
      this.pageLoadng = true;
      patEmrList(obj).then(res => {
        this.tableData = res.data.data.list;
        this.page.total = res.data.data.page
          ? parseInt(res.data.data.page) * this.page.pageNum
          : 0;
        this.pageLoadng = false;
      });
    }
  },
  components: {
    dTable,
    pagination
  }
};
</script>
