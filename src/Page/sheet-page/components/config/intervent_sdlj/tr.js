
/** 
  顺德龙江 - 护理记录单（颅脑外科）
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

let yishi = [{name: '清√', value: '√'},{name: '嗜睡+', value: '+'},{name: '浅昏迷++', value: '++'},{name: '深昏迷+++', value: '+++'},{name: '药眠', value: '药眠'},]
let tkLeft = [{name: '灵敏√', value: '√'},{name: '迟钝+', value: '+'},{name: '消失－', value: '-'}]
let tkRight = [{name: '灵敏√', value: '√'},{name: '迟钝+', value: '+'},{name: '消失－', value: '-'}]

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'saturation', event: keyf1, value: '', next: '%', name: '血氧饱和度', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: yishi }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'magnitudeLeft', event: keyf1, value: '', next: 'mm', name: '瞳孔大小左', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'magnitudeRight', event: keyf1, value: '', next: 'mm', name: '瞳孔大小右', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'reflectionLeft', event: keyf1, value: '', next: '', name: '瞳孔反射左', autoComplete: { data: tkLeft }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'reflectionRight', event: keyf1, value: '', next: '', name: '瞳孔反射右', autoComplete: { data: tkRight }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'outputAmount2', event: keyf1, value: '', next: '', name: '出量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'nausea', event: keyf1, value: '', next: '', name: '恶心/呕吐', textarea: { width: 30 },autoComplete: { data: ['无','√','间有'] }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'dizzy', event: keyf1, value: '', next: '', name: '头晕', textarea: { width: 30 }, autoComplete: { data: ['0','1','2','3','4','5','6','7','8','9','10'] }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'monitoring', event: keyf1, value: '', next: '', name: '心电监护', textarea: { width: 30 },autoComplete: { data: ['√','停'] },  change: (e, td) => limitChange(e, td, 2) },
  { key: 'oxygen', event: keyf1, value: '', next: 'L/min', name: '吸氧', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'upperLeft', event: keyf1, value: '', next: '', name: '上肢左', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'upperRight', event: keyf1, value: '', next: '', name: '上肢右', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'lowerLeft', event: keyf1, value: '', next: '', name: '下肢左', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'lowerRight', event: keyf1, value: '', next: '', name: '下肢右', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue1', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue3', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue4', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue5', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue6', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
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
