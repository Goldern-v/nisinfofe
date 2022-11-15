import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
export default [
  { 
    hidden: true, 
    key: 'recordDate', 
    value: '' 
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
    key: "mind", //神志
    value: "",
    name:'神志',
    event: keyf1,
    textarea: { width: 60 }
  },

  {
    key: "rhythm", //心律
    value: "",
    name:'心律',
    event: keyf1,
    textarea: { width: 60 }
  },

  {
    key: "pulse", //HR
    value: "",
    name:'HR',
    next:'次',
    event: keyf1,
    textarea: { width: 60 }
  },

  {
    key: "rr", //RR
    value: "",
    name:'RR',
    next:'次',
    event: keyf1,
    textarea: { width: 60 }
  },

  {
    key: "spo2Kpa", //KPA
    value: "",
    name:'Kpa',
    event: keyf1,
    textarea: { width: 60 }
  },

  {
    key: "bloodPressure", //mmhg
    value: "",
    name:'mmhg',
    event: keyf1,
    textarea: { width: 60 }
  },

  {
    key: "spo2mmhg", //SPO2  /* 字段不够，拿一个没有用的字段接 */
    value: "",
    name:'Spo2',
    event: keyf1,
    textarea: { width: 60 }
  },

  {
    key: "description", //其他
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "260px",
      background: "transparent",
    },
    // textarea: { width: 260 },
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
