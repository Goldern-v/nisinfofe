import {
  keyf1,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
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
    event: event_time
  },
  {
    key: "temperature", //T（体温）
    value: "",
    name: "T",
    next:"℃",
    event: keyf1,
  },
  {
    key: "pulse", // PR/HR
    value: "",
    name: "PR/HR",
    next:"次/分",
    event: keyf1
  },
  {
    key: "breath", //R
    value: "",
    name: "R",
    next:"次/分",
    event: keyf1,
  },
  {
    key: "bloodPressure", //BP
    value: "",
    name: "BP",
    next:"mmHg",
    event: keyf1
  },
  {
    key: "spo2", //spo2
    value: "",
    name: "SPO2",
    next:"%",
    event: keyf1,
  },
  {
    key: "IncubatorTemperature", //温箱温度
    value: "",
    event: keyf1,
    name: "温箱温度",
  },
  {
    key: "oxygen", //温箱湿度
    value: "",
    name: "温箱湿度",
    event: keyf1,
  },
  {
    key: "food", //氧流量
    value: "",
    event: keyf1,
    name: "氧流量",
  },
  {
    key: "infusionObs", //输液观察
    value: "",
    event: keyf1,
    name: "输液观察",
    next:"ml",
  },
  {
    key: "customTitle1", //自定义
    value: "",
    event: keyf1
  },
  {
    key: "customTitle2", //自定义
    value: "",
    event: keyf1
  },
  {
    key: "description", //病情观察及护理措施
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "240px",
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
