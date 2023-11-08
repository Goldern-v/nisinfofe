
/**
  武汉亚心 -新生儿科护理记录单
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
    { key: 'temperature', event: keyf1, value: '', next: '℃', name: 'T',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'pulse', event: keyf1, value: '', next: '次/分', name: 'HR',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'BP',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'spo2', event: keyf1, value: '', next: '%', name: 'Sp02',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'cardiac', event: keyf1, value: '', next: '', name: '心电监护',textarea: { width: 32}, change: (e, td) => limitChange(e, td, 4) },
    { key: 'lying', event: keyf1, value: '', next: '', name: '卧位',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'boxTemperature', event: keyf1, value: '', next: '℃', name: '箱温/暖床',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'ventilator', event: keyf1, value: '', next: '', name: '呼吸机模式',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'frequency', event: keyf1, value: '', next: '次/分', name: '频率',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'concentration', event: keyf1, value: '', next: '%', name: '氧浓度',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'intubation', event: keyf1, value: '', next: 'cm', name: '插管深度',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'oxygen', event: keyf1, value: '', next: 'L/min', name: '吸氧',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheter', event: keyf1, value: '', next: '', name: '留置针',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'deepVeins', event: keyf1, value: '', next: '', name: '深静脉',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterName', event: keyf1, value: '', next: '', name: '项目',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterPosition', event: keyf1, value: '', next: '', name: '部位',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterMode', event: keyf1, value: '', next: '', name: '状态',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterDepth', event: keyf1, value: '', next: 'cm', name: '深度',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterColour', event: keyf1, value: '', next: '', name: '颜色',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterTraits', event: keyf1, value: '', next: '', name: '性状',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'drugItem', event: keyf1, value: '', next: '', name: '药物项目',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'drugQuantity', event: keyf1, value: '', next: '', name: '药物量ml',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'dietItems', event: keyf1, value: '', next: '', name: '饮食项目',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'dietQuantity', event: keyf1, value: '', next: '', name: '饮食量ml',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'outputItem', event: keyf1, value: '', next: '', name: '出量项目',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'outputQuantity', event: keyf1, value: '', next: '', name: '出量ml',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'measures', event: keyf1, value: '', next: '', name: '护理措施',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 8),autoComplete: { data: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16'] },splice:true },
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "180px", background: "transparent" },
      textarea: { width: 180 },
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
