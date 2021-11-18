/*
聊城二院 - 心内科介入患者观察记录单
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
  { key: 'nodeTime',event: keyf1,value: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: "recordDate", value: "", hidden:true },
  { key: "recordMonth", value: "", event: event_date, click: click_date },
  { key: "recordHour", value: "", event: event_time},
  { key: 'temperature',event: keyf1,value: '',name: '体温',next: '℃',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'measure',event: keyf1,value: '',name: '措施',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'pulse',event: keyf1,value: '',name: '脉搏',next: '次/分',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'breath',event: keyf1,value: '',name: '呼吸',next: '次/分',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'bloodPressure',event: keyf1,value: '',name: '血压',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'pressure',event: keyf1,value: '',name: '血压处理',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'painScore',event: keyf1,value: '',name: '疼痛评分',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'painMeasures',event: keyf1,value: '',name: '疼痛措施',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'urine',event: keyf1,value: '',name: '尿量',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'arterialPulsation',event: keyf1,value: '',name: '动脉搏动',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'piWin',event: keyf1,value: '',name: '皮温',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'peripheral',event: keyf1,value: '',name: '末梢循环',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'bleedingSwelling',event: keyf1,value: '',name: '出血血肿',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'swelling',event: keyf1,value: '',name: '肿胀',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'dressing',event: keyf1,value: '',name: '敷料',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  { key: 'complication',event: keyf1,value: '',name: '并发症',next: '',textarea:{ width:55},change: (e, td) => limitChange(e, td, 8)},
  {
    hidden:true,
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
  { hidden:true, key:'id', value:''},
  { hidden:true, key:'signerName', value:''},
  // { hidden:true, key:'signerName2', value:''},
  { hidden:true, key:'status', value:''},
  { hidden:true, key:'recordSource', value:''},
  { hidden:true, key:'recordYear', value:''},
  { hidden:true, key:'dataHash', value:''},
  { hidden:true, key:'recordDate', value:''},
  { hidden:true, key:'monthHour', value:''},
  { hidden:true, key:'signerNo', value:''},
  { hidden:true, key:'signerNo2', value:''},
  { hidden:true, key:'auditorNo', value:''},
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''},]
