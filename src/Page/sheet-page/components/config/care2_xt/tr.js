
/**
  佛山杏坛 - 外一护理记录单
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

import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let ysList = ['①','②','③','④','⑤','⑥']
let dgfyList = ['√','+','-']
let nyysList = ['A','B','C','D','E','F','G','H','I','J']
let tyList = ['○','I','II','III','①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩']
let yszdList = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩']
let hlcsList=[{name:"A绝对卧床休息",value:"A"},{name:"B卧床休息",value:"B"},{name:"C半坐位",value:"C"},{name:"D抬高患肢",value:"D"},{name:"E指导下床活动",value:"E"},{name:"F协助翻身",value:"F"},{name:"G指导有效咳嗽",value:"G"},{name:"H肢体功能训练",value:"H"},{name:"I膀胱功能训练",value:"I"},{name:"J预防足下垂",value:"J"},{name:"K指导皮肤清洁",value:"K"},{name:"L心理支持",value:"L"},{name:"M去枕平卧",value:"M"},{name:"N口腔护理",value:"N"},{name:"O压疮护理",value:"O"},{name:"Pq2h翻身拍背",value:"P"},{name:"R其他",value:"R"}]
let hlaqList=[{name:"A留陪人",value:"A"},{name:"B防跌倒",value:"B"},{name:"C防坠床",value:"C"},{name:"D防脱管",value:"D"},{name:"E防烫伤",value:"E"},{name:"F防压疮",value:"F"},{name:"G防走失",value:"G"},{name:"H防窒息",value:"H"},{name:"I防误吸",value:"I"},{name:"J防拔管",value:"J"},{name:"K防药物外渗",value:"K"},{name:"L防失禁性皮炎",value:"L"},{name:"M住院期间禁烟酒",value:"M"}]


export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilSizeLeft', event: keyf1, value: '', next: '', name: '瞳孔大小左', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilSizeRight', event: keyf1, value: '', next: '', name: '瞳孔大小右', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilReflectionLeft', event: keyf1, value: '', next: '', name: '瞳孔反射左', autoComplete: { data: dgfyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilReflectionRight', event: keyf1, value: '', next: '', name: '瞳孔反射右', autoComplete: { data: dgfyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 75 }, change: (e, td) => limitChange(e, td, 12) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 75 }, change: (e, td) => limitChange(e, td, 12) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'color', event: keyf1, value: '', next: '', name: '颜色', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem5', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem6', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem7', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem8', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', autoComplete: { data: hlcsList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingSafety', event: keyf1, value: '', next: '', name: '护理安全', autoComplete: { data: hlaqList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
    textarea: { width: 150 },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  },
  { key: "sign", value: "" },//单签
  // { key: "sign2", value: "" },//双签
  { key: "audit", value: "" },//审核签名
  { hidden:true, key:'id', value:''},
  { hidden:true, key:'signerName', value:''},
  { hidden:true, key:'signerName2', value:''},
  { hidden:true, key:'status', value:''},
  { hidden:true, key:'recordSource', value:''},
  { hidden:true, key:'recordYear', value:''},
  { hidden:true, key:'dataHash', value:''},
  { hidden:true, key:'recordDate', value:''},
  { hidden:true, key:'monthHour', value:''},
  { hidden:false, key:'signerNo', value:''},//单签
  { hidden:true, key:'signerNo2', value:''},//双签
  { hidden:false, key:'auditorNo', value:''},//审核签名
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''}

]
