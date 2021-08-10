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
    key: "temperature", //T
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "pulse", //P
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "bloodPressure", //BP
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
      width: 50
    }
  },
  {
    key: "preFieldOne", //SPO2
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
  },
  {
    key: "consciousness", //清楚
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "preWoundOne", //渗血
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "preWoundTwo", //血肿
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "preWoundThree", //淤血
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "preWoundFour", //杂音
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "postFootOne", //搏动良好
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
  },
  {
    key: "postFootTwo", //双侧对称
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
  },
  {
    key: "postLimbsOne", //皮温
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "postLimbsTwo", //颜色
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "postLimbsThree", //粗细肿胀
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
  },
  {
    key: "postLimbsFour", //感觉运动异常
    value: "",
    event: keyf1,
    textarea: {
      width: 60
    },
  },
  {
    key: "digestionOne", //腹胀
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "digestionTwo", //恶心
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "digestionThree", //呕吐
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "preInputOne", //液体
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "preInputTwo", //其他
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputOne", //尿量
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputTwo", //其他
    value: "",
    event: keyf1,
    textarea: {
      width: 43
    },
  },
  {
    key: "description", //病情变化及特殊情况
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "360px",
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
