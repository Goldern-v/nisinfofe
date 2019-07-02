<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="720" title="体征同步">
      <div flex="cross:center">
        <span class="label">体征日期：</span>
        <masked-input
          type="text"
          class="mask-input"
          :showMask="false"
          v-model="searchDate"
          :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]"
          :guide="true"
          placeholderChar=" "
        ></masked-input>
        <whiteButton text="查询" @click="getData"></whiteButton>
      </div>
      <div class="table-con">
        <el-table
          :data="tableData"
          border
          style="width: 101%"
          height="350"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column prop="recordDate" label="日期" min-width="90px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.recordDate.split(' ')[0] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="recordDate" label="时间" min-width="70px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.recordDate.split(' ')[1] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="temperature" label="腋下体温(°C)" min-width="110px" align="center"></el-table-column>
          <el-table-column prop="pulse" label="脉搏/心率(次/min)" min-width="150px" align="center"></el-table-column>
          <el-table-column prop="breath" label="呼吸(次/min)" min-width="110px" align="center"></el-table-column>
          <el-table-column prop="bloodPressure" label="血压(次/min)" min-width="110px" align="center"></el-table-column>
        </el-table>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus' type='text/stylus' scoped>
.label
  font-size 16px
  color #000000
  font-weight bold
.mask-input
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  display: inline-block;
  font-size: inherit;
  height: 32px;
  line-height: 1;
  outline: none;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 128px;
  margin-right 20px
.table-con
  margin-top 20px
  >>>.el-table .cell, >>>.el-table th > div
    padding 0 5px
</style>
<script>
import whiteButton from "@/components/button/white-button";
import moment from "moment";
import { getVitalSign, saveVitalSign } from "../../api/index";
import sheetInfo from "../config/sheetInfo/index";
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      sheetInfo,
      searchDate: "",
      tableData: [],
      multipleSelection: [],
      bus: bus(this)
    };
  },
  methods: {
    open() {
      if (!this.patientInfo.patientId) {
        return this.$message.warning("请选择一名患者");
      }
      this.searchDate = moment().format("YYYY-MM-DD");
      this.getData();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      saveVitalSign(this.multipleSelection).then(res => {
        this.$message.success("保存成功");
        this.close();
        this.bus.$emit("refreshSheetPage");
      });
    },
    getData() {
      getVitalSign(
        this.patientInfo.patientId,
        this.patientInfo.visitId,
        this.searchDate
      ).then(res => {
        this.tableData = res.data.data.list;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    }
  },
  components: {
    whiteButton
  }
};
</script>
