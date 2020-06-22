

import { keyf1 } from "../keyEvent/f1.js"
import { event_date, event_time, click_date } from "../keyEvent/date";

const tdStyle = {
  height: '48px'
}

export default [
  {
    key: "recordMonth", //日期
    value: "",
    style: tdStyle,
    event: event_date,
    click: click_date,
  },
  {
    key: "recordHour", //时间
    value: "",
    style: tdStyle,
    event: event_time,
  },
  {
    key: "temperature", //体温
    value: "",
    style: tdStyle,
    event: keyf1
  },
  {
    key: "pulse", //脉搏
    value: "",
    style: tdStyle,
    event: keyf1
  },
  {
    key: "breath", //呼吸
    value: "",
    style: tdStyle,
    event: keyf1
  },
  {
    key: "bloodPressure", //血压
    value: "",
    style: tdStyle,
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "pupil", //瞳孔
    value: "",
    name: "瞳孔",
    style: tdStyle,
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "food", //入量 项目
    value: "",
    style: tdStyle,
    event: keyf1
  },
  {
    key: "foodSize", //入量 实入量
    value: "",
    style: tdStyle,
    event: keyf1
  },
  {
    key: "discharge", //出量 项目
    value: "",
    style: tdStyle,
    event: keyf1
  },
  {
    key: "dischargeSize", //出量 实出量
    value: "",
    style: tdStyle,
    event: keyf1
  },
  {
    key: "description", //病情处理
    value: "",
    name: "病情及处理",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "340px",
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
    key: "sign", //签名
    value: "",
    style: tdStyle,
    event: keyf1
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
]
