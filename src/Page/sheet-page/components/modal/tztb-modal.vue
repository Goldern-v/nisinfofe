<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="['guizhou','foshanrenyi', '925','nfyksdyy'].includes(HOSPITAL_ID)?850:720" title="体征同步">
      <div flex="cross:center">
        <span class="label">体征日期：</span>
        <masked-input
          type="text"
          v-if="!['whsl'].includes(HOSPITAL_ID)"
          class="mask-input"
          :showMask="false"
          v-model="searchDate"
          :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]"
          :guide="true"
          placeholderChar=" "
        ></masked-input>
        <el-date-picker
            v-else
            v-model="date"
            style="width:320px;margin-right: 40px;"
            type="datetimerange"
            range-separator="至"
            start-placeholder="请选择"
            end-placeholder="请选择">
          </el-date-picker>
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
          <el-table-column type="selection" width="40" align="center" :selectable="isSelectable"></el-table-column>
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
          <el-table-column prop="pulse" label="脉搏/心率(次/min)" min-width="150px" align="center" v-if="!['guizhou','foshanrenyi', '925','nfyksdyy'].includes(HOSPITAL_ID)"></el-table-column>
          <el-table-column prop="pulse" label="脉搏(次/min)" min-width="110px" align="center" v-if="['guizhou','foshanrenyi', '925','nfyksdyy'].includes(HOSPITAL_ID)"></el-table-column>
          <el-table-column prop="heartRate" label="心率(次/min)" min-width="110px" align="center" v-if="['guizhou','foshanrenyi', '925','nfyksdyy'].includes(HOSPITAL_ID)"></el-table-column>
          <el-table-column prop="breath" label="呼吸(次/min)" min-width="110px" align="center"></el-table-column>
          <el-table-column prop="bloodPressure" label="血压(mmHg)" min-width="110px" align="center"></el-table-column>
          <el-table-column prop="spo2" label="Spo2" min-width="110px" align="center" v-if="HOSPITAL_ID=='whsl'"></el-table-column>
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
import { weihaiVitalSignPost } from "./api/index";
export default {
  data() {
    return {
      sheetInfo,
      searchDate: "",
      tableData: [],
      multipleSelection: [],
      bus: bus(this),
      formlist:{},
      splitPulseHospital:['nanfangzhongxiyi','zzhj'], // 脉搏/心率的值仅有一个的时候不显示斜杠
      date:(()=>{
        const dateStart = new Date()
        const dateEnd = new Date()
        dateStart.setTime(dateStart.getTime() - 3600 * 1000 * 24);
        return [dateStart,dateEnd]
      })(),
    };
  },
  methods: {
    open(baseParams) {
      this.formlist = baseParams
      if (!this.patientInfo.patientId && !baseParams.patientId) {
        return this.$message.info("请选择一名患者");
      }
      this.searchDate = moment().format("YYYY-MM-DD");
      this.getData();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let temArr = this.multipleSelection
      if(this.multipleSelection.length!=0 &&(this.HOSPITAL_ID=='fuyou')){
         this.multipleSelection.map((item,index)=>{
          if(item.pulse){
            let strArr = item.pulse.split("/")
            if(strArr[0]&&strArr[1]){
            }else{
              temArr[index].pulse=strArr[0]||strArr[1]
            }
          }
        })
      }
      saveVitalSign(temArr).then(res => {
        this.$message.success("保存成功");
        this.close();
        //涉及到数据保存更改的 ，就调取initSheetPageSize初始化页码 然后重新拿值
        this.bus.$emit("initSheetPageSize");
      });
      this.bus.$emit("refreshSheetPageOne",this.multipleSelection);
    },
    getData() {
      if (this.HOSPITAL_ID == "whsl") {
        let beginTime = this.date[0]
          ? moment(this.date[0]).format("YYYY-MM-DD HH:mm:ss")
          : "";
        let endTime = this.date[1]
          ? moment(this.date[1]).format("YYYY-MM-DD HH:mm:ss")
          : "";
        weihaiVitalSignPost({
          patientId: this.patientInfo.patientId || this.formlist.patientId,
          visitId: this.patientInfo.visitId || this.formlist.visitId,
          beginTime,
          endTime,
        }).then((res) => {
          let tableList = res.data.data.list
          this.splitPulseHospital.includes(this.HOSPITAL_ID) && tableList.map(item=>{
            item.pulse = this.getShowPluse(item.pulse)
          })
          this.tableData = tableList;
        });
      } else{
        getVitalSign(
          this.patientInfo.patientId || this.formlist.patientId,
          this.patientInfo.visitId || this.formlist.visitId,
          this.searchDate
        ).then(res => {
          let tableList = res.data.data.list
          this.splitPulseHospital.includes(this.HOSPITAL_ID) && tableList.map(item=>{
            item.pulse = this.getShowPluse(item.pulse)
          })
          this.tableData = tableList;
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getShowPluse(pulse){
      if(!pulse.includes('/')){
        return pulse
      }else{
        let [relPulse,heartRate] = pulse.split('/')
        if(relPulse && heartRate){
          return pulse
        }else{
          return relPulse || heartRate || ""
        }
      }
    },
    isSelectable(row, index) {
      return this.HOSPITAL_ID !== 'whsl' || this.patientInfo.deptCode === row.wardCode;
    }
  },
  computed: {
    patientInfo() {
      if(this.sheetInfo.selectBlock){
        return this.sheetInfo.selectBlock
      }

      if(this.formlist != undefined){
        return this.formlist;
      }

    }
  },
  components: {
    whiteButton
  }
};
</script>
