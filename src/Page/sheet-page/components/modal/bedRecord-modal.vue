<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="bedModalWidth" title="转床记录">
      <div flex="cross:center">
        <span class="label">床号：</span>
        <div class="box">{{firstBedRecord}}</div><i class="el-icon-d-arrow-right p-20"></i>
        <div class="box">{{secondBedRecord}}</div><i class="el-icon-d-arrow-right p-20"></i>
        <div class="box">{{thirdBedRecord}}</div>
        <!-- <whiteButton text="查询" @click="getData"></whiteButton> -->
      </div>
      <div class="table-con">
        <el-table
          :data="tableData"
          ref="bedRecord"
          border
          style="width: 100%"
          height="350"
          @select="handleSelectionChange"
        >
          <el-table-column type="selection"  min-width="50px" align="center"></el-table-column>
          <el-table-column prop="logDateTime" label="日期" min-width="125px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.logDateTime.split(' ')[0] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="logDateTime" label="时间" min-width="125px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.logDateTime.split(' ')[1] }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="logDateTime" label="时间" min-width="110px" align="center"></el-table-column> -->
          <el-table-column v-if="oneBedHospital.includes(HOSPITAL_ID)" prop="bedLabelNew" label="床号" min-width="110px" align="center"></el-table-column>
          <el-table-column v-if="!oneBedHospital.includes(HOSPITAL_ID)" prop="bedLabelOld" label="旧床号" min-width="110px" align="center"></el-table-column>
          <el-table-column v-if="!oneBedHospital.includes(HOSPITAL_ID)" prop="bedLabelNew" label="新床号" min-width="110px" align="center"></el-table-column>
         
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
.box 
  width 40px
  height 40px
  border 1px solid #bfcbd9
  line-height 40px
  text-align center
.p-20
  padding 0 20px
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
import { bedExchangeModifyLog , updateBlockInfo} from "../../api/index";
import sheetInfo from "../config/sheetInfo/index";
import bus from "vue-happy-bus";
export default {
  props:{
    blockId:{
      type:Number,
      value:0
    }
  },
  data() {
    return {
      sheetInfo,
      searchDate: "",
      tableData: [],
      multipleSelection: [],
      bus: bus(this),
      formlist:{},
      firstBedRecord:"",
      secondBedRecord:"",
      thirdBedRecord:"",
      bedLabel:"",
      bedModalWidth:450,
      activeIndex:'',//护记当前的页码，用于保存患者信息的relObj
      oneBedHospital:['huadu','fsxt'],
    };
  },
  methods: {
    open(baseParams,index) {
      this.formlist = baseParams
      if (!this.patientInfo.patientId && !baseParams.patientId) {
        return this.$message.warning("请选择一名患者");
      }
      // 护记当前的页码。杏坛需求，床号每一页不一样，存在relObj里面
      if(index>=0){
        console.log('index',index)
        this.activeIndex=index
      }
      this.searchDate = moment().format("YYYY-MM-DD");
      this.getData();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      // 护记当前的页码。杏坛需求，床号每一页不一样，存在relObj里面
      if(this.activeIndex>=0){
        updateBlockInfo({
        patientId:this.patientInfo.patientId || this.formlist.patientId,
        visitId:this.patientInfo.visitId || this.formlist.visitId,
        id:this.sheetInfo.selectBlock.id,
        bedLogList:this.tableData,
        bedLabel: this.bedLabel,
        }).then(res => {
          this.$message.success("保存成功");
          this.close();
          this.bus.$emit("refreshSheetPageOne",this.multipleSelection);
          sheetInfo.relObj[`PageIndex_bedLabel_${this.activeIndex}`] = res.data.data.bedLabel;
          this.bus.$emit("saveSheetPage", false);  
        });
      }else{
        updateBlockInfo({
          patientId:this.patientInfo.patientId || this.formlist.patientId,
          visitId:this.patientInfo.visitId || this.formlist.visitId,
          id:this.sheetInfo.selectBlock.id,
          bedLogList:this.tableData,
          bedLabel: this.bedLabel,
        }).then(res => {
          this.$message.success("保存成功");
          this.close();
          this.bus.$emit("refreshSheetPage");
        });
        this.bus.$emit("refreshSheetPageOne",this.multipleSelection);
      }
    },
    getData() {
      bedExchangeModifyLog(
        this.patientInfo.patientId || this.formlist.patientId,
        this.patientInfo.visitId || this.formlist.visitId,
        this.sheetInfo.selectBlock.id,
      ).then(res => {
        this.tableData = res.data.data || [];
        this.tableData.map((item,index)=>{
          item.index = index
        })
        this.multipleSelection = this.tableData.filter(item=>item.selected)
        this.$nextTick(()=>{
          this.tableData.map(item=>{
            this.$refs.bedRecord.toggleRowSelection(item,item.selected)
          })  
        })
        if(this.oneBedHospital.includes(this.HOSPITAL_ID)){
          this.firstBedRecord = this.multipleSelection[0] ? this.multipleSelection[0].bedLabelNew : ""
          this.secondBedRecord = this.multipleSelection[1] ? this.multipleSelection[1].bedLabelNew : ""
          this.thirdBedRecord = this.multipleSelection[2] ? this.multipleSelection[2].bedLabelNew : ""
        }else{
          this.firstBedRecord = this.multipleSelection[0] ? this.multipleSelection[0].bedLabelOld : ""
          this.secondBedRecord = this.multipleSelection[0] ? this.multipleSelection[0].bedLabelNew : ""
          this.thirdBedRecord = this.multipleSelection[1] ? this.multipleSelection[1].bedLabelNew : ""
        }
        if(this.multipleSelection[2]) {
          this.bedLabel = this.firstBedRecord+"->"+this.secondBedRecord+"->"+this.thirdBedRecord
        }else if(this.multipleSelection[1]) {
          this.bedLabel = this.firstBedRecord+"->"+this.secondBedRecord
        }else {
          this.bedLabel = this.firstBedRecord
        }
      });
    },
    handleSelectionChange(val,row) {
      row.selected = !row.selected
      this.multipleSelection = val.sort((a,b)=>{
        return a.index - b.index
      });
      if(this.oneBedHospital.includes(this.HOSPITAL_ID)){
        this.firstBedRecord = this.multipleSelection[0] ? this.multipleSelection[0].bedLabelNew : ""
        this.secondBedRecord = this.multipleSelection[1] ? this.multipleSelection[1].bedLabelNew : ""
        this.thirdBedRecord = this.multipleSelection[2] ? this.multipleSelection[2].bedLabelNew : ""
      }else{
        this.firstBedRecord = this.multipleSelection[0] ? this.multipleSelection[0].bedLabelOld : ""
        this.secondBedRecord = this.multipleSelection[0] ? this.multipleSelection[0].bedLabelNew : ""
        this.thirdBedRecord = this.multipleSelection[1] ? this.multipleSelection[1].bedLabelNew : ""
      }
      
      if(this.multipleSelection[2]) {
        this.bedLabel = this.firstBedRecord+"->"+this.secondBedRecord+"->"+this.thirdBedRecord
      }else if(this.multipleSelection[1]) {
        this.bedLabel = this.firstBedRecord+"->"+this.secondBedRecord
      }else {
        this.bedLabel = this.firstBedRecord
      }
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
  },
  created() {
    if(this.oneBedHospital.includes(this.HOSPITAL_ID)){
      this.bedModalWidth = 450
    }else{
      this.bedModalWidth = 550
    }
    
  },
};
</script>
