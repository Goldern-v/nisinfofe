/*
广东同江-心电监护观察记录
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
// {String} fieldOne 心律

let gsList = ['窦性', '异常']
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
  // {
  //     key: "fieldOne", //呼吸频率
  //     value: "",
  //     event: keyf1,
  //     name: "心率",
  //     change: (e, td) => limitChange(e, td, 12),
  //     autoComplete: { data: gsList },
  //     textarea: {
  //       width: 75
  //     },
  //   },
  {
    key: "heartRate", //心律
    value: "",
    event: keyf1,
    name: "心律",
    next: "次/分",
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
  // {
  //   key: "temperature", //体温
  //   value: "",
  //   name:'体温',
  //   next: '℃',
  //   event: keyf1,
  //   textarea: {
  //     width: 46
  //   },
  //   change: (e, td) => limitChange(e, td, 12),
  // },
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
    key: "expand", //自定义3
    name: "用药",
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 200
    },
  },
  {
    key: "fieldEight", //特殊情况记录
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
      width: 300
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
  // {
  //   key: "sign",
  //   value: ""
  // },
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

