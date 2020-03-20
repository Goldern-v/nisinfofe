<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <span class="label" style="margin-left: 0">执行日期:</span>
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择入院起始时间"
          size="small"
          v-model="startDate"
          style="width:150px"
        ></el-date-picker>
        <span class="label">长/临:</span>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="repeatIndicator">
            <el-radio class="radio" label>全部</el-radio>
            <el-radio class="radio" label="1">长期</el-radio>
            <el-radio class="radio" label="0">临时</el-radio>
          </el-radio-group>
        </el-row>
        <span class="label">状态:</span>
        <el-row class="select-btn-list" type="flex" align="middle">
          <el-radio-group v-model="status">
            <el-radio class="radio" label>全部</el-radio>
            <el-radio class="radio" label="已执行">已执行</el-radio>
            <el-radio class="radio" label="执行中">执行中</el-radio>
            <el-radio class="radio" label="未执行">未执行</el-radio>
          </el-radio-group>
        </el-row>
        <span class="label">类型:</span>
        <el-select
          v-model="type"
          placeholder="请选择"
          size="small"
          style="width:150px"
        >
          <el-option label="全部" value></el-option>
          <el-option label="输液" value="输液"></el-option>
          <el-option label="注射" value="注射"></el-option>
          <el-option label="口服" value="口服"></el-option>
          <el-option label="雾化" value="雾化"></el-option>
          <el-option label="皮试" value="皮试"></el-option>
          <el-option label="治疗" value="治疗"></el-option>
          <el-option label="理疗" value="理疗"></el-option>
          <el-option label="护理" value="护理"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
        <div style="flex: 1"></div>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入床号进行搜索"
          v-model="bedLabel"
        ></el-input>
        <el-button size="small" type="primary" @click="search">查询</el-button>
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
import { getExecuteWithWardcode } from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
export default {
  mixins: [common],
  data() {
    return {
      pageInput: "",
      tableData: [],
      pageLoadng: false,
      page: {
        pageIndex: 1,
        pageNum: 20,
        total: 0
      },
      startDate: moment().format("YYYY-MM-DD"),
      repeatIndicator: "",
      type: "",
      status: "",
      bedLabel: ""
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.page.pageNum = newSize;
    },
    handleCurrentChange(newPage) {
      this.page.pageIndex = newPage;
      this.onLoad();
    },

    onLoad() {
      if (!this.deptCode) return;
      this.pageLoadng = true;
      let obj = {
        wardCode: this.deptCode,
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.startDate).format("YYYY-MM-DD"),
        repeatIndicator: this.repeatIndicator,
        type: this.type,
        status: this.status,
        bedLabel: this.bedLabel,
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageNum
      };
      getExecuteWithWardcode(obj).then(res => {
        this.tableData = res.data.data.list.map((item, index, array) => {
          let prevRowId =
            array[index - 1] &&
            array[index - 1].orderNo +
              array[index - 1].patientId +
              array[index - 1].visitId +
              array[index - 1].executeDateTime;
          let nextRowId =
            array[index + 1] &&
            array[index + 1].orderNo +
              array[index + 1].patientId +
              array[index + 1].visitId +
              array[index + 1].executeDateTime;

          let currentRowId =
            array[index] &&
            array[index].orderNo +
              array[index].patientId +
              array[index].visitId +
              array[index].executeDateTime;

          /** 判断是此记录是多条记录 */
          if (currentRowId == prevRowId || currentRowId == nextRowId) {
            if (currentRowId != prevRowId) {
              /** 第一条 */
              item.rowType = 1;
            } else if (currentRowId != nextRowId) {
              /** 最后条 */
              item.rowType = 3;
            } else {
              /** 中间条 */
              item.rowType = 2;
            }
          }
          return item;
        });
        this.page.total = Number(res.data.data.pageCount);
        this.pageLoadng = false;
      });
    },
    search() {
      this.page.pageIndex = 1;
      this.onLoad();
    }
  },
  created() {
    this.onLoad();
  },
  watch: {
    deptCode() {
      this.search();
    },
    startDate() {
      this.search();
    },
    repeatIndicator() {
      this.search();
    },
    type() {
      this.search();
    },
    status() {
      this.search();
    }
  },
  components: {
    dTable,
    pagination
  }
};
</script>
