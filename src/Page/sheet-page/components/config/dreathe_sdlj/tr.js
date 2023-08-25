
/**
  顺德龙江 - 呼吸专科护理记录单
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

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, click: click_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'saturation', event: keyf1, value: '', next: '%', name: '血氧饱和度', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '神志',  autoComplete: { data: ['A','B','C','D','E'] },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reflection', event: keyf1, value: '', next: '', name: '对光反射',  autoComplete: { data: ['A','B','C'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'diameter', event: keyf1, value: '', next: 'mm', name: '直径',  autoComplete: { data: ['A','B','C'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputContent', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'outputAmount', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'outputContent2', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'outputAmount2', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'cough', event: keyf1, value: '', next: '', name: '咳嗽', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'sputumProperties', event: keyf1, value: '', next: '', name: '痰液性质', splice: '', autoComplete: { data: ['WL','YWT','YT','B'] }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'sputumVolume', event: keyf1, value: '', next: '', name: '痰量', splice: '', autoComplete: { data: ['+','++','+++'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'stethalgia', event: keyf1, value: '', next: '', name: '胸痛', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'oxygen', event: keyf1, value: '', next: 'L/min', name: '吸氧', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'expectoration', event: keyf1, value: '', next: '', name: '排痰/吸痰', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'semireclining', event: keyf1, value: '', next: '', name: '翻身拍背半坐卧位', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'fowler', event: keyf1, value: '', next: '', name: '翻身拍背平卧位', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'oralCare', event: keyf1, value: '', next: '', name: '口腔护理', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'perineum', event: keyf1, value: '', next: '', name: '会阴抹洗', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bladder', event: keyf1, value: '', next: '', name: '心电监护', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'urological', event: keyf1, value: '', next: '', name: '呼吸功能锻炼', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'education', event: keyf1, value: '', next: '', name: '健康教育', splice: '', autoComplete: { data: ['A','B','C','D','E','F','G','H','I'] }, textarea: { width: 65 }, change: (e, td) => limitChange(e, td, 10) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', textarea: { width: 55 },splice:true,autoComplete:{data:['√']}, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', textarea: { width: 55 },splice:true,autoComplete:{data:['√']}, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue3', event: keyf1, value: '', next: '', name: '', textarea: { width: 55 },splice:true,autoComplete:{data:['√']}, change: (e, td) => limitChange(e, td, 4) },
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
  { hidden:true, key:'auditorNo', value:''},//审核签名
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''}

]
