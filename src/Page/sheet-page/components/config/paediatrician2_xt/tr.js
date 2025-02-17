
/**
  佛山杏坛 - 护理记录单(儿科)
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

let ysList = ['√','+','±','++','+++','A','B','C','D','E']
let dgfyList = ['√','+','-']
// let shxdList = ['A','B','C','D','E','F']
// let ksList = ['A','B','C','D','E']
// let lzzbwList = ['A','B','C','D','E']
// let lzzqkList = ['A','B','C','D','E','F']
// let tyxzList = ['WL','YWT','YT','A']
// let tlList = ['+','++','+++']
// let hlcsList = ['A','B','C','D','E','F','G','H1','H2','H3','H4','I','J','K','L','N']
let hlcsList = [{name:"A保持呼吸道通畅",value:"A"},{name:"B发热护理",value:"B"},{name:"C冰袋降温",value:"C"},{name:"D口服药服用指导",value:"D"},{name:"E添加辅食指导",value:"E"},{name:"F母乳喂养指导",value:"F"},{name:"G活动指导",value:"G"},{name:"H饮食指导",value:"H"},{name:"H1禁食",value:"H1"},{name:"H2流质饮食",value:"H2"},{name:"H3半流饮食",value:"H3"},{name:"H4其他",value:"H4"}]
// let hlaqList = ['A','B','C','D','E','F','G','H','I']
let hlaqList = [{name:"A留陪人",value:"A"},{name:"B防坠床",value:"B"},{name:"C防药物外渗",value:"C"},{name:"D防红臀",value:"D"},{name:"E防拔管",value:"E"},{name:"F防误吸",value:"F"},{name:"G防窒息",value:"G"},{name:"H防烫伤",value:"H"},{name:"I其他",value:"I"}]
// let tyList = ['○','I','II','III','√','×','+','++','+++','A','B','C','D','E','F','G','H','I','K']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识/精神状态', splice: '/', autoComplete: { data: ysList }, textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilSizeLeft', event: keyf1, value: '', next: 'mm', name: '瞳孔大小左', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilSizeRight', event: keyf1, value: '', next: 'mm', name: '瞳孔大小右', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilReflectionLeft', event: keyf1, value: '', next: '', name: '瞳孔反射左', autoComplete: { data: dgfyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pupilReflectionRight', event: keyf1, value: '', next: '', name: '瞳孔反射右', autoComplete: { data: dgfyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'colorTraits', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  // { key: 'armValue', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue2', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'respiratorySymptoms', event: keyf1, value: '', next: '', autoComplete: { data: shxdList }, name: '上呼吸道症状', textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue3', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'cough', event: keyf1, value: '', next: '', name: '咳嗽', autoComplete: { data: ksList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'coughingPhlegm', event: keyf1, value: '', next: '', name: '咳痰', textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'sputumProperties', event: keyf1, value: '', next: '', name: '痰液性质', autoComplete: { data: tyxzList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'sputumVolume', event: keyf1, value: '', next: '', name: '痰量', autoComplete: { data: tlList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue4', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue5', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue6', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue7', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue8', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue9', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue10', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue11', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue12', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue13', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue14', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue15', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue16', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue17', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue18', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue19', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue20', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue21', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue22', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'indwellingNeedle', event: keyf1, value: '', next: '', name: '留置针部位', autoComplete: { data: lzzbwList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'needleCondition', event: keyf1, value: '', next: '', name: '留置针情况', autoComplete: { data: lzzqkList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'pipeNursing', event: keyf1, value: '', next: '', name: '冲管护理', textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue24', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue25', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue26', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },
  // { key: 'armValue27', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 18 }, change: (e, td) => limitChange(e, td, 2) },

  { key: 'customItem1', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem5', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem6', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem7', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'customItem8', event: keyf1, value: '', next: '', name: '', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 2) },

  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', autoComplete: { data: hlcsList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
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
