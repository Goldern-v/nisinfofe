/**
  佛山杏坛 - 护理记录单(产前待产记录)
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6) 的意思是宽度设置45，字数限制6个。
    2、（1）autoComplete: { data: [] } 为下拉框显示序号，根据需要添加。（2）autoComplete: { data: [{name:'',value:''}] } 为下拉框显示序号+内容，根据需要添加。
    3、splice: '' 为下拉框多选功能，搭配autoComplete使用, (''内容可自定义,splice: '/'为用“/”分隔)。
    4、name、next 为双击弹窗的内容，name为标题，next是单位。
    5、自定义项目，在th里要写 canSet: true , key: '' , key值为th对应tr的key值。
    6、{ key: "sign", value: "" } { hidden: false, key: 'signerNo', value: ''} 单签 
        { key: "sign2", value: "" } { hidden: false, key: 'signerNo2', value: ''} 双签
        { key: "audit", value: "" } { hidden: false, key: 'auditorNo', value: ''} 审核签名
        当开启多个签名功能时，记得将hidden变为false，如果是true, 就会被隐藏,根据需要使用。
    7、多个签名时还需要在sheet-print-page.vue和excel.vue里配置打印样式。
*/

import { multiDictInfo } from "../../../api/index";
import { keyf1, limitChange } from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time,
  click_cancel
} from "../keyEvent/date";

let ysList = ["√", "+", "±", "++", "+++", "谵妄"];
let tyList = [
  "○",
  "I",
  "II",
  "III",
  "√",
  "×",
  "+",
  "++",
  "+++",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I"
];
let measureList = [
  { name: "A饮食指导", value: "A" },
  { name: "B心理支持", value: "B" },
  { name: "C指导室内活动", value: "C" },
  { name: "D绝对卧床休息", value: "D" },
  { name: "E左侧卧位", value: "E" },
  { name: "F头低足高卧位", value: "F" },
  { name: "G指导产妇深呼吸", value: "G" },
  { name: "H指导产妇屏气", value: "H" },
  { name: "I按摩腰骶部", value: "I" },
  { name: "J母乳喂养指导", value: "J" },
  { name: "K会阴护理", value: "K" },
  { name: "L指导排尿", value: "L" },
  { name: "M留陪人", value: "M" },
  { name: "N其他", value: "N" }
];
let safeList = [
  { name: "A留陪人", value: "A" },
  { name: "B防压疮", value: "B" },
  { name: "C防跌倒，防坠床", value: "C" },
  { name: "D挂标识、防药物外渗", value: "D" },
  { name: "E挂标识、防脱管", value: "E" },
  { name: "F防烫伤", value: "F" },
  { name: "G其他", value: "G" }
];

export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "" },
  { key: "recordHour", event: event_time, value: "" },
  {
    key: "temperature",
    event: keyf1,
    value: "",
    next: "℃",
    name: "体温",
    textarea: { width: 35 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "pulse",
    event: keyf1,
    value: "",
    next: "次/分",
    name: "脉搏",
    textarea: { width: 37 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "breath",
    event: keyf1,
    value: "",
    next: "次/分",
    name: "呼吸",
    textarea: { width: 35 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "bloodPressure",
    event: keyf1,
    value: "",
    next: "mmHg",
    name: "血压",
    textarea: { width: 50 },
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "spo2",
    event: keyf1,
    value: "",
    next: "%",
    name: "SpO2",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "consciousness",
    event: keyf1,
    value: "",
    next: "",
    name: "意识",
    autoComplete: { data: ysList },
    textarea: { width: 35 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "food",
    event: keyf1,
    value: "",
    next: "",
    name: "入量内容",
    textarea: { width: 40 },
    change: (e, td) => limitChange(e, td, 6)
  },
  {
    key: "foodSize",
    event: keyf1,
    value: "",
    next: "ml",
    name: "入量",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "discharge",
    event: keyf1,
    value: "",
    next: "",
    name: "出量项目",
    textarea: { width: 40 },
    change: (e, td) => limitChange(e, td, 6)
  },
  {
    key: "dischargeSize",
    event: keyf1,
    value: "",
    next: "ml",
    name: "出量",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "fetalPosition",
    event: keyf1,
    value: "",
    next: "",
    name: "胎位",
    autoComplete: { data: ["LOA", "ROA", "LSA", "RSA"] },
    textarea: { width: 50 },
    change: (e, td) => limitChange(e, td, 8)
  },
  {
    key: "fetalHeart",
    event: keyf1,
    value: "",
    next: "",
    name: "胎心音",
    textarea: { width: 50 },
    change: (e, td) => limitChange(e, td, 8)
  },
  {
    key: "fetalMovements",
    event: keyf1,
    value: "",
    next: "次/分",
    name: "数胎动",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "cohesion",
    event: keyf1,
    value: "",
    next: "",
    name: "衔接",
    autoComplete: { data: ["已", "未", "部分"] },
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "mei",
    event: keyf1,
    value: "",
    next: "",
    name: "无",
    click: (e, td) => click_cancel(e, td),
    style: {
      minWidth: "30px",
      maxWidth: "30px"
    }
  },
  {
    key: "persistent",
    event: keyf1,
    value: "",
    next: "秒/分",
    name: "持续",
    textarea: { width: 40 },
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "intermission",
    event: keyf1,
    value: "",
    next: "秒/分",
    name: "间歇",
    textarea: { width: 45 },
    change: (e, td) => limitChange(e, td, 3),
    autoComplete: { data: ["不规则", "偶有", "敏感"] }
  },
  {
    key: "strength",
    event: keyf1,
    value: "",
    next: "",
    name: "强度",
    autoComplete: { data: ["弱", "中", "强"] },
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 3)
  },
  {
    key: "cervicalDilation",
    event: keyf1,
    value: "",
    next: "cm",
    name: "宫颈扩张",
    autoComplete: { data: ["未开", "容一指"] },
    textarea: { width: 40 },
    change: (e, td) => limitChange(e, td, 3)
  },
  {
    key: "showHigh",
    event: keyf1,
    value: "",
    next: "cm",
    name: "先露高低",
    autoComplete: { data: ["+1", "=0", "-1"] },
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "caul",
    event: keyf1,
    value: "",
    next: "",
    name: "胎膜",
    autoComplete: { data: ["已", "未"] },
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "amnioticTraits",
    event: keyf1,
    value: "",
    next: "",
    name: "羊水性状",
    autoComplete: { data: ["清", "Ⅰ°", "Ⅱ°", "Ⅲ°", "血性"] },
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },

  {
    key: "oxygenInhalation",
    event: keyf1,
    value: "",
    next: "升/分",
    name: "吸氧",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "armValue", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "armValue2", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "armValue3", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "210px",
      background: "transparent"
    },
    textarea: { width: 210 },
    event: function(e, td) {
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  { key: "sign", value: "" }, //单签
  // { key: "sign2", value: "" },//双签
  { key: "audit", value: "" }, //审核签名
  { hidden: true, key: "id", value: "" },
  { hidden: true, key: "signerName", value: "" },
  { hidden: true, key: "signerName2", value: "" },
  { hidden: true, key: "status", value: "" },
  { hidden: true, key: "recordSource", value: "" },
  { hidden: true, key: "recordYear", value: "" },
  { hidden: true, key: "dataHash", value: "" },
  { hidden: true, key: "recordDate", value: "" },
  { hidden: true, key: "monthHour", value: "" },
  { hidden: false, key: "signerNo", value: "" }, //单签
  { hidden: true, key: "signerNo2", value: "" }, //双签
  { hidden: false, key: "auditorNo", value: "" }, //审核签名
  { hidden: true, key: "auditorName", value: "" },
  { hidden: true, key: "empNo", value: "" },
  { hidden: true, key: "multiSign", value: "" }
];
