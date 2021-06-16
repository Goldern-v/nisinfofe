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
    key: "temperature", //体温
    value: "",
    event: keyf1
  },
  {
    key: "pulse", //脉搏
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
    }
  },
  {
    key: "cvp", //CVPcmH2O
    value: "",
    event: keyf1,
  },
  {
    key: "spo2", //SPO2
    value: "",
    event: keyf1,
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
  },
  {
    key: "pupilSizeLeft", // 瞳孔-左
    value: "",
    event: keyf1
  },
  {
    key: "pupilSizeRight", // 瞳孔-右
    value: "",
    event: keyf1
  },
  {
    key: "pupilReflexLeft", // 瞳孔-对光反射左
    value: "",
    event: keyf1
  },
  {
    key: "pupilReflexRight", // 瞳孔-对光反射右
    value: "",
    event: keyf1
  },
  {
    key: "fieldOne", // 机械通气-呼吸模式
    value: "",
    event: keyf1
  },
  {
    key: "fio2", // 机械通气-FiO2
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwo", // 机械通气-f
    value: "",
    event: keyf1
  },
  {
    key: "fieldThree", // 机械通气-插管深度
    value: "",
    event: keyf1
  },
  {
    key: "food", //入
    value: "",
    event: keyf1,
    textarea: {
      width: 68
    }
  },
  {
    key: "foodSize", //入量
    value: "",
    event: keyf1
  },
  {
    key: "discharge", //排出物
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "dischargeSize", //排出物数量
    value: "",
    event: keyf1
  },
  {
    key: "fieldFour", //出量-颜色性状
    value: "",
    event: keyf1
  },
  {
    key: "fieldFive", //静脉置管
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSix", //卧位
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSeven", //受压皮肤
    value: "",
    event: keyf1,
  },
  {
    key: "fieldNine", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "description", //护理措施
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
    // oninput: next
  },
  {
    key: "fieldEight", //其他
    value: "",
    event: keyf1,
    textarea: {
      width: 36
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
