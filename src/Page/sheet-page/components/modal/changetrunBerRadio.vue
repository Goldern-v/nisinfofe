<!--
患者表单转床，但只能单选
-->

<template>
  <div>
    <el-dialog
      title="床号选择"
      :visible.sync="dialogTrunVisible"
      @close="close"
    >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 300px; margin-top: 20px"
        :max-height="250"
        @row-click="(row)=>rowClick(row)"
      >
        <el-table-column width="40">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radioIdx" @change.native="handlerSelect(scope.$index)"></el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="bedLabelNew"
          label="床号名称"
          show-overflow-tooltip
          style="text-align: center"
        >
        </el-table-column>
      </el-table>
      <div style="display: flex; margin-top: 20px; justify-content: center">
        <el-button @click="close">取消</el-button>
        <el-button @click="handelsuccus" type="success">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { bedExchange,updateCommonInfo } from "./api/index";

export default {
  props: {
    dialogTrunVisibleTrue: {
      type: Boolean,
      default: false,
    },
    majorDataTrun: {
      type: Object,
    },
  },
  data() {
    return {
      radioIdx: null,
      tableData: [],
      dialogTrunVisible: false,
      bedLogList: [],
    };
  },
  mounted() {},
  methods: {
    close() {
      // 父传子，关闭弹框
      this.$emit("TrunVisible", false);
    },
    async handelsuccus() {
      let data = {
        bedLogList: [this.tableData[this.radioIdx]],
        ...this.majorDataTrun,
      };
      const res = await updateCommonInfo(data);
      console.log(res);
      if (res.data.code == 200) {
        this.$emit("savedata", true);
        // 关闭弹框
        this.close();
      }
    },
    handlerSelect(idx){
      this.tableData = this.tableData.map(item => {
        item.selected = false
        return item
      })
      this.tableData[idx].selected = true
    },
    rowClick(row){
      this.radioIdx = this.tableData.indexOf(row)
    }
  },
  watch: {
    async dialogTrunVisibleTrue(value) {
      this.dialogTrunVisible = value;
      if (value === true) {
        const res = await bedExchange(this.majorDataTrun)
        if (res.data.code >= 200 && res.data.code < 300) {
          this.tableData = res.data.data;
          this.tableData.map((item,idx) => {
            if (item.selected) {
              this.radioIdx = idx;
            }
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 40px;
  height: 40px;
  border: 1px solid #bfcbd9;
  line-height: 40px;
  text-align: center;
}
</style>
