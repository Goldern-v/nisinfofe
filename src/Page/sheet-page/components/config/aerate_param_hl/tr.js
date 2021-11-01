/*
横沥 - 儿科机械通气护理单
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
    key: "pulse", //脉搏
    value: "",
    name: "脉搏",
    next: "次/分",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "spo2", //SPO2
    value: "",
    name: "SPO2",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "ventilation", //通气模式
    value: "",
    name: "通气模式",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "concentration", //氧浓度
    value: "",
    name: "氧浓度",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "minuteVentilation", //分钟通气量
    value: "",
    name: "分钟通气量",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "tidalVolume", //潮气量
    value: "",
    name: "潮气量",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "respiratory", //呼吸频率
    value: "",
    name: "呼吸频率",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "sensitivity", //灵敏度
    value: "",
    name: "灵敏度",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "suctionPressure", //吸气压
    value: "",
    name: "吸气压",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "positiveEnd", //呼吸末正压
    value: "",
    name: "呼吸末正压",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "sputumSuction", //吸痰
    value: "",
    name: "吸痰",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "sputumHabitude", //痰性质
    value: "",
    name: "痰性质",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    key: "tracheal", //气管深度
    value: "",
    name: "气管深度",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 70
    },
  },
  {
    hidden: true,
    key: "description", //其他
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "150px",
      background: "transparent",
      fontSize: "14px"
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
