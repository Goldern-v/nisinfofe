<template>
  <div class="d-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      height="480"
      v-loading="pageLoadng"
      @select="select"
      @selection-change="changeFun"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column type=index label="序号" width="55"></el-table-column>

      <el-table-column prop="wardName" label="护理单元" min-width="130px"></el-table-column>

      <el-table-column prop="bedLabel" label="床号" min-width="70px"></el-table-column>

      <el-table-column label="姓名" prop="name" min-width="80px"></el-table-column>

      <el-table-column prop="sex" label="性别" min-width="40px"></el-table-column>

      <el-table-column prop="patientId" label="病人ID" min-width="100px"></el-table-column>

      <el-table-column label="住院号" prop="inpNo" min-width="95px"></el-table-column>

      <el-table-column prop="admissionDate" label="入院日期" min-width="100px"></el-table-column>
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
    .cell {
      padding-left 10px
      padding-right 10px
    }
    /*隐藏表头复选框*/
    .el-table__header {
      .el-table-column--selection {
        .cell {
          .el-checkbox {
           display:none
         }
        }
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
  }

  >>>.el-table__body-wrapper {
    // overflow-x hidden
  }
}
</style>
<script>
import bus from "vue-happy-bus";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean
  },
  data() {
    return {
      bus: bus(this),
      multipleSelection: [] //选中的数据
    };
  },
  methods: {
    // 当用户手动勾选数据行的 Checkbox 时触发的事件,确保只能选中一项数据
		select(selection, row){
			this.$refs.multipleTable.clearSelection();
			if(selection.length == 0) return ;
			this.$refs.multipleTable.toggleRowSelection(row, true);
		},
    changeFun(val) {
      this.multipleSelection = val;
      if(this.multipleSelection && this.multipleSelection.length){
        this.bus.$emit('selectedPatient',this.multipleSelection)
      }
    }
  },
  components: {}
};
</script>
