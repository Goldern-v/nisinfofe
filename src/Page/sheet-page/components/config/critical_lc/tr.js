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
    key: "consciousness", //意识
    value: "",
    event: keyf1
  },
  {
    key: "pupilLeft", //瞳孔-左-直径(mm）
    value: "",
    event: keyf1
  },
  {
    key: "pupilReflectLeft", //瞳孔-左-对光反应
    value: "",
    event: keyf1
  },
  {
    key: "pupilRight", //瞳孔-右-直径(mm）
    value: "",
    event: keyf1
  },
  {
    key: "pupilReflectRight", //瞳孔-右-对光反应
    value: "",
    event: keyf1
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1
  },
  {
    key: "pulse", //心率脉搏
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1
  },
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
    textarea: {
      width: 48
    },
  },
  {
    key: "spo2", //血氧饱和度
    value: "",
    event: keyf1
  },
  {
    key: "fieldOne", //氧疗（L/min)-鼻导管
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwo", //氧疗（L/min)-面罩
    value: "",
    event: keyf1
  },
  {
    key: "fieldThree", //氧疗（L/min)-自定义
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    },
  },
  {
    key: "food", //入量-名称
    value: "",
    event: keyf1,
  },
  {
    key: "foodSize", //入量-ml
    value: "",
    event: keyf1
  },
  {
    key: "discharge", //出量-名称
    value: "",
    event: keyf1,
  },
  {
    key: "dischargeSize", //出量-ml
    value: "",
    event: keyf1
  },
  {
    key: "fieldFour", //出量-颜色性状
    value: "",
    event: keyf1
  },
  {
    key: "rassScore", //RASS评分
    value: "",
    event: keyf1
  },
  {
    key: "fieldFive", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    },
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
    value: false
  }
];
