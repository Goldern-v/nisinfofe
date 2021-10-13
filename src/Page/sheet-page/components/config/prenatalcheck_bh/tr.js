/*
北海人一-产前检查治疗记录表
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
    key: "oxygenInhalation", //吸氧记录
    value: "",
    event: keyf1,
    name: "吸氧记录",
    change: (e, td) => limitChange(e, td, 20),
    textarea: {
      width: 115
    },
  },
  {
    key: "heartSound", //胎心音
    value: "",
    event: keyf1,
    name: "胎心音",
    change: (e, td) => limitChange(e, td, 20),
    textarea: {
      width: 115
    },
  },
  {
    key: "fetalTime", //胎动时间
    value: "",
    name: "胎动时间",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    textarea: {
      width: 145
    },
  },
  {
    key: "fetalTotal", //胎动合计
    value: "",
    name: "胎动合计",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 105
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
      width: "365px",
      background: "transparent",
    },
    change: (e, td) => limitChange(e, td, 30),
    textarea: {
      width: 365
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

