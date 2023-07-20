<template>
  <div>
    <!-- 表单编辑器医嘱同步使用这个页面。信息系统需要大改，建议新建一个组件。 -->
    <sweet-modal ref="modal" :modalWidth="modalWidth" :title="title">
      <div flex="cross:center">
        <div>
          <span class="label">执行单日期：</span>
          <el-date-picker
            v-model="searchDate"
            type="daterange"
            size="small"
            placeholder="选择日期范围"
          >
          </el-date-picker>
        </div>
        <!-- 医嘱类型 -->
        <div
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
              :label="typeItem.name"
              :value="typeItem.id"
              v-for="typeItem in yizhuType"
              :key="typeItem.name"
            ></el-option>
          </el-select>
        </div>
        <!-- 类型 -->
        <div style="margin-left: 20px">
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
          :data="tableData"
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
            min-width="160px"
            align="center"
          >
            <template slot-scope="scope">
                {{scope.row.startDate}}~{{scope.row.stopDate}}
            </template>
          </el-table-column>
          <template>
            <el-table-column
              prop="orderText"
              label="医嘱内容"
              min-width="150px"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="dosageStr"
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
            <el-table-column
              prop="frequency"
              label="频率"
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
import {orders,ordersByCondition,getExecuteType} from '@/api/patientInfo.js'
import sheetInfo from "../config/sheetInfo/index";
import bus from "vue-happy-bus";
import { mapMutations, } from "vuex";
export default {
  props: {
    blockId: {
      type: Number,
      value: 0,
    },
    title: {
      type: String,
      value: "医嘱同步",
    },
    modalWidth: {
      type: Number,
      value: 720,
    },
  },
  data() {
    return {
      sheetInfo,
      searchDate: [moment().subtract(1, 'weeks'), moment()],
      tableData: [],
      multipleSelection: [],
      bus: bus(this),
      formlist: {},
      yizhuTypeItem:"",
      executeType: "",
      repeatIndicator: "",
      identicalGroupSelect: ["wujing", 'gdtj'],
      yzcb:()=>{},
      patientInfo:{},
      yizhuType:[ 
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
      allType:[
        {
            id: "",
            name: "全部",
        },
      ]
    };
  },
  methods: {
    ...mapMutations(["upOpenModalFromSpecial", "upEvalData"]),
    open(yzcb,patientInfo) {
      // 获取类型
      if(this.allType.length<2){
        getExecuteType().then((res)=>{
        const resData=res.data.data
        if(resData.length!=0){
          resData.map((item)=>{
             this.allType.push(
              {
                id:item.executePrefix,
                name:item.executePrefix
              })
          })
        }
       })
      }
      this.patientInfo = patientInfo.patientId?patientInfo:{}
      this.yzcb = yzcb?yzcb:()=>{}
      this.getData();
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let temArr = this.multipleSelection,str="";
        if (this.multipleSelection.length == 0) return this.$message.warning("请选择一条数据");
        str = temArr.map((obj) => {
          const fields = [
           obj.orderText,
           obj.dosageStr,
           obj.administration,
           obj.frequency
          ].filter(Boolean); // 过滤掉为空的字段
          return fields.join(',');
        }).join(';');
        this.yzcb(str)
        this.close()
    },
    getData() {
        const getDataObj={
          patientId:this.patientInfo.patientId,
          visitId:this.patientInfo.visitId,
          orderText:"",//关键字查询,有需要可加
          startDate:this.searchDate[0]
           ? moment(this.searchDate[0]).format("YYYY-MM-DD 00:00:00")
           : "",
          endDate : this.searchDate[1]
           ? moment(this.searchDate[1]).format("YYYY-MM-DD 00:00:00")
           : "",
          executeType:this.executeType,//执行单类型
          repeatIndicator:this.yizhuTypeItem,//医嘱类型 传空为全部 "0":临时；"1":长期
        }
         ordersByCondition(getDataObj).then(res=>{
          this.tableData = res.data.data;
         })
    },
    handleSelectionChange(val) {
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
  },
  components: {
    whiteButton,
  },
};
</script>
