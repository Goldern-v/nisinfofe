<template>
  <el-dialog
    :title="!majorData.deptType ? '科室选择' : '病区选择'"
    :visible.sync="dialogVisible"
    @close="close"
    @open="open"
  >
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :max-height="450"
      @select="handlerSelect"
      @select-all="hanglerSelectAll"
    >
      <el-table-column type="selection" width="70"> </el-table-column>
      <el-table-column prop="inDateTime" label="流转开始" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="centered-cell">
            {{ scope.row.inDateTime | dateFilter }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="outDateTime"
        label="流转结束"
        show-overflow-tooltip
        style="text-align: center"
        align="center"
      >
        <template slot-scope="scope">
          <div class="centered-cell">
            {{ scope.row.outDateTime | dateFilter }}
          </div>
        </template>
      </el-table-column>
      <template v-if="majorData.deptType == 0">
        <el-table-column
          prop="deptName"
          label="科室名称"
          show-overflow-tooltip
          style="text-align: center"
          align="center"
        >
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column
          prop="wardName"
          label="病区名称"
          show-overflow-tooltip
          style="text-align: center"
          align="center"
        >
        </el-table-column>
      </template>
    </el-table>
    <div style="display: flex; margin-top: 20px; justify-content: center">
      <el-button @click="close">取消</el-button>
      <el-button @click="handelSuccess" type="success">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { adtExchangeModifyLog, updateBlockInfo } from './api/index';
  import dayjs from 'dayjs';
  import sheetInfo from "../config/sheetInfo/index";
  import bus from "vue-happy-bus";
  export default {
    filters: {
      dateFilter(value, format = 'YYYY-MM-DD HH:mm') {
        if (!value) return;
        return dayjs(value).format(format);
      },
    },
    data() {
      return {
        majorData: {},
        // 原props结束
        dialogVisible: false,
        tableData: [],
        sheetInfo,
        bus: bus(this),
        activeIndex: 0,//护记当前的页码，用于保存患者信息的relObj 默认父级不传index的时候就是默认修改床号同步同步至每一页
      };
    },
    mounted() {},
    methods: {
      close() {
        this.dialogVisible = false;
      },
      async handelSuccess() {

        let data = {
          adtLogList: this.tableData,
          ...this.majorData,
        };
          let res = await updateBlockInfo(data);
          if (res.data.code == 200) {
            let list = []
            if(!this.majorData.deptType){
              this.tableData.map((item)=>{
                item.selected && list.push(item.deptName)
              })
              this.sheetInfo.relObj[`PageIndex_realDeptName_${this.activeIndex}`] = list.join('->')
            }else{
              this.tableData.map((item)=>{
                item.wardSelected && list.push(item.wardName)
              })
              this.sheetInfo.relObj[`PageIndex_deptName_${this.activeIndex}`] = list.join('->')
            }
            // 刷新页面
            this.bus.$emit("saveSheetPage", false);
            //  关闭弹框
            this.close();
          }
      },
      handlerSelect(selection, row) {
        if (!this.majorData.deptType) {
          let current = this.tableData.filter(
            (item) =>
              item.deptCode == row.deptCode &&
              item.inDateTime == row.inDateTime &&
              item.outDateTime == row.outDateTime,
          )[0];
          current && (current.selected = selection.includes(row));
        } else {
          let current = this.tableData.filter(
            (item) =>
              item.wardCode == row.wardCode &&
              item.inDateTime == row.inDateTime &&
              item.outDateTime == row.outDateTime,
          )[0];
          current && (current.wardSelected = selection.includes(row));
        }
      },
      hanglerSelectAll(selection) {
        if (!this.majorData.deptType) {
          this.tableData.map((item) => {
            item.selected = selection.length == this.tableData.length;
          });
        } else {
          this.tableData.map((item) => {
            item.wardSelected = selection.length == this.tableData.length;
          });
        }
      },
      async open() {
        adtExchangeModifyLog(this.majorData).then(
          (res) => {
            if (res.data.code >= 200 && res.data.code < 300) {
              this.tableData = res.data.data;
              this.tableData.map((item) => {
                if (item.selected && !this.majorData.deptType) {
                  this.$nextTick(() => {
                    this.$refs.multipleTable.toggleRowSelection(item);
                  });
                }
                if (item.wardSelected && this.majorData.deptType) {
                  this.$nextTick(() => {
                    this.$refs.multipleTable.toggleRowSelection(item);
                  });
                }
              });
            }
          },
          (err) => {
            console.log(err);
          },
        );
      },
    },
  };
</script>
<style lang="scss" scoped>
/deep/ .el-dialog--small {
    width: 40% !important;
}
</style>
