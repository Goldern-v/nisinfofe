
/** 
  佛山市一 - 护理记录单(肿物切除术)
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
  { key: "recordHour", event: event_time,  value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏/心率', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SPO2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: '入量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'dischargeSize', event: keyf1, value: '', next: '', name: '出量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'massTenderness', event: keyf1, value: '', next: '', name: '肿物压痛', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["√","无","有"]} },
  { key: 'massCharacter', event: keyf1, value: '', next: '', name: '肿物质地', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["软","实"]}},
  { key: 'tumble', event: keyf1, value: '', next: '', name: '防跌倒教育评估', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["√","无","有"]}  },
  { key: 'redSwollen', event: keyf1, value: '', next: '', name: '肿物周围红肿', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["√","无","有"]} },
  { key: 'cllBell', event: keyf1, value: '', next: '', name: '呼叫铃置可及处', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["√","无","有"]}  },
  { key: 'woundApplication', event: keyf1, value: '', next: '', name: '伤口外敷料', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6),  autoComplete:{data:["干洁","渗血","渗液"]} },
  { key: 'woundScore', event: keyf1, value: '', next: '', name: '伤口疼痛评分', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'woundDrainage', event: keyf1, value: '', next: '', name: '伤口引流管', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6),autoComplete:{data:["通畅","阻塞","√","无","有"]} },
  { key: 'drainageColor', event: keyf1, value: '', next: '', name: '伤口引流液颜色', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["暗红","淡红","鲜红"]} },
  { key: 'armValue', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },//自定义
  { key: 'armValue2', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },//自定义
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "163px", background: "transparent" },
    textarea: { width: 163 },
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
