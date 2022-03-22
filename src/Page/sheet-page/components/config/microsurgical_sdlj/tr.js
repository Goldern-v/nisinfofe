
/** 
  顺德龙江 - 护理记录单（显微外科）
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
    { key: 'pulse', event: keyf1, value: '', next: '次/分', name: 'P/HR', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 65 }, change: (e, td) => limitChange(e, td, 10) },
    { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 65 }, change: (e, td) => limitChange(e, td, 10) },
    { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'raiseLimb', event: keyf1, value: '', next: '', name: '抬高患肢', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'fieldTwo', event: keyf1, value: '', next: '', name: '伤口疼痛',autoComplete: { data: ['0级', 'Ⅰ级', 'Ⅱ级','Ⅲ级'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'fieldOne', event: keyf1, value: '', next: '', name: '伤口敷料',autoComplete: { data: ['A', 'B','C','D'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'plasterCast', event: keyf1, value: '', next: '', name: '石膏固定',autoComplete: { data: ['A', 'B','C'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'flapFixed', event: keyf1, value: '', next: '', name: '皮瓣固定',autoComplete: { data: ['A', 'B','C'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'functional', event: keyf1, value: '', next: '', name: '功能锻炼',autoComplete: { data: ['A', 'B','C','D','E','F','G'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'color', event: keyf1, value: '', next: '', name: '颜色',autoComplete: { data: ['A', 'B','C','D','E','F'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'piWin', event: keyf1, value: '', next: '', name: '皮温',autoComplete: { data: ['A', 'B','C'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'swelling', event: keyf1, value: '', next: '', name: '肿胀',autoComplete: { data: ['A', 'B','C','D'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'feel', event: keyf1, value: '', next: '', name: '感觉',autoComplete: { data: ['A', 'B','C'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'armValue', event: keyf1, value: '', next: '', name: '自定义值', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'armValue2', event: keyf1, value: '', next: '', name: '自定义值2', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'armValue3', event: keyf1, value: '', next: '', name: '自定义值3', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
    
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
      textarea: { width: 150 },
      event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
    },
    { key: "sign", value: "" },//单签
    // { key: "sign2", value: "" },//双签
    { hidden:true,key: "audit", value: "" },//审核签名
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
  