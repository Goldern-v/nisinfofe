
/**
  佛山同江 - 护理记录单（全院通用）
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

let ysList = ['清醒','嗜睡','昏睡','浅昏迷','深昏迷','谵妄','麻醉未醒', '其他']
let dgfyList = ['灵敏（+）','迟钝（±）','消失（—）']
const jkxjList = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']
const ysxzList = ['棕黄粘稠', '墨绿粘稠', '淡黄澄清', '淡红血性', '鲜红血性', '暗红血性', '白色浑浊']
export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: 'T', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: 'P', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'Bp', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SpO₂', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'oxygenRate', event: keyf1, value: '', next: 'L/min', name: '氧流量', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilLeft', event: keyf1, value: '', next: '', name: '瞳孔大小左', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilRight', event: keyf1, value: '', next: '', name: '瞳孔大小右', textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reflectionLeft', event: keyf1, value: '', next: '', name: '光反射左', autoComplete: { data: dgfyList }, textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reflectionRight', event: keyf1, value: '', next: '', name: '光反射右', autoComplete: { data: dgfyList }, textarea: { width: 33 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 75 }, change: (e, td) => limitChange(e, td, 12) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 75 }, change: (e, td) => limitChange(e, td, 12) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'colorTraits', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4)},
  { key: 'fieldOne', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldTwo', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldThree', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldFour', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldFive', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldSix', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 8) },
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
