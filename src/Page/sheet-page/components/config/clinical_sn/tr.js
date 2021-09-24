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
    name: "体温/温箱",
    next: "℃",
    event: keyf1
  },
  {
    key: "pulse", //心率
    value: "",
    name: "心率",
    next: "次/分",
    event: keyf1
  },
  {
    key: "spo2", //血氧饱和度
    value: "",
    name: "血氧饱和度",
    next: "%",
    event: keyf1
  },
  {
    key: "complexion", //面色
    value: "",
    name: "面色",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤", "⑥", "⑦"]
    },
  },
  {
    key: "fieldOne", //肢端
    value: "",
    name: "肢端",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "bloodPressure", //血压
    value: "",
    name: "血压",
    next: "mmHg",
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
    name: "呼吸频率",
    next: "次/分",
    event: keyf1
  },
  {
    key: "fieldTwo", //氧疗方式
    value: "",
    name: "氧疗方式",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤"]
    },
  },
  {
    key: "fieldThree", //机械通气模式
    value: "",
    name: "机械通气模式",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤", "⑥", "⑦"]
    },
  },
  {
    key: "fieldFour", //插管深度
    value: "",
    name: "插管深度",
    next: "cm",
    event: keyf1
  },
  {
    key: "fieldFive", //氧气量
    value: "",
    name: "氧气量",
    event: keyf1,
  },
  {
    key: "fieldSix", //吸入氧浓度
    value: "",
    name: "吸入氧浓度",
    next: "%",
    event: keyf1,
  },
  {
    key: "fieldSeven", //PIP/PEEP
    value: "",
    name: "PIP/PEEP",
    event: keyf1,
  },
  {
    key: "fieldEight", // 平均气道压
    value: "",
    name: "平均气道压",
    event: keyf1,
  },
  {
    key: "fieldNine", // RR(机设)
    value: "",
    name: "RR(机设)",
    event: keyf1,
  },
  {
    key: "fieldTen", // RR(自主)
    value: "",
    name: "RR(自主)",
    event: keyf1,
  },
  {
    key: "fieldEleven", // ΔP(高频通气)
    value: "",
    name: "高频通气",
    event: keyf1,
  },
  {
    key: "fRate", // F(频次)
    value: "",
    name: "F(频次)",
    event: keyf1,
  },
  {
    key: "fieldTwelve", // 吸痰耐受
    value: "",
    name: "吸痰耐受",
    event: keyf1,
    autoComplete: {
      data: ["√", "×"]
    },
  },
  {
    key: "eyeNurse", // 眼部护理
    value: "",
    name: "眼部护理",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "oralNurse", // 口腔护理
    value: "",
    name: "口腔护理",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "umbilicalNurse", // 脐部护理
    value: "",
    name: "脐部护理",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "buttockNurse", // 臀部护理
    value: "",
    name: "臀部护理",
    event: keyf1,
    autoComplete: {
      data: ["①", "②"]
    },
  },
  {
    key: "consciousness", // 意识
    value: "",
    name: "意识",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤"]
    },
  },
  {
    key: "fieldThirteen", // 前卤
    value: "",
    name: "前卤",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    },
  },
  {
    key: "pupilSizeLeft", // 瞳孔-大小-左
    value: "",
    name: "大小左",
    event: keyf1
  },
  {
    key: "pupilSizeRight", // 瞳孔-大小-右
    value: "",
    name: "大小右",
    event: keyf1
  },
  {
    key: "pupilReflexLeft", // 瞳孔-对光反射-左
    value: "",
    name: "对光反射左",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    },
  },
  {
    key: "pupilReflexRight", // 瞳孔-对光反射-右
    value: "",
    name: "对光反射右",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    },
  },
  {
    key: "fieldFourteen", //肌张力
    value: "",
    name: "肌张力",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    },
  },
  {
    key: "fieldFifteen", //抽搐
    value: "",
    name: "抽搐",
    event: keyf1,
    autoComplete: {
      data: ["√", "×"]
    },
  },
  {
    key: "fieldSixteen", //腹胀
    value: "",
    name: "腹胀",
    event: keyf1,
    autoComplete: {
      data: ["√", "×"]
    },
  },
  {
    key: "fieldSeventeen", //体位
    value: "",
    name: "体位",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④"]
    },
  },
  {
    key: "fieldEighteen", //喂养方式
    value: "",
    name: "喂养方式",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤"]
    },
  },
  {
    key: "food", //入量-名称
    value: "",
    name: "入量名称",
    event: keyf1,
  },
  {
    key: "foodSize", //入量
    value: "",
    name: "入量",
    next: "ml",
    event: keyf1
  },
  {
    key: "discharge", //排出物
    value: "",
    name: "出量名称",
    event: keyf1,
  },
  {
    key: "dischargeSize", //排出物数量
    value: "",
    name: "出量",
    next: "ml",
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
