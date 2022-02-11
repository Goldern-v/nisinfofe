
/** 
  佛山杏坛 - 护理记录单(心血管呼吸专科)
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:30 }, change: (e, td) => limitChange(e, td, 4) 的意思是宽度设置30，字数限制4个。
    2、autoComplete: { data: [] } 为下拉框内容，根据需要添加。
    3、splice: '' 为下拉框多选功能，搭配autoComplete使用, (''内容可自定义,splice: '/'为用“/”分隔)。
    4、name、next 为双击弹窗的内容，name为标题，next是单位。
    5、自定义项目，在th里要写 canSet: true , key: '' , key值为th对应tr的key值。
    4、{ key: "sign", value: "" } { hidden: false, key: 'signerNo', value: ''} 单签
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
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SPO2', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'limbToeNailbed', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'DrainageColor', event: keyf1, value: '', next: '', name: '瞳孔大小左', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'elasticAffected', event: keyf1, value: '', next: '', name: '瞳孔大小右', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'riskCompress', event: keyf1, value: '', next: '', name: '瞳孔反射左', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'limbSkintemperature', event: keyf1, value: '', next: '', name: '瞳孔反射右', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'swellingJoint', event: keyf1, value: '', next: '', name: '胃管', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'skinTemperatureKnee', event: keyf1, value: '', next: 'cm', name: '刻度', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'kneeVoluntarily', event: keyf1, value: '', next: '', name: '尿管', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'kneePainScore', event: keyf1, value: '', next: '升/分', name: '吸氧', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'woundApplication', event: keyf1, value: '', next: '', name: '体位', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'woundDrainage', event: keyf1, value: '', next: '', name: '气促', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'DrainageColor', event: keyf1, value: '', next: '', name: '咳嗽', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'elasticAffected', event: keyf1, value: '', next: '', name: '咳痰', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'riskCompress', event: keyf1, value: '', next: '', name: '口唇颜色', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'limbSkintemperature', event: keyf1, value: '', next: '', name: '心悸', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'limbToeNailbed', event: keyf1, value: '', next: '', name: '胸闷', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'temperature', event: keyf1, value: '', next: '', name: '眩晕', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pulse', event: keyf1, value: '', next: '', name: '头晕', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'breath', event: keyf1, value: '', next: '', name: '恶心', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '头痛', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'spo2', event: keyf1, value: '', next: '', name: '胸痛', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '吞咽困难', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: '饮水呛咳', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '呕吐', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'dischargeSize', event: keyf1, value: '', next: '', name: '水肿护理措施', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'swellingJoint', event: keyf1, value: '', next: '', name: '水肿部位及程度', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'skinTemperatureKnee', event: keyf1, value: '', next: 'mg/h', name: '新活素', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'kneeVoluntarily', event: keyf1, value: '', next: '', name: '多巴胺', textarea: { width: 21 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'kneePainScore', event: keyf1, value: '', next: '', name: '自定义1', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'woundApplication', event: keyf1, value: '', next: '', name: '自定义2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'woundDrainage', event: keyf1, value: '', next: '', name: '护理措施', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'DrainageColor', event: keyf1, value: '', next: '', name: '饮食指导', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'elasticAffected', event: keyf1, value: '', next: '', name: '护理安全', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'riskCompress', event: keyf1, value: '', next: '', name: '启用相关护理表格', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'limbSkintemperature', event: keyf1, value: '', next: '', name: '报告医生', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
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
