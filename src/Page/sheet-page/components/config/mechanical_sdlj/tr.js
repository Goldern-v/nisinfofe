
/** 
  顺德龙江 - 机械通气监护记录单（儿科）
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
  { key: 'position', event: keyf1, value: '', next: '', name: '体位', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'sputum', event: keyf1, value: '', next: '', name: '痰液形状', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'intubation', event: keyf1, value: '', next: 'cm', name: '插管深度', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'process', event: keyf1, value: '', next: '', name: '湿化温度', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'ventilation', event: keyf1, value: '', next: '', name: '通气模式', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'breathing', event: keyf1, value: '', next: '', name: '呼吸频率', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'breatheTime', event: keyf1, value: '', next: 's', name: '吸气时间', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'peak', event: keyf1, value: '', next: 'cmH2o', name: '吸气峰值', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'pressure', event: keyf1, value: '', next: '', name: 'PEEP', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'concentration', event: keyf1, value: '', next: '%', name: '氧浓度', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'traffic', event: keyf1, value: '', next: 'L/min', name: '吸气流量', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'turbulence', event: keyf1, value: '', next: '', name: '震荡幅度', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'frequency', event: keyf1, value: '', next: '', name: 'HFO频率', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'average', event: keyf1, value: '', next: '', name: '平均压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  {
    hidden:true,
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
