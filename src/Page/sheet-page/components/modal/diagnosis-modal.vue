<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="modalWidth" :title="title">
      <div flex="cross:center">
        <span class="label">护理计划日期：</span>
        <el-date-picker
          v-if="hospitalType"
          v-model="searchDateFY"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-date-picker
          v-else
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
          height="500"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
        <el-table-column
          type="selection" />
          <el-table-column
            label="日期"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.beginTime.split(" ")[0] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="时间"
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
          <el-table-column
            v-if="newType || hasMeasure"
            prop="diagMeasures"
            label="护理措施计划"
            min-width="275px"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="newType"
            prop="diagTarget"
            label="护理目标"
            min-width="275px"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="newType"
            prop="evalType"
            label="护理评价"
            min-width="100px"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="newType"
            prop="evalContent"
            label="评价说明"
            min-width="100px"
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
  >>> table {
    min-width: 100%;
  }
  margin-top: 20px;
  >>> .el-table__body-wrapper {
    overflow-x: auto !important;
  }

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
      searchDateFY: [], //江门妇幼时间查询条件
      tableData: [],
      selectedItem: null,
      bus: bus(this),
      formList: {},
      filterData: [],
      newType: ['lyxrm','huadu', 'whhk', 'stmz','foshanrenyi','fuyou'].includes(this.HOSPITAL_ID),
      hospitalType:['fuyou'].includes(this.HOSPITAL_ID),
      hasMeasure: ['whsl'].includes(this.HOSPITAL_ID)
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
      this.searchDateFY = [moment().startOf('months').format('YYYY-MM-DD'), new Date()];
      await this.getData();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      if (!this.selectedItem) return this.$message.warning('请选择一条数据')
      this.$emit('handleOk',{ item: this.selectedItem, key: this.insertKey })
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
             this.tableData = this.tableData.map(v => {
              if (this.testRep(v.diagMeasures, v.measuresName) || this.testRep(v.diagTarget, v.targetsName)) {
                return {
                  ...v,
                  diagMeasures: this.formatList(v.diagMeasures, v.measuresName, 'measureDetail'),
                  diagTarget: this.formatList(v.diagTarget, v.targetsName, 'parameter'),
                }
              }
              return v
             })
            this.handleSearch()
          }
          return res1
        }
      } catch (e) {
      }
    },
    /**
     * 入院评估的护理计划 有些字段不直接存储数据，而是存储序号，如：1_2
     * @params value: 数据， list： 序号对应的数组 key：具体取数组中的哪个字段
     */
    formatList(value, list, key) {
      if (this.testRep(value, list)) {
        return list.map(v => v[key])
      }
      return value
    },
    /**
     * 检查序号
     */
    testRep(value, list) {
      return value.length > 0 && value.split('_').length == list.length
    },
    handleSelectionChange(val) {
      this.selectedItem = val;
    },
    /**查询 */
    handleSearch() {
      if(this.hospitalType){
        if (!this.searchDateFY) return (this.filterData = this.tableData)
        this.filterData = this.tableData.filter(v => {
          return moment(this.searchDateFY[0]).valueOf() <= moment(v.beginTime).valueOf() && moment(this.searchDateFY[1]).valueOf() >= moment(v.beginTime).valueOf()
        })
      }else{
        if (!this.searchDate) return (this.filterData = this.tableData)
        this.filterData = this.tableData.filter(v => {
          return v.beginTime.indexOf(moment(this.searchDate).format('YYYY-MM-DD')) > -1
        })
      }
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
    },
    // 同步需要的字段名
    insertKey() {
      switch(this.HOSPITAL_ID) {
        case 'lyxrm':
        case 'huadu':
        case 'whhk':
        case "stmz":
        case "foshanrenyi":
          return 'diagMeasures'
        default:
          return 'diagName'
      }
    }
  },
  components: {
    whiteButton
  }
};
</script>
