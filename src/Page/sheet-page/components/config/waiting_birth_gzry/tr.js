/*
贵州省人医-产程记录单
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
    key: "bloodPressure", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 60
    },
    change: (e, td) => limitChange(e, td, 8),
    name: "血压",
    next: "mmHg",
  },
  {
    key: "fetalPosition", //部位
    value: "",
    event: keyf1,
    name: "部位",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "fetalRate", //心率
    value: "",
    event: keyf1,
    name: "胎心心率",
    next: "次/分",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "dovetail", //衔接
    value: "",
    event: keyf1,
    name: "衔接",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "intermission", //间歇
    value: "",
    event: keyf1,
    name: "间歇",
    next: "min",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "sustain", //持续
    value: "",
    event: keyf1,
    name: "持续",
    next: "s",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "cervicalOpening", //开张
    value: "",
    event: keyf1,
    name: "开张",
    next: "cm",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "quality", //质
    value: "",
    event: keyf1,
    name: "质",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "firstExposure", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "sagittalSuture", //矢状缝
    value: "",
    event: keyf1,
    name: "矢状缝",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "fetalMembrane", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "amnioticFluid", //羊水性状
    value: "",
    event: keyf1,
    name: "羊水性状",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "inspection", //检查方式
    value: "",
    event: keyf1,
    name: "检查方式",
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "incubation", //潜伏期
    value: "",
    event: keyf1,
    name: "潜伏期",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: ["√"]
    },
    change: (e, td) => limitChange(e, td, 6),
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
      width: "300px",
      background: "transparent",
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
    // oninput: next
  },
  {
    key: "sign",
    value: ""
  },
  // {
  //   key: "audit",
  //   value: ""
  // },
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
    hidden: false,
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

