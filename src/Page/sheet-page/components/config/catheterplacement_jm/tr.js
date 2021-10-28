/*
江门妇幼-深静脉导管置入术后维护单
 */
import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1, limitChange } from "../keyEvent/f1.js";
import { event_date, event_time, click_date, click_time } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ccdList = ["红肿","皮疹","干洁","渗血"];
let flList = ["松脱","渗血","渗液","干洁","卷边"];
let cgList = ["冲管","封管"];
let ghflList = ["纱块敷料","3m透明敷料","HP透明敷料"];
let ghjtList=["无针接头","肝素帽"]
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
    key: "exposed", //外露
    value: "",
    name: "外露",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 65
    },
  },
  {
    key: "armCircumference", //臂围
    value: "",
    name: "臂围",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 65
    },
  },
  {
    key: "puncturePoint", //穿刺点
    value: "",
    name: "穿刺点",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 65
    },
    autoComplete: {
      data: ccdList
    },
  },
  {
    key: "dressing", //敷料
    value: "",
    name: "敷料",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 65
    },
    autoComplete: {
      data: flList
    },
  },
  {
    key: "tube", //冲管/封管
    value: "",
    name: "冲管/封管",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 100
    },
    autoComplete: {
      data: cgList
    },
  },
  {
    key: "dressingExchange", //更换敷料
    value: "",
    name: "更换敷料",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 100
    },
    autoComplete: {
      data: ghflList
    },
  },
  {
    key: "replaceConnector", //更换接头
    value: "",
    name: "更换接头",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 100
    },
    autoComplete: {
      data: ghjtList
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
      width: "180px",
      background: "transparent"
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
  {
    key: "sign2",
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
    value: true
  }
];
