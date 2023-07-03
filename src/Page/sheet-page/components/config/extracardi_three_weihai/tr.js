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
const tanye = ["A", "B", "C"]
const yinliuye = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const niaose = ["A", "B", "C", "D"]
const Braden_cuoshi = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
const diedao_cuoshi = ['A', 'B', 'C', 'D', 'E', 'F']
const fjhxbg_cuoshi = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const tt_cuoshi = ['A', 'B', 'C', 'D', 'E']

const check = ["√"]

let outProject1 = [
  [{pipingOne:"右颈内静脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"右锁骨下静脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"左肱动脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"左足背动脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"左桡动脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"右手背",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"右手腕",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"右前臂",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"",defaultInput:true,type:"textarea"},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"",defaultInput:true,type:"textarea"},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"",defaultInput:true,type:"textarea"},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
]
let outChoseItem1 = {
  th:[
    {title:"名称",colwidth:"50%"},
    {title:"外露长度",colwidth:"30%"},
    {title:"护理",colwidth:"20%"}
  ],
  outProject:outProject1,
  tableNum:3,
  maxLength:10,
  outProjectCode:['pipingOne','pipingTwo','pipingThree'],
  keyCode:"pipingOne",
  oneTooneCode:['pipingOne','pipingTwo','pipingThree']
}
let outProject2 = [
  [{pipingFout:"心包胸骨后引流",unClear:true},{pipingFive:"",type:"select"},{pipingSix:"",type:"input"},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"左胸腔闭式引流",unClear:true},{pipingFive:"",type:"select"},{pipingSix:"",type:"input"},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"左胸腔引流",unClear:true},{pipingFive:"",type:"select"},{pipingSix:"",type:"input"},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"",defaultInput:true,type:"textarea"},{pipingFive:"",type:"select"},{pipingSix:"",type:"input"},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"",defaultInput:true,type:"textarea"},{pipingFive:"",type:"select"},{pipingSix:"",type:"input"},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"",defaultInput:true,type:"textarea"},{pipingFive:"",type:"select"},{pipingSix:"",type:"input"},{pipingSeven:"",type:"selectGou"}],
]
let outChoseItem2 = {
  th:[
    {title:"名称",colwidth:"30%"},
    {title:"颜色",colwidth:"30%"},
    {title:"性质",colwidth:"30%"},
    {title:"护理",colwidth:"10%"}
  ],
  outProject:outProject2,
  tableNum:3,
  outProjectCode:['pipingFout','pipingFive','pipingSix','pipingSeven'],
  keyCode:"pipingFout",
  maxLength:5,
  oneTooneCode:['pipingFout','pipingFive','pipingSix','pipingSeven'],
}

export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "" },
  { key: "recordHour", event: event_time, click: click_time, value: "" },
  {
    key: "breatheOne ",
    event: keyf1,
    value: "",
    name: "体疗",
    textarea: { width: 40 },
    autoComplete: { data: check },
  },
  {
    key: "breatheTwo",
    event: keyf1,
    value: "",
    name: "膨肺/吸痰",
    textarea: { width: 40 },
    autoComplete: { data: ["√/√", '√/', '/√'] },
  },
  {
    key: "breatheThree",
    event: keyf1,
    value: "",
    name: "痰液颜色",
    textarea: { width: 35 },
    autoComplete: { data: tanye },
  },
  {
    key: "breatheFout",
    event: keyf1,
    value: "",
    name: "痰液性状",
    textarea: { width: 35 },
    autoComplete: { data: tanye },
  },
  {
    key: "breatheFive",
    event: keyf1,
    value: "",
    name: "痰液量",
    textarea: { width: 35 },
    autoComplete: { data: tanye },
  },
  {
    key: "pipingOne",
    event: keyf1,
    value: "",
    next: "ml",
    name: "动静脉置管:名称",
    outChoseItem:outChoseItem1,
    textarea: { width: 60 },
    change: (e, td) => limitChange(e, td, 10)
  },
  {
    key: "pipingTwo",
    event: keyf1,
    value: "",
    next: "cm",
    name: "外露长度",
    outChoseItem:outChoseItem1,
    textarea: { width: 40 },
  },
  {
    key: "pipingThree",
    event: keyf1,
    value: "",
    name: "动静脉置管:护理",
    textarea: { width: 35 },
    outChoseItem:outChoseItem1,
    autoComplete: { data: check },
  },
  {
    key: "pipingFout",
    event: keyf1,
    value: "",
    name: "引流管:名称",
    outChoseItem:outChoseItem2,
    textarea: { width: 60 },
  },
  {
    key: "pipingFive",
    event: keyf1,
    value: "",
    name: "引流液颜色",
    textarea: { width: 35 },
    outChoseItem:outChoseItem2,
    autoComplete: { data: yinliuye },
  },
  {
    key: "pipingSix",
    event: keyf1,
    value: "",
    name: "引流液性质",
    outChoseItem:outChoseItem2,
    textarea: { width: 35 },
    autoComplete: { data: yinliuye },
  },
  {
    key: "pipingSeven",
    event: keyf1,
    value: "",
    name: "引流管护理",
    outChoseItem:outChoseItem2,
    textarea: { width: 35 },
    autoComplete: { data: check },
   },
  {
    key: "pipingEight",
    event: keyf1,
    value: "",
    name: "尿管尿色",
    textarea: { width: 35 },
    autoComplete: { data: niaose },
  },
  {
    key: "skin",
    event: keyf1,
    value: "",
    next: "ml",
    name: "皮肤护理",
    textarea: { width: 40 },
    autoComplete: { data: check },
  },
  {
    key: "riskOne",
    event: keyf1,
    value: "",
    name: "Braden压疮评分",
    textarea: { width: 40 },
  },
  {
    key: "riskTwo",
    event: keyf1,
    value: "",
    next: "ml",
    name: "Braden压疮护理措施",
    textarea: { width: 60 },
    splice: '.',
    autoComplete: { data: Braden_cuoshi },
  },
  {
    key: "riskThree",
    event: keyf1,
    value: "",
    name: "跌倒评分",
    textarea: { width: 40 },
  },
  {
    key: "riskFout",
    event: keyf1,
    value: "",
    next: "ml",
    name: "跌倒护理措施",
    textarea: { width: 60 },
    splice: '.',
    autoComplete: { data: diedao_cuoshi },
  },
  {
    key: "riskFive",
    event: keyf1,
    value: "",
    name: "非计划性拔管评分",
    textarea: { width: 40 },
  },
  {
    key: "riskSix",
    event: keyf1,
    value: "",
    next: "ml",
    name: "非计划性拔管护理措施",
    textarea: { width: 60 },
    splice: '.',
    autoComplete: { data: fjhxbg_cuoshi },
  },
  {
    key: "rass",
    event: keyf1,
    value: "",
    name: "RASS镇静评估",
    textarea: { width: 40 },
  },
  {
    key: "painOne",
    event: keyf1,
    value: "",
    name: "疼痛评估工具/评分",
    textarea: { width: 50 },
  },
  {
    key: "painTwo",
    event: keyf1,
    value: "",
    next: "ml",
    name: "疼痛评估护理措施",
    textarea: { width: 60 },
    splice: '.',
    autoComplete: { data: tt_cuoshi },
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
      width: "200px",
      background: "transparent"
    },
    textarea: { width: 200 },
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
