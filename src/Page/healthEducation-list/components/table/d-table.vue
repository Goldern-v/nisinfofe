<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="wih - 165"
      v-loading="pageLoadng"
    >
      <el-table-column label="序号" min-width="50px" type="index"></el-table-column>
      <el-table-column prop="name" label="患者姓名" min-width="50px" align="center"></el-table-column>
      <el-table-column prop="patientId" label="患者Id" min-width="50px" align="center"></el-table-column>
      <el-table-column prop="visitId" label="就诊次数" width="66px" align="center"></el-table-column>
      <el-table-column prop="wardName" label="护理单元" align="center" width="300px"></el-table-column>
      <el-table-column prop="creatorName" label="创建人" min-width="50px" align="center"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" min-width="60px" align="center">
        <template slot-scope="{row}">
          <span
            :class="['isWrite',{'noWrite': row.status == '0'}]"
          >{{ row.status === '0' ? "未填写" : "已填写" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="evalScore" label="总分" min-width="50px" align="center"></el-table-column>
      <el-table-column label="操作" min-width="50px" align="center">
        <template slot-scope="scope">
          <span class="btn-text" @click="openViewModal(scope.row.formId)">查看</span>
        </template>
      </el-table-column>
    </el-table>
    <viewHealthEducationModal ref="viewHealthEducationModal"></viewHealthEducationModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.d-table {
  border: 1px solid #cbd5dd;

  >>>.el-table {
    border: 0 !important;

    td {
      height: 30px;
    }

    th >.cell, th >div {
      padding: 0px;
      text-align: center;
    }

    .cell {
      padding: 0 10px !important;
      overflow: visible !important;
      font-size: 13px !important;

      .yzx {
        color: red;
      }

      .zxz {
        color: blue;
      }
    }

    th .cell {
      padding: 0 0px !important;
    }

    /* * 第一条 */
    .rowType-1 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0px;
        top: 50%;
        bottom: -5px;
      }
    }

    .rowType-2 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0px;
        top: -5px;
        bottom: -5px;
      }

      &:after {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-top: 1px solid #333;
        left: 0;
        top: 50%;
      }
    }

    .rowType-3 {
      position: relative;
      padding-left: 10px;

      &:before {
        content: '';
        position: absolute;
        width: 5px;
        border-left: 1px solid #333;
        border-bottom: 1px solid #333;
        left: 0px;
        bottom: 50%;
        top: -5px;
      }
    }
  }

  >>>.el-table::after, .el-table::before {
    background: #cbd5dd;
    display: none;
  }

  >>>.el-table__row td:first-child .cell, >>>.el-table__row td:last-child .cell {
    padding: 0 5px;
    text-align: center;

    >>>.cell {
      padding: 0px;
      text-align: center;
    }
  }

  >>>.el-table__body-wrapper {
    // overflow-x hidden
  }

  .btn-text {
    color: #4bb08d;
    cursor: pointer;

    &:hover {
      font-weight: bold;
    }
  }
}

.isWrite {
  color: #284FC2 !important;
}

.noWrite {
  color: #ED5566 !important;
}
</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
import moment from "moment";
import viewHealthEducationModal from "../modal/viewHealthEducationModal";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean
  },
  mixins: [commonMixin],
  data() {
    return {
      msg: "hello vue"
    };
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("HH:mm") : "";
    }
  },
  methods: {
    openViewModal(id) {
      this.$refs.viewHealthEducationModal.open(id);
    }
  },
  components: {
    viewHealthEducationModal
  }
};
</script>
