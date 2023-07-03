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

let outProject = [
  [{discharge:"多巴胺",unClear:true},{dischargeSize:"",type:"input",needTarget:true},],
  [{discharge:"去甲肾上腺素",unClear:true},{dischargeSize:"",type:"input",needTarget:true},],
  [{discharge:"硝酸甘油",unClear:true},{dischargeSize:"",type:"input",needTarget:true},],
  [{discharge:"硝普钠",unClear:true},{dischargeSize:"",type:"input",needTarget:true},],
  [{discharge:"异丙肾上腺素",unClear:true},{dischargeSize:"",type:"input",needTarget:true},],
  [{discharge:"肾上腺素",unClear:true},{dischargeSize:"",type:"input",needTarget:true},],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true}],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true}],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true}],
]
let outChoseItem1 = {
  th:[
    {title:"项目",colwidth:"60%"},
    {title:"量（μg/kg/min）",colwidth:"40%"},
  ],
  outProject,
  dischargeType:"升压药物血管药物",
  tableNum:3,
  maxLength:12,
  sheetypeCode:['drugsOne']
}
let outProject2 = [
  [{discharge:"30‰氯化钾",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"ml/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"1%丙泊酚",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"mg/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"呋塞米",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"mg/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"注射用重组人脑利钠肽",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"ug/kg/min",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"右美托咪定",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"ug/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"艾司洛尔",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"mg/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"胺碘酮",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"mg/min",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"米力农",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"ug/kg/min",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"胰岛素",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"u/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"硝酸异山梨酯",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"mg/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"左西孟旦",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"ug/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"布托啡诺",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"ug/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"利多卡因",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{danwei:"mg/h",unClear:true,needTarget:['dischargeSize']}],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true},{danwei:"",type:"input",needTarget:['dischargeSize']}],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true},{danwei:"",type:"input",needTarget:['dischargeSize']}],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true},{danwei:"",type:"input",needTarget:['dischargeSize']}],
]
let outChoseItem2 = {
  th:[
    {title:"项目",colwidth:"40%"},
    {title:"量",colwidth:"30%"},
    {title:"单位",colwidth:"30%"},
  ],
  outProject:outProject2,
  dischargeType:"强心利尿其他特殊药物",
  tableNum:3,
  maxLength:7,
  sheetypeCode:['drugsTwo']
}

export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "" },
  { key: "recordHour", event: event_time, click: click_time, value: "" },
  {
    key: "inputOne",
    event: keyf1,
    value: "",
    next: "ml",
    name: "入量1",
    textarea: { width: 50 },
  },
  {
    key: "inputTwo",
    event: keyf1,
    value: "",
    next: "ml",
    name: "入量2",
    textarea: { width: 50 },
  },
  {
    key: "inputThree",
    event: keyf1,
    value: "",
    next: "ml",
    name: "入量3",
    textarea: { width: 50 },
  },
  {
    key: "inputFout",
    event: keyf1,
    value: "",
    next: "ml",
    name: "入量4",
    textarea: { width: 50 },
  },
  {
    key: "inputFive",
    event: keyf1,
    value: "",
    next: "ml",
    name: "入量5",
    textarea: { width: 50 },
  },
  {
    key: "inputSix",
    event: keyf1,
    value: "",
    next: "ml",
    name: "入量6",
    textarea: { width: 50 },
  },
  {
    key: "inputSeven",
    event: keyf1,
    value: "",
    next: "ml",
    name: "口服/鼻饲",
    textarea: { width: 50 },
  },
  {
    key: "inputEight",
    event: keyf1,
    value: "",
    name: "入量每时",
    textarea: { width: 50 },
  },
  // {
  //   key: "totalInput",
  //   event: keyf1,
  //   value: "",
  //   name: "入量总量",
  //   textarea: { width: 50 },
  // },
  // {
  //   key: "totalOutput",
  //   event: keyf1,
  //   value: "",
  //   name: "出量总量",
  //   textarea: { width: 50 },
  // },
  {
    key: "outputEight",
    event: keyf1,
    value: "",
    name: "出量每时",
    textarea: { width: 50 },
  },
  {
    key: "outputOne",
    event: keyf1,
    value: "",
    next: "ml",
    name: "尿量",
    textarea: { width: 50 },
   },
  // {
  //   key: "outputTwo",
  //   event: keyf1,
  //   value: "",
  //   next: "ml",
  //   name: "累计尿量",
  //   textarea: { width: 50 },
  // },
  // {
  //   key: "outputThree",
  //   event: keyf1,
  //   value: "",
  //   next: "ml",
  //   name: "累计胸液",
  //   textarea: { width: 50 },
  // },
  {
    key: "outputFout",
    event: keyf1,
    value: "",
    next: "ml",
    name: "心包胸骨后",
    textarea: { width: 50 },
  },
  {
    key: "outputFive",
    event: keyf1,
    value: "",
    next: "ml",
    name: "胸腔闭式引流",
    textarea: { width: 50 },
  },
  {
    key: "outputSix",
    event: keyf1,
    value: "",
    next: "ml",
    name: "其他",
    textarea: { width: 50 },
  },
  {
    key: "drugsOne",
    event: keyf1,
    value: "",
    next: "μg/kg/min",
    name: "升压药物血管药物",
    textarea: { width: 70 },
    outChoseItem:outChoseItem1,
    change: (e, td) => limitChange(e, td, 10)
  },
  {
    key: "drugsTwo",
    event: keyf1,
    value: "",
    next: "ml",
    name: "强心利尿其他特殊药物",
    outChoseItem:outChoseItem2,
    textarea: { width: 70 },
    change: (e, td) => limitChange(e, td, 10)
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
