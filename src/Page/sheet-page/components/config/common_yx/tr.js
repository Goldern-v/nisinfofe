
/**
  武汉亚心 -护理记录单
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
    { key: "recordHour", event: event_time, click: click_time ,value: ''},
    { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'temperature', event: keyf1, value: '', next: '℃', name: 'T',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'pulse', event: keyf1, value: '', next: '次/分', name: 'HR',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'BP',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'spo2', event: keyf1, value: '', next: '%', name: 'Sp02',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'cvp', event: keyf1, value: '', next: 'mmHg', name: 'CVP',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'cardiac', event: keyf1, value: '', next: '', name: '心电监护',textarea: { width: 32}, change: (e, td) => limitChange(e, td, 4) },
    { key: 'incision', event: keyf1, value: '', next: '', name: '切口敷料',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'oxygen', event: keyf1, value: '', next: '升/分', name: '氧气',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'intravenous', event: keyf1, value: '', next: '升/分', name: '静脉置管',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'customItem1', event: keyf1, value: '', next: '', name: '',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'customItem2', event: keyf1, value: '', next: '', name: '',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterName', event: keyf1, value: '', next: '', name: '导管及引流管名称',textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 12), autoComplete: { data: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'] },splice:true},
    { key: 'catheterPosition', event: keyf1, value: '', next: '', name: '导管及引流管部位',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterMode', event: keyf1, value: '', next: '', name: '导管及引流管状态',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterDepth', event: keyf1, value: '', next: 'cm', name: '导管及引流管深度',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterColour', event: keyf1, value: '', next: '', name: '导管及引流管颜色',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterTraits', event: keyf1, value: '', next: '', name: '导管及引流管性状',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'lying', event: keyf1, value: '', next: '', name: '卧位',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'compressedSkin', event: keyf1, value: '', next: '', name: '受压皮肤',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'inputReserve', event: keyf1, value: '', next: 'ml', name: '入量项目(备用量)',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'practicalAmount', event: keyf1, value: '', next: 'ml', name: '入量实用量',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'outputItem', event: keyf1, value: '', next: '', name: '出量项目',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'outputQuantity', event: keyf1, value: '', next: 'ml', name: '量',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'measures', event: keyf1, value: '', next: '', name: '护理措施',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 14), autoComplete: { data: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19'] },splice:true},
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
