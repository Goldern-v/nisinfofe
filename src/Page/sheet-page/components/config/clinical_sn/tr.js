import {
  keyf1
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
    key: "temperature", //体温/温箱
    value: "",
    event: keyf1
  },
  {
    key: "pulse", //心率
    value: "",
    event: keyf1
  },
  {
    key: "spo2", //血氧饱和度
    value: "",
    event: keyf1
  },
  {
    key: "complexion", //面色
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤", "⑥", "⑦"]
    },
  },
  {
    key: "fieldOne", //肢端
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
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
    key: "breath", //呼吸频率
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwo", //氧疗方式
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤"]
    },
  },
  {
    key: "fieldThree", //机械通气模式
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤", "⑥", "⑦"]
    },
  },
  {
    key: "fieldFour", //插管深度
    value: "",
    event: keyf1
  },
  {
    key: "fieldFive", //氧气量
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSix", //吸入氧浓度
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSeven", //PIP/PEEP
    value: "",
    event: keyf1,
  },
  {
    key: "fieldEight", // 平均气道压
    value: "",
    event: keyf1,
  },
  {
    key: "fieldNine", // RR(机设)
    value: "",
    event: keyf1,
  },
  {
    key: "fieldTen", // RR(自主)
    value: "",
    event: keyf1,
  },
  {
    key: "fieldEleven", // ΔP(高频通气)
    value: "",
    event: keyf1,
  },
  {
    key: "fRate", // F(频次)
    value: "",
    event: keyf1,
  },
  {
    key: "fieldTwelve", // 吸痰耐受
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√", "×"]
    },
  },
  {
    key: "eyeNurse", // 眼部护理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "oralNurse", // 口腔护理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "umbilicalNurse", // 脐部护理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "buttockNurse", // 臀部护理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "consciousness", // 意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤"]
    },
  },
  {
    key: "fieldThirteen", // 前卤
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    },
  },
  {
    key: "pupilSizeLeft", // 瞳孔-大小-左
    value: "",
    event: keyf1
  },
  {
    key: "pupilSizeRight", // 瞳孔-大小-右
    value: "",
    event: keyf1
  },
  {
    key: "pupilReflexLeft", // 瞳孔-对光反射-左
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    },
  },
  {
    key: "pupilReflexRight", // 瞳孔-对光反射-右
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    },
  },
  {
    key: "fieldFourteen", //肌张力
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    },
  },
  {
    key: "fieldFifteen", //抽搐
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√", "×"]
    },
  },
  {
    key: "fieldSixteen", //腹胀
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√", "×"]
    },
  },
  {
    key: "fieldSeventeen", //体位
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④"]
    },
  },
  {
    key: "fieldEighteen", //喂养方式
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤"]
    },
  },
  {
    key: "food", //入量-名称
    value: "",
    event: keyf1,
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
  },
  {
    key: "dischargeSize", //排出物数量
    value: "",
    event: keyf1
  },
  // {
  //   key: "description", //特殊情况记录
  //   value: "",
  //   style: {
  //     textAlign: "left",
  //     position: "absolute",
  //     top: "1px",
  //     bottom: "1px",
  //     left: "1px",
  //     width: "180px",
  //     background: "transparent"
  //   },
  //   event: function (e, td) {
  //     console.log(e.keyCode);
  //     if (e.keyCode == 9) {
  //       td.value = "    " + td.value;
  //       e.preventDefault();
  //     }
  //     keyf1(e, td);
  //   }
  // oninput: next
  // },
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
