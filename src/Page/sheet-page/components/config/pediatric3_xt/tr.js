
/** 
  佛山杏坛 - 护理记录单(产科新生儿科)
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
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'defecateFrequency', event: keyf1, value: '', next: '', name: '大便次数', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'numberUrine', event: keyf1, value: '', next: '', name: '小便次数', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'reactionExcellent', event: keyf1, value: '', next: '', name: '反应好', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'reactionIrritability', event: keyf1, value: '', next: '', name: '反应激惹', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'abdominalPoor', event: keyf1, value: '', next: '', name: '反应差', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'cryingLoud', event: keyf1, value: '', next: '', name: '哭声大', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'cryingWeak', event: keyf1, value: '', next: '', name: '哭声微弱', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'suckinglExcellent', event: keyf1, value: '', next: '', name: '吮吸力好', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'suckinglMediocre', event: keyf1, value: '', next: '', name: '吮吸力一般', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'suckinglWeak', event: keyf1, value: '', next: '', name: '吮吸力差', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'breastMilk', event: keyf1, value: '', next: '', name: '母乳', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'milkReplacer', event: keyf1, value: '', next: '', name: '代乳品', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'hybrid', event: keyf1, value: '', next: '', name: '混合', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'sinceSucking', event: keyf1, value: '', next: '', name: '自吮', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'mouthFeeding', event: keyf1, value: '', next: '', name: '口饲', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'vomiting', event: keyf1, value: '', next: '', name: '呕吐', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'nature', event: keyf1, value: '', next: '', name: '性质', autoComplete: { data: ['A','B','C','D','E'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'dryClean', event: keyf1, value: '', next: '', name: '干洁', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bleeding', event: keyf1, value: '', next: '', name: '渗血', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'drainage', event: keyf1, value: '', next: '', name: '渗液', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'skinColor', event: keyf1, value: '', next: '', name: '皮肤颜色', autoComplete: { data: ['R','F','X','C','P'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'elastic', event: keyf1, value: '', next: '', name: '弹性', autoComplete: { data: ['G','S','D'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'rashPosition', event: keyf1, value: '', next: '', name: '皮疹位置', autoComplete: { data: ['H','N','U','L','O','T','B','S','C','W'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'natureDegree', event: keyf1, value: '', next: '', name: '性质程度', autoComplete: { data: ['S','M','I','P','B','U'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'tumorLocation', event: keyf1, value: '', next: '', name: '产瘤位置', autoComplete: { data: ['L','R','T','F'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'daXiao', event: keyf1, value: '', next: 'cm', name: '产瘤大小', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'hematomaHead', event: keyf1, value: '', next: '', name: '头部血肿位置', autoComplete: { data: ['L','R','T','F'] }, textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'daXiao2', event: keyf1, value: '', next: 'cm', name: '头部血肿大小', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'hipNursing', event: keyf1, value: '', next: '', name: '臀部护理', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'spa', event: keyf1, value: '', next: '', name: '水疗', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'touch', event: keyf1, value: '', next: '', name: '抚触', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'navelNursing', event: keyf1, value: '', next: '', name: '脐部护理', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'transdermalBilirubin', event: keyf1, value: '', next: '', name: '经皮胆红素测定额', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'chest', event: keyf1, value: '', next: '', name: '经皮胆红素测定胸', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', autoComplete: { data: ['A','B','C','D','E'] }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', autoComplete: { data: ['A','B','C','D','E','F','G'] }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
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
