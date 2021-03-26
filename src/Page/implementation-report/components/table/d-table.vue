<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="wih - 165"
      v-loading="pageLoadng"
      @select="select"
      @selection-change="changeFun"
      ref="multipleTable"
    >
     <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column  label="序号" min-width="50px" align="center" type="index"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="70px" align="center"></el-table-column>
      <el-table-column label="住院号" prop="inpNo" min-width="110px" align="center"></el-table-column>
      <el-table-column label="床号" prop="bedLabel" min-width="60px" align="center"></el-table-column>
      <el-table-column prop="itemName" label="医嘱名称" min-width="170px"></el-table-column>
      <el-table-column prop="itemNo" label="医嘱号" min-width="60px"></el-table-column>
      <el-table-column label="医嘱校对时间" prop="startDateTime" min-width="90px" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.startDateTime | ymdhm }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startNurse" label="医嘱校对护士" min-width="90px" align="center"></el-table-column>
      <el-table-column prop="barcode" label="执行单号" min-width="100px" align="center"></el-table-column>
      <el-table-column prop="prepareDateTime" label="摆药时间" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.prepareDateTime | ymdhm }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prepareNurse" label="摆药护士" min-width="70px" align="center"></el-table-column>
      <el-table-column prop="confirmDateTime" label="确认时间" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.confirmDateTime | ymdhm }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="confirmNurse" label="确认护士" min-width="70px" align="center"></el-table-column>
      <el-table-column prop="checkDateTime" label="校对时间" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.checkDateTime | ymdhm }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkNurse" label="校对护士" min-width="70px" align="center"></el-table-column>
      <el-table-column prop="dispenseNurse" label="配药护士" min-width="70px" align="center"></el-table-column>
      <el-table-column prop="dispenseDateTime" label="配药时间" min-width="90px" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.dispenseDateTime | ymdhm }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="executeDateTime" label="执行时间" min-width="90px" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.executeDateTime | ymdhm }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="executeNurse" label="执行护士" min-width="70px" align="center"></el-table-column>
      <el-table-column prop="reviewerName" label="审核人" min-width="60px" align="center"></el-table-column>
      <el-table-column prop="reviewerTime" label="审核时间" min-width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.reviewerTime | ymdhm }}</span>
        </template>
      </el-table-column>
    </el-table>
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
}
</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import qs from "qs";
import moment from "moment";
import bus from "vue-happy-bus";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean
  },
  mixins: [commonMixin],
  data() {
    return {
      bus: bus(this),
      multipleSelection: [] //选中的数据
    };
  },
  methods: {
    // 当用户手动勾选数据行的 Checkbox 时触发的事件,确保只能选中一项数据
		select(selection, row){
			// this.$refs.multipleTable.clearSelection();
			// if(selection.length == 0) return ;
			// this.$refs.multipleTable.toggleRowSelection(row, true);
		},
    changeFun(val) {
      this.multipleSelection = val;
      // if(this.multipleSelection && this.multipleSelection.length){
      //   this.bus.$emit('selectedPatient',this.multipleSelection)
      // }
    }
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm") : "";
    }
  },
  components: {}
};
</script>
