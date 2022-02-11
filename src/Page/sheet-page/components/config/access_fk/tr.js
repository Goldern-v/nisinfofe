/*
武汉肺科-出入液量记录单
*/
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
    key: "food", //入量项目
    value: "",
    name: "入量名称",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    textarea: {
      width: 135
    },
  },
  {
    key: "foodSize", //入量量
    value: "",
    name: "入量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    textarea: {
      width: 135
    },
  },
  {
    key: "discharge", //出量项目
    value: "",
    name: "出量名称",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    textarea: {
      width: 135
    }
  },
  {
    key: "dischargeSize", //出量量
    value: "",
    name: "出量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    textarea: {
      width: 135
    },
  },
  {
    hidden: true,
    key: "description",
    value: ""
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


