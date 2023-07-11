/**
  威海市立  -危重患者记录单
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

import { keyf1, limitChange } from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";


export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "",textarea: { width: 65 }, },
  { key: "recordHour", event: event_time, click: click_time, value: "",textarea: { width: 65 }, },
  {
    key: "inputOne",
    event: keyf1,
    value: "",
    next: "ml",
    name: "入量",
    change: (e, td) => limitChange(e, td, 10),
    textarea: { width: 65 },
  },
  {
    key: "inputTwo",
    event: keyf1,
    value: "",
    next: "ml",
    name: "实入量",
    textarea: { width: 65 },
  },
  {
    key: "outputOne",
    event: keyf1,
    value: "",
    next: "ml",
    name: "尿量",
    textarea: { width: 65 },
  },
  {
    key: "outputTwo",
    event: keyf1,
    value: "",
    next: "ml",
    name: "大便",
    textarea: { width: 65 },
  },
  {
    key: "outputThree",
    event: keyf1,
    value: "",
    next: "ml",
    name: "呕吐",
    textarea: { width: 65 },
  },
  {
    key: "outputFout",
    event: keyf1,
    value: "",
    next: "ml",
    name: "引流",
    textarea: { width: 65 },
  },
  {
    key: "outputFive",
    event: keyf1,
    value: "",
    next: "ml",
    name: "超滤量",
    textarea: { width: 65 },
  },

  {
    key: "temperature",
    event: keyf1,
    value: "",
    next: "",
    name: "体温",
    textarea: { width: 65 },
  },
  {
    key: "pulse",
    event: keyf1,
    value: "",
    next: "",
    name: "脉搏/心率",
    textarea: { width: 65 },
  },
  {
    key: "breath",
    event: keyf1,
    value: "",
    next: "",
    name: "呼吸",
    textarea: { width: 65 },
  },
  {
    key: "bloodPressure",
    event: keyf1,
    value: "",
    next: "",
    name: "血压",
    textarea: { width: 65 },
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
      width: "300px",
      background: "transparent"
    },
    textarea: { width: 300 },
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
  // { key: "audit", value: "" },//审核签名
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
