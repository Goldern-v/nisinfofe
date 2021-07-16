<template>
  <div class="patient-info-modal">
    <sweet-modal :modalWidth="1200" ref="preview-modal" title="同步护理巡视">
      <div style="padding-bottom: 10px">
        <span class="type-label">时间:</span>
        <ElDatePicker
          class="date-picker"
          type="datetime"
          size="small"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="开始时间"
          v-model="beginTime"
          clearable
        />
        <span>-</span>
        <ElDatePicker
          class="date-picker"
          type="datetime"
          size="small"
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="结束时间"
          v-model="endTime"
          clearable
        />
        <el-button @click="getTableList">查询</el-button>
        <el-button @click="addPatientInfo">同步护理巡视</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        v-loading="pageLoadng"
        stripe
        highlight-current-row
        @selection-change="handleSelectionChange"
        @select="select"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="patientId"
          label="患者ID"
          min-width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="visitId"
          label="住院次数"
          min-width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operateDate"
          label="巡视时间"
          min-width="140"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.operateDate | ymdhm }}
          </template>
        </el-table-column>
        <el-table-column
          prop="visitContent"
          label="巡视内容"
          min-width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operator"
          label="巡视的护士工号"
          min-width="140"
          align="center"
        ></el-table-column>
      </el-table>
    </sweet-modal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.patient-info-modal {
  >>>.el-table {
    margin-bottom: 10px;

    .cell {
      padding: 0 5px;
    }
  }
}
</style>
<script>
import moment from "moment";
import bus from "vue-happy-bus";
import { sign, syncVisitWithDatePad } from "@/api/sheet.js";
export default {
  data() {
    return {
      pageLoadng: false,
      bus: bus(this),
      beginTime: moment(new Date()).format("YYYY-MM-DD"),
      endTime: moment(new Date()).format("YYYY-MM-DD"),
      tableData: [],
      currentVisitData: {},
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    open() {
      this.$refs.multipleTable.clearSelection();
      this.$refs["preview-modal"].open();
      this.getTableList();
    },
    close() {
      this.$refs["preview-modal"].close();
    },
    //  通过患者id和住院次数和时间查询巡视患者的巡视内容
    getTableList() {
      if (!this.$route.query.patientId || !this.$route.query.visitId) return;

      this.pageLoadng = true;
      syncVisitWithDatePad(
        this.$route.query.patientId,
        this.$route.query.visitId,
        moment(this.beginTime).format("YYYY-MM-DD"),
        moment(this.endTime).format("YYYY-MM-DD")
      ).then((res) => {
        this.pageLoadng = false;
        this.tableData = res.data.data.list;
      });
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件,确保只能选中一项数据
    select(selection, row) {
      this.$refs.multipleTable.clearSelection();
      if (selection.length == 0) return;
      this.$refs.multipleTable.toggleRowSelection(row, true);
    },
    //  勾选，拿到当前护理巡视数据
    handleSelectionChange(data) {
      this.currentVisitData = data[0];
    },
    // 同步护理巡视
    addPatientInfo() {
      if (Object.keys(this.currentVisitData).length <= 0) {
        this.$message.warning("未选择同步数据");
        return;
      }
      let syncVisitWithData = {
        recordMonth: this.currentVisitData.operateDate
          ? moment(this.currentVisitData.operateDate).format("MM-DD")
          : "",
        recordHour: this.currentVisitData.operateDate
          ? moment(this.currentVisitData.operateDate).format("HH:mm")
          : "",
        description: this.currentVisitData.visitContent,
      };
      this.bus.$emit("syncVisitWithDataSheet", syncVisitWithData);
      this.close();
    },
  },
  components: {},
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : "";
    },
  },
};
</script>
