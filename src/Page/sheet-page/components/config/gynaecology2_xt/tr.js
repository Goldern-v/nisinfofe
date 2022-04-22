
/**
  佛山杏坛 - 护理记录单(妇科专科)
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

let ysList = ['√','+','±','++','+++','谵妄']
let tyList = ['○','I','II','III','√','×','+','++','+++','A','B','C','D','E','F','G','H','I']
let measureList=[{name:"A协助翻身",value:"A"},{name:"B指导床上翻身活动",value:"B"},{name:"C指导下床活动",value:"C"},{name:"D去枕平卧",value:"D"},{name:"E指导患者口腔护理",value:"E"},{name:"F膀胱功能训练",value:"F"},{name:"G指导会阴护理",value:"G"},{name:"H指导用药注意事项",value:"H"},{name:"I留置针护理",value:"I"},{name:"J饮食指导",value:"J"},{name:"K出院指导",value:"K"},{name:"L其他",value:"L"}]
let safeList=[{name:"A留陪人",value:"A"},{name:"B防压疮",value:"B"},{name:"C防跌倒，防坠床",value:"C"},{name:"D挂标识、防药物外渗",value:"D"},{name:"E挂标识、防脱管",value:"E"},{name:"F防烫伤",value:"F"},{name:"G其他",value:"G"},]


export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem5', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem6', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem7', event: keyf1, value: '', next: '', name: '', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'customItem8', event: keyf1, value: '', next: '', name: '', textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', autoComplete: { data: measureList },splice:true, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'nursingSafety', event: keyf1, value: '', next: '', name: '护理安全', autoComplete: { data: safeList }, splice:true, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 2) },
 
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
