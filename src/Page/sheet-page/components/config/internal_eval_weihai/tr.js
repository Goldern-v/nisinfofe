import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let ysList = ['深昏迷', '浅昏迷', '中昏迷', '清醒', '嗜睡']
// le i = ''
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
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    name: "意识"
  },
  {
    key: "temperature", //体温-数值
    value: "",
    event: keyf1,
    name: "体温"
  },
  {
    key: "heartrate", //心率
    value: "",
    event: keyf1,
    name:"心率"
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name:"脉搏"
  },
  {
    key: "breath", //呼吸 次/min
    value: "",
    event: keyf1,
    name: "呼吸 次/分"
  },
  {
    key: "bloodPressure", //血压(mmHg)
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      minWidth: 48
    },
    style: {
      'line-height': '30px'
    },
    name: "血压(mmHg)"
  },
  {
    key: "spo2", // SPO2（%）
    value: "",
    event: keyf1,
    name: "SPO2（%）"
  },
  // {
  //   key: "fieldSeventeen", //标题1
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     minWidth: 48
  //   }
  // },
  {
    key: "fieldEighteen", //标题2
    value: "",
    event: keyf1,
    name: "左侧瞳孔（mm）"
  },
  {
    key: "fieldNineteen", //标题3
    value: "",
    event: keyf1,
    name: "右侧瞳孔（mm）"
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
      minWidth: "340px",
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
    value: "",
    style: {
      minWidth: '55px'
    }
  },
  // {
  //   key: "sign2",
  //   value: "",
  //   style: {
  //     minWidth: '55px'
  //   }
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
  // {
  //   hidden: true,
  //   key: "signerName2",
  //   value: ""
  // },
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
  // {
  //   hidden: true,
  //   key: "signerNo2",
  //   value: ""
  // },
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
