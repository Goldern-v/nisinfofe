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
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        label="序号"
        header-align="center"
        type="index"
        min-width="60px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column
        header-align="center"
        align="left"
        label="不良事件编号"
        prop="badEventOrderNo"
        min-width="185px"
      ></el-table-column>

      <el-table-column
        prop="happenDate"
        header-align="center"
        align="center"
        label="发生日期"
        min-width="110px"
      ></el-table-column>

      <el-table-column
        prop="happenTime"
        header-align="center"
        align="center"
        label="发生时间"
        min-width="75px"
      ></el-table-column>

      <el-table-column
        header-align="center"
        align="left"
        label="科室"
        prop="wardName"
        min-width="140px"
      ></el-table-column>

      <!-- <el-table-column
        prop="bedLabel"
        header-align="center"
        align="center"
        label="床号"
        width="70px"
        min-width="70px">
      </el-table-column>-->

      <!-- <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="病人姓名"
        min-width="110px"
        width="110px">
      </el-table-column>-->

      <el-table-column
        prop="affected"
        header-align="center"
        align="left"
        label="受影响对象"
        min-width="150px"
      >
      <template slot-scope="scope">
          <div>
            <span>{{sliceString(scope.row.affected)}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="eventType"
        header-align="center"
        align="left"
        label="事件类型"
        min-width="150px"
      ></el-table-column>

      <el-table-column
        prop="happenPlace"
        header-align="center"
        align="left"
        label="发生场所"
        min-width="130px"
      ><template slot-scope="scope">
          <div>
            <span>{{sliceString(scope.row.happenPlace)}}</span>
          </div>
        </template>
        </el-table-column>

      <el-table-column
        prop="happenReason"
        header-align="center"
        align="center"
        label="发生原因"
        min-width="130px"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column
        prop="status"
        header-align="center"
        align="left"
        label="状态"
        min-width="120px"
      >
        <template slot-scope="scope">
          <!-- {{scope.row.status}} -->
          <div :class="cellFormatter(scope.row.status)">
            <span>{{getStatus(scope.row.status)}}</span>
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
            <el-button type="text" @click="openDetail(scope.row)">查看</el-button>
            <el-button
              v-if="[0,3,5].indexOf(scope.row.status)>-1"
              type="text"
              @click="delDetail(scope.row)"
            >删除</el-button>
            <el-button v-if="[0,3,5].indexOf(scope.row.status)==-1" style="color:transparent" type="text"  @click="openDetail(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

.event-table
  width 99%
  margin auto auto
  margin-top 10px
  border 1px solid #cbd5dd
  -webkit-box-sizing border-box
  box-sizing border-box
  .justify
    span
      font-size 13px
    // display table
    // justify-content space-around
  >>>.el-button
    padding 0px
  >>>.el-table
    border 0 !important
    td,th,tr
      height 40px
      font-size 14px
      div
        padding-left 0px
        padding-right 0px
  >>>.el-table::after, .el-table::before
    background #cbd5dd
    display none
  >>>.el-table__row td:first-child .cell, >>>.el-table__row td:last-child .cell
    padding 0 5px
    text-align center
  >>>.el-table__body-wrapper
    // overflow-x hidden
  >>>.el-table--striped .el-table__body tr.el-table__row--striped.current-row td
      background rgb(255, 251, 186)
  >>>.el-table__body tr.current-row td
      background rgb(255, 251, 186)
.pass-row
  // font-weight: bold;
.nopass-row
  color red
  // font-weight: bold;

</style>
<script>
import { info } from "@/api/task";
import commonMixin from "../../../../common/mixin/common.mixin";
import { del } from "@/Page/badEvent/apis/index.js";
import BusFactory from "vue-happy-bus";
import qs from "qs";
export default {
  props: {
    tableData: Array,
    pageLoadng: Boolean,
    updateTable: Function
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
    this.bus.$on("setTableData", this.setTableData);
  },
  methods: {
    sliceString(str,limit = 14) {
        let result = str + ''
        if (result && result.length > limit) {
            result = result.slice(0, limit) + '..'
        }
        result = result.replace(/：/g, '');
        return result
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
    // cellFormatter(row, column, cellValue){
    cellFormatter(status) {
      // console.log('cellFormatter',status)
      if ([2,3,4,5].indexOf(status) > -1) {
        return "pass-row";
      } else if (status == -2) {
        return "nopass-row";
      }
      return "";
    },
    tableRowClassName(row, index) {
      // console.log(row, index,row.status,[2,4].indexOf(row.status))
      // if ([2,4].indexOf(row.status)>-1) {
      //   return 'pass-row';
      // } else if ([3,5].indexOf(row.status)>-1)  {
      //   return 'nopass-row';
      // }
      // return '';
    },
    async openDetail(row) {
      // if (row.status == 0) {
      //   this.$router.push({
      //     name: "badEventEdit",
      //     params: {
      //       id: row.id,
      //       name: row.badEventName,
      //       code: row.badEventCode,
      //       type: row.eventType,
      //       operation: "edit"
      //     }
      //   });
      // } else {
        this.$router.push({
          name: "badEventView",
          params: {
            id: row.id,
            name: row.badEventName,
            code: row.badEventCode,
            type: row.eventType,
            status: row.status,
            operation: "view"
          },
          query:{
            badEventOrderNo: row.badEventOrderNo
          }
        });
      // }
    },
    async delDetail(row) {
      this.$confirm(
        `是否要删除,${row.name || ""}于${row.happenDate ||
          ""} ${row.happenTime || ""}在${row.happenPlace ||
          ""}因${row.happenReason || ""}发生的${row.eventType || ""}不良事件?`,
        "提示",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          del(row.id)
            .then(res => {
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
          // this.$message({
          //   type: 'info',
          //   message: '删除取消'
          // });
        });
    },
    getStatus(i) {
      i = i==-2 ? 6:i;
      const status = [
        "保存",
        "护士上报",
        "质管科审核通过",
        "责任科室已处理",
        "质管科已总结",
        "质量委员会已处理",
        "质管科审核不通过"
      ];
      return status[i];
    }
  },
  components: {}
};
</script>
