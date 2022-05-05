
/**
  佛山杏坛 - 护理记录单（新生儿专科）
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

let fyList = ['G','I','D']
let ksList = ['D','S','F']
// let qbqkList = ['D','S','E']
// let xyfsList = ['N','F','W','M','H']
// let hlaqList = ['A','B','C','D','E','F','G','H','I']
let hlaqList = [{name:"A留陪人",value:"A"},{name:"B防坠床",value:"B"},{name:"C防药物外渗",value:"C"},{name:"D防红臀",value:"D"},{name:"E防拔管",value:"E"},{name:"F防误吸",value:"F"},{name:"G防窒息",value:"G"},{name:"H防烫伤",value:"H"},{name:"I其他",value:"I"}]
// let tyList = ['○','I','II','III','√','×','+','++','+++','WL','YWT','YT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','W','X']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'boxTemperature', event: keyf1, value: '', next: '℃', name: '箱温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'probePosition', event: keyf1, value: '', next: '', name: '更换探头位置', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'testValue', event: keyf1, value: '', next: '', name: '皮测值', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'reaction', event: keyf1, value: '', next: '', name: '反应', autoComplete: { data: fyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'cry', event: keyf1, value: '', next: '', name: '哭声', autoComplete: { data: ksList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'suck', event: keyf1, value: '', next: '', name: '吸吮力', autoComplete: { data: ['G','S','D'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'feedingType', event: keyf1, value: '', next: '', name: '喂养种类', autoComplete: { data: ['D','M'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'feedingWay', event: keyf1, value: '', next: '', name: '喂养方式', autoComplete: { data: ['S','N','M'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },

  { key: 'customItem1', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem5', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem6', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem7', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem8', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  
  { key: 'nursingSafety', event: keyf1, value: '', next: '', name: '护理安全', autoComplete: { data: hlaqList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'reportDoctor', event: keyf1, value: '', next: '', name: '报告医生', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'continueObserve', event: keyf1, value: '', next: '', name: '遵医嘱继续观察', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "100px", background: "transparent" },
    textarea: { width: 100 },
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
