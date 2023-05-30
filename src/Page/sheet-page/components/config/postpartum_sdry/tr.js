
/**
  顺德人医 - 产后护理记录单
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
const yishi = ["清醒", "嗜睡", "浅昏迷", "深昏迷", "模糊", "昏睡", "谵妄","痴呆","药眠"]
const yanse = [{name: '①血性液', value: '血性液'},{name: '②淡红色液', value: '淡红色液'},{name: '③暗红色液', value: '暗红色液'},{name: '④黄色液', value: '黄色液'},{name: '⑤淡黄色液', value: '淡黄色液'},{name: '⑥深黄色液', value: '深黄色液'}];
const ruliang = ["饮水","进食","鼻饲","输血","输液","静注"]
const chuliang = ["尿液","大便","引流液","呕吐物","胃液","恶露"]
const breastCondition = ["胀痛","无异常"];
const uterineContractions = ["硬","软"];
const outputContent = ["尿", "引流液", "大便", "呕吐物", "恶露", "24h恶露", "阴道出血", "术中出血","恶露量"]

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time,  click: click_time, value: ''},
  { key: 'expand', event: keyf1, value: '', next: '', name: '意识',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete: { data: yishi }},
  { key: 'temperature', event: keyf1, value: '', next: '°C', name: 'T',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '',next: '次/分', name: 'P',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'BP',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: '血氧饱和度', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'lactation ', event: keyf1, value: '', next: '', name: '泌乳情况',autoComplete: { data: shaoOrzhDuo }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breastCondition', event: keyf1, value: '', next: '', name: '乳房情况', autoComplete: { data: breastCondition },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'uterineFloor ', event: keyf1, value: '', next: '', name: '宫底高度', autoComplete: { data: gongjin },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'uterineShrink ', event: keyf1, value: '', next: '', name: '子宫收缩', autoComplete: { data: uterineContractions },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'abdomen', event: keyf1, value: '', next: '', name: '伤口腹部',autoComplete: { data: shangkou }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'perineum', event: keyf1, value: '', next: '', name: '伤口会阴',autoComplete: { data: shangkou }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6),autoComplete: { data: ruliang } },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: '入量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量', autoComplete: { data: outputContent }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6),autoComplete: { data: chuliang }},
  { key: 'dischargeSize', event: keyf1, value: '', next: '', name: '出量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputColor', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4),autoComplete: { data: yanse } },
  { key: 'ureter', event: keyf1, value: '', next: '', name: '尿管',autoComplete: { data: yingOrruan }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'analgesia', event: keyf1, value: '', next: '', name: '硬膜外/静脉镇痛泵情况', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygen', event: keyf1, value: '', next: '', name: '吸氧L/分/压砂袋', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customValue3', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
  { key: 'customValue4', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "163px", background: "transparent" },
    textarea: { width: 260 },
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
