
/**
  佛山杏坛 - 护理记录单(产科新生儿科)
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

let measureList=[{name:"A预防窒息",value:"A"},{name:"B预防坠床",value:"B"},{name:"C预防烫伤",value:"C"},{name:"D指导外用药",value:"D"},{name:"E指导口药服用",value:"E"},{name:"F喂养护理",value:"F"},{name:"G其他",value:"G"},]
let reaction =['好','激怒','差']
let crylist =['大','微弱']
let Suckingforce =['好','一般','差']
let category =['母乳','人工喂养','混合']
let modeList =['自吮','口饲']
let regionlist =['干洁','渗血','渗液']
export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'defecateFrequency', event: keyf1, value: '', next: '', name: '大便次数', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'numberUrine', event: keyf1, value: '', next: '', name: '小便次数', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'reactionExcellent', event: keyf1, value: '', next: '', name: '反应',autoComplete: { data: reaction }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'cryingLoud', event: keyf1, value: '', next: '', name: '哭声',autoComplete: { data: crylist }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'suckinglExcellent', event: keyf1, value: '', next: '', name: '吸引力',autoComplete: { data: Suckingforce }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'breastMilk', event: keyf1, value: '', next: '', name: '喂养种类',autoComplete: { data: category }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'sinceSucking', event: keyf1, value: '', next: '', name: '喂养方式',autoComplete: { data: modeList }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'dryClean', event: keyf1, value: '', next: '', name: '脐部情况',autoComplete: { data: regionlist }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 1) },
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, ) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem5', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem6', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customItem7', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'customItem8', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'customItem9', event: keyf1, value: '', next: '', name: '', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
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
