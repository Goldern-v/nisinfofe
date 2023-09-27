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

let ysList = ["清醒", "模糊", "嗜睡", "昏睡", "浅昏迷", "深昏迷", "药眠", "痴呆","谵妄"];
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
const yishi = ["清醒", "嗜睡", "浅昏迷", "深昏迷", "模糊", "昏睡", "谵妄","痴呆","药眠"]
const yanse = [{name: '①血性液', value: '血性液'},{name: '②淡红色液', value: '淡红色液'},{name: '③暗红色液', value: '暗红色液'},{name: '④黄色液', value: '黄色液'},{name: '⑤淡黄色液', value: '淡黄色液'},{name: '⑥深黄色液', value: '深黄色液'}];
const ruliang = ["饮水","进食","鼻饲","输血","输液","静注"]
const chuliang = ["尿液","大便","引流液","呕吐物","胃液","恶露"]
export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "" },
  { key: "recordHour", event: event_time, value: "" },
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
    textarea: { width: 30},
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
    key: "food",
    event: keyf1,
    value: "",
    next: "",
    name: "入量内容",
    autoComplete: { data: ["输液", "饮水", "进食", "静注","肌注"] },
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
    autoComplete: { data: ["阴道流血", "尿液", "大便", "呕吐物"] },
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
    key: "colorTraits",
    event: keyf1,
    value: "",
    autoComplete: { data: yanse },
    textarea: { width: 30 },
    next: "ml",
    name: "颜色性状"
   },
  {
    key: "fetalPosition",
    event: keyf1,
    value: "",
    next: "",
    name: "胎方位",
    autoComplete: { data: ["不清"] },
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 4)
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
    name: "胎动/2h",
    textarea: { width: 35 },
    change: (e, td) => limitChange(e, td, 6)
  },
  {
    key: "cohesion",
    event: keyf1,
    value: "",
    next: "",
    name: "衔接",
    autoComplete: { data: ["已", "未", "部分"] },
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },
  // {
  //   key: "mei",
  //   event: keyf1,
  //   value: "",
  //   next: "",
  //   name: "无",
  //   click: (e, td) => click_cancel(e, td),
  //   style: {
  //     minWidth: "30px",
  //     maxWidth: "30px"
  //   }
  // },
  {
    key: "persistent",
    event: keyf1,
    value: "",
    next: "秒/分",
    name: "持续/间歇",
    textarea: { width: 50 },
    autoComplete:{data:["无","偶有","不规则"]},
    change: (e, td) => limitChange(e, td, 4)
  },
  // {
  //   key: "intermission",
  //   event: keyf1,
  //   value: "",
  //   next: "秒/分",
  //   name: "间歇",
  //   textarea: { width: 45 },
  //   change: (e, td) => limitChange(e, td, 3),
  // },
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
    autoComplete: { data: ["未查","未开"] },
    textarea: { width: 40 },
    change: (e, td) => limitChange(e, td, 6)
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
    autoComplete: { data: [ "未", "人工破膜","自破","已"] },
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "amnioticTraits",
    event: keyf1,
    value: "",
    next: "",
    name: "羊水性状",
    autoComplete: { data: ["清", "Ⅰ°", "Ⅱ°", "Ⅲ°", "血性","未见"] },
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },

  {
    key: "painEval",
    event: keyf1,
    value: "",
    next: "",
    name: "宫缩疼痛评分",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 2)
  },
  {
    key: "analgesic", //标题1
    value: "",
    event: keyf1,
    value: "",
    next: "",
    name: "非药物镇痛方法",
    autoComplete: { data: ["呼吸减痛法", "自由体位", "音乐疗法", "分娩球", "陪伴", "助产指导"] },
    textarea: {
      width: 45
    }
  },
  {
    key: "bladderFilling", //标题2
    value: "",
    event: keyf1,
    next: "",
    name: "膀胱充盈度",
    autoComplete: { data: ["空虚", "轻度充盈", "中度充盈", "重度充盈"] },
    textarea: {
      width: 40
    }
  },
  {
    key: "armValue", //标题1
    value: "",
    event: keyf1,
    next: "",
    name: "",
    textarea: {
      width: 40
    },
    change: (e, td) => limitChange(e, td, 6)
  },
  {
    key: "armValue2", //标题2
    value: "",
    event: keyf1,
    next: "",
    name: "",
    textarea: {
      width: 40
    },
    change: (e, td) => limitChange(e, td, 6)
  },
  {
    key: "armValue3", //标题3
    value: "",
    event: keyf1,
    next: "",
    name: "",
    textarea: {
      width: 40
    },
    change: (e, td) => limitChange(e, td, 6)
  },
  // {
  //   key: "armValue4", //标题4
  //   value: "",
  //   event: keyf1,
  //   next: "",
  //   name: "",
  //   textarea: {
  //     width: 40
  //   },
  //   change: (e, td) => limitChange(e, td, 6)
  // },
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "220px",
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
