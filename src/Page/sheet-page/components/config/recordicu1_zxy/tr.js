/*
南方中西医 - 重症监护病房护理记录单(表一)
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
let 入量名称 = [];
let 出量名称 = [];
let 意识 = ['(-)', '(+)', '(++)', '(+++)', '(△)', '(√)',];

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
    // click: click_time
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "体温",
    next: "℃",
    textarea: {
      width: 27
    },
  },
  {
    key: "pulse", //HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "bloodPressure", //血压
    value: "",
    change: (e, td) => limitChange(e, td, 6),
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "血压",
    next: "mmHg",
    textarea: {
      width: 45
    },
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "SPO₂",
    next: "%",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "cvp", //CVP
    value: "",
    event: keyf1,
    name: "CVP",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "bloodSugar", //血糖
    value: "",
    event: keyf1,
    name: "血糖",
    next: "mmol/L",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "oxygenInhalation", //吸氧
    value: "",
    event: keyf1,
    name: "吸氧",
    next: "升/分",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "consciousness", //tubeDepth
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "插管深度",
    next: "cm",
    textarea: {
      width: 40
    },
  },
  {
    key: "airbagPressure", //气囊压力
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "气囊压力",
    next: "cmH20",
    textarea: {
      width: 40
    },
  },
  {
    key: "ventilationMode", //模式
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "模式",
    textarea: {
      width: 40
    },
  },
  {
    key: "ventilationVT", //VT
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "VT",
    next: "ml",
    textarea: {
      width: 40
    },
  },
  {
    key: "ventilationF", //F
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "F",
    next: "次/分",
    textarea: {
      width: 40
    },
  },
  {
    key: "ventilationFiO2", //Fio2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "Fio2",
    next: "%",
    textarea: {
      width: 40
    },
  },
  {
    key: "ventilationP", //P
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "P",
    next: "cmH20",
    textarea: {
      width: 40
    },
  },
  {
    key: "ventilationPEEP", //PEEP
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "PEEP",
    next: "cmH20",
    textarea: {
      width: 40
    },
  },
  {
    key: "ventilationPS", //PS
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "PS",
    next: "cmH20",
    textarea: {
      width: 40
    },
  },
  {
    key: "sedationScore", //镇静评分
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "镇静评分",
    textarea: {
      width: 40
    },
  },
  {
    key: "sanity", //神志
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "镇静评分",
    textarea: {
      width: 40
    },
  },
  {
    key: "pupilSizeLeft", //瞳孔-大小-左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "左-大小",
    textarea: {
      width: 25
    },
  },
  {
    key: "pupilSizeRight", //瞳孔-大小-右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "左-反射",
    textarea: {
      width: 25
    },
  },
  {
    key: "pupilReflexLeft", //瞳孔-反射-左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "右-大小",
    textarea: {
      width: 25
    },
  },
  {
    key: "pupilReflexRight", //瞳孔-反射-右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "右-反射",
    textarea: {
      width: 25
    },
  },
  {
    key: "limbsUpperLeft", //肢体-上-左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "左-上",
    textarea: {
      width: 25
    },
  },
  {
    key: "limbsUpperRight", //肢体-上-右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "右-上",
    textarea: {
      width: 25
    },
  },
  {
    key: "limbsUnderLeft", //肢体-下-左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "左-下",
    textarea: {
      width: 25
    },
  },
  {
    key: "limbsUnderRight", //肢体-下-右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "右-下",
    textarea: {
      width: 25
    },
  },
  {
    key: "svo2", //SVO2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "SVO2",
    next: "%",
    textarea: {
      width: 35
    },
  },
  {
    key: "co", //CO
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "CO",
    next: "升/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "pcwp", //PCWP
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "PCWP",
    next: "mmHg",
    textarea: {
      width: 35
    },
  },
  {
    key: "rvedv", //RVEDV
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "RVEDV",
    next: "ml",
    textarea: {
      width: 35
    },
  },
  {
    key: "sign",
    value: ""
  },
  {
    hidden: true,
    key: "id",
    value: ""
  },
  {
    hidden: true,
    key: "signerName",
    value: ""
  },
  {
    hidden: true,
    key: "signerName2",
    value: ""
  },
  {
    hidden: true,
    key: "status",
    value: ""
  },
  {
    hidden: true,
    key: "recordSource",
    value: ""
  },
  {
    hidden: true,
    key: "recordYear",
    value: ""
  },
  {
    hidden: true,
    key: "dataHash",
    value: ""
  },
  {
    hidden: true,
    key: "recordDate",
    value: ""
  },
  {
    hidden: true,
    key: "monthHour",
    value: ""
  },
  {
    hidden: false,
    key: "signerNo",
    value: ""
  },
  {
    hidden: true,
    key: "signerNo2",
    value: ""
  },
  {
    hidden: true,
    key: "auditorNo",
    value: ""
  },
  {
    hidden: true,
    key: "auditorName",
    value: ""
  },
  {
    hidden: true,
    key: "empNo",
    value: ""
  },
  {
    hidden: true,
    key: "multiSign",
    value: true,
  },
];

