import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

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
    click: click_time
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 50
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 60
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 60
    }
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
      width: 60
    }
  },
  {
    key: "bloodOne", //输注部位
    value: "",
    event: keyf1,
    name: "输注部位",
    textarea: {
      width: 60
    }
  },
  {
    key: "bloodTwo", //血型
    value: "",
    event: keyf1,
    name: "血型",
    textarea: {
      width: 60
    }
  },
  {
    key: "bloodThree", //血液成分
    value: "",
    event: keyf1,
    name: "血液成分",
    next: "ml",
    textarea: {
      width: 60
    },
  },
  {
    key: "bloodFour", //剂量
    value: "",
    event: keyf1,
    name: "剂量",
    textarea: {
      width: 60
    }
  },
  {
    key: "bloodFive", // 血袋号
    value: "",
    event: keyf1,
    name: "血袋号",
    textarea: {
      width: 60
    },
  },
  {
    key: "bloodSix", // 血液质量血袋完好
    value: "",
    event: keyf1,
    name: "血液质量血袋完好",
    textarea: {
      width: 60
    },
  },
  {
    key: "bloodSeven", //交叉配血结果
    value: "",
    event: keyf1,
    name: "交叉配血结果",
    textarea: {
      width: 60
    },
  },
  {
    key: "bloodEight", //输注速度
    value: "",
    event: keyf1,
    name: "输注速度",
    textarea: {
      width: 60
    },
  },
  {
    key: "description", //不良反应及特殊处理
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
    key: "audit",
    value: ""
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
    value: true
  }
];
