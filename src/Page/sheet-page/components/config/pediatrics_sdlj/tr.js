
/** 
  顺德龙江 - 儿科护理记录单
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
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ['①', '②', '③', '④', '⑤', '⑥'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilSizeLeft', event: keyf1, value: '', next: 'mm', name: '瞳孔大小左', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilSizeRight', event: keyf1, value: '', next: 'mm', name: '瞳孔大小右', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilReflexLeft', event: keyf1, value: '', next: '', name: '瞳孔反射左', autoComplete: { data: ['+', '±', '-'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilReflexRight', event: keyf1, value: '', next: '', name: '瞳孔反射右', autoComplete: { data: ['+', '±', '-'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量名称', textarea: { width: 65 }, change: (e, td) => limitChange(e, td, 10) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量名称', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'skin', event: keyf1, value: '', next: '', name: '皮肤情况', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'plumbing', event: keyf1, value: '', next: '', name: '管道护理', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'tracheal', event: keyf1, value: '', next: '', name: '气道护理', autoComplete: { data: ['①', '②', '③'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'sputum', event: keyf1, value: '', next: '', name: '痰液性状', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'careOther', event: keyf1, value: '', next: '', name: '其他', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '自定义值', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '自定义值2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '自定义值3', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '自定义值4', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem5', event: keyf1, value: '', next: '', name: '自定义值5', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem6', event: keyf1, value: '', next: '', name: '自定义值6', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
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
