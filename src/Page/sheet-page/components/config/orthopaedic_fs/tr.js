
/**
  佛山市一 - 护理记录单(骨科通用护理单)
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

let autoComplete1 = ['√','无','有','减轻','0分','1分','2分','3分','4分','5分','6分','7分','8分','9分','10分','正常','减退','丧失' ,'0级','I级','II级','III级','IV级','V级','清','浑浊','沉渣淡黄','深黄','茶色','乳白','淡红']
let Output = ['大便','尿量','引流量']
let Input = ['输入液量','进食量']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, click: click_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: '心率次/分', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'armValue1', event: keyf1, value: '', next: '', name: '自定义值1', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '自定义值2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue3', event: keyf1, value: '', next: '', name: '自定义值3', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量',autoComplete: { data: Input }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量',autoComplete: { data: Output }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'character', event: keyf1, value: '', next: '', name: '颜色/性状', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue4', event: keyf1, value: '', next: '', name: '自定义值4', autoComplete: { data: autoComplete1 }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue5', event: keyf1, value: '', next: '', name: '自定义值5', autoComplete: { data: autoComplete1 }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue6', event: keyf1, value: '', next: '', name: '自定义值6', autoComplete: { data: autoComplete1 }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue7', event: keyf1, value: '', next: '', name: '自定义值7', autoComplete: { data: autoComplete1 }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue8', event: keyf1, value: '', next: '', name: '自定义值8', autoComplete: { data: autoComplete1 }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue9', event: keyf1, value: '', next: '', name: '自定义值9', autoComplete: { data: autoComplete1 }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue10', event: keyf1, value: '', next: '', name: '自定义值10', autoComplete: { data: autoComplete1 }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue11', event: keyf1, value: '', next: '', name: '自定义值11', autoComplete: { data: autoComplete1 }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "163px", background: "transparent" },
    textarea: { width: 163 },
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
