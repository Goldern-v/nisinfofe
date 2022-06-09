<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="modalWidth" :title="title">
      <div flex="cross:center">
        <span class="label">护理计划日期：</span>
        <el-date-picker
          v-model="searchDate"
          type="date"
          placeholder="选择日期"
        />
        <whiteButton
          style="margin-left: 20px"
          text="查询"
          @click="handleSearch"
        ></whiteButton>
      </div>
      <div class="table-con">
        <el-table
          ref="table"
          :data="filterData"
          border
          height="350"
          highlight-current-row
          @current-change="handleSelectionChange"
        >
          <el-table-column
            label="日期"
            min-width="200px"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.beginTime.split(" ")[0] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="时间"
            min-width="200px"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.beginTime.split(" ")[1] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="diagName"
            label="护理问题"
            min-width="275px"
            align="center"
          ></el-table-column>
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
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.label {
  font-size: 16px;
  color: #000000;
  font-weight: bold;
}

.table-con {
  margin-top: 20px;

  >>>.el-table .cell, >>>.el-table th > div {
    padding: 0 5px;
  }
  >>>.current-row td {
    background: rgb(254, 248, 185);
  }
}
</style>
<script>
import whiteButton from "@/components/button/white-button";
import { getPlanFormListByPV, nursingDiagsPatient } from "@/Page/patientInfo/supPage/diagnosis/api/index.js"
import moment from "moment";
import sheetInfo from "../config/sheetInfo/index";
import bus from "vue-happy-bus";
export default {
  props: {
    blockId: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "同步护理计划"
    },
    modalWidth: {
      type: Number,
      default: 720
    },
  },
  data() {
    return {
      sheetInfo,
      searchDate: "",
      tableData: [],
      selectedItem: null,
      bus: bus(this),
      formList: {},
      filterData: [],
    };
  },
  methods: {
    async open(baseParams) {
      this.formList = baseParams;
      if (!this.patientInfo.patientId && !baseParams.patientId) {
        return this.$message.warning("请选择一名患者");
      }
      this.selectedItem = null;
      this.searchDate = moment().format("YYYY-MM-DD");
      await this.getData();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      if (!this.selectedItem) return this.$message.warning('请选择一条数据')
      this.$emit('handleOk',this.selectedItem)
      this.close()
    },
    async getData() {
      try {
        const res = await getPlanFormListByPV(
          this.patientInfo.patientId || this.formList.patientId,
          this.patientInfo.visitId || this.formList.visitId,
        )
        if (res.data.code == 200 && (res.data.data.length || 0)) {
          const res1 = await nursingDiagsPatient({
            visitId: res.data.data[0].visitId,
            patientId: res.data.data[0].patientId,
            planFormId: res.data.data[0].id,
          })
          if (res1.data.code == 200) {
            this.tableData = res1.data.data.page.list || []
            this.handleSearch()
          }
          return res1
        }
      } catch (e) {
      }
    },
    handleSelectionChange(val) {
      this.selectedItem = val;
    },
    /**查询 */
    handleSearch() {
      if (!this.searchDate) return (this.filterData = this.tableData)
      this.filterData = this.tableData.filter(v => {
        return v.beginTime.indexOf(moment(this.searchDate).format('YYYY-MM-DD')) > -1
      })
    }
  },
  computed: {
    patientInfo() {
      if (this.sheetInfo.selectBlock) {
        return this.sheetInfo.selectBlock;
      }

      if (this.formList != undefined) {
        return this.formList;
      }
    }
  },
  components: {
    whiteButton
  }
};
</script>
