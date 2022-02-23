
/** 
  佛山杏坛 - 护理记录单(妇科专科)
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

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nausea', event: keyf1, value: '', next: '', name: '恶心', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'vomiting', event: keyf1, value: '', next: '', name: '呕吐', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'abdominalDistension', event: keyf1, value: '', next: '', name: '腹胀', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'anusBelly', event: keyf1, value: '', next: '', name: '肛门坠胀', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'abdominalPain', event: keyf1, value: '', next: '', name: '腹痛部位', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'degree', event: keyf1, value: '', next: '', name: '腹痛程度', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'lumbosacralTenderness', event: keyf1, value: '', next: '', name: '腰骶部胀痛', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'vaginalDischarge', event: keyf1, value: '', next: '', name: '阴道分泌物情况', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'vaginalBleeding', event: keyf1, value: '', next: 'ml', name: '阴道出血', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bleedingColor', event: keyf1, value: '', next: '', name: '阴道出血颜色', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'abdominalWound', event: keyf1, value: '', next: '', name: '腹部伤口敷料', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pain', event: keyf1, value: '', next: '', name: '腹部伤口疼痛', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'perinealWound', event: keyf1, value: '', next: '', name: '会阴伤口情况', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pain2', event: keyf1, value: '', next: '', name: '会阴伤口疼痛', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'exhaust', event: keyf1, value: '', next: '', name: '排气', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'micturition', event: keyf1, value: '', next: '', name: '排尿', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue3', event: keyf1, value: '', next: '', name: '', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue4', event: keyf1, value: '', next: '', name: '', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'catheterFixation', event: keyf1, value: '', next: '', name: '尿管固定通畅', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'urineColor', event: keyf1, value: '', next: '', name: '尿液颜色', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'analgesicPump', event: keyf1, value: '', next: '', name: '镇痛泵固定通畅', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenInhalation', event: keyf1, value: '', next: '升/分', name: '吸氧', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'ecgMonitoring', event: keyf1, value: '', next: '', name: '心电监护', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingSafety', event: keyf1, value: '', next: '', name: '护理安全', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reportDoctor', event: keyf1, value: '', next: '', name: '报告医生', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'continueObserve', event: keyf1, value: '', next: '', name: '遵医嘱继续观察', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
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
