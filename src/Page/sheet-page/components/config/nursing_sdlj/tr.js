
/** 
  顺德龙江 - 产科护理记录单
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
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature1', event: keyf1, value: '', next: '℃', name: '产妇T', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse1', event: keyf1, value: '', next: '次/min', name: '产妇P', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath1', event: keyf1, value: '', next: '次/min', name: '产妇R', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure1', event: keyf1, value: '', next: 'mmHg', name: '产妇BP', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'consciousness1', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'cervical', event: keyf1, value: '', next: '', name: '宫颈高度', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'uterine', event: keyf1, value: '', next: '', name: '子宫收缩', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'postpartum', event: keyf1, value: '', next: 'ml', name: '产后出血量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'wound', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breast', event: keyf1, value: '', next: '', name: '乳房情况', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'lactation', event: keyf1, value: '', next: '', name: '泌乳情况', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue3', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue4', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'temperature2', event: keyf1, value: '', next: '℃', name: '新生儿T', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath2', event: keyf1, value: '', next: '次/min', name: '新生儿R', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reaction', event: keyf1, value: '', next: '', name: '反应', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'crying', event: keyf1, value: '', next: '', name: '哭声', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'sucking', event: keyf1, value: '', next: '', name: '吸吮力', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'since', event: keyf1, value: '', next: '', name: '自吮种类', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'skinColor', event: keyf1, value: '', next: '', name: '皮肤颜色', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'navel', event: keyf1, value: '', next: '', name: '脐部情况', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'suction', event: keyf1, value: '', next: '', name: '早早接吮触吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
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
  { hidden:true, key:'auditorNo', value:''},//审核签名
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''}
  
]
