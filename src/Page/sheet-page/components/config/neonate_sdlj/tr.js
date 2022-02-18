
/** 
  顺德龙江 - 新生儿护理记录单
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
  { key: '', event: keyf1, value: '', next: '℃', name: '箱温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'saturation', event: keyf1, value: '', next: '%', name: '氧饱和度', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputCustom', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'outputAmount', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputCustom2', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'outputAmount2', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'complexion', event: keyf1, value: '', next: '', name: '肤色', autoComplete: { data: ['①','②','③','④','⑤','⑥']}, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reaction', event: keyf1, value: '', next: '', name: '反应', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'crying', event: keyf1, value: '', next: '', name: '哭声', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'remaining', event: keyf1, value: '', next: '', name: '留置针', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'situation', event: keyf1, value: '', next: '', name: '脐部情况', autoComplete: { data: ['①','②','③','④'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'periderm', event: keyf1, value: '', next: '', name: '肛周皮肤', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'phototherapy', event: keyf1, value: '', next: '', name: '光疗情况', autoComplete: { data: ['①','②','③','④','⑤'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'feedingWay', event: keyf1, value: '', next: '', name: '喂养方式', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'feedingSpecies', event: keyf1, value: '', next: '', name: '喂养种类', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenWay', event: keyf1, value: '', next: '', name: '吸氧方式', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenFlow', event: keyf1, value: '', next: '', name: '吸氧流量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'cleanCare', event: keyf1, value: '', next: '', name: '清洁护理', autoComplete: { data: ['①','②','③','④','⑤'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'glhlCare', event: keyf1, value: '', next: '', name: '光疗护理', autoComplete: { data: ['①','②','③'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'airwayCare', event: keyf1, value: '', next: '', name: '气道护理', autoComplete: { data: ['①','②','③'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nurse', event: keyf1, value: '', next: '', name: '专科护理', autoComplete: { data: ['①','②','③'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'illness', event: keyf1, value: '', next: '', name: '病情', autoComplete: { data: ['①','②'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
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
