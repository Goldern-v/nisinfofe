
/**
  佛山杏坛 - 护理记录单（通用）
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

let tyList = ['＋','±','－','正常','异常','干洁','渗液','渗血','温暖','偏高','凉','冰冷','暗红','青紫','淤黑','苍白','浅灰色','花斑状','轻度麻木','麻木','过敏','减退','消失','无','轻度','中度','重度','好转','乏力','结痂','愈合','拆除','有效','无效','通畅','脱落','堵塞','拔管','停止','绝对卧床休息','半坐卧位','卧床休息','减轻','缓解','白色粘痰','白色稀痰','黄色粘痰','黄色稀痰','黄色','淡黄色','深黄色','淡红色','浓茶色','血红色','暗红色']
let ysList = ['清醒','昏睡','嗜睡','浅昏迷','深昏迷','意识浑浊','瞻望状态', '√','+','++','+++']
export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 35 }, textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'bloodOxygen', event: keyf1, value: '', next: '%', name: '血氧饱和度', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'colorTraits', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue3', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue4', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue5', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue6', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue7', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue8', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue9', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue10', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue11', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
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
