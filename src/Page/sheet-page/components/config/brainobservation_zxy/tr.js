/*
南方中西医 - 脑科观察记录
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
    key: "temperature", //T
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "体温",
    next: "℃",
    textarea: {
      width: 27
    },
  },
  {
    key: "pulse", //P
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 35
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
    key: "cvp", //CVP
    value: "",
    event: keyf1,
    name: "CVP",
    change: (e, td) => limitChange(e, td, 6),
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
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "意识",
    textarea: {
      width: 40
    },
  },
  {
    key: "gcs", //GCS
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "GCS",
    textarea: {
      width: 40
    },
  },
  {
    key: "limbsUpperLeft", //肢体-上-左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "上-左",
    textarea: {
      width: 25
    },
  },
  {
    key: "limbsUpperRight", //肢体-上-右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "上-右",
    textarea: {
      width: 25
    },
  },
  {
    key: "limbsUnderLeft", //肢体-下-左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "下-左",
    textarea: {
      width: 25
    },
  },
  {
    key: "limbsUnderRight", //肢体-下-右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "下-右",
    textarea: {
      width: 25
    },
  },
  {
    key: "pupilSizeLeft", //瞳孔-大小-左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "大小-左",
    textarea: {
      width: 25
    },
  },
  {
    key: "pupilSizeRight", //瞳孔-大小-右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "大小-右",
    textarea: {
      width: 25
    },
  },
  {
    key: "pupilReflexLeft", //瞳孔-反射-左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "反射-左",
    textarea: {
      width: 25
    },
  },
  {
    key: "pupilReflexRight", //瞳孔-反射-右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    name: "反射-右",
    textarea: {
      width: 25
    },
  },
  {
    key: "food", //入量名称
    value: "",
    event: keyf1,
    name: "入量名称",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 65,
    },
    autoComplete: {
      data: 入量名称
    },
  },
  {
    key: "foodSize", //入量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "入量",
    next: "ml",
    textarea: {
      width: 35
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    event: keyf1,
    name: "出量名称",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 65,
    },
    autoComplete: {
      data: 出量名称
    }
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "出量",
    next: "ml",
    textarea: {
      width: 35
    },
  },
  {
    key: "recumbentPosition", //卧位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "卧位",
    textarea: {
      width: 35
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

