<template>
  <div class="modal-con" id="yztb-modal">
    <sweet-modal ref="newRecord" title="导入检验项目结果" class="modal-record padding-0">
      <div class="time-box" v-if="type=='sheet'">
        记录日期：<timePicker @input="(value)=>{this.recordDate = value}" :value="recordDate" type="gtime" :maskedStyles="{height:'30px',lineHeight:'30px',textAlign:'center'}"/>
      </div>
      <div flex="cross:center" class="group">
        <el-table
          height="200"
          v-loading="tableLoading"
          :data="tableData"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column
            align='center'
            width="55">
            <template slot-scope="scope">
              <!-- <input type="checkbox" :checked="currentRow.testNo===scope.row.testNo" style="pointer-events:none"> -->
              <el-checkbox :value="currentRow.testNo===scope.row.testNo"  style="pointer-events:none"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(column,index) in config"
            :key="index"
            :align="column.align||'center'"
            :prop="column.pro"
            :label="column.cn"
            :width="column.width"
          >
          </el-table-column>
        </el-table>
      </div>
      <div flex="cross:center" class="group">
        <el-table
          height="200"
          v-loading="resTableLoading"
          :data="testResultArr"
          ref="multipleTable"
          border
          @select="handleSelectionChange"
          @select-all="handleSelectionChangeAll"
        >
          <el-table-column
            type="selection"
            width="55"
            align='center'
          >
          </el-table-column>

          <el-table-column
            v-for="(column,index) in resConfig"
            :key="index"
            :prop="column.prop"
            :label="column.cn"
            :align="column.align||'center'"
          >
          </el-table-column>
        </el-table>
      </div>
      结果展示：
      <div class="callback-result">{{callBackResult}}</div>
      <div slot="button">
        <el-button class="modal-btn" @click="toggleSelection">仅选中异常项</el-button>
        <el-button class="modal-btn" @click="newRecordClose">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="syncDecriptionTolsbar">插入</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal-con {
  >>>.sweet-content {
    padding: 30px 20px 0 30px !important;
  }
}
#yztb-modal{
  >>>.el-table .cell, >>>.el-table th > div{
    padding:0px;
  }
}
.time-box{
  margin-bottom:5px;
}
.callback-result{
  width: 100%;
  height: 200px;
  border: 1px solid #dfece8;
}
>>>.el-table__body-wrapper{
  overflow-x:hidden;
}
</style>

<script>
import timePicker from "@/components/cr-date-picker/cr-date-pickerV2"
import { getExamTestByPV,getExamTestResult } from "./api"
import commonMixin from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";
export default {
  mixins: [commonMixin],
  data() {
    return {
      currentRow:{},
      bus: bus(this),
      tableData:[],
      testResultArr:[],
      tableLoading:true,
      resTableLoading:true,
      currentCell:{},
      recordDate:'',
      callBackResult:'',
      month:{},
      hours:{},
      callbackArr:{},
      config:[
        {
          pro:'resultDateTime',
          cn:'检验结果日期',
          width:150
        },
        {
          pro:"subject",
          cn:'检验项目',
        },
        {
          pro:'resultStatus',
          cn:'检验结果',
          width:150
        }
      ],
      resConfig:[
        {
          prop:"reportItemName",
          cn:"项目名称"
        },
        {
          prop:"printContext",
          cn:"参考范围"
        },
        {
          prop:"result",
          cn:"检查结果"
        },
        {
          prop:"units",
          cn:"单位"
        },
      ],
      type:'sheet'
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
  },
  methods: {
    open(tr, td, sheetModel,type) {
      let patientId;
      let visitId;
      if(type=="shiftWork"){
        this.type = type
        patientId = tr.patientId
        visitId = tr.visitId
        this.currentCell = tr
      }else{
        let date = tr.find(item=>item.key==='recordDate')
        this.month = tr.find(item=>item.key==='recordMonth')
        this.hours = tr.find(item=>item.key==='recordHour')
        if(date.value){
          let [year,hours] = date.value.split(" ")
          let month = year.substring(5,10)
          this.recordDate = `${month} ${hours}`
        }else{
          this.recordDate = ''
        }
        patientId = this.patientInfo.patientId
        visitId = this.patientInfo.visitId
        this.currentCell = td
      }
      this.currentRow = {}
      this.tableData = []
      this.testResultArr = []
      this.resTableLoading=false
      this.tableLoading = true
      this.callBackResult = ''
      this.callbackArr = {}
      getExamTestByPV(patientId,visitId).then((res)=>{
          this.tableData = res.data.data
          this.tableLoading = false
      })
      this.$refs.newRecord.open();
    },
    newRecordClose() {
      this.currentRow = {}
      this.type='sheet'
      this.$refs.newRecord.close();
    },
    handleCurrentChange(val){
      if(!val)return
      this.currentRow = val
      // 更改项目内容,以当前选中项的textNo为入参发送请求,获取对应的项目结果
      this.resTableLoading = true
      getExamTestResult(val.testNo).then(res=>{
        this.testResultArr = res.data.data[0]?res.data.data[0].testResult:[] || []
        this.resTableLoading = false
      })

    },
    syncDecriptionTolsbar() {
      console.log(this.callBackResult);
      if(this.type=='sheet'&&!this.recordDate){
        this.$message.warning("记录时间不得为空！")
        return
      }
      if(!this.callBackResult){
        this.$message.warning("插入结果不能为空！")
        return
      }
      console.log(this.type);
      if(this.type=='sheet'){
        let [month,hours] = this.recordDate.split(" ")
        this.month.value = month
        this.hours.value = hours
        this.currentCell.value += this.callBackResult
        this.bus.$emit('ImportExamCallBack')
      }else{
        this.currentCell.background += this.callBackResult
      }
      this.newRecordClose()
    },
    handleSelectionChange(selection, row){
      this.callbackArr[row.testNo] =  this.callbackArr[row.testNo] || []
      if(this.callbackArr[row.testNo].includes(row)){
        let index = this.callbackArr[row.testNo].findIndex(item=>item===row)
        this.callbackArr[row.testNo].splice(index,1)
      }else{
        this.callbackArr[row.testNo].push(row)
      }
      this.generateResult()
      // let str = ''
      // selection.map(item=>{
      //   let itemStr = `[${this.currentRow.resultDateTime.split(" ")[0]}] ${item.reportItemName} ${item.result} ${item.units};`
      //   str += itemStr
      // })
      // this.callBackResult = str
    // },
    },
    handleSelectionChangeAll(selection){
      if(!selection.length&&this.callbackArr[this.currentRow.testNo]){
        this.callbackArr[this.currentRow.testNo] = null
      }else{
        this.callbackArr[this.currentRow.testNo] = [...selection]
      }
      this.generateResult()
    },
    generateResult(){
      let str = ''
      Object.keys(this.callbackArr).map((item,index)=>{
        let currentDate = this.tableData.find(tableItem=>tableItem.testNo === item).resultDateTime.split(" ")[0]
        this.callbackArr[item].map((e,i)=>{
          if(!i){
            str += `[${currentDate}] `
          }
          str += `${e.reportItemName} ${e.result}${e.units?' '+e.units:''};`
        })
        }
      )
      this.callBackResult = str
    },
    toggleSelection() {
        let rows = this.testResultArr.filter(item=>item.abnormalIndicator)
        if(!rows.length){
          this.$message.warning("此检验项目无异常结果！")
          return
        }
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
        this.callbackArr = []
        this.callbackArr[rows[0].testNo] = rows
        this.generateResult()
      },
  },
  created() {
  },
  mounted() {},
  components: {
    timePicker
  },
};
</script>
