
/** 
  北海人医 - 糖尿病治疗观察表
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
    { key: "recordHour", event: event_time,  value: ''},
    { key: 'weight', event: keyf1, value: '', next: 'kg', name: '体重',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'diabetes', event: keyf1, value: '',  name: '降糖药',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'early', event: keyf1, value: '',  name: '降糖药早',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'centre', event: keyf1, value: '',  name: '降糖药中',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'lateness', event: keyf1, value: '',  name: '降糖药晚',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'species', event: keyf1, value: '',  name: '胰岛素种类',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'insulinEarly', event: keyf1, value: '',  name: '胰岛素种类早',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'insulinCentre', event: keyf1, value: '',  name: '胰岛素种类中',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'insulinLateness', event: keyf1, value: '',  name: '胰岛素种类晚',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'insulinBedtime', event: keyf1, value: '',  name: '胰岛素种类睡前',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'beforeBreakfast', event: keyf1, value: '',  name: '血糖早餐前',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'afterBreakfast', event: keyf1, value: '',  name: '血糖早餐后',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'beforeLunch', event: keyf1, value: '',  name: '血糖午餐前',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'afterLunch', event: keyf1, value: '',  name: '血糖午餐后',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'beforeDinner', event: keyf1, value: '',  name: '血糖晚餐前',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'afterSupper', event: keyf1, value: '',  name: '血糖晚餐后',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'beforeSleep', event: keyf1, value: '',  name: '血糖睡前',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'orderDoctor', event: keyf1, value: '',  name: '开单医生',textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 8) },
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "180px", background: "transparent" },
      textarea: { width: 180 },
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
  