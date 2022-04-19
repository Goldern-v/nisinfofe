
/**
  佛山杏坛 - 护理记录单(产后)
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

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'vaginalBleeding', event: keyf1, value: '', next: 'ml', name: '阴道出血', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'urine', event: keyf1, value: '', next: 'ml', name: '尿量', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'lactation', event: keyf1, value: '', next: '', name: '泌乳情况', autoComplete: { data: ['少','中','多'] }, textarea: { width: 23 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'uterineFloor', event: keyf1, value: '', next: '', name: '宫底高度', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'contractionsSoft', event: keyf1, value: '', next: '', name: '软', textarea: { width: 23 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'contractionsHard', event: keyf1, value: '', next: '', name: '硬', textarea: { width: 23 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'abdominalWound', event: keyf1, value: '', next: '', name: '腹部伤口敷料', autoComplete: { data: ['A','B','C'] }, textarea: { width: 23 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pain', event: keyf1, value: '', next: '', name: '腹部伤口疼痛', autoComplete: { data: ['○','I','II','III'] }, textarea: { width: 23 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'perinealWound', event: keyf1, value: '', next: '', name: '会阴伤口情况', autoComplete: { data: ['正常','红肿','渗液','渗血','水肿'] }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pain2', event: keyf1, value: '', next: '', name: '会阴伤口疼痛', autoComplete: { data: ['○','I','II','III'] }, textarea: { width: 23 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'exhaust', event: keyf1, value: '', next: '', name: '排气', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'micturition', event: keyf1, value: '', next: '', name: '排尿', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue1', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pressedSand', event: keyf1, value: '', next: '', name: '压砂袋', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'urinaryRetention', event: keyf1, value: '', next: '', name: '预防尿潴留', autoComplete: { data: ['A','B','C','D','E'] }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'catheterFixation', event: keyf1, value: '', next: '', name: '尿管固定通畅', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'urineColor', event: keyf1, value: '', next: '', name: '尿液颜色', autoComplete: { data: ['A','B','C','D','E','F'] }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'analgesicPump', event: keyf1, value: '', next: '', name: '镇痛泵固定通畅', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenInhalation', event: keyf1, value: '', next: '升/分', name: '吸氧', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'ecgMonitoring', event: keyf1, value: '', next: '', name: '心电监护', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'dietaryGuidance', event: keyf1, value: '', next: '', name: '饮食指导', autoComplete: { data: ['A','B','C','D'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breastfeedingGuidance', event: keyf1, value: '', next: '', name: '母乳喂养指导', autoComplete: { data: ['A','B','C','D','E','F'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', autoComplete: { data: ['A','B','C','D','E','F','G','H','I','J','K','L'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingSafety', event: keyf1, value: '', next: '', name: '护理安全', autoComplete: { data: ['A','B','C','D','E','F','G'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reportDoctor', event: keyf1, value: '', next: '', name: '报告医生', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'continueObserve', event: keyf1, value: '', next: '', name: '遵医嘱继续观察', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
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
