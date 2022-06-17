import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";

let 表底注释 = [];
let 表顶注释 = [];
// 医院反应下拉会无反应。bug这边复现不了，可能是发请求拿数据是卡住。所以数据写死
// let 表底注释 = ['拒测','不在','外出','不升','请假','右PPD','左PPD','PPD︵-︶','PPD︵+︶','PPD︵++︶','PPD︵+++︶','冰敷','退热贴','冷水枕','降温毯','温水浴','辅助呼吸','PDD','停辅助呼吸'];
// let 表顶注释= ['入院|','手术','分娩|','出院|','转入|','死亡|','排胎|','出生|','手术分娩|','手术入院|','转出|'];

export default [{
  key: "recordMonth", //日期
  value: "",
  event: event_date,
  click: click_date
},
{
  key: "recordHour", //时间
  value: "",
  event: event_time,
  autoComplete: {
    data: ["04:00", "08:00", "12:00", "16:00", "20:00", "23:00"]
  }
},
{
  key: "temperature", //体温
  value: "",
  event: keyf1,
  name: "体温",
  next: "℃"
},
{
  key: "pulse", //脉搏
  value: "",
  event: keyf1,
  name: "脉搏",
  next: "次/分"
}, {
  key: "breath", //呼吸
  value: "",
  event: keyf1,
  name: "呼吸",
},
{
  key: "bloodPressure", //血压
  value: "",
  event: function (e, td) {
    if (e.keyCode == 32) {
      e.target.value += "/";
      e.preventDefault();
    }
    keyf1(e, td);
  },
  name: "血压",
  next: "mmHg"
},
{
  key: "heartRate", //心率
  value: "",
  event: keyf1,
  name: "心率",
  next: "次/分"
},
{
  key: "physicalCooling", //物理降温
  value: "",
  event: keyf1,
  name: "物理降温",
},
{
  key: "curWeight", //体重
  value: "",
  event: keyf1,
  name: "体重",
},
{
  key: "fieldOne", //肛表
  value: "",
  event: keyf1,
  name: "肛表"
},
{
  key: "fieldTwo", //口表
  value: "",
  event: keyf1,
  name: "口表"
},
// {
//   key: "deptName", //科室
//   value: "",
//   event: keyf1,
//   name: "科室",
// },
// {
//   key: "bedNo", //床号
//   value: "",
//   event: keyf1,
//   name: "床号"
// },
{
  key: "feverTemperature", //发热体温
  value: "",
  event: keyf1,
  name: "发热体温"
},
{
  key: "onlineCooling", //线上降温
  value: "",
  event: keyf1,
  name: "线上降温",
},
{
  key: "ventilatorR", //呼吸机R
  value: "",
  event: keyf1,
  name: "呼吸机R",
},
{
  key: "nursingEvent", //护理事件
  value: "",
  event: keyf1,
  name: "护理事件",
},
{
  key: "bottomComment", //表底注释
  value: "",
  event: keyf1,
  name: "表底注释",
  autoComplete: {
    data: 表底注释
  },
  textarea: {
    width: 36
  },
  // splice: true,
  style: 'overflow: hidden',
},
{
  key: "topComment", //表顶注释
  value: "",
  event: keyf1,
  name: "表顶注释",
  autoComplete: {
    data: 表顶注释
  },
  textarea: {
    width: 36
  },
  // splice: true,
  style: 'overflow: hidden',
},
// {
//   key: "height", //身高
//   value: "",
//   event: keyf1,
//   name: "身高"
// },
{
  key: "stoolNum", //大便次数
  value: "",
  event: keyf1,
  name: "大便次数",
},
{
  key: "fieldThree", //尿量
  value: "",
  event: keyf1,
  name: "尿量",
},
{
  key: "dischargeSize", //出量
  value: "",
  event: keyf1,
  name: "出量",
},
{
  key: "foodSize", //入量
  value: "",
  event: keyf1,
  name: "入量",
},
{
  key: "fieldFour", //自1
  value: "",
  event: keyf1,
},
{
  key: "fieldFive", //自2
  value: "",
  event: keyf1,
},
{
  key: "fieldSix", //自3
  value: "",
  event: keyf1,
},
{
  key: "fieldSeven", //自4
  value: "",
  event: keyf1,
},
{
  key: "description", //特殊情况记录
  value: "",
  hidden: true,
  style: {
    textAlign: "left",
    position: "absolute",
    top: "1px",
    bottom: "1px",
    left: "1px",
    width: "180px",
    background: "transparent"
  },
  event: function (e, td) {
    console.log(e.keyCode);
    if (e.keyCode == 9) {
      td.value = "    " + td.value;
      e.preventDefault();
    }
    keyf1(e, td);
  }
  // oninput: next
},
{
  key: "empName",
  value: "",
},
// {
//   key: "sign",
//   value: ""
// },
{
  hidden: true,
  key: "id",
  value: ""
},
{
  hidden: true,
  key: "signerName",
  value: ""
},
{
  hidden: true,
  key: "status",
  value: ""
},
{
  hidden: true,
  key: "recordSource",
  value: ""
},
{
  hidden: true,
  key: "recordYear",
  value: ""
},
{
  hidden: true,
  key: "dataHash",
  value: ""
},
{
  hidden: true,
  key: "recordDate",
  value: ""
},
{
  hidden: true,
  key: "monthHour",
  value: ""
},
{
  hidden: true,
  key: "signerNo",
  value: ""
},
{
  hidden: true,
  key: "auditorNo",
  value: ""
},
{
  hidden: true,
  key: "auditorName",
  value: ""
},
{
  hidden: true,
  key: "empNo",
  value: ""
},
{
  hidden: true,
  key: "multiSign",
  value: false
}
];


let filterKey = '花都' + ':';
let filterKey2 = '体温单' + ':';
let filterKey2Arr = ["表底注释", "表顶注释"];

export function getListData4() {
  let list = [
    "表底注释",
    "表顶注释",
  ];

  list = list.map(key => {
    return filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(表底注释, "表底注释", data);
    setList(表顶注释, "表顶注释", data);
  });
}

getListData4();

/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 * @param {*} isChildOptions 当前选项是否有下拉子选项
 */
function setList(list, key, data,) {
  key = filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;

  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }

}
