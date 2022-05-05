/** 
佛山市一 - 心内科通用护理记录单
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
  { key: "recordDate", value: "", hidden:true },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, click: click_time, value: ''},
  { key: 'temperature', event: keyf1,value: '',name: '体温',next: '℃',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: 'pulse', event: keyf1,value: '',name: '心率',next: '次/分',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: 'breath', event: keyf1,value: '',name: '呼吸',next: '次/分',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: 'bloodPressure', event: keyf1,value: '',name: '血压',next: 'mmHg',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "customValue1", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "customValue2", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "customValue3", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "food", event: keyf1, value: '', next: '', name:'入量内容', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: "foodSize", event: keyf1, value: '', next: '', name:'入量量ml', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: "discharge", event: keyf1, value: '', next: '', name:'出量内容', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: "dischargeSize", event: keyf1, value: '', next: '', name:'出量量ml', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: "chestTightness", event: keyf1, value: '', next: '', name:'胸闷/胸痛', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "dizziness", event: keyf1, value: '', next: '', name:'头晕/头麻', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "membraneBleeding", event: keyf1, value: '', next: '', name:'皮肤粘膜出血', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "punctureOozing", event: keyf1, value: '', next: '', name:'右桡动脉穿刺口渗血', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "beating", event: keyf1, value: '', next: '', name:'右桡动脉搏动', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "skinTemperature", event: keyf1, value: '', next: '', name:'右上肢皮温', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "armValue1", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "armValue2", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "163px",
      background: "transparent",
    },
    textarea: {
      width: 163
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  { key: "sign", value: "" },
  // { key: "sign2", value: "" },
  { key: "audit", value: "" },
  { hidden:true, key:'id', value:''},
  { hidden:true, key:'signerName', value:''},
  { hidden:true, key:'signerName2', value:''},
  { hidden:true, key:'status', value:''},
  { hidden:true, key:'recordSource', value:''},
  { hidden:true, key:'recordYear', value:''},
  { hidden:true, key:'dataHash', value:''},
  { hidden:true, key:'recordDate', value:''},
  { hidden:true, key:'monthHour', value:''},
  { hidden:false, key:'signerNo', value:''},
  { hidden:true, key:'signerNo2', value:''},
  { hidden:true, key:'auditorNo', value:''},
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''},]
