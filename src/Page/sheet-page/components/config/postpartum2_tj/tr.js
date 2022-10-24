
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
  click_time,
  click_cancel
} from "../keyEvent/date";

let ysList = ['√','+','±','++','+++','谵妄']
let tyList = ["（-）","红肿", "渗液","水肿"]
let safeList=[{name:"A协助翻身",value:"A"},{name:"B指导床上翻身活动",value:"B"},{name:"C指导下床活动",value:"C"},{name:"D去枕平卧",value:"D"},{name:"E指导患者口腔护理",value:"E"},{name:"F膀胱功能训练",value:"F"},{name:"G指导会阴护理",value:"G"},{name:"H指导更换新生儿尿布",value:"H"},{name:"I指导新生儿脐部护理",value:"I"},{name:"J留置针护理",value:"J"},{name:"K出院指导",value:"K"},{name:"L其他",value:"L"}]
let measureList=[{name:"A留陪人",value:"A"},{name:"B防压疮",value:"B"},{name:"C防跌倒，防坠床",value:"C"},{name:"D挂标识、防药物外渗",value:"D"},{name:"E挂标识、防脱管",value:"E"},{name:"F防烫伤",value:"F"},{name:"G其他",value:"G"},]
const jkxjList = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']


export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'inputContent', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'inputUrine', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputContent', event: keyf1, value: '', next: 'ml', name: '出量内容', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'outputUrine', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'lactation', event: keyf1, value: '', next: '', name: '泌乳情况', autoComplete: { data: ['少','中','多'] }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'uterineFloor', event: keyf1, value: '', next: '', name: '宫底高度', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'contractionsSoft', event: keyf1, value: '', next: '', name: '软', style: { width: '25px' }, click: (e, td) => click_cancel(e, td, 1) },
  { key: 'contractionsHard', event: keyf1, value: '', next: '', name: '硬', style: { width: '25px' }, click: (e, td) => click_cancel(e, td, 1)  },
  { key: 'abdomen', event: keyf1, value: '', next: '', name: '腹部', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: { data: tyList },  },
  { key: 'perineum', event: keyf1, value: '', next: '', name: '会阴', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: { data: tyList },  },
  { key: 'customItem7', event: keyf1, value: '', next: '', name: '', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: jkxjList }, splice: "," },
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem5', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem6', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'customItem8', event: keyf1, value: '', next: '', name: '', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 6) },
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
