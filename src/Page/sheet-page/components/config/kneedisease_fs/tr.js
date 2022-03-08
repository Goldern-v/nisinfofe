
/** 
  佛山市一 - 护理记录单(膝关节疾患)
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

let autoComplete1 = ['无','I°','II°','III°']
let autoComplete2 = ['正常','受限']
let autoComplete3 = []
let autoComplete4 = ['高','正常']
let autoComplete5 = ['√','无']
let autoComplete6 = ['无','正常','麻木','减弱','消失','受限','不能']
let autoComplete7 = []

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SPO2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'swellingKne', event: keyf1, value: '', next: '', name: '患膝关节肿胀', autoComplete: { data: autoComplete1 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'kneeFlexion', event: keyf1, value: '', next: '', name: '患膝关节屈曲', autoComplete: { data: autoComplete2 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'kneePainScore', event: keyf1, value: '', next: '分', name: '患膝疼痛评分', autoComplete: { data: autoComplete3 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'skinTemperature', event: keyf1, value: '', next: '', name: '患膝关节皮温', autoComplete: { data: autoComplete4 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bedImplement', event: keyf1, value: '', next: '', name: '床边备便器', autoComplete: { data: autoComplete5 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'fallPrevention', event: keyf1, value: '', next: '', name: '防跌倒教育与评估', autoComplete: { data: autoComplete5 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'cllBell', event: keyf1, value: '', next: '', name: '呼叫铃置可及处', autoComplete: { data: autoComplete5 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'quadricepsStrength', event: keyf1, value: '', next: '', name: '股四头肌肌力训练', autoComplete: { data: autoComplete5 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'kneeRangeMotion', event: keyf1, value: '', next: '', name: '膝关节活动度训练', autoComplete: { data: autoComplete6 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'limbDorsalis', event: keyf1, value: '', next: '', name: '患肢足背动脉搏动', autoComplete: { data: autoComplete7 }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "163px", background: "transparent" },
    textarea: { width: 163 },
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
