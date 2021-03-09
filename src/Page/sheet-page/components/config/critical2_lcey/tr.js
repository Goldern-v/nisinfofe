import {
  keyf1
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
    key: "food", //入量-项目
    value: "",
    event: keyf1
  },
  {
    key: "foodSize", //入量-实入量
    value: "",
    event: keyf1,
  },
  {
    key: "fieldOne", //出量-尿量
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwo", //出量-大便
    value: "",
    event: keyf1,
  },
  {
    key: "fieldThree", //出量-呕吐
    value: "",
    event: keyf1
  },
  {
    key: "fieldFour", //出量-引流
    value: "",
    event: keyf1,
  },
  {
    key: "dischargeSize", //出量-其它
    value: "",
    event: keyf1
  },
  {
    key: "totalDischarge", //出量-总出量
    value: "",
    event: keyf1,
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1
  },
  {
    key: "pulse", //心率/脉搏
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸 次/min
    value: "",
    event: keyf1
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
      width: 48
    },
    style: {
      'line-height': '30px'
    }
  },
  {
    key: "spo2", //血氧饱和度%
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSix", // 氧疗 升/分
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③']
    },
  },
  {
    key: "pain", // 疼痛
    value: "",
    event: keyf1,
  },
  {
    key: "description", //特殊处理及病情观察
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "180px",
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
