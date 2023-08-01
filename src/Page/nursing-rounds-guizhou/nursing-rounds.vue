<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <span class="label" style="margin-left: 0">巡视日期:</span>
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择巡视日期"
          size="small"
          v-model="startDate"
          style="width:150px"
        ></el-date-picker>
        <span class="label">护理等级:</span>
        <el-select v-model="query.nursingClass" placeholder="请选择" size="small" style="width:150px">
          <el-option
            :label="nursingClass.name"
            :value="nursingClass.code"
            v-for="nursingClass in allNursingClass"
            :key="nursingClass.code"
          ></el-option>
        </el-select>
        <div style="flex: 1"></div>
        <el-button
          size="small"
          v-if="isAdminOrNursingDepartment"
          @click="openViewModal"
          style="margin-right: 15px;display:none;"
        >权限分配</el-button>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入床号进行搜索"
          v-model="query.bedLabel"
        ></el-input>
        <el-button size="small" type="primary" @click="search">查询</el-button>
      </div>
      <dTable :tableData="tableData" :pageLoadng="pageLoadng" :getData="onLoad"></dTable>
      <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="query.pageIndex"
          :size="query.pageSize"
          :total="total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>
    </div>
    <authorityModal ref="authorityModal"></authorityModal>
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
import { getNursingVisitLc } from "./api/index";
import { multiDictInfo } from "@/api/common";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import authorityModal from "./components/modal/authorityModal";

export default {
  mixins: [common],
  data() {
    return {
      tableData: [],
      pageLoadng: false,
      startDate: moment().format("YYYY-MM-DD"),
      query: {
        deptCode: "",
        operateDate: "", //操作日期
        nursingClass: "", //护理等级
        bedLabel: "",
        pageIndex: 1,
        pageSize: 20
      },
      total: 0,
      allNursingClass: []
    };
  },
  methods: {
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.query.pageIndex = newPage;
      this.onLoad();
    },
    onLoad() {
      if (!this.deptCode) return;
      this.pageLoadng = true;
      this.query.deptCode = this.deptCode;
      (this.query.operateDate = moment(this.startDate).format("YYYY-MM-DD")), //操作日期
        getNursingVisitLc(this.query).then(res => {
          this.tableData = res.data.data.list.map((item, index, array) => {
            let prevRowId = array[index - 1] && array[index - 1].patientId;
            let nextRowId = array[index + 1] && array[index + 1].patientId;
            let currentRowId = array[index] && array[index].patientId;
            /** 判断是此记录是多条记录 */
            if (currentRowId == prevRowId || currentRowId == nextRowId) {
              if (currentRowId != prevRowId) {
                /** 第一条 */
                item.rowType = 1;
              } else {
                /** 最后条 */
                item.rowType = 2;
              }
            }
            return item;
          });
          this.total = res.data.data.totalCount || this.total;
          this.pageLoadng = false;
        });
    },
    search() {
      this.query.pageIndex = 1;
      this.onLoad();
    },
    getNursingClass() {
      let list = ["nurse_nursing_class"];
      multiDictInfo(list).then(res => {
        this.allNursingClass = res.data.data.nurse_nursing_class;
        this.allNursingClass.unshift({ code: '', name: '全部' });
      });
    },
    openViewModal() {
      this.$refs.authorityModal.open(this.deptCode);
    }
  },
  created() {
    if(this.$route.path !== '/nursingMakeItem'){
      this.onLoad();
    }
    this.getNursingClass();
  },
  computed:{
    makePatient(){
      return this.$store.state.sheet.makePatient
    }
  },
  watch: {
    deptCode() {
      this.search();
    },
    startDate() {
      this.search();
    },
    "query.nursingClass"() {
      this.search();
    },
    // 当前被选择的患者并且路由在子级时，发起请求过滤，这里也可以考虑直接前端过滤。
    makePatient(newValue){
      if( newValue && this.$route.path === '/nursingMakeItem' ){
        this.query.bedLabel = newValue;
        this.onLoad();
      }
    },

  },
  components: {
    dTable,
    pagination,
    authorityModal
  }
};
</script>
