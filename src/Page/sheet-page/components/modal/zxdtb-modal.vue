<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="modalWidth" :title="title">
      <div flex="cross:center">
        <div v-if="HOSPITAL_ID == 'weixian'||HOSPITAL_ID == 'liaocheng'||HOSPITAL_ID == 'foshanrenyi'||HOSPITAL_ID == 'whfk'"  >
          <span class="label">执行单日期：</span>
          <el-date-picker
            v-model="longDate"
            type="daterange"
            size="small"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
        <div v-else>
          <span v-if="HOSPITAL_ID == 'guizhou'" class="label">输血日期：</span>
          <span v-if="HOSPITAL_ID != 'guizhou'" class="label">执行单日期：</span>
          <masked-input
            type="text"
            class="mask-input"
            :showMask="false"
            v-model="searchDate"
            :mask="
              () => [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
            "
            :guide="true"
            placeholderChar=" "
          ></masked-input>
        </div>
        <div v-if="HOSPITAL_ID == 'quzhou'||HOSPITAL_ID == 'weixian'||HOSPITAL_ID == 'liaocheng'||HOSPITAL_ID == 'foshanrenyi'||HOSPITAL_ID == 'whfk'" style="margin-left: 20px">
          <span class="label">类型：</span>
          <el-select
            v-model="executeType"
            placeholder="请选择"
            size="small"
            style="width: 150px"
          >
            <el-option
              :label="typeItem.name"
              :value="typeItem.id"
              v-for="typeItem in allType"
              :key="typeItem.id"
            ></el-option>
          </el-select>
        </div>
        <div v-if="HOSPITAL_ID == 'wujing'" style="margin-left: 20px">
          <span class="label">医嘱分类：</span>
          <el-select
            v-model="executeType"
            placeholder="请选择"
            size="small"
            style="width: 100px"
          >
            <el-option
              :label="typeItem.name"
              :value="typeItem.id"
              v-for="typeItem in allType"
              :key="typeItem.id"
            ></el-option>
          </el-select>
        </div>
        <div v-if="HOSPITAL_ID == 'wujing'" style="margin-left: 20px">
          <span class="label">医嘱类型：</span>
          <el-select
            v-model="repeatIndicator"
            placeholder="请选择"
            size="small"
            style="width: 100px"
          >
            <el-option
              :label="typeItem.name"
              :value="typeItem.id"
              v-for="typeItem in repeatIndicatorList"
              :key="typeItem.id"
            ></el-option>
          </el-select>
        </div>
        <whiteButton
          style="margin-left: 20px"
          text="查询"
          @click="getData"
        ></whiteButton>
      </div>
      <div class="table-con">
        <el-table
          ref="zxdtb-table"
          :data="tableData"
          border
          height="350"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
          @row-click='handleRowClick'
        >
          <el-table-column
            type="selection"
            width="40"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="recordDate"
            label="日期"
            min-width="90px"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!identicalGroupSelect.includes(HOSPITAL_ID)">{{ scope.row.recordDate.split(" ")[0] }}</span>
              <masked-input 
                v-if="(identicalGroupSelect.includes(HOSPITAL_ID))&&scope.row.isFirst" 
                class="mask-input"
                :style="{width:'100%',border:'none',background:'transparentify',textAlign:'center'}"
                :value="scope.row.recordDate.split(' ')[0]" 
                @input="(value)=>changeRecordDate(scope.row,'Month',value)"
                type="text"
                :mask="() =>[/\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="recordDate"
            label="时间"
            min-width="70px"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="!identicalGroupSelect.includes(HOSPITAL_ID)">{{ scope.row.recordDate.split(" ")[1] }}</span>
              <!-- <el-input v-if="(identicalGroupSelect.includes(HOSPITAL_ID))&&scope.row.isFirst" :value="scope.row.recordDate.split(' ')[1]" @input="(value)=>changeRecordDate(scope.row,'Hour',value)"></el-input> -->
              <masked-input 
                v-if="(identicalGroupSelect.includes(HOSPITAL_ID))&&scope.row.isFirst" 
                class="mask-input"
                :style="{width:'100%',border:'none',background:'transparentify',textAlign:'center'}"
                :value="scope.row.recordDate.split(' ')[1]" 
                @input="(value)=>changeRecordDate(scope.row,'Hour',value)"
                type="text"
                :mask="() =>[/\d/, /\d/, ':', /\d/, /\d/]"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="HOSPITAL_ID == 'wujing'"
            prop="food"
            label="入量名称"
            min-width="110px"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="HOSPITAL_ID == 'wujing'"
            prop="foodSize"
            label="入量"
            min-width="110px"
            align="center"
          ></el-table-column>
          <!-- <el-table-column v-if="HOSPITAL_ID == 'quzhou'" prop="desc" label="描述" min-width="110px" align="center"></el-table-column> -->
          <template v-if="HOSPITAL_ID == 'quzhou' || HOSPITAL_ID == 'weixian'|| HOSPITAL_ID == 'liaocheng'||HOSPITAL_ID == 'foshanrenyi'||HOSPITAL_ID == 'whfk'">
            <el-table-column
              prop="orderText"
              label="医嘱内容"
              min-width="110px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="dosage"
              label="药品剂量"
              min-width="110px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="administration"
              label="途径"
              min-width="110px"
              align="center"
            ></el-table-column>
          </template>
          <el-table-column
            v-if="HOSPITAL_ID == 'guizhou'"
            prop="desc"
            label="病情、护理措施及效果"
            min-width="110px"
            align="center"
          ></el-table-column>
          <!-- <el-table-column prop="temperature" label="腋下体温(°C)" min-width="110px" align="center"></el-table-column>
          <el-table-column prop="pulse" label="脉搏/心率(次/min)" min-width="150px" align="center"></el-table-column>
          <el-table-column prop="breath" label="呼吸(次/min)" min-width="110px" align="center"></el-table-column>
          <el-table-column prop="bloodPressure" label="血压(mmHg)" min-width="110px" align="center"></el-table-column> -->
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
<style lang='stylus' rel='stylesheet/stylus' type='text/stylus' scoped>
.label {
  font-size: 16px;
  color: #000000;
  font-weight: bold;
}

.mask-input {
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
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 128px;
  margin-right: 20px;
}

.table-con {
  margin-top: 20px;

  >>>.el-table .cell, >>>.el-table th > div {
    padding: 0 5px;
  }
}
</style>
<script>
import whiteButton from "@/components/button/white-button";
import moment from "moment";
import {
  getVitalSign,
  saveVitalSign,
  ordersExecuteList,
  nurseBloodList,
  getOrdersExecuteWx,
  getOrdersExecuteLc,
  getOrdersExecuteFsry,
  getOrdersExecuteWhfk
} from "../../api/index";
import sheetInfo from "../config/sheetInfo/index";
import bus from "vue-happy-bus";
export default {
  props: {
    blockId: {
      type: Number,
      value: 0,
    },
    title: {
      type: String,
      value: "",
    },
    modalWidth: {
      type: Number,
      value: 0,
    },
  },
  data() {
    return {
      sheetInfo,
      searchDate: "",
      longDate: [moment(), moment()],
      tableData: [],
      multipleSelection: [],
      bus: bus(this),
      formlist: {},
      executeType: this.HOSPITAL_ID==='liaocheng'?"输液":"",
      repeatIndicator: "",
      identicalGroupSelect:['wujing'],
      repeatIndicatorList: [
        {
          id: "",
          name: "全部",
        },
        {
          id: "1",
          name: "长期",
        },
        {
          id: "0",
          name: "临时",
        },
      ],
    };
  },
  methods: {
    open(baseParams) {
      this.formlist = baseParams;
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
      let temArr = this.multipleSelection;
      if (
        this.multipleSelection.length != 0 &&
        // 执行单同步保存，记得去api文件saveVitalSign这个接口添加医院名字！！！！
        (this.HOSPITAL_ID == "fuyou" ||
          this.HOSPITAL_ID == "wujing" ||
          this.HOSPITAL_ID == "quzhou" ||
          this.HOSPITAL_ID == "weixian" ||
          this.HOSPITAL_ID == "liaocheng"||
          this.HOSPITAL_ID == "foshanrenyi"||
          this.HOSPITAL_ID == 'whfk')
      ) {
        this.multipleSelection.map((item, index) => {
          if (item.pulse) {
            let strArr = item.pulse.split("/");
            if (strArr[0] && strArr[1]) {
            } else {
              temArr[index].pulse = strArr[0] || strArr[1];
            }
          }
        });
      }
      if(this.sheetInfo.sheetType === 'access_lcey'){
        let filterList = JSON.parse(JSON.stringify(temArr)) 
        filterList.map((item,index)=>{
          filterList[index].orderText = item.orderText + item.dosage
          if(item.dosage.includes("g")){
            filterList[index].dosage = ""
          }
        })
        temArr = filterList
      }
      if(this.identicalGroupSelect.includes(this.HOSPITAL_ID)){
        let firstTime = ''
        temArr.map(item=>{
          item.isFirst && (firstTime = item.recordDate)
          !item.isFirst && (item.recordDate = firstTime)
        })
      }
      if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
       temArr=JSON.parse(JSON.stringify(temArr)).map(item=>{
          item.foodSize=item.dosage
          return item
        })
      }
      saveVitalSign(temArr, this.HOSPITAL_ID).then((res) => {
        this.$message.success("保存成功");
        this.close();
        this.bus.$emit("refreshSheetPage");
      });
      this.bus.$emit("refreshSheetPageOne", this.multipleSelection);
    },
    getData() {
      if (this.HOSPITAL_ID == "quzhou") {
        ordersExecuteList({
          patientId: this.patientInfo.patientId || this.formlist.patientId,
          visitId: this.patientInfo.visitId || this.formlist.visitId,
          executeDateTime: this.searchDate,
          wardCode: this.$store.state.lesion.deptCode,
          executeType: this.executeType,
        }).then((res) => {
          // this.tableData = res.data.data.list;
           // 修改后
          this.tableData = res.data.data.list.map((time) => {
            let obj = {};
            // 医嘱
            let desc = "";
            //  剂量
            let dosage = "";
            time.dataList.forEach((medicine) => {
              // 多一种药做处理
              if (time.dataList.length > 1) {
                if (obj.desc) {
                  //医嘱内容
                  desc = `${obj.orderText} , `;
                  // 剂量
                  dosage = `${obj.dosage} , `;
                }
                if (medicine.dosage === "nullnull") {
                  obj = {
                    ...medicine,
                    orderText: desc + medicine.orderText,
                    dosage: "",
                    desc: desc + medicine.orderText,
                  };
                } else {
                  obj = {
                    ...medicine,
                    orderText: desc + medicine.orderText,
                    dosage: dosage + medicine.dosage,
                    desc: desc + medicine.orderText,
                  };
                }
              } else {
                // 如果返回的只有一种药就不处理
                obj = { ...medicine ,dosage:""};
              }
            });
            return obj;
          });
        });
      } else if (this.HOSPITAL_ID == "guizhou") {
        nurseBloodList({
          patientId: this.patientInfo.patientId || this.formlist.patientId,
          visitId: this.patientInfo.visitId || this.formlist.visitId,
          executeDateTime: this.searchDate,
        }).then((res) => {
          this.tableData = res.data.data.list;
        });
      } else if (this.HOSPITAL_ID == "weixian") {
        let startDate = this.longDate[0] ? moment(this.longDate[0]).format('YYYY-MM-DD') : ''
        let endDate = this.longDate[1] ? moment(this.longDate[1]).format('YYYY-MM-DD') : ''
        getOrdersExecuteWx({
          patientId: this.patientInfo.patientId || this.formlist.patientId,
          visitId: this.patientInfo.visitId || this.formlist.visitId,
          startDate,
          endDate,
          type: this.executeType,
        }).then((res) => {
          this.tableData = res.data.data.list;
        });
      } else if (this.HOSPITAL_ID == "liaocheng") {
        let startDate = this.longDate[0] ? moment(this.longDate[0]).format('YYYY-MM-DD') : ''
        let endDate = this.longDate[1] ? moment(this.longDate[1]).format('YYYY-MM-DD') : ''
        getOrdersExecuteLc({
          patientId: this.patientInfo.patientId || this.formlist.patientId,
          visitId: this.patientInfo.visitId || this.formlist.visitId,
          startDate,
          endDate,
          executeType: this.executeType,
        }).then((res) => {
          this.tableData = res.data.data.list;
        });
      }else if (this.HOSPITAL_ID == "foshanrenyi") {
        let startDate = this.longDate[0] ? moment(this.longDate[0]).format('YYYY-MM-DD') : ''
        let endDate = this.longDate[1] ? moment(this.longDate[1]).format('YYYY-MM-DD') : ''
        getOrdersExecuteFsry({
          patientId: this.patientInfo.patientId || this.formlist.patientId,
          visitId: this.patientInfo.visitId || this.formlist.visitId,
          startDate,
          endDate,
          executeType: this.executeType,
        }).then((res) => {
          this.tableData = res.data.data.list;
        });
      } else if (this.HOSPITAL_ID == "whfk") {
        let startDate = this.longDate[0] ? moment(this.longDate[0]).format('YYYY-MM-DD') : ''
        let endDate = this.longDate[1] ? moment(this.longDate[1]).format('YYYY-MM-DD') : ''
        getOrdersExecuteWhfk({
          patientId: this.patientInfo.patientId || this.formlist.patientId,
          visitId: this.patientInfo.visitId || this.formlist.visitId,
          startDate,
          endDate,
          executeType: this.executeType,
        }).then((res) => {
          this.tableData = res.data.data.list;
        });
      }  else {
        getVitalSign(
          this.patientInfo.patientId || this.formlist.patientId,
          this.patientInfo.visitId || this.formlist.visitId,
          this.searchDate,
          this.executeType,
          this.repeatIndicator,
          this.blockId,
          this.HOSPITAL_ID
        ).then((res) => {
          if(this.identicalGroupSelect.includes(this.HOSPITAL_ID)){
            let responeList = JSON.parse(JSON.stringify(res.data.data.list))
            // responeList.push({"blockId":83941,"entityId":null,"patientId":"61505022","visitId":"1","desc":"","food":"静脉注射药物名称\b静脉注射","foodSize":"12","barcode":"222","empNo":"","empName":"","recordDate":"2021-09-12 12:12","dosage":"","administration":"","orderText":""})
            if(responeList.length){
              responeList.map(item=>{
                let targetObj = responeList.find(e=>item.barcode==e.barcode)
                if(item===targetObj){
                  item.isFirst = true
                }
              })
            }
            this.tableData = responeList;
          }else{
            this.tableData = res.data.data.list;
          }
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 同组选中
    handleSelect(selection, row){
      if(!this.identicalGroupSelect.includes(this.HOSPITAL_ID))return
      let isAdd = selection.includes(row)
      this.tableData.filter(item=>{
        return item.barcode===row.barcode
      }).map(item=>{
      this.$refs['zxdtb-table'].toggleRowSelection(item,isAdd)
      })
    },
    // 一行选中
    handleRowClick(row, column, event){
      if(!['foshanrenyi'].includes(this.HOSPITAL_ID)) return
      this.$refs['zxdtb-table'].toggleRowSelection(row)
    },
    changeRecordDate(row,type,newVal){
      let [month,hours] = row.recordDate.split(' ')
      type=='Hour' && (hours = newVal)
      type=='Month' && (month = newVal)
      row.recordDate = `${month} ${hours}`
    }
  },
  computed: {
    patientInfo() {
      if (this.sheetInfo.selectBlock) {
        return this.sheetInfo.selectBlock;
      }

      if (this.formlist != undefined) {
        return this.formlist;
      }
    },
    allType(){
      if(this.HOSPITAL_ID==='liaocheng'){
        return [
        {
          id: "",
          name: "全部",
        },
        {
          id: "输液",
          name: "输液类",
        },
        {
          id: "注射",
          name: "注射类",
        },
        {
          id: "口服",
          name: "口服药",
        }
        ]
      }else if(this.HOSPITAL_ID==='wujing'){
        return [
        {
          id: "",
          name: "全部",
        },
        {
          id: "输液",
          name: "输液",
        },
        {
          id: "注射",
          name: "注射",
        },
        {
          id: "口服",
          name: "口服",
        },
        {
          id: "雾化",
          name: "雾化",
        },
        {
          id: "皮试",
          name: "皮试",
        },
        {
          id: "治疗",
          name: "治疗",
        },
        {
          id: "理疗",
          name: "理疗",
        },
        {
          id: "护理",
          name: "护理",
        },
        {
          id: "外用",
          name: "外用",
        },
        {
          id: "化验",
          name: "化验",
        },
        {
          id: "其他",
          name: "其他",
        },
        ]
      }else if(this.HOSPITAL_ID==='foshanrenyi'){
        return [
           {
          id: "",
          name: "全部",
        },
         {
          id: "输液",
          name: "输液",
        },
         {
          id: "注射",
          name: "注射",
        },
         {
          id: "口服",
          name: "口服",
        },
         {
          id: "皮试",
          name: "皮试",
        },
         {
          id: "治疗",
          name: "治疗",
        },
         {
          id: "检验",
          name: "检验",
        },
        {
          id: "输血",
          name: "输血",
        },
        ]
      } else{
        return [
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
        ]
      }
     
    }
  },
  components: {
    whiteButton,
  },
};
</script>
