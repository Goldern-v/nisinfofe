/*
佛山市一 - 心内科通用护理记录单
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
  { key: "recordDate", value: "", hidden:true},
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1,value: '',name: '体温',next: '℃',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: 'pulse', event: keyf1,value: '',name: '心率',next: '次/分',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: 'breath', event: keyf1,value: '',name: '呼吸',next: '次/分',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: 'bloodPressure', event: keyf1,value: '',name: '血压',next: 'mmHg',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "customValue1", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "customValue2", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "customValue3", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
  { key: "intoContent", event: keyf1, value: '', next: '', name:'入量内容', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: "intoAmount", event: keyf1, value: '', next: '', name:'入量量ml', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: "outputContent", event: keyf1, value: '', next: '', name:'出量内容', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: "outputAmount", event: keyf1, value: '', next: '', name:'出量量ml', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
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
      width: "150px",
      background: "transparent",
    },
    textarea: {
      width: 150
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
