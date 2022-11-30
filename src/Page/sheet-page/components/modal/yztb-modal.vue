<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="modalWidth" :title="title">
      <div flex="cross:center">
        <div
          v-if="
            [
              'weixian',
              'liaocheng',
              'foshanrenyi',
              'whfk',
              'lyxrm',
              'whhk',
              '925'
            ].includes(HOSPITAL_ID)
          "
        >
          <span class="label">执行单日期：</span>
          <el-date-picker
            v-model="longDate"
            type="daterange"
            size="small"
            placeholder="选择日期范围"
          >
          </el-date-picker>
        </div>
        <div
          v-if="showAdvice"
          style="margin-left: 20px"
        >
          <span class="label">医嘱类型：</span>
          <el-select
            v-model="yizhuTypeItem"
            placeholder="请选择"
            size="small"
            style="width: 150px"
          >
            <el-option
              :label="typeItem.label"
              :value="typeItem.label"
              v-for="typeItem in yizhuTyoe"
              :key="typeItem.label"
            ></el-option>
          </el-select>
        </div>

        <div
          v-if="
            [
              'quzhou',
              'weixian',
              'liaocheng',
              'foshanrenyi',
              'whfk',
              'lyxrm',
              'whhk',
              '925'
            ].includes(HOSPITAL_ID)
          "
          style="margin-left: 20px"
        >
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
        <whiteButton
          style="margin-left: 20px"
          text="查询"
          @click="getData"
        ></whiteButton>
      </div>
      <div class="table-con">
        <el-table
          ref="zxdtb-table"
          :data="tableDatalist"
          border
          height="350"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
          @row-click="handleRowClick"
        >
          <el-table-column
            type="selection"
            width="40"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="startDate"
            label="日期"
            min-width="200px"
            align="center"
          >
            <template slot-scope="scope">
                {{scope.row.startDate}}~{{scope.row.stopDate}}
            </template>
          </el-table-column>
          <template
            v-if="
              [
                'quzhou',
                'weixian',
                'liaocheng',
                'foshanrenyi',
                'whfk',
                'lyxrm',
                'whhk',
                '925'
              ].includes(HOSPITAL_ID)
            "
          >
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
            v-if="['guizhou'].includes(HOSPITAL_ID)"
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
  getOrdersExecuteWhfk,
} from "../../api/index";
import {orders} from '@/api/patientInfo.js'
import sheetInfo from "../config/sheetInfo/index";
import bus from "vue-happy-bus";
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    blockId: {
      type: Number,
      value: 0,
    },
    title: {
      type: String,
      value: "执行单同步",
    },
    modalWidth: {
      type: Number,
      value: 720,
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
      yizhuTypeItem:["输液"],
      executeType: ["liaocheng", "lyxrm", "whhk"].includes(this.HOSPITAL_ID)
        ? "输液"
        : "",
      repeatIndicator: "",
      identicalGroupSelect: ["wujing", 'gdtj'],
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
      yzcb:()=>{},
      patientInfo:{},
      // 是否显示医嘱类型
      showAdvice: ['foshanrenyi'].includes(this.HOSPITAL_ID),
    };
  },
  methods: {
    ...mapMutations(["upOpenModalFromSpecial", "upEvalData"]),
    open(yzcb,patientInfo) {
      console.log(yzcb,"yzcb")
      this.patientInfo = patientInfo.patientId?patientInfo:{}
      this.yzcb = yzcb?yzcb:()=>{}
      // this.formlist = baseParams;
      // if (!this.patientInfo.patientId && !baseParams.patientId) {
      //   return this.$message.warning("请选择一名患者");
      // }
      this.searchDate = moment().format("YYYY-MM-DD");
      this.getData();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      console.log(temArr,"temArr")
      let temArr = this.multipleSelection,str="";
        if (this.multipleSelection.length == 0) return this.$message.warning("请选择一条数据");
        temArr.map((item,index)=>{
          str +=index==temArr.length-1?item.orderText:item.orderText+','
        })
        this.yzcb(str)
        // let text = this.formatData().join('\n')
        // this.upEvalData(text)
        // this.upOpenModalFromSpecial(false)
        this.close()
      // if (
      //   this.multipleSelection.length != 0 &&
      //   // 执行单同步保存，记得去api文件saveVitalSign这个接口添加医院名字！！！！
      //   [
      //     "fuyou",
      //     "wujing",
      //     'gdtj',
      //     "quzhou",
      //     "weixian",
      //     "liaocheng",
      //     "foshanrenyi",
      //     "whfk",
      //     "lyxrm",
      //     "whhk",
      //     '925'
      //   ].includes(this.HOSPITAL_ID)
      // ) {
      //   this.multipleSelection.map((item, index) => {
      //     if (item.pulse) {
      //       let strArr = item.pulse.split("/");
      //       if (strArr[0] && strArr[1]) {
      //       } else {
      //         temArr[index].pulse = strArr[0] || strArr[1];
      //       }
      //     }
      //   });
      // }
      // if (this.sheetInfo.sheetType === "access_lcey") {
      //   let filterList = JSON.parse(JSON.stringify(temArr));
      //   filterList.map((item, index) => {
      //     filterList[index].orderText = item.orderText + item.dosage;
      //     if (item.dosage.includes("g")) {
      //       filterList[index].dosage = "";
      //     }
      //   });
      //   temArr = filterList;
      // }
      // if (this.identicalGroupSelect.includes(this.HOSPITAL_ID)) {
      //   let firstTime = "";
      //   temArr.map((item) => {
      //     item.isFirst && (firstTime = item.recordDate);
      //     !item.isFirst && (item.recordDate = firstTime);
      //   });
      // }
      /**【武警】保存前将入量内容food中'\b'后的数据进行删除*/
      // if (["wujing",'gdtj'].includes(this.HOSPITAL_ID)) {
      //   temArr = JSON.parse(JSON.stringify(temArr)).map((item) => {
      //     item.food = item.food.split("\b")[0];
      //     return item;
      //   });
      // }
      // if (["foshanrenyi", "lyxrm", "whhk", '925'].includes(this.HOSPITAL_ID)) {
      //   temArr = JSON.parse(JSON.stringify(temArr)).map((item) => {
      //     item.foodSize = item.dosage;
      //     return item;
      //   });
      // }
      // saveVitalSign(temArr, this.HOSPITAL_ID).then((res) => {
      //   this.$message.success("保存成功");
      //   this.close();
      //   this.bus.$emit("refreshSheetPage");
      // });
      // this.bus.$emit("refreshSheetPageOne", this.multipleSelection);
    },
    getData() {
        let startDate = this.longDate[0]
          ? moment(this.longDate[0]).format("YYYY-MM-DD")
          : "";
        let endDate = this.longDate[1]
          ? moment(this.longDate[1]).format("YYYY-MM-DD")
          : "";
          orders(this.patientInfo.patientId,this.patientInfo.visitId).then(res=>{
            console.log("orders",res)
            this.tableData = res.data.data;
          })
        // getOrdersExecuteFsry({
        //   patientId: this.patientInfo.patientId || this.formlist.patientId,
        //   visitId: this.patientInfo.visitId || this.formlist.visitId,
        //   startDate,
        //   endDate,
        //   executeType: this.executeType,
        // }).then((res) => {
        //   this.tableData = res.data.data.list;
        // });
    },
    handleSelectionChange(val) {
      console.log(val,"handleSelectionChange")
      this.multipleSelection = val;
    },
    // 同组选中
    handleSelect(selection, row) {
      if (!this.identicalGroupSelect.includes(this.HOSPITAL_ID)) return;
      let isAdd = selection.includes(row);
      this.tableData
        .filter((item) => {
          return item.barcode === row.barcode;
        })
        .map((item) => {
          this.$refs["zxdtb-table"].toggleRowSelection(item, isAdd);
        });
    },
    // 一行选中
    handleRowClick(row, column, event) {
      if (!["foshanrenyi", '925'].includes(this.HOSPITAL_ID)) return;
      this.$refs["zxdtb-table"].toggleRowSelection(row);
    },
    changeRecordDate(row, type, newVal) {
      let [month, hours] = row.recordDate.split(" ");
      type == "Hour" && (hours = newVal);
      type == "Month" && (month = newVal);
      row.recordDate = `${month} ${hours}`;
    },
    formatData() {
      return this.multipleSelection.map(v => {
        return ['recordDate', 'orderText', 'dosage', 'administration'].reduce((sum, cur) => {
          if (v[cur]) {
            sum += (v[cur] + ' ')
          }
          return sum
        }, '')
      })
    }
  },
  computed: {
    tableDatalist(){
      let tableDatalist = [],tableDatalist2=[]
      if(this.yizhuTypeItem==="" && this.executeType===""){
        console.log(this.tableData,"tableDatalist")
        return this.tableData
      }else {
        if(this.yizhuTypeItem){
          this.tableData.map(item=>{
            if(item.repeatIndicator===this.yizhuTypeItem) tableDatalist.push(item)
          })
        }else tableDatalist = [...this.tableData]
        if(this.executeType){
          tableDatalist.map(item=>{
            if(item.orderClass===this.executeType) tableDatalist2.push(item)
          })
        }
        console.log(tableDatalist,"tableDatalist")
        return tableDatalist2
      }
    },
    yizhuTyoe(){
      return [
        { label: "输液" },
        { label: "注射" },
        { label: "口服" },
        { label: "雾化" },
        { label: "皮试" },
        { label: "治疗" },
        { label: "理疗" },
        { label: "护理" },
        { label: "外用" },
        { label: "化验" },
        { label: "其他" },
      ]
    },
    allType() {
        return [
          {
            id: "",
            name: "全部",
          },
          {
            id: "药品",
            name: "药品",
          },
          {
            id: "检查",
            name: "检查",
          },
          {
            id: "检验",
            name: "检验",
          },
          {
            id: "所属床位收费项目",
            name: "所属床位收费项目",
          },
          {
            id: "卫材",
            name: "卫材",
          },
          {
            id: "医疗",
            name: "医疗",
          },
          {
            id: "手术",
            name: "手术",
          },
          {
            id: "护理",
            name: "护理",
          },
        ];
    },
  },
  components: {
    whiteButton,
  },
};
</script>
