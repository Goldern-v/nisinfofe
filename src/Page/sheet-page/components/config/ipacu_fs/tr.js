
/**
  佛山市一 - 护理记录单(麻醉科AICU护理记录单)
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

const R = [
  {name:"辅助呼吸",value:"辅助呼吸"},
  {name:"停辅助呼吸",value:"停辅助呼吸"},
]

const RASS = [
  {name:"4",value:"4"},
  {name:"3",value:"3"},
  {name:"2",value:"2"},
  {name:"1",value:"1"},
  {name:"0",value:"0"},
  {name:"-1",value:"-1"},
  {name:"-2",value:"-2"},
  {name:"-3",value:"-3"},
  {name:"-4",value:"-4"},
  {name:"-5",value:"-5"},
]
const xinlu = [
  {name:"窦性",value:"窦性"},
  {name:"频发室早",value:"频发室早"},
  {name:"偶发室早",value:"偶发室早"},
  {name:"房颤",value:"房颤"},
  {name:"频发房早",value:"频发房早"},
  {name:"偶发房早",value:"偶发房早"},
  {name:"房扑",value:"房扑"},
  {name:"起搏心律",value:"起搏心律"},
  {name:"室速",value:"室速"},
  {name:"Ⅰ度房室传导阻滞",value:"Ⅰ度房室传导阻滞"},
  {name:"Ⅱ度房室传导阻滞",value:"Ⅱ度房室传导阻滞"},
  {name:"Ⅲ度房室传导阻滞",value:"Ⅲ度房室传导阻滞"},
]

const VAS = [
  {name:"0",value:"0"},
  {name:"1",value:"1"},
  {name:"2",value:"2"},
  {name:"3",value:"3"},
  {name:"4",value:"4"},
  {name:"5",value:"5"},
  {name:"6",value:"6"},
  {name:"7",value:"7"},
  {name:"8",value:"8"},
  {name:"9",value:"9"},
  {name:"10",value:"10"},
]
const food = [
  {name:"口服",value:"口服"},
  {name:"输液",value:"输液"},
  {name:"术中输液",value:"术中输液"},
  {name:"术中红细胞",value:"术中红细胞"},
  {name:"术中血浆",value:"术中血浆"},
  {name:"术中冷沉淀",value:"术中冷沉淀"},
  {name:"红细胞",value:"红细胞"},
  {name:"血浆",value:"血浆"},
  {name:"冷沉淀",value:"冷沉淀"},
  {name:"鼻饲",value:"鼻饲"},
  {name:"术中及PACU",value:"术中及PACU"},
]
const outputColor = [
  {name:"淡黄色",value:"淡黄色"},
  {name:"黄色",value:"黄色"},
  {name:"红色",value:"红色"},
  {name:"淡红色",value:"淡红色"},
  {name:"暗红色",value:"暗红色"},
  {name:"咖啡色",value:"咖啡色"},
  {name:"墨绿色",value:"墨绿色"},
]
const outup = [
  {name:"尿",value:"尿"},
  {name:"大便",value:"大便"},
  {name:"术中出血",value:"术中出血"},
  {name:"术中尿量",value:"术中尿量"},
  {name:"术中腹腔积液",value:"术中腹腔积液"},
  {name:"胃液",value:"胃液"},
  {name:"胃管",value:"胃管"},
  {name:"胸腔引流",value:"胸腔引流"},
  {name:"腹腔引流管",value:"腹腔引流管"},
  {name:"盆腔引流管",value:"盆腔引流管"},
  {name:"尿管",value:"尿管"},
  {name:"肛管",value:"肛管"},
  {name:"皮下引流管",value:"皮下引流管"},
]
const ked = [
  {name:"内置",value:"内置"},
  {name:"至标",value:"至标"},
  {name:"外露",value:"外露"},
]
export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time,  click: click_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'hr', event: keyf1, value: '', next: '次/分', name: 'HR',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'BP',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R',autoComplete: { data: R },textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo', event: keyf1, value: '', next: '%', name: 'SPO₂',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spirit', event: keyf1, value: '', next: '', name: '神志',autoComplete: { data:
    [{name:"麻醉未醒",value:"麻醉未醒"},{name:"清醒",value:"清醒"},{name:"镇静状态",value:"镇静状态"},{name:"谵妄",value:"谵妄"},
     {name:"嗜睡",value:"嗜睡"},{name:"昏睡",value:"昏睡"},{name:"浅昏迷",value:"浅昏迷"},{name:"中度昏迷",value:"中度昏迷"},
     {name:"深昏迷",value:"深昏迷"}
    ] } ,
    textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'rass', event: keyf1, value: '', next: '', name: 'RASS',autoComplete: { data: RASS },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'heartRhythm', event: keyf1, value: '', next: '', name: '心律',autoComplete: { data: xinlu },textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'cvp', event: keyf1, value: '', next: '', name: 'CVP',textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'vas', event: keyf1, value: '', next: '', name: '疼痛VAS评分',autoComplete: { data: VAS },textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量项目',autoComplete: { data: food} ,
    textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: '入量',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },

  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量项目',autoComplete: { data: outup },textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'dischargeSize', event: keyf1, value: '', next: '', name: '出量',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputColor', event: keyf1, value: '', next: '', name: '颜色或性状',autoComplete: { data: outputColor },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputCm', event: keyf1, value: '', next: 'cm', name: '刻度',autoComplete: { data: ked },textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom1', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom2', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom3', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom4', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'costom5', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenMode', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenL', event: keyf1, value: '', next: '', name: '',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "185px",
      background: "transparent",
    },
    textarea: {
      width: 185
    },
    event: function (e, td) {
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
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
