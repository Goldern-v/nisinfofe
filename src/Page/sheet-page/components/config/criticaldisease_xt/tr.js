
/**
  佛山杏坛 - 危重症护理记录单
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:30 }, change: (e, td) => limitChange(e, td, 4) 的意思是宽度设置30，字数限制4个。
    2、（1）autoComplete: { data: [] } 为下拉框显示序号，根据需要添加。（2）autoComplete: { data: [{name:'',value:''}] } 为下拉框显示序号+内容，根据需要添加。
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

let ysList = ['药眠','清醒','嗜睡','意识模糊','浅昏迷','深昏迷']
let dgfyList = ['灵敏','迟钝','消失']
let tyList = ['○','I','II','III','+','++','+++','-','A','B','C','D','E','F','G','H']
let hxList=['辅助呼吸','辅助通气']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: { data: hxList }},
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SPO2', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodSugar', event: keyf1, value: '', next: 'mmol/L', name: '血糖', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilSizeLeft', event: keyf1, value: '', next: '', name: '瞳孔大小左', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilSizeRight', event: keyf1, value: '', next: '', name: '瞳孔大小右', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilReflectionLeft', event: keyf1, value: '', next: '', name: '瞳孔反射左', autoComplete: { data: dgfyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilReflectionRight', event: keyf1, value: '', next: '', name: '瞳孔反射右', autoComplete: { data: dgfyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量项目', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量项目', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'sputumSuction', event: keyf1, value: '', next: '', name: '吸痰', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'trachea', event: keyf1, value: '', next: 'cm', name: '置管刻度', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breathingPattern', event: keyf1, value: '', next: '', name: '呼吸模式', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'fio2', event: keyf1, value: '', next: '%', name: 'FiO2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'frequency', event: keyf1, value: '', next: '', name: '频率', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'ps', event: keyf1, value: '', next: 'CmH2O', name: 'PS', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'peep', event: keyf1, value: '', next: 'CmH2O', name: 'PEEP', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pressureDefense', event: keyf1, value: '', next: '', name: '防压疮护理', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'constraintTape', event: keyf1, value: '', next: '', name: '使用约束带', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'restraintSkin', event: keyf1, value: '', next: '', name: '约束带处皮肤', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'adrenaline', event: keyf1, value: '', next: 'mg', name: '肾上腺素', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  // { key: 'dopamine', event: keyf1, value: '', next: '', name: '多巴胺', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
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
