/*
曲周 - 新生儿重症护理记录单
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
    key: "volume", //液量
    value: "",
    event: keyf1,
    name: "液量",
    next: "ml",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "intake", //奶量口入
    value: "",
    event: keyf1,
    name: "奶量口入",
    next: "ml",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "feeding", //奶量饲管
    value: "",
    event: keyf1,
    name: "奶量饲管",
    next: "ml",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "gastricRetention", //胃潴留量
    value: "",
    event: keyf1,
    name: "胃潴留量",
    next: "ml",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "retentionTraits", //胃潴留性状
    value: "",
    event: keyf1,
    name: "胃潴留性状",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "vomiting", //呕吐量
    value: "",
    event: keyf1,
    name: "呕吐量",
    next: "ml",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "vomitingTraits", //呕吐性状
    value: "",
    event: keyf1,
    name: "呕吐性状",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "stoolVolume", //大便量
    value: "",
    event: keyf1,
    name: "大便量",
    next: "ml",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "stoolTraits", //大便性状
    value: "",
    event: keyf1,
    name: "大便性状",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "urineVolume", //尿量
    value: "",
    event: keyf1,
    name: "尿量",
    next: "ml",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
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

