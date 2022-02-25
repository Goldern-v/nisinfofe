
/** 
  顺德龙江 - 护理记录单（骨科）
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6) 的意思是宽度设置45，字数限制6个。
    2、autoComplete: { data: [] } 为下拉框内容，根据需要添加。
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
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputContent', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'outputAmount', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'outputUrine', event: keyf1, value: '', next: '', name: '出量尿管', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputAmount2', event: keyf1, value: '', next: 'ml', name: '尿管出量', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'outputColor', event: keyf1, value: '', next: '', name: '尿颜色', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputDrainage', event: keyf1, value: '', next: '', name: '伤口引流管', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputAmount3', event: keyf1, value: '', next: 'ml', name: '引流管出量', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'outputColor2', event: keyf1, value: '', next: '', name: '伤口引流管颜色', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'limbLength', event: keyf1, value: '', next: '', name: '患肢长度', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'healthyBody', event: keyf1, value: '', next: '', name: '健肢长度', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'position', event: keyf1, value: '', next: '', name: '体位', splice: '/', autoComplete: { data: ['A','B','C','D'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'color', event: keyf1, value: '', next: '', name: '颜色',splice: '/', autoComplete: { data: ['A','B','C','D','E','F','G'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'temperature2', event: keyf1, value: '', next: '', name: '皮温', splice: '/', autoComplete: { data: ['A','B','C','D','E'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'swelling', event: keyf1, value: '', next: '', name: '肿胀', splice: '/', autoComplete: { data: ['A','B','C','D'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'feeling', event: keyf1, value: '', next: '', name: '感觉', splice: '/', autoComplete: { data: ['A','B','C','D'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'activity', event: keyf1, value: '', next: '', name: '活动', splice: '/', autoComplete: { data: ['A','B','C','D','E'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'capillary', event: keyf1, value: '', next: '', name: '毛细血管反应', splice: '/', autoComplete: { data: ['A','B','C','D'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'artery', event: keyf1, value: '', next: '', name: '动脉搏动', splice: '/', autoComplete: { data: ['A','B','C'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'integrity', event: keyf1, value: '', next: '', name: '皮肤完整性', splice: '/', autoComplete: { data: ['A','B','C','D'] },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'measures', event: keyf1, value: '', next: '', name: '护理措施', splice: '/', splice: '/', autoComplete: { data: ['A','B','C','D','E','F'] },  textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'dressing', event: keyf1, value: '', next: '', name: '伤口敷料', autoComplete: { data: ['A','B','C'] },  textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'functional', event: keyf1, value: '', next: '', name: '功能锻炼', autoComplete: { data: ['A','B','C','D','E','F','G','H','I','J'] },  textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'gypsum', event: keyf1, value: '', next: '', name: '石膏', autoComplete: { data: ['A','B','C'] },  textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'traction', event: keyf1, value: '', next: '', name: '牵引', autoComplete: { data: ['A','B','C'] },  textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
    textarea: { width: 150 },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  },
  { key: "sign", value: "" },//单签
  // { key: "sign2", value: "" },//双签
  //{ key: "audit", value: "" },//审核签名
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
