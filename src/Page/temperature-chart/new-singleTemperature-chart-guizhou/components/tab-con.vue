<template>
  <div class="right-con">
    <div class="row-top">
      <!-- <div class="column-left">
        <el-button size="mini" @click="syncInAndOutHospital((type = '0'))">
          同步入院
        </el-button>
        <el-button
          style="margin: 10px 0px"
          size="mini"
          @click="syncInAndOutHospital((type = '1'))"
        >
          同步出院
        </el-button>
      </div> -->
      <div class="column-right">
        <span style="padding-left: 5px">日期：</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="mini"
          style="display:inline-block"
          format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="query.entryDate"
          clearable
        />
        <div class="times">
          <!-- <el-radio-group v-model="query.entryTime" @change="changeEntryTime">
            <el-radio
              size="mini"
              v-for="item in timesOdd"
              :key="item.id"
              :label="item.value"
            ></el-radio>
          </el-radio-group> -->
         
       <!-- <el-select v-model="query.entryTime" filterable allow-create default-first-option  size="mini" @focus="inputClicl($event)"
            placeholder="选择时间" @change="changeValue($event)">
            <el-option v-for="item in timesOdd" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select> -->
        <el-time-select
            v-model="dateInp"
            value-format="HH:mm"
            format="HH:mm"
            @blur="changeDate"
            class="new-time-select"
          placeholder="选择时间">
        </el-time-select>
        </div>
      </div>
    </div>
    <div class="row-bottom">
      <null-bg v-if="!patientInfo.patientId"></null-bg>
      <div v-else class="showRecord">
        <div style="flex: 4">
          <el-button
            :class="
              [
                'recordList',
                dateTime.match(`${query.entryDate}  ${query.entryTime}`)
                  ? 'active'
                  : '',
              ].join(' ')
            "
            style="margin: 0px"
            v-for="(dateTime, tabIndex) in tabsData"
            :key="tabIndex"
            @click="changeQuery(dateTime)"
          >
            {{ dateTime }}
            <i
              style="font-size: 10px"
              @click="removeRecord(dateTime, tabIndex)"
              class="el-icon-close"
            ></i>
          </el-button>
        </div>
        <div style="flex: 7" class="inputText">
          <div
            :class="
              !(
                index.includes('自定义') ||
                index.includes('注释') ||
                index.includes('体温复测')
              )
                ? 'row'
                : 'rowItem_noShow'
            "
            v-for="(j, index) in multiDictList"
            :key="index"
          >
            <span :class="index==='过敏药物'?'allergyPreText':index==='病人事件'?'hisEventPreText':'preText'">{{ index }}</span>
            <el-tooltip
              placement="top"
              popper-class="custom-temp-dict-select"
              :disabled="
                !(
                  totalDictInfo[index].options &&
                  totalDictInfo[index].options.length > 0
                )
              "
              :visible-arrow="false"
              :manual="true"
              :value="vitalSignObj[j].popVisible"
             >
             <div v-if="index==='过敏药物'" class="allergyDiv">
               <div style="display:inline-block;">
                 <el-input
                  size="mini"
                  :title="vitalSignObj[j].vitalValue"
                  @input="handlePopRefresh(vitalSignObj[j])"
                  @focus="() => (vitalSignObj[j].popVisible = true)"
                  @blur="() => (vitalSignObj[j].popVisible = false)"
                  v-model="vitalSignObj[j].vitalValue">
                  <!-- <el-select slot="append"  v-model="vitalSignObj[j].selectValue" filterable allow-create default-first-option  size="mini"
                  placeholder="结果" @change="changeValue($event)" style="width:78px" >
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                  </el-select> -->
                 </el-input>
             </div>
             <el-select slot="append"  v-model="vitalSignObj[j].selectValue" filterable allow-create default-first-option  size="mini"
                 placeholder="结果" @change="changeValue($event)" style="width:78px" >
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
             </el-select>
              </div>
              <div v-if="index==='病人事件'" class="allergyDiv">
                <div style="display:inline-block;">
                  <input 
                type="text"
                :title="vitalSignObj[j].vitalValue"
                @input="handlePopRefresh(vitalSignObj[j])"
                @click="() => (vitalSignObj[j].popVisible = true)"
                @blur="() => (vitalSignObj[j].popVisible = false)"
                v-model="vitalSignObj[j].vitalValue"
                
                 />
                </div>
                <el-date-picker
                class="datePickerHisEvent"
                 size="mini"
                 format="yyyy-MM-dd HH:mm:ss"
                 value-format="yyyy-MM-dd HH:mm:ss"
                 v-model="vitalSignObj[j].expand2"
                 type="datetime"
                 placeholder="选择日期时间"
                 @change="formatTopExpandDate">
                </el-date-picker>
              </div>
              <input v-if="index!=='病人事件'"
                type="text"
                :title="vitalSignObj[j].vitalValue"
                @input="handlePopRefresh(vitalSignObj[j])"
                @click="() => (vitalSignObj[j].popVisible = true)"
                @blur="() => (vitalSignObj[j].popVisible = false)"
                v-model="vitalSignObj[j].vitalValue"
                
              />
               <template v-slot:content>
                <div
                  class="container"
                  @click.prevent="
                    () => {
                      vitalSignObj[j].popVisible = false;
                    }
                  "
                >
                  <template
                    v-if="
                      totalDictInfo[index].options &&
                      getFilterSelections(
                        totalDictInfo[index].options,
                        vitalSignObj[j].vitalValue
                      ).length > 0
                    "
                  >
                    <div
                      :key="selectionDictIdx"
                      class="selection-dict-item"
                      v-for="(option, selectionDictIdx) in getFilterSelections(
                        totalDictInfo[index].options,
                        vitalSignObj[j].vitalValue
                      )"
                      @click.prevent="
                        () => (vitalSignObj[j].vitalValue = option)
                      "
                    >
                      {{ option }}
                    </div>
                  </template>
                  <div v-else class="null-item">无匹配数据</div>
                </div>
              </template>
            </el-tooltip>
          </div>
          <div class="fieldList">
            <div style="margin: 10px 0px; font-weight: bold; font-size: 14px">
              <span>自定义项目：</span>
            </div>
            <div class="row" v-for="(i, index) in fieldList" :key="index">
              <span
                class="preText"
                style="color: blue"
                @click="updateTextInfo(i.vitalCode, i.fieldCn, i.fieldCn,index)"
                >{{ i.fieldCn }}</span
              >
              <!-- <el-tooltip
                placement="top"
                v-if="vitalSignObj[i.vitalCode]"
                popper-class="custom-temp-dict-select"
                :disabled="true"
                :visible-arrow="false"
                :manual="true"
                :value="vitalSignObj[i.vitalCode].popVisible"
              > -->
              
              <input
                type="text"
                :title="vitalSignObj[i.vitalCode].vitalValue"
                @input="handlePopRefresh(vitalSignObj[i.vitalCode])"
                @click="() => (vitalSignObj[i.vitalCode].popVisible = true)"
                @blur="() => (vitalSignObj[i.vitalCode].popVisible = false)"
                v-model="vitalSignObj[i.vitalCode].vitalValue"
              />
              <!-- <template v-slot:content>
                  <div
                    class="container"
                    @click.prevent="
                      () => {
                        vitalSignObj[i.vitalCode].popVisible = false;
                      }
                    "
                  >
                    <template
                      v-if="
                        selectionMultiDict[i.fieldCn] &&
                        getFilterSelections(
                          selectionMultiDict[i.fieldCn],
                          vitalSignObj[i.vitalCode].vitalValue
                        ).length > 0
                      "
                    >
                      <div
                        :key="selectionDictIdx"
                        class="selection-dict-item"
                        v-for="(
                          selectionDict, selectionDictIdx
                        ) in getFilterSelections(
                          selectionMultiDict[i.fieldCn],
                          vitalSignObj[j].vitalValue
                        )"
                        @click.prevent="
                          () =>
                            (vitalSignObj[j].vitalValue = selectionDict.name)
                        "
                      >
                        {{ selectionDict.name }}
                      </div>
                    </template>
                    <div v-else class="null-item">无匹配数据</div>
                  </div>
                </template>
              </el-tooltip> -->
            </div>
          </div>
          <div class="fieldList" v-if="multiDictList['体温复测']">
            <div class="row">
              <span class="preText">体温复测</span>
              <input
                type="text"
                v-model="vitalSignObj[multiDictList['体温复测']].vitalValue"
              />
            </div>
          </div>
          <div>
            <el-button
              type="primary"
              class="save-btn"
              @click="saveVitalSign(vitalSignObj)"
              >保存</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "vue-happy-bus";
import moment from "moment";
import nullBg from "../../../../components/null/null-bg";
import $ from 'jquery'
// import "../../sheet/jquery-editable-select.min.js";

import {
  getVitalSignListBy10,
  getmultiDict,
  getfieldList,
  savefieldTitle,
  autoVitalSigns,
  saveAll,
  deleteRecord,
  getLastList,
  getViSigsByReDate,
} from "../../api/api";
import { mockData, recordList, selectionMultiDict } from "../data/data";
export default {
  props: { patientInfo: Object },
  data() {
    // 初始化筛选时间
    let initTimeArea = {
      ["02"]: ["00:00", "05:59"],
      ["06"]: ["06:00", "09:59"],
      ["10"]: ["10:00", "13:59"],
      ["14"]: ["14:00", "17:59"],
      ["18"]: ["18:00", "21:59"],
      ["22"]: ["22:00", "23:59"],
    };
    let entryTime = "02:00:00";
    let currentSecond =
      new Date().getHours() * 60 + new Date().getMinutes() * 1;

    Object.keys(initTimeArea).forEach((time) => {
      
      // console.log(time)
      let [start, end] = initTimeArea[time];

      let startSecond = start.split(":")[0] * 60 + start.split(":")[1] * 1;

      let endSecond = end.split(":")[0] * 60 + end.split(":")[1] * 1;
      if (currentSecond >= startSecond && currentSecond <= endSecond)
        entryTime = time;
    });

    return {
      mockData,
      dateInp:moment().format('HH:mm'),
      recordList,
      bus: bus(this),
      editableTabsValue: "2",
      selectValue:'',
      options: [{
                    value: '阴性',
                    label: '阴性'
                }, {
                    value: '阳性',
                    label: '阳性'
                }, ],
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (()=>{
          if (this.getHours() >= 0 && this.getHours() <= 2) {
                return "02:00:00";
              }
              if (this.getHours() > 2 && this.getHours() <= 6) {
                return "06:00:00";
              }
              if (this.getHours() > 6 && this.getHours() <= 10) {
                return "10:00:00";
              }
              if (this.getHours() > 10 && this.getHours() <= 14) {
                return "14:00:00";
              }
              if (this.getHours() > 14 && this.getHours() <= 18) {
                return "18:00:00";
              }
              if (this.getHours() > 18 && this.getHours() <= 23) {
                return "22:00:00";
              }
         //录入时间
        })() //录入时间
      },
      recordDate: "",
      fieldList: {}, // 自定义项目列表
      multiDictList: {},
      timeValue:'',
      tabsData: [], // 日期列表
       value:'',
      vitalSignObj: {}, // 单个体征对象
      vitalSignList: [], // 固定项目列表
      nurseEventsCheck: [
       
      ],
      topContextList: [
        "",
        "入院",
        "转入",
        "手术",
        "分娩",
        "出院",
        "出生",
        "手术入院",
        "死亡",
      ],
      timesOdd: [
        {
         lable:"02:00:00",
          value: "02:00:00",
        },
        {
          lable: "06:00:00",
          value: "06:00:00",
        },
        {
          lable: "10:00:00",
          value: "10:00:00",
        },
        {
           lable: "14:00:00",
          value: "14:00:00",
        },
        {
            lable: "18:00:00",
          value: "18:00:00",
        },
        {
          lable: "22:00:00",
          value: "22:00:00",
        },
      ],
      bottomContextList: ["", "不升"],
      topExpandDate: "",
      bottomExpandDate: "",
      totalDictInfo: {},
      selectionMultiDict: selectionMultiDict,
    };
  },
  async mounted() {
    await this.getVitalList();
    this.bus.$on("refreshVitalSignList", () => {
      this.getList();
    });
  },
  computed: {},
  watch: {
    query: {
      handler(newName, oldName) {
        this.getList();
      },
      deep: true,
    },
  },
  methods: {
    //时间组件失去焦点
    changeDate(val){
      //console.log(val.$el.children[1].value);
      let numberVal=val.$el.children[1].value;
      if(!moment(numberVal,"HH:mm",true).isValid()) {
          this.$message.error("请输入正确时间数值，例如23:25, 2325");
          return false;
      }
      if((numberVal.indexOf(":")==-1 && numberVal.length==4) || (numberVal.indexOf(":")!=-1 && numberVal.length==5)){
        let time = numberVal.indexOf(":")==-1?`${numberVal.substring(0,2)}:${numberVal.substring(2,4)}`:`${numberVal.substring(0,2)}:${numberVal.substring(3,5)}`;
        console.log(moment(time).format("HH:mm"))
        if(!moment(numberVal,"HH:mm",true).isValid()) {
          this.$message.error("请输入正确时间数值，例如23:25, 2325");
          return false;
        }
        let [hours,min] = time.split(':')
        if(0<=hours && hours<=24 && 0<=min && min<=59){
          this.query.entryTime = time+":00"
          this.dateInp=this.query.entryTime
        }else {
          this.$message.error("请输入正确时间数值，例如23:25, 2325")
        }
      }
    },
      changeValue(e){
                    // console.log(e)
                 },
                 inputClicl(s){
                  //  console.log(s)
                 },

    init() {
      let obj = {};
      if (!this.multiDictList) return;
      /* 根据字典项构造一个对象(键为生命体征的中文名，值为对应的对象)：{"体温":{}} */
      for (let key in this.multiDictList) {
        obj[this.multiDictList[key]] = {
          // bedLabel: "",
          // classCode: "",
          // createDateTime: "",
          // expand1: "",
          // expand2: "",
          // expand3: "",
          // // id: {
          // //   patientId: "",
          // //   recordDate: "",
          // //   visitId: "",
          // //   vitalSigns: "",
          // //   wardCode: ""
          // // },
          // nurse: "",
          // patientId: this.patientInfo.patientId,
          // recordDate: "",
          // source: "",
          // units: "",
          // visitId: this.patientInfo.visitId,
          // vitalCode: this.multiDictList[key],
          // vitalSigns: key,
          // vitalValue: "",
          // wardCode: this.patientInfo.wardCode
          selectValue:"",
          createDateTime: "",
          patientId: this.patientInfo.patientId,
          visitId: Number(this.patientInfo.visitId) ,
          recordDate: "",
          vitalSigns: key,
          wardCode: this.patientInfo.wardCode,
          vitalValue: "",
          units: "",
          vitalCode: this.multiDictList[key],
          classCode:
            (this.totalDictInfo[key] || { classCode: "" }).classCode || "",
          nurse: "",
          bedLabel: "",
          expand1: "",
          expand2: "",
          expand3: "",
          source: "",
          customTitle: false,
          popVisible: false,
        };
      }
      this.vitalSignObj = { ...obj };
    },
     getHours() {
      let date = new Date();
      let b = date.getHours();
      return b;
    },
    
//  addEnterListener() {
// //  if (window.__completeEnterBind__) return;
//  window.addEventListener("keydown", this.enterCallback());
// // window.addEventListener("keydown",this.test())
// //  window.__completeEnterBind__ = true;
//  },
//  removeEnterListener() {
//  window.removeEventListener("keydown", this.enterCallback());
//  window.__completeEnterBind__ = false;
//  },
//  enterCallback(e) {
//  function findFormItem(el) {
//  const parent = el.parentElement;
//  if (!parent) return document.body;
//  if (
//   parent.className.includes("rowItem_noShow") &&
//   parent.className.includes("row")
//  ) {
//   return parent;
//  }
//  return findFormItem(parent);
//  }
//  function findInput(container) {
//  let nextEl = container.nextElementSibling;
//  if (!nextEl) return;
//  let input = nextEl.querySelector("input");
//  while (input.id === "el-select") {
//   nextEl = nextEl.nextElementSibling;
//   if (!nextEl) return;
//   input = nextEl.querySelector("input");
//  }
//  if (input.className.includes("el-tooltip")) return input;
//  }
//  if (e.keyCode === 13) {
//  const container = findFormItem(document.activeElement);
//  indInput(container) && findInput(container).focus();
//  }
//  },


 
//     nextInput(e){ 

// console.log(e)

// let acticeDom=document.activeElement
// let nextEl = acticeDom.nextElementSibling;
// console.log(acticeDom)
// console.log(nextEl)
// // let idom=$('.inputText')
// // let inputList=idom.querySelectorAll('.el-tooltip')
// // let currentIndex=0;
// // for(let i=0;i<inputList.length;i++){
// // if(e.target===inputList[i]) currentIndex=i

// // }


//     },
    
    async getList() {
      /* 初始化 */
      this.tabsData = [];
      /* 定义 */
      let obj = {};
      let data = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        recordDate: this.query.entryDate
          ? moment(new Date(this.query.entryDate)).format("YYYY-MM-DD")
          : moment(new Date(this.patientInfo.admissionDate)).format(
              "YYYY-MM-DD"
            ),
        wardCode: this.patientInfo.wardCode,
      };
      await this.getVitalList();
      /* 获取患者某个时间点的体征信息 */
      await getVitalSignListBy10({
        visitId: data.visitId,
        patientId: data.patientId,
      }).then((res) => {
        res.data.data.map((item, index) => {
          /* 如果该患者没有体温单记录则返回 */
          if (!item.recordDate) return;
          /* 时间数组 */
          this.tabsData.push(item.recordDate);
        });
      });
      /* 获取患者某个时间点的体征信息--entryDate、entryTime变化就调查询接口 */
      await this.getViSigs();
      /* 获取固定列表的接口 */
      await getfieldList({
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        wardCode: this.patientInfo.wardCode,
      }).then((res) => {
        res.data.data.list.map((item) => {
          if (this.vitalSignObj[item.vitalCode])
            this.fieldList[item.vitalCode] = item;
        });
      });
    },
    /* 日期搜索功能 */
    selectTemRec(val) {
      this.query.entryDate = val;
    },

     getHours() {
      let date = new Date();
      let b = date.getHours();
      return b;
    },
    /* 选择固定时间点 */
    changeEntryTime(val) {
      this.query.entryTime = val;
    },
    /* 联动修改查询的日期和时间 */
    changeQuery(value) {
      let temp = value;
      this.query.entryDate = temp.slice(0, 10);
      this.query.entryTime = value.slice(12, 17);
      //this.query.entryTime = value.slice(12, 20);
      //赋值初始值
      this.dateInp = value.slice(12, 17);
    },
    getFilterSelections(orgin, filterStr) {
      if (!filterStr || !filterStr.trim()) return orgin;

      return orgin.filter((option) => option.includes(filterStr));
    },
    handlePopRefresh(target) {
      target.popVisible = false;

      setTimeout(() => (target.popVisible = true), 100);
    },
    /* 获取患者某个时间点的体征信息--entryDate、entryTime变化就调查询接口  */
    getViSigs() {
      let data = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        dateStr: this.query.entryDate
          ? moment(new Date(this.query.entryDate)).format("YYYY-MM-DD")
          : moment(new Date(this.patientInfo.admissionDate)).format(
              "YYYY-MM-DD"
            ),
        timeStr: this.query.entryTime,
        wardCode: this.patientInfo.wardCode,
      };
      getViSigsByReDate(data).then((res) => {
        if (res.data.data.length > 0) {
          /* 如果该时间点有记录 */
          res.data.data.map((v, idx) => {
            this.vitalSignObj[v.vitalCode] = {
              ...v,
              popVisible: false,
            };
          });
        } else {
          this.init();
        }
      });
    },
    /* 获取字典表，整理某一行的同步信息 */
    async getVitalList() {
      let wardCode = this.patientInfo.wardCode;
      await getmultiDict(wardCode).then((res) => {
        // console.log('sss',res)
        let data = [];
        let obj = [];
        res.data.data.map((item, index) => {
          data[item.vitalSign] = item.vitalCode;
          this.totalDictInfo[item.vitalSign] = {
            ...item,
            options: item.selectType ? item.selectType.split(",") : [],
            
          };
// console.log('options',Object.values(this.totalDictInfo)||[])
          if (item.vitalSign.includes("自定义")) {
            obj[item.vitalCode] = {
              fieldCn: item.vitalSign,
              patientId: this.patientInfo.patientId,
              visitId: this.patientInfo.visitId,
              vitalCode: item.vitalCode,
              wardCode: this.patientInfo.wardCode,
              classCode: item.classCode,
            };
            this.fieldList = { ...obj };
          }
        });

        this.multiDictList = { ...data };
        this.init();
      });
    },
    /* 删除记录 */
    async removeRecord(targetName, index) {
      await this.$confirm("是否确删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      }).then(() => {
        deleteRecord({
          patientId: this.patientInfo.patientId,
          recordDate: targetName,
          visitId: this.patientInfo.visitId,
          wardCode: this.patientInfo.wardCode,
        }).then((res) => {
          this.getList();
          this.bus.$emit("refreshImg");
        });
      });
    },
    /* 同步入院、同步出院 */
    syncInAndOutHospital(type) {
      autoVitalSigns({
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        type: type,
      }).then(async (res) => {
        this.$message.success("同步成功");
        await this.bus.$emit("refreshImg");
      });
    },
    /* 修改自定义标题，弹出弹窗并保存 */
    updateTextInfo(key, label, autotext,index) {
      let checkValue = Object.values(this.fieldList)||[]
     let  checkValueStr=checkValue.map(item=>item.fieldCn)
      window.openSetTextModal(
        (text) => {
          let data = {
            patientId: this.patientInfo.patientId,
            visitId: this.patientInfo.visitId,
            wardCode: this.patientInfo.wardCode,
            vitalCode: key,
            fieldCn: text,
          };
          if(
            checkValueStr.includes(text)
          ){
 this.$message.error(`修改${label}失败!已存在${text}项目`);
          }else{
          savefieldTitle(data).then((res) => {
             this.fieldList[index].fieldCn=text;
            this.$message.success(`修改${label}成功`);
          });
          }
          // this.getList();
        },
        
        autotext,
        `修改${label}`
      );
    },
    /* 录入体温单 */
    async saveVitalSign(value) {
      let obj = Object.values(value);
      obj.map((item) => {
        item.recordDate =
          moment(new Date(this.query.entryDate)).format("YYYY-MM-DD")+"  "+
          this.query.entryTime ;
        switch (item.vitalSigns) {
          case "表顶注释":
            item.expand2 = this.topExpandDate;
            break;
            case "病人事件":
              item.expand1=item.vitalValue
              item.expand2==='Invalid date'?
                item.expand2='':
            item.expand2 = this.topExpandDate;
            break;
            case "过敏药物":
              item.expand1= item.vitalValue
             item.expand2=item.selectValue
            break;
          case "表底注释":
            item.expand2 = this.bottomExpandDate;
          default:
            break;
        }
      });
      let data = {
        dateStr: moment(new Date(this.query.entryDate)).format("YYYY-MM-DD"),
        timeStr: this.query.entryTime,
        vitalSignList: obj,
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
      };
      await saveAll(data).then((res) => {
        this.$message.success("保存成功");
      });
      this.getList();
      this.bus.$emit("refreshImg");
    },
    formatTopExpandDate(val) {
      this.topExpandDate = val;
    },
    formatBtmExpandDate(val) {
      this.bottomExpandDate = val;
    },
  },
  components: { nullBg },
};
</script>

<style lang="stylus" scoped>
.right-con {
  width: 100%;
  background: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  .row-top {
    display: flex;

    .column-left {
      margin: 0px 45px 0px 30px;
      display: flex;
      flex-direction: column;
    }
  }
.times {
  display:inline-block;
  width:100px;
  .new-time-select{
    height: 22px;
    width: 105px;
    >>>.el-input__inner{
    height: 22px !important;
    width:105px;
    
  }
  
}
}
  .row-bottom {
    .showRecord {
      display: flex;
      height: 100%;

      >div {
        overflow: auto;

        .recordList {
          width: 180px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #eee;
          padding: 0 6px;

          &.active {
            color: rgb(68, 158, 127);
          }
        }
      }
    }
  }

  .rowItem_noShow {
    display: none;
  }

  .row {
    display: inline-block;
    padding: 3px 15px;

    .preText {
      display: inline-block;
      width: 70px;
    }
    .allergyPreText,.hisEventPreText{
      display: inline-block;
      width: 70px;
      position: relative;
      // top: -20px;
    }
    .allergyPreText{
      top: -20px;
    }
    .datePickerHisEvent{
      left: -75px;
      position: relative;
      width: 143px;
      display:none;
    }
    .allergyDiv{
        display: inline-block;
        width: 68px;
        >>>.el-input__inner{
        height: 20px !important;
        outline: none;
        padding: 0;
        padding: 1px 2px;
        border:1px solid rgb(118, 118, 118);
      }
    }

    input {
      width: 60px;
      font-size: 12px;
    }

    .el-select {
      width: 85px;
    }
  }

  .save-btn {
    position: relative;
    left: 30%;
    margin-top: 10px;
    width: 100px;
  }
}
>>> .el-picker-panel.time-select{
  width:105px;
}
</style>

<style lang="scss">
.custom-temp-dict-select {
  background: #fff !important;
  color: #000 !important;
  border: 1px solid #ddd;
  .container {
    min-width: 100px;
    min-height: 26px;
    max-height: 100px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .null-item {
    line-height: 24px;
    text-align: center;
  }
  .selection-dict-item {
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    &:hover {
      background: rgb(111, 192, 164) !important;
      color: #fff !important;
    }
  }
}

</style>
