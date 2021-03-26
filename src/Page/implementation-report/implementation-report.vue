<template>
  <div>
    <div class="main-contain">
      <div class="head-con">
        <span class="type-label">日期:</span>
        <span class="type-content">
          <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" @change="handleDateChange" v-model="query.startDateTimeStart" :clearable="false" style="width:180px;" />
          <span> - </span>
          <el-date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" @change="handleDateChange" v-model="query.startDateTimeEnd" :clearable="false" style="width:180px;" />
        </span>
        <span class="label">状态:</span>
        <el-select v-model="query.status" placeholder="请选择" size="small" style="width:150px">
          <el-option label="全部" value=""></el-option>
          <el-option label="未审核" value="0"></el-option>
          <el-option label="已审核" value="1"></el-option>
        </el-select>
        <div style="flex: 1"></div>
        <el-input
          size="small"
          style="width: 150px;margin-right: 15px;"
          placeholder="输入床号、住院号搜索"
          v-model="query.inpNo"
        ></el-input>
        <el-button size="small" @click="search">查询</el-button>
        <el-button size="small" type="primary" @click="showAuditModal">审核</el-button>
      </div>
      <dTable :tableData="tableData" :pageLoadng="pageLoadng" ref="dTable"></dTable>
      <div class="pagination-con" flex="main:justify cross:center">
        <pagination
          :pageIndex="query.pageIndex"
          :size="query.pageSize"
          :total="total"
          @sizeChange="handleSizeChange"
          @currentChange="handleCurrentChange"
        ></pagination>
      </div>
      <sweet-modal ref="modal" title="审核" :modalWidth="400">
        <div class="remark">
          <el-input v-model="remark" placeholder="请输入备注" style="width:300px; margin:0 20px;" size="small"></el-input>
        </div>
        <div slot="button">
          <el-button class="modal-btn" type="primary" @click="audit">审核</el-button>
          <el-button class="modal-btn" @click="close">取消</el-button>
        </div>
      </sweet-modal>
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
import { getExecuteList,auditExecuteList } from "./api/index";
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";

export default {
  mixins: [common],
  data() {
    // 设置起止时间
    let nowDate = new Date();
    let nowtDay = nowDate.getDay();
    let nowTime = nowDate.getTime();
    let reduceDay = 0;
    let addDay = 0;
    if (nowtDay == 0) {
      reduceDay = 6;
      addDay = 0;
    } else {
      reduceDay = nowtDay - 1;
      addDay = 7 - nowtDay;
    }
    let startDateTimeStart =
      moment(new Date(nowTime - reduceDay * 86400000)).format("YYYY-MM-DD HH:mm:ss");
    let startDateTimeEnd =
      moment(new Date(nowTime + addDay * 86400000)).format("YYYY-MM-DD HH:mm:ss");
    return {
      tableData: [],
      pageLoadng: false,
      query: {
        inpNo:"",
        pageIndex: 1,
        pageSize: 20,
        startDateTimeStart,
        startDateTimeEnd,
        status:"",//审核状态，0-未审核  1-已审核
        wardCode: '',
      },
      total: 0,
      remark: ''
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
      this.query.startDateTimeStart =  this.query.startDateTimeStart ? moment(this.query.startDateTimeStart).format("YYYY-MM-DD HH:mm:ss") : '';
      this.query.startDateTimeEnd =  this.query.startDateTimeEnd ? moment(this.query.startDateTimeEnd).format("YYYY-MM-DD HH:mm:ss") : '';
      this.query.wardCode = this.deptCode;
      getExecuteList(this.query).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.pageLoadng = false;
      });
    },
    search() {
      this.query.pageIndex = 1;
      this.onLoad();
    },
    handleDateChange() {
      this.query.pageIndex = 1;
      this.onLoad();
    },
    showAuditModal(){
      this.$refs.modal.open()
    },
    close(){
      this.$refs.modal.close()
    },
    audit(){
      let nurseExecuteReviews = [];
      if(this.$refs.dTable.multipleSelection){
        this.$refs.dTable.multipleSelection.map(item => {
          nurseExecuteReviews.push(
            {
              barcode:item.barcode,
              itemNo:item.itemNo,
              status:1,
              remark:this.remark,
              reviewerName:this.empName,
              reviewerNo:this.empNo
            }
          )
        })
      }
      if(nurseExecuteReviews && nurseExecuteReviews.length <= 0){
        return this.$message({
          message: "请勾选病人",
          type: "warning"
        });
      }
      auditExecuteList({ nurseExecuteReviews }).then(res =>{
        this.$message({
          message: "审核成功",
          type: "success"
        });
        this.close();
        this.onLoad();
      })
    },
  },
  created() {
    this.onLoad();
  },
  watch: {
    deptCode() {
      this.search();
    }
  },
  components: {
    dTable,
    pagination
  }
};
</script>
