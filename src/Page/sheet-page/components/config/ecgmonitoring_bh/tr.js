/*
北海人一-心电监护观察记录
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
export default [{
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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75
    },
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75
    },
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
    name: "血压",
    next: "mmHg",
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75
    },
  },
  {
    key: "breath", //呼吸频率
    value: "",
    event: keyf1,
    name: "呼吸频率",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75
    },
  },
  {
    key: "spo2", //spo2
    value: "",
    event: keyf1,
    name: "SPO2",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75
    },
  },
  {
    key: "customItem1", //自定义1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
    },
  },
  {
    key: "customItem2", //自动义2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
    },
  },
  {
    key: "customItem3", //自定义3
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
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
      width: "158px",
      background: "transparent",
    },
    change: (e, td) => limitChange(e, td, 12),
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

