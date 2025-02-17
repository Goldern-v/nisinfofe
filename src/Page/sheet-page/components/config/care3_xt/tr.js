
/**
  佛山杏坛 - 护理记录单（内三科通用单）
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

let ysList = ['√','+','±','++','+++','A','B','C']
let dgfyList = ['√','+','-']

let measureList=[{name:"A绝对卧床休息",value:"A"},{name:"B卧床休息",value:"B"},{name:"C去枕平卧",value:"C"},{name:"D协助翻身",value:"D"},{name:"E指导下床活动",value:"E"},{name:"F指导(主动/被动)运动",value:"F"},{name:"G饮食指导",value:"G"},{name:"G1禁饮食",value:"G1"},{name:"G2低盐低脂饮食",value:"G2"},{name:"G3糖尿病饮食",value:"G3"},{name:"G4流质饮食",value:"G4"},{name:"G5半流质饮食",value:"G5"},{name:"G6低嘌呤饮食",value:"G6"},{name:"G7粗纤维饮食",value:"G7"},{name:"G8少渣半流饮食",value:"G8"},{name:"G9普食",value:"G9"},{name:"G10其他",value:"G10"},{name:"H嘱其更换体位时动作宜慢",value:"H"},{name:"I1指导有效咳嗽",value:"I1"},{name:"I2指导有效咳痰",value:"I2"},{name:"I3指导呼吸肌功能锻炼",value:"I3"},{name:"J肢体功能训练",value:"J"},{name:"K膀胱功能训练",value:"K"},{name:"L预防足下垂",value:"L"},{name:"M心理支持",value:"M"},{name:"N指导皮肤清洁",value:"N"},{name:"O1压疮护理",value:"O1"},{name:"O2防压疮护理",value:"O2"},{name:"P适时翻身",value:"P"},{name:"Q用药指导",value:"Q"},{name:"R低血糖反应的告知",value:"R"},{name:"T禁烟酒",value:"T"},{name:"U其他",value:"U"}]
let safeList=[{name:"A留陪人",value:"A"},{name:"B防压疮",value:"B"},{name:"C防跌倒",value:"C"},{name:"D防坠床",value:"D"},{name:"E防药物外渗",value:"E"},{name:"F防失禁性皮炎",value:"F"},{name:"G防拔管",value:"G"},{name:"H防误吸",value:"H"},{name:"I防窒息",value:"I"},{name:"J防烫伤",value:"J"},{name:"K防走失",value:"K"},{name:"L其他",value:"L"}]



export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2)},
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo2', event: keyf1, value: '', next: '', name: 'SpO2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilSizeLeft', event: keyf1, value: '', next: '', name: '瞳孔大小左', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilSizeRight', event: keyf1, value: '', next: '', name: '瞳孔大小右', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilResponseLeft', event: keyf1, value: '', next: '', name: '瞳孔反应左', autoComplete: { data: dgfyList }, textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'pupilResponseRight', event: keyf1, value: '', next: '', name: '瞳孔反应右', autoComplete: { data: dgfyList }, textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'colorTraits', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem5', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem6', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem7', event: keyf1, value: '', next: '', name: '', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'customItem8', event: keyf1, value: '', next: '', name: '', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', autoComplete: { data: measureList },splice:true, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingSafety', event: keyf1, value: '', next: '', name: '护理安全', autoComplete: { data: safeList },splice:true, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) },
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
