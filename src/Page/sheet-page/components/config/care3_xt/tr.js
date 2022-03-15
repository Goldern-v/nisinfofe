
/**
  佛山杏坛 - 护理记录单（内三科通用单）
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6) 的意思是宽度设置45，字数限制6个。
    2、autoComplete: { data: [] } 为下拉框内容，根据需要添加。
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
// let tyttList = ['A','B','C','D']`
let tyttList = ['0', 'Ⅰ', 'Ⅱ', 'Ⅲ']
let hlcsList = ['A','B','C','D','E','F','G1','G2','G3','G4','G5','G6','G7','G8','G9','G10','H','I','J','K','L','M','N','O1','O2','P','Q','R','T','U']
let hlaqList = ['A','B','C','D','E','F','G','H','I','J','K','L']
let tyList = ['○','I','II','III','√','×','+','++','+++','A','B','C','D','E','F','X']
let lgList = ['Y', 'N']


export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo2', event: keyf1, value: '', next: '', name: 'SpO2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilSizeLeft', event: keyf1, value: '', next: '', name: '瞳孔大小左', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilSizeRight', event: keyf1, value: '', next: '', name: '瞳孔大小右', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilResponseLeft', event: keyf1, value: '', next: '', name: '瞳孔反应左', autoComplete: { data: dgfyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilResponseRight', event: keyf1, value: '', next: '', name: '瞳孔反应右', autoComplete: { data: dgfyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'colorTraits', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue3', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue4', event: keyf1, value: '', next: '', name: '', autoComplete: { data: lgList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue5', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue6', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue7', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue8', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue9', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue10', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue11', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue12', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'dizzy', event: keyf1, value: '', next: '', name: '头晕', autoComplete: { data: tyttList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'headache', event: keyf1, value: '', next: '', name: '头痛', autoComplete: { data: tyttList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue13', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue14', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue15', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue16', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue17', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue18', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue19', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue20', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue21', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', autoComplete: { data: hlcsList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingSafety', event: keyf1, value: '', next: '', name: '护理安全', autoComplete: { data: hlaqList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reportDoctor', event: keyf1, value: '', next: '', name: '报告医生', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'continueObserve', event: keyf1, value: '', next: '', name: '遵医嘱继续观察', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
    textarea: { width: 150 },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  },
  { key: "sign", value: "" },//单签
  // { key: "sign2", value: "" },//双签
  //{ key: "audit", value: "" },//审核签名
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
  { hidden:true, key:'auditorNo', value:''},//审核签名
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''}

]
