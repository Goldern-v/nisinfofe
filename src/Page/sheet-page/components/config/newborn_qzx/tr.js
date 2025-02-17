import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
let okList = ['√']
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
    click: click_time
  },
  {
    key: "daysBirth", //出生天数
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
  },
  {
    key: "breastMilk", //母乳
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "artificial", //人工
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "mix", //混合
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "syrup", //糖水
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "jaundice", //黄恒
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
  },
  {
    key: "hipRed", //臀红
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "impetigo", //脓疱疹
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "eczema", //湿疹
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "diaperRash", //尿布疹
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "redness", //红肿
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "secretion", //分泌
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "smooth", //光滑
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "collapse", //破溃
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "thrush", //鹅口疮
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "bleeding", //出血
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "evaporation", //干燥
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "inflammation", //炎症
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "fallOff", //脱落
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: okList
    },
  },
  {
    key: "frequency", //次数
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
  },
  {
    key: "colour", //颜色
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
  },
  {
    key: "nature", //性质
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
  },
  {
    key: "urinate", //小便
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
  },
  {
    key: "vomit", //呕吐
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
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
    value: false
  }
];
