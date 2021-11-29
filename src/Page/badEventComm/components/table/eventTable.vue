<template>
  <div class="event-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :height="wih - 172"
      v-loading="pageLoadng"
      @row-dblclick="openDetail"
      @current-change="handleCurrentChange"
      ref="badEventTable"
      header-align="center"
      align="center"
      stripe
      highlight-current-row
    >
      <el-table-column
        label="序号"
        header-align="center"
        type="index"
        min-width="60px"
        align="center"
      ></el-table-column>

      <!-- <el-table-column
        header-align="center"
        align="left"
        label="不良事件编号"
        prop="badEventOrderNo"
        min-width="200px"
      ></el-table-column> -->

      <el-table-column
        prop="happenDate"
        header-align="center"
        align="center"
        label="发生日期"
        min-width="110px"
      ></el-table-column>

      <!-- <el-table-column
        prop="happenTime"
        header-align="center"
        align="center"
        label="发生时间"
        min-width="75px"
      ></el-table-column> -->

      <el-table-column
        header-align="center"
        align="left"
        label="科室"
        prop="wardName"
        min-width="140px"
      ></el-table-column>

      <el-table-column
        prop="patientName"
        header-align="center"
        align="left"
        label="受影响对象"
        min-width="150px"
      >
        <template slot-scope="scope">
          <div>
            <span>{{ sliceString(scope.row.patientName) }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="eventType"
        header-align="center"
        align="center"
        label="事件类型"
        min-width="150px"
      ></el-table-column>

      <!-- <el-table-column
        prop="happenPlace"
        header-align="center"
        align="left"
        label="发生场所"
        min-width="130px"
      >
        <template slot-scope="scope">
          <div>
            <span>{{ sliceString(scope.row.happenPlace) }}</span>
          </div>
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        prop="happenReason"
        header-align="center"
        align="center"
        label="发生原因"
        min-width="130px"
        :show-overflow-tooltip="true"
      ></el-table-column> -->

      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态"
        min-width="120px"
      >
        <template slot-scope="scope">
          <!-- {{scope.row.status}} -->
          <div :class="{ 'nopass-row': scope.row.status == -2 }">
            <span>{{ getStatus(scope.row) }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        label="操作"
        min-width="100px"
      >
        <template slot-scope="scope">
          <div class="justify">
            <el-button type="text" @click="openDetail(scope.row)"
              >查看</el-button
            >
            <el-button
              v-if="scope.row.status == 0 || scope.row.status == 1"
              type="text"
              @click="delDetail(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.event-table {
  width: 99%;
  margin: auto auto;
  margin-top: 10px;
  border: 1px solid #cbd5dd;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  .justify {
    span {
      font-size: 13px;
    }
  }

  >>>.el-button {
    padding: 0px;
  }

  >>>.el-table {
    border: 0 !important;

    td, th, tr {
      height: 40px;
      font-size: 14px;

      > div {
        padding-left: 5px;
        padding-right: 5px;
      }
    }

    td {
      &.is-left {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }

  >>>.el-table::after, .el-table::before {
    background: #cbd5dd;
    display: none;
  }

  >>>.el-table__row td:first-child .cell, >>>.el-table__row td:last-child .cell {
    padding: 0 3px;
    text-align: center;
  }

  >>>.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background: rgb(255, 251, 186);
  }

  >>>.el-table__body tr.current-row td {
    background: rgb(255, 251, 186);
  }
}
</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import { del } from "../../apis";
import BusFactory from "vue-happy-bus";
import qs from "qs";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean,
    updateTable: Function,
    eventStatusOptions: Array
  },
  mixins: [commonMixin],
  data() {
    return {
      bus: BusFactory(this),
      currentRow: localStorage["BadEvent-CurrentRow"] || -1
    };
  },
  mounted() {
    this.setCurrent(this.currentRow);
  },
  created() {
    console.log(this.eventStatusOptions);
    this.bus.$on("setTableData", this.setTableData);
  },
  methods: {
    sliceString(str, limit = 18) {
      let result = str ? str + "" : "";
      if (result && result.length > limit) {
        result = result.slice(0, limit) + "..";
      }
      result = result.replace(/：/g, "");
      return result;
    },
    setCurrent(index) {
      this.$refs.badEventTable.setCurrentRow(this.tableData[index]);
    },
    setTableData(table) {
      console.log("setTableData", table);
    },
    handleCurrentChange(val) {
      // console.log(val,this.tableData.indexOf(val) )
      this.currentRow = this.tableData.indexOf(val);
      localStorage["BadEvent-CurrentRow"] = this.currentRow;
    },
    async openDetail(row) {
      // 是否独立的一张事件（不用公共部分）
      // let arr = [
      //   "badevent_nys_fall",
      //   "badevent_nys_plan_extubat",
      //   "badevent_nys_drug_error",
      //   "badevent_nys_report",
      //   "badevent_nys_pressure",
      //   "badevent_nys_dermatitis",
      //   "badevent_fqfy_report",
      //   "badevent_fqfy_submit_report"
      // ];
      // let isIndependent = arr.includes(row.badEventCode) ? 1 : 0;
      this.$router.push({
        name: "badEventView",
        params: {
          id: row.id,
          name: row.formName,
          code: row.formCode,
          type: row.eventType,
          status: row.status,
          operation: "view",
          isIndependent: 1
        }
      });
    },
    async delDetail(row) {
      let happenPlace = row.happenPlace
        ? row.happenPlace.slice(0, 15) + "等场所"
        : "";
      this.$confirm(
        `是否要删除,${row.name || ""}于${row.happenDate || ""} ${
          row.happenTime || ""
        }在${happenPlace}因${row.happenReason || ""}发生的${
          row.eventType || ""
        }不良事件?`,
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          del(row.id)
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.updateTable();
              this.$router.push({ name: "badEvents" });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "删除失败"
              });
              this.updateTable();
            });
        })
        .catch(() => {
          console.log("删除取消");
        });
    },
    getStatus(item) {
      for (let i = 0; i < this.eventStatusOptions.length; i++) {
        if (
          this.eventStatusOptions[i].code == "quality_controller_allow" &&
          !item.allow
        ) {
          return "质管科审核不通过";
        } else if (this.eventStatusOptions[i].code == item.status) {
          return this.eventStatusOptions[i].name;
        }
      }
    }
  },
  components: {}
};
</script>
