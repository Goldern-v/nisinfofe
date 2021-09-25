<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="720" :title="title">
      <div flex="cross:center">
        <span v-if="HOSPITAL_ID == 'guizhou'" class="label">输血日期：</span>
        <span v-if="HOSPITAL_ID != 'guizhou'" class="label">执行单日期：</span>
        <masked-input
          type="text"
          class="mask-input"
          :showMask="false"
          v-model="searchDate"
          :mask="() => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]"
          :guide="true"
          placeholderChar=" "
        ></masked-input>
        <div v-if="HOSPITAL_ID=='quzhou'">
          <span class="label">类型：</span>
          <el-select v-model="executeType" placeholder="请选择" size="small" style="width:150px">
            <el-option
              :label="typeItem.name"
              :value="typeItem.id"
              v-for="typeItem in allType"
              :key="typeItem.id"
            ></el-option>
          </el-select>
        </div>
        <whiteButton style="margin-left:20px;" text="查询" @click="getData"></whiteButton>
      </div>
      <div class="table-con">
        <el-table
          :data="tableData"
          border
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
          <el-table-column v-if="HOSPITAL_ID == 'wujing'" prop="food" label="入量名称" min-width="110px" align="center"></el-table-column>
          <el-table-column v-if="HOSPITAL_ID == 'wujing'" prop="foodSize" label="入量" min-width="110px" align="center"></el-table-column>
          <el-table-column v-if="HOSPITAL_ID == 'quzhou'" prop="desc" label="描述" min-width="110px" align="center"></el-table-column>
          <el-table-column v-if="HOSPITAL_ID == 'guizhou'" prop="desc" label="病情、护理措施及效果" min-width="110px" align="center"></el-table-column>
          <!-- <el-table-column prop="temperature" label="腋下体温(°C)" min-width="110px" align="center"></el-table-column>
          <el-table-column prop="pulse" label="脉搏/心率(次/min)" min-width="150px" align="center"></el-table-column>
          <el-table-column prop="breath" label="呼吸(次/min)" min-width="110px" align="center"></el-table-column>
          <el-table-column prop="bloodPressure" label="血压(mmHg)" min-width="110px" align="center"></el-table-column> -->
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
import { getVitalSign, saveVitalSign, ordersExecuteList, nurseBloodList } from "../../api/index";
import sheetInfo from "../config/sheetInfo/index";
import bus from "vue-happy-bus";
export default {
  props:{
    blockId:{
      type:Number,
      value:0
    },
    title:{
      type:String,
      value:""
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
      executeType: "",
      allType: [
        {
          id: "",
          name: "全部",
        },
        {
          id: "输液",
          name: "输液类",
        },
        {
          id: "雾化",
          name: "雾化类",
        },
        {
          id: "口服",
          name: "长期医嘱的口服药",
        },
      ],
    };
  },
  methods: {
    open(baseParams) {
      this.formlist = baseParams
      // console.log(this.formlist);
      if (!this.patientInfo.patientId && !baseParams.patientId) {
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
      let temArr = this.multipleSelection
      if(this.multipleSelection.length!=0 &&(this.HOSPITAL_ID=='fuyou'||this.HOSPITAL_ID=='wujing'||this.HOSPITAL_ID=='quzhou')){
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
      saveVitalSign(temArr,this.HOSPITAL_ID).then(res => {
        this.$message.success("保存成功");
        this.close();
        this.bus.$emit("refreshSheetPage");
      });
      this.bus.$emit("refreshSheetPageOne",this.multipleSelection);
    },
    getData() {
      if(this.HOSPITAL_ID=="quzhou") {
        ordersExecuteList({
          patientId:this.patientInfo.patientId || this.formlist.patientId,
          visitId:this.patientInfo.visitId || this.formlist.visitId,
          executeDateTime:this.searchDate,
          wardCode:this.$store.state.lesion.deptCode,
          executeType:this.executeType,
        }
        ).then(res => {
          this.tableData = res.data.data.list;
        });
      }else if(this.HOSPITAL_ID=="guizhou"){
        nurseBloodList({
          patientId:this.patientInfo.patientId || this.formlist.patientId,
          visitId:this.patientInfo.visitId || this.formlist.visitId,
          executeDateTime:this.searchDate,
        }).then(res => {
          this.tableData = res.data.data.list;
        });
      }else{
        getVitalSign(
          this.patientInfo.patientId || this.formlist.patientId,
          this.patientInfo.visitId || this.formlist.visitId,
          this.searchDate,
          this.blockId,
          this.HOSPITAL_ID
        ).then(res => {
          this.tableData = res.data.data.list;
        });
    }
      
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  computed: {
    patientInfo() {
      console.log(this.formlist);
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
