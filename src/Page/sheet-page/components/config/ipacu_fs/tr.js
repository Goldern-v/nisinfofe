
/** 
  佛山市一 - 护理记录单(麻醉科IPACU护理记录单)
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
  { key: "recordHour", event: event_time,  click: click_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'hr', event: keyf1, value: '', next: '次/分', name: 'HR',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'BP',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo', event: keyf1, value: '', next: '%', name: 'SPO₂',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spirit', event: keyf1, value: '', next: '', name: '神志',autoComplete: { data: 
    [{name:"麻醉未醒①",value:"麻醉未醒"},{name:"清醒②",value:"麻醉未醒"},{name:"谵妄③",value:"谵妄"},
     {name:"嗜睡④",value:"嗜睡"},{name:"昏睡⑤",value:"昏睡"},{name:"浅昏迷⑥",value:"浅昏迷"},{name:"中度昏迷⑦",value:"中度昏迷"},
     {name:"深昏迷⑧",value:"深昏迷"},{name:"镇静状态⑨",value:"镇静状态"}
    ] } ,
    textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'rass', event: keyf1, value: '', next: '', name: 'RASS',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'heartRhythm', event: keyf1, value: '', next: '', name: '心律',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'cvp', event: keyf1, value: '', next: '', name: 'CVP',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'vas', event: keyf1, value: '', next: '', name: '疼痛VAS评分',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量项目',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: '入量',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量项目',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'dischargeSize', event: keyf1, value: '', next: '', name: '出量',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputColor', event: keyf1, value: '', next: '', name: '颜色或性状',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputCm', event: keyf1, value: '', next: 'cm', name: '刻度',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenMode', event: keyf1, value: '', next: '', name: '吸氧方式',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenL', event: keyf1, value: '', next: 'L/min', name: '吸氧流量',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'venousIn', event: keyf1, value: '', next: 'CM', name: '静脉置管内置',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom1', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom2', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom3', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom4', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom5', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "163px", background: "transparent" },
    textarea: { width: 163 },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  },
  // { key: "sign", value: "" },//单签
  { key: "sign", value: "" },//单签
  { key: "audit", value: "" },
  // { key: "sign2", value: "" },//双签
  // { key: "audit", value: "" },//审核签名
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
// export default [
//   // { hidden: true, key: 'recordDate', value: '' },
//   { key: "recordMonth", event: event_date, click: click_date, value: ''},
//   { key: "recordHour", event: event_time,  click: click_time, value: ''},
  // { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
//   { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏/心率', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
//   { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
//   { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
//   { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SPO2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
//   { key: 'food', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
//   { key: 'foodSize', event: keyf1, value: '', next: '', name: '入量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
//   { key: 'discharge', event: keyf1, value: '', next: '', name: '出量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
//   { key: 'dischargeSize', event: keyf1, value: '', next: '', name: '出量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
//   { key: 'limbFeeling', event: keyf1, value: '', next: '', name: '患肢各趾感觉', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["麻木","正常","无"]}},
//   { key: 'limbActivity', event: keyf1, value: '', next: '', name: '患肢各趾活动', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["受限","自如","不能"]}},
//   { key: 'limbSkintemperature', event: keyf1, value: '', next: '', name: '患肢各趾皮温', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6),autoComplete:{data:["暖","凉","高","正常"]} },
//   { key: 'limbNailbed', event: keyf1, value: '', next: '', name: '患肢各趾甲床', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete:{data:["红润","瘀紫","苍白"]}},
//   { key: 'limbPain', event: keyf1, value: '', next: '', name: '患肢疼痛评分', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
//   { key: 'limbRaised', event: keyf1, value: '', next: '', name: '患肢抬高', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete:{data:["√","无","有"]}},
//   { key: 'plasterCast', event: keyf1, value: '', next: '', name: '石膏固定', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete:{data:["√","无","有"]}},
//   { key: 'limbSwelling', event: keyf1, value: '', next: '', name: '患肢肿胀', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["无","I°","II°","III°"]} },
//   { key: 'woundApplication', event: keyf1, value: '', next: '', name: '伤口外敷料', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6),  autoComplete:{data:["干洁","渗血","渗液"]}  },
//   { key: 'gripBallTraining', event: keyf1, value: '', next: '', name: '握力球训练', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6),autoComplete:{data:["√","无","有"]}},
//   { key: 'armValue', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  // {
  //   key: "description", //特殊情况记录
  //   value: "",
  //   style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "163px", background: "transparent" },
  //   textarea: { width: 163 },
  //   event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  // },
  // { key: "sign", value: "" },//单签
  // { key: "sign2", value: "" },//双签
  // { key: "audit", value: "" },//审核签名
  // { hidden:true, key:'id', value:''},
  // { hidden:true, key:'signerName', value:''},
  // { hidden:true, key:'signerName2', value:''},
  // { hidden:true, key:'status', value:''},
  // { hidden:true, key:'recordSource', value:''},
  // { hidden:true, key:'recordYear', value:''},
  // { hidden:true, key:'dataHash', value:''},
  // { hidden:true, key:'recordDate', value:''},
  // { hidden:true, key:'monthHour', value:''},
  // { hidden:false, key:'signerNo', value:''},//单签
  // { hidden:true, key:'signerNo2', value:''},//双签
  // { hidden:false, key:'auditorNo', value:''},//审核签名
  // { hidden:true, key:'auditorName', value:''},
  // { hidden:true, key:'empNo', value:''},
  // { hidden:true, key:'multiSign', value:''}
  
// ]
