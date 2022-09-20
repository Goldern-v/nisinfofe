/*
武汉肺科-手术科室记录单
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
    {
      key: "recordDate", //年份
      value: "",
      hidden:true
    },
    {
      key: "recordMonth", //日期
      value: "",
      event: event_date,
      click: click_date
    },
    {
      key: "recordHour", //时间
      value: "",
      event: event_time,
      click: click_time
    },
    {
      key: "temperature", //T
      value: "",
      name: "体温",
      next:"℃",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "pulse", //脉搏/心率
      value: "",
      name: "脉搏",
      next:"次/分",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "breath", //R 呼吸
      value: "",
      name: "呼吸",
      next:"次/分",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "bloodPressure", //BP
      value: "",
      name: "血压",
      next:"mmHg",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
    },
    {
      key: "arterial", //动脉血压
      value: "",
      name: "动脉血压",
      next:"",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
    },
    {
      key: "spo2", //spo2
      value: "",
      name: "spo2",
      next:"%",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "consciousness", //意识
      value: "",
      name: "意识",
      next:"",
      event: keyf1,
      autoComplete: { data: ['A','B','C','D','E','F'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "pupilSizeLeft", //大小左
      value: "",
      name: "瞳孔大小左",
      next:"mm",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "pupilSizeRight", //大小右
      value: "",
      name: "瞳孔大小右",
      next:"mm",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "pupilReflexLeft", //反射左
      value: "",
      name: "瞳孔反射左",
      next:"",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      autoComplete: { data: ['存在','不存在'] },
      textarea: {
        width: 32
      },
    },
    {
      key: "pupilReflexRight", //反射右
      value: "",
      name: "瞳孔反射右",
      next:"",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      autoComplete: { data: ['存在','不存在'] },
      textarea: {
        width: 32
      },
    },
    {
      key: "indwelling", //留置针
      value: "",
      name: "留置针",
      next:"",
      event: keyf1,
      autoComplete: { data: ['带入','穿刺','置入','N','拔管'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "cvc", //CVC
      value: "",
      name: "CVC",
      next:"",
      event: keyf1,
      autoComplete: { data: ['带入','穿刺','置入','N','拔管'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "picc", //PICC
      value: "",
      name: "PICC",
      next:"",
      event: keyf1,
      autoComplete: { data: ['带入','穿刺','置入','N','拔管'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "compressed", //受压皮肤
      value: "",
      name: "受压皮肤",
      next:"",
      event: keyf1,
      autoComplete: { data: ['N','压红','破溃'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "incision", //切口敷料
      value: "",
      name: "切口敷料",
      next:"",
      event: keyf1,
      autoComplete: { data: ['N','渗液'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "oralMucosa", //口腔黏膜
      value: "",
      name: "口腔黏膜",
      next:"",
      event: keyf1,
      autoComplete: { data: ['N','破溃'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "drainage1", //自定义1
      value: "",
      name: "",
      next:"",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      autoComplete: { data: ['带入','置入','N','夹管','拔管'] },
      textarea: {
        width: 32
      },
    },
    {
      key: "drainage2", //自定义2
      value: "",
      name: "",
      next:"",
      event: keyf1,
      autoComplete: { data: ['带入','置入','N','夹管','拔管'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "subcutaneous", //自定义
      value: "",
      name: "",
      next:"",
      event: keyf1,
      autoComplete: { data: ['带入','置入','N','夹管','拔管'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "drainage3", //自定义3
      value: "",
      name: "",
      next:"",
      event: keyf1,
      autoComplete: { data: ['带入','置入','N','夹管','拔管'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "drainage4", //自定义4
      value: "",
      name: "",
      next:"",
      event: keyf1,
      autoComplete: { data: ['带入','置入','N','夹管','拔管'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "drainage5", //自定义5
      value: "",
      name: "",
      next:"",
      event: keyf1,
      autoComplete: { data: ['带入','置入','N','夹管','拔管'] },
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 32
      },
    },
    {
      key: "food", //入量项目
      value: "",
      name: "入量名称",
      event: keyf1,
      change: (e, td) => limitChange(e, td, 8),
      textarea: {
        width: 50
      },
    },
    {
      key: "foodSize", //入量量
      value: "",
      name: "入量",
      next: "ml",
      event: keyf1,
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
        width: 32
      },
    },
    {
      key: "discharge", //出量项目
      value: "",
      name: "出量名称",
      event: keyf1,
      change: (e, td) => limitChange(e, td, 8),
      textarea: {
        width: 50
      }
    },
    {
      key: "color", //出量颜色
      value: "",
      name: "出量颜色",
      event: keyf1,
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
        width: 32
      }
    },
    {
      key: "traits", //出量性状
      value: "",
      name: "出量性状",
      event: keyf1,
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
        width: 32
      }
    },
    {
      key: "dischargeSize", //出量量
      value: "",
      name: "出量",
      next: "ml",
      event: keyf1,
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
        width: 32
      },
    },
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "155px", background: "transparent" },
      textarea: { width: 180 },
      event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
    },
    { key: "sign", value: "" },//单签
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
  ];
  
  
  