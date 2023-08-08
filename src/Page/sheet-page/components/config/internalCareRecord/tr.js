
/**
  佛山市一 - 护理记录单(儿科二区通用)
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

  export default [
    { hidden: true, key: 'recordDate', value: '' },
    { key: "recordMonth", event: event_date, click: click_date, value: ''},
    { key: "recordHour", event: event_time,  click: click_time, value: ''},
    // 生命体征
    { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '心率/脉搏', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 10) },
    { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 60 },
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'sugarOxygen', event: keyf1, value: '', next: '%', name: '血氧饱和度', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'consciousness', event: keyf1, value: '',name: '意识', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'bloodSugar', event: keyf1, value: '', next: 'mmol/L', name: '血糖', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 10) },
    // 出入量
    { key: 'food', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 11)},
    { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量量', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'discharge', event: keyf1, value: '', next: '', name: '出量', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 16) },
    { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量量', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 11) },
    { key: 'custom1', event: keyf1, value: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'custom2', event: keyf1, value: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'custom3', event: keyf1, value: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "305px", background: "transparent" },
      textarea: { width: 305 },
      event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
    },
    { key: "sign", value: "" },//单签
    // { key: "sign2", value: "" },//双签
    // { key: "audit", value: "" },//审核签名
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
