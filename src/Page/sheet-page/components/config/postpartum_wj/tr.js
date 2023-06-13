/*
武警 - 产后(产房)观察记录单
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
let 子宫收缩 = ['硬','软'];
let 膀胱情况 = ['-','±','+'];
let 肛查 = ['-','+'];
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
    key: "bloodPressure", //血压
    value: "",
    name: "血压",
    next: "mmHg",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 80
    },
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    name: "脉搏",
    next: "次/分",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 80
    },
  },
  
  {
    key: "palace", //宫底
    value: "",
    name: "宫底",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 80
    },
  },
  {
    key: "uterineContractions", //子宫收缩
    value: "",
    name: "子宫收缩",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 80
    },
    autoComplete: {
      data: 子宫收缩
    },
  },
  {
    key: "bleedingVolume", //出血量
    value: "",
    name: "出血量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 80
    },
  },
  {
    key: "bladderCondition", //膀胱情况
    value: "",
    name: "膀胱情况",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 80
    },
    autoComplete: {
      data: 膀胱情况
    },
  },
  {
    key: "analExamination", //肛查
    value: "",
    name: "肛查",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 80
    },
    autoComplete: {
      data: 肛查
    },
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
    value: "",
    style: {
      minWidth: '70px',
      maxWidth: "153px",
    },
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
