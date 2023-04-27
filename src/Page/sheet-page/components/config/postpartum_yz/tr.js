
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
    key: "temperature", // 体温℃
    value: "",
    event: keyf1,
    textarea: {
      width: 35
    },
    name: "体温",
    next: '℃',
  },
  {
    key: "pulse", // 心率
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    },
    name: "心率",
    next: '次/分',
  },
  {
    key: "bloodPressure", // 血压
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    },
    name: "血压",
    next: 'mmHg',
  },
  {
    key: "food", //入量名称
    value: "",
    name: "入量名称",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    textarea: {
      width: 65
    }
  },
  {
    key: "foodSize", //入量量
    value: "",
    name: "入量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    textarea: {
      width: 35
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    name: "出量名称",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    textarea: {
      width: 65
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
      width: 35
    },
  },
  {
    key: "description", //护理记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "250px",
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


