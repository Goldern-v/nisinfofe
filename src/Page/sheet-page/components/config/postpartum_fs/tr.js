
/**
  佛山市一 - 产后护理记录单
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
let yingOrruan = ['硬','软']
let shaoOrzhDuo = ['少','中等','多']
let shangkou = ['(-)','红肿','渗液','水肿']
let gongjin = ['u=0','u=1','u=2','u=3','u=4','u+0','u+1','u+2','u+3','u+4','u-0','u-1','u-2','u-3','u-4']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time,  click: click_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '',next: '次/分', name: '脉搏',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SPO2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: '入量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6)  },
  { key: 'dischargeSize', event: keyf1, value: '', next: '', name: '出量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },

  { key: 'breastCondition', event: keyf1, value: '', next: '', name: '乳房情况',autoComplete: { data: yingOrruan },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'lactation', event: keyf1, value: '', next: '', name: '泌乳情况',autoComplete: { data: shaoOrzhDuo }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'fundusHeight', event: keyf1, value: '', next: '', name: '宫底高度', autoComplete: { data: gongjin },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'uterine', event: keyf1, value: '', next: '', name: '子宫收缩',autoComplete: { data: yingOrruan }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customValue2', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
  { key: 'abdominalWound', event: keyf1, value: '', next: '', name: '伤口腹部',autoComplete: { data: shangkou }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'perinealWound', event: keyf1, value: '', next: '', name: '伤口会阴',autoComplete: { data: shangkou }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'guideMilking', event: keyf1, value: '', next: '', name: '指导挤奶', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'recover', event: keyf1, value: '', next: '', name: '产后康复', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breastFeed', event: keyf1, value: '', next: '', name: '母乳喂养', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'babyCare', event: keyf1, value: '', next: '', name: '婴儿护理', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customValue3', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
  { key: 'customValue4', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "163px", background: "transparent" },
    textarea: { width: 300 },
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
