
/** 
  北海人医 -产程观察记录
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
    { key: "recordHour", event: event_time,  value: ''},
    { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'contractions', event: keyf1, value: '', next: '', name: '宫缩',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'intermittent', event: keyf1, value: '', next: '', name: '间歇',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'continuous', event: keyf1, value: '', next: '', name: '持续',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'intensity', event: keyf1, value: '', next: '', name: '强度',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'presentation', event: keyf1, value: '', next: '', name: '先露',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'highLow', event: keyf1, value: '', next: '', name: '先露高低',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'position', event: keyf1, value: '', next: '', name: '胎位',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'cardiac', event: keyf1, value: '', next: '', name: '胎心',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'rate', event: keyf1, value: '', next: '', name: '速率',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'strongWeak', event: keyf1, value: '', next: '', name: '强弱',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'location', event: keyf1, value: '', next: '', name: '位置',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'cervicalDilation', event: keyf1, value: '', next: '', name: '宫颈扩张',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'membranes', event: keyf1, value: '', next: '', name: '胎膜',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'checkWay', event: keyf1, value: '', next: '', name: '检查方式',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) ,autoComplete: { data: ['肛','阴'] },splice:true},
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "240px", background: "transparent" },
      textarea: { width: 240 },
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
  