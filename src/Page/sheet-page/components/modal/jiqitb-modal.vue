<template>
  <div class="jiqitbModal">
    <sweet-modal
      ref="modal"
      :modalWidth="modalWidth"
      :title="title"
      @close="beforeClose"
    >
      <div flex="cross:center">
        <span class="label">{{ timeLabel }}：</span>
        <el-date-picker
          v-model="longDate"
          type="datetimerange"
          size="small"
          placeholder="选择日期范围"
        >
        </el-date-picker>
        <whiteButton
          style="margin-left: 20px"
          text="查询"
          @click="getData"
        ></whiteButton>
      </div>
      <div class="table-con">
        <el-table
          ref="jiqitb-table"
          :data="tableDatalist"
          border
          :height="modalHeight"
          :row-class-name="tableRowClassName"
          @row-click="handleRowClick"
        >
          <el-table-column
            v-for="(col, index) in coloums"
            :key="index + 'coloum'"
            :prop="col.prop"
            align="center"
            :label="col.label"
            :width="col.width"
          >
            <template slot-scope="scope">
              <span v-if="col.label == '日期' && scope.row.recordDate">
                {{ scope.row.recordDate.split(" ")[0] }}
              </span>
              <span v-else-if="col.label == '时间' && scope.row.recordDate">
                {{ scope.row.recordDate.split(" ")[1] }}
              </span>
              <span v-else>
                {{ scope.row[col.prop] }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post"
          >确定</el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>

<script>
import moment from "moment";

import whiteButton from "@/components/button/white-button";
import { monitorData, respiratorData } from "./api/index";
import { jianhuColoums, huxiColoums } from "./render/measures";

let query = "";
export default {
  name: "jiqitongbuModal",
  props: {
    modalWidth: {
      type: Number,
      value: 720,
    },
    modalHeight: {
      type: Number,
      value: 720,
    },
  },
  data() {
    return {
      longDate: [moment(), moment()],
      tableDatalist: [],
      coloums: [],
      title:"监护仪同步",
      selectRow: {},
      timeLabel: "体征时间",
    };
  },

  mounted() {},

  methods: {
    getData() {
      let params = {
        patientId: this.$route.query.patientId,
        visitId: this.$route.query.visitId,
        beginTime: this.longDate[0],
        endTime: this.longDate[1],
      };
      query(params).then((res) => {
        this.tableDatalist = res.data.data;
      });
    },
    tableRowClassName(row, index) {
      if (this.selectRow.id === row.id) {
        return "selectRow";
      }
      return "";
    },
    handleRowClick(row, column, event) {
      this.selectRow = row;
    },
    open(type) {
      let startDate = moment().format("yyyy-MM-DD") + " 00:00:00";
      let endDate = moment().format("yyyy-MM-DD HH:mm:ss");
      this.longDate = [startDate, endDate];
      if (type === "jianhuyi") {
        this.coloums = jianhuColoums;
        this.title = "监护仪同步"
        query = monitorData;
      } else if (type === "huxiji") {
        this.coloums = huxiColoums;
        this.timeLabel = "检测时间";
        this.title = "呼吸机同步"
        query = respiratorData;
      }
      this.getData();
      this.$refs.modal.open();
    },
    post() {
      if (!this.selectRow.id) return this.$message.warning("请选择一条数据");
      this.$emit("confirm", this.selectRow);
      this.close();
    },
    close() {
      this.$refs.modal.close();
    },
    beforeClose() {
      this.selectRow = {};
    },
  },
  components: {
    whiteButton,
  },
};
</script>

<style lang="scss" scoped>
.jiqitbModal {
  .label {
    font-size: 16px;
    color: #000000;
    font-weight: bold;
  }
  .table-con {
    margin-top: 20px;

    /deep/ .el-table {
      .cell,
      th > div {
        padding: 0 5px;
      }
      .selectRow {
        background: #e2f0e4;
      }
    }
  }
}
</style>