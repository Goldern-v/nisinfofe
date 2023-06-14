/**
 佛山顺德人医 - 护理记录单(儿科)
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

const yishi = ["药眠","清醒", "嗜睡", "浅昏迷", "深昏迷", "模糊", "昏睡", "谵妄", "痴呆"]
const ruliang = ["全奶", "母乳", "早产奶", "深度水解奶", "输液", "维生素K1", "多巴胺", "多巴酚丁胺", "肾上腺素", "芬太尼", "咪达唑仑","呋噻米","苯巴比妥钠","NS+开塞露","布洛芬","米力农"]
const chuliang = ["尿", "大便", "尿+大便", "胃内容物", "血液"]
const xiyang  = ['鼻导管','头罩','温箱内']
const weiyang = ['自吮', '口饲','禁食']

export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "" },
  { key: "recordHour", event: event_time, value: "" },
  {
    key: "boxTemp",
    event: keyf1,
    value: "",
    next: "℃",
    name: "温箱",
    textarea: { width: 35 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "temperature",
    event: keyf1,
    value: "",
    next: "℃",
    name: "T",
    textarea: { width: 35 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "pulse",
    event: keyf1,
    value: "",
    next: "次/分",
    name: "HR",
    textarea: { width: 37 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "breath",
    event: keyf1,
    value: "",
    next: "次/分",
    name: "R",
    autoComplete:{data:['辅助呼吸']},
    textarea: { width: 35 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "bloodPressure",
    event: keyf1,
    value: "",
    next: "mmHg",
    name: "BP",
    textarea: { width: 40 },
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "spo2",
    event: keyf1,
    value: "",
    next: "%",
    name: "SPO₂%",
    textarea: { width: 40 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "consciousness",
    event: keyf1,
    value: "",
    next: "",
    name: "意识",
    textarea: { width: 40 },
    autoComplete: { data: yishi },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "food",
    event: keyf1,
    value: "",
    next: "",
    name: "入量内容",
    textarea: { width: 40 },
    autoComplete: { data: ruliang },
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
    name: "出量内容",
    textarea: { width: 40 },
    autoComplete: { data: chuliang },
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
    key: "forehead",
    event: keyf1,
    value: "",
    textarea: { width: 30 },
    next: "mg/dl",
    name: "额",
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "chest",
    event: keyf1,
    value: "",
    textarea: { width: 30 },
    next: "mg/dl",
    name: "胸",
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "leg",
    event: keyf1,
    value: "",
    textarea: { width: 30 },
    next: "mg/dl",
    name: "腿",
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "bloodSugar",
    event: keyf1,
    value: "",
    textarea: { width: 30 },
    next: "mmol/L",
    name: "血糖",
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "oxygenWay",
    event: keyf1,
    value: "",
    textarea: { width: 30 },
    next: "",
    name: "吸氧方式",
    autoComplete: { data: xiyang },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "oxygenRate",
    event: keyf1,
    value: "",
    textarea: { width: 30 },
    next: "L/分",
    name: "氧流量",
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "concentration",
    event: keyf1,
    value: "",
    textarea: { width: 30 },
    next: "%",
    name: "氧浓度",
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "oxygenWay",
    event: keyf1,
    value: "",
    textarea: { width: 30 },
    next: "",
    autoComplete: { data: weiyang },
    name: "喂养方式",
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
    key: "armValue4", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "armValue5", //标题5
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "armValue6", //标题6
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
      width: "265px",
      background: "transparent"
    },
    textarea: { width: 265 },
    event: function (e, td) {
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
