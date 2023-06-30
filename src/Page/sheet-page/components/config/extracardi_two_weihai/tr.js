/**
  顺德龙江 - 护理记录单（骨科）
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
  click_time
} from "../keyEvent/date";
const yishi = ["A", "B", "C", "D", "E"];
const dgfs = ["A", "B", "C"];
const fzfs = ["SIMV","PS/CPAP","SPONT","鼻导管","气管插管内吸氧","面罩"]
const huxiyin = ["粗","清","低","痰鸣音","湿啰音","干啰音"]
const moshao = ['暖', '温', '凉']
const xinlv = ['S', 'Af', 'AF', 'P']

const Customizations1 = ["√"]

export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "" },
  { key: "recordHour", event: event_time, click: click_time, value: "" },
  {
    key: "consciousness",
    event: keyf1,
    value: "",
    name: "意识",
    textarea: { width: 40 },
    autoComplete: { data: yishi }
  },
  {
    key: "pupilLeft",
    event: keyf1,
    value: "",
    next: "ml",
    name: "瞳孔左",
    textarea: { width: 40 },
  },
  {
    key: "pupilRight",
    event: keyf1,
    value: "",
    next: "ml",
    name: "瞳孔右",
    textarea: { width: 40 },
  },
  {
    key: "reactionLeft",
    event: keyf1,
    value: "",
    next: "ml",
    name: "对光反射左",
    textarea: { width: 40 },
    autoComplete: { data: dgfs }
  },
  {
    key: "reactionRight",
    event: keyf1,
    value: "",
    next: "ml",
    name: "对光反射右",
    textarea: { width: 40 },
    autoComplete: { data: dgfs }
  },
  {
    key: "breatheOne",
    event: keyf1,
    value: "",
    next: "cm",
    name: "插管内置",
    textarea: { width: 50 },
  },
  {
    key: "breatheTwo",
    event: keyf1,
    value: "",
    next: "cmH2O",
    name: "气囊压力",
    textarea: { width: 60 },
  },
  {
    key: "breatheThree",
    event: keyf1,
    value: "",
    name: "辅助方式",
    textarea: { width: 60 },
    change: (e, td) => limitChange(e, td, 10),
    autoComplete: { data: fzfs }
  },
  {
    key: "breatheFout",
    event: keyf1,
    value: "",
    next: '%',
    name: "氧浓度",
    textarea: { width: 40 },
  },
  {
    key: "breatheFoutOne",
    event: keyf1,
    value: "",
    next: 'L/min',
    name: "氧流量",
    textarea: { width: 40 },
  },
  {
    key: "breatheFive",
    event: keyf1,
    value: "",
    next: "cmH2O",
    name: "PS",
    textarea: { width: 50 },
  },
  {
    key: "breatheSix",
    event: keyf1,
    value: "",
    next: "cmH2O",
    name: "出量总量",
    textarea: { width: 50 },
  },
  {
    key: "breatheSeven",
    event: keyf1,
    value: "",
    next: "ml",
    name: "潮气量",
    textarea: { width: 50 },
  },
  {
    key: "breatheEight",
    event: keyf1,
    value: "",
    name: "呼吸音左",
    textarea: { width: 50 },
    autoComplete: { data: huxiyin }
   },
  {
    key: "breatheNine",
    event: keyf1,
    value: "",
    name: "呼吸音右",
    textarea: { width: 50 },
    autoComplete: { data: huxiyin }
  },
  {
    key: "breatheTen",
    event: keyf1,
    value: "",
    next: "bmp",
    name: "呼吸频率",
    textarea: { width: 50 },
  },
  {
    key: "breatheEleven",
    event: keyf1,
    value: "",
    next: "%",
    name: "Spo2",
    textarea: { width: 40 },
  },
  {
    key: "temperature",
    event: keyf1,
    value: "",
    next: "℃",
    name: "体温",
    textarea: { width: 40 },
  },
  {
    key: "circulateOne",
    event: keyf1,
    value: "",
    name: "末梢",
    textarea: { width: 50 },
    autoComplete: { data: moshao }
  },
  {
    key: "circulateFive",
    event: keyf1,
    value: "",
    next: "bmp",
    name: "心率",
    textarea: { width: 50 },
  },
  {
    key: "pulse",
    event: keyf1,
    value: "",
    next: "bmp",
    name: "脉搏",
    textarea: { width: 50 },
  },
  {
    key: "circulateTwo",
    event: keyf1,
    value: "",
    name: "心律",
    textarea: { width: 50 },
    change: (e, td) => limitChange(e, td, 10),
    autoComplete: { data: xinlv }
  },
  {
    key: "bloodPressure",
    event: keyf1,
    value: "",
    next: "mmHg",
    name: "血压",
    textarea: { width: 50 },
  },
  {
    key: "circulateThree",
    event: keyf1,
    value: "",
    next: "mmHg",
    name: "平均压",
    textarea: { width: 50 },
  },
  {
    key: "circulateFout",
    event: keyf1,
    value: "",
    next: "mmHg",
    name: "CVP",
    textarea: { width: 50 },
  },
  // {
  //   key: "description", //特殊情况记录
  //   value: "",
  //   style: {
  //     textAlign: "left",
  //     position: "absolute",
  //     top: "1px",
  //     bottom: "1px",
  //     left: "1px",
  //     width: "200px",
  //     background: "transparent"
  //   },
  //   textarea: { width: 200 },
  //   event: function(e, td) {
  //     if (e.keyCode == 9) {
  //       td.value = "    " + td.value;
  //       e.preventDefault();
  //     }
  //     keyf1(e, td);
  //   }
  // },
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
