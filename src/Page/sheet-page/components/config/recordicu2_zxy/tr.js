/*
南方中西医 - 护理记录单
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
    // click: click_time
  },
  {
    key: "food", //入量名称
    value: "",
    event: keyf1,
    name: "入量名称",
    change: (e, td) => limitChange(e, td, 22),
    textarea: {
      width: 150,
    },
    autoComplete: {
      data: 入量名称
    },
  },
  {
    key: "foodSize", //入量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "入量",
    next: "ml",
    textarea: {
      width: 75
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    event: keyf1,
    name: "出量名称",
    change: (e, td) => limitChange(e, td, 22),
    textarea: {
      width: 150,
    },
    autoComplete: {
      data: 出量名称
    }
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "出量",
    next: "ml",
    textarea: {
      width: 75
    },
  },
  {
    key: "nature", //性质
    value: "",
    event: keyf1,
    name: "性质",
    next: "%",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 75
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
      width: "410px",
      background: "transparent",
    },
    textarea: {
      width: 410
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

