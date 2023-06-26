/*
武警 - 待产护理记录单
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
let 胎位 = ['LOA','ROA','ROT','LOT','RST','LST'];
let 部位 = ['左上','左下','右上','右下','左下右下','左上右上','左上右下','左下右上'];
let 衔接 = ['已','未'];
let 宫颈扩张 = ['1','1+','2','2+','3','3+','4','5','6','7','8','9','开全'];
let 先露高低 = ['-1','-2','-3','0','+1','+2','+3'];
let 胎膜 = ['已破','未破'];
let 羊水性状 = ['Ⅰ°','Ⅱ°','Ⅲ°','清','浑浊'];
let 检查方式 = ['肛','阴','腹'];
let 阴道流血 = ['无','少量','多量'];

export default [
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
    key: "temperature", //T
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "体温",
    next: "℃",
    textarea: {
      width: 45
    },
  },
  {
    key: "pulse", //P/HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 45
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 45
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
    key: "fetusPosition", //胎位
    value: "",
    event: keyf1,
    name: "胎位",
    autoComplete: {
      data: 胎位
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fetalPosition", //胎心音部位
    value: "",
    event: keyf1,
    name: "胎心音部位",
    autoComplete: {
      data: 部位
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fetalRate", //胎心音心率
    value: "",
    event: keyf1,
    name: "胎心音心率",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "dovetail", //衔接
    value: "",
    event: keyf1,
    name: "衔接",
    autoComplete: {
      data: 衔接
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "intermission", //宫缩间歇
    value: "",
    event: keyf1,
    name: "宫缩间歇",
    next: "ml",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "sustain", //宫缩间歇
    value: "",
    event: keyf1,
    name: "宫缩间歇",
    next: "ml",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "cervicalOpening", //宫颈扩张
    value: "",
    event: keyf1,
    name: "宫颈扩张",
    autoComplete: {
      data: 宫颈扩张
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "firstExposure", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低",
    autoComplete: {
      data: 先露高低
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fetalMembrane", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜",
    autoComplete: {
      data: 胎膜
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "amnioticFluid", //羊水性状
    value: "",
    event: keyf1,
    name: "羊水性状",
    autoComplete: {
      data: 羊水性状
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "vaginalBleeding", //阴道流血
    value: "",
    event: keyf1,
    name: "阴道流血",
    next: "ml",
    autoComplete: {
      data: 阴道流血
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "inspection", //检查方式
    value: "",
    event: keyf1,
    name: "检查方式",
    autoComplete: {
      data: 检查方式
    },
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
    key: "customField1", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "165px",
      background: "transparent",
    },
    textarea: {
      width: 165
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

