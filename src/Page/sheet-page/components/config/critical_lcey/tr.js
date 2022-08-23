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
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name:"意识",
    autoComplete: {
      data: ['清醒', '嗜睡', '昏睡', '模糊', '谵妄', '浅昏迷', '昏迷', '深昏迷','冬眠状态','麻醉未醒','镇静状态']
    },
    textarea: {
      width: 40
    },
  },
  {
    key: "pupilLeft", //左(mm)
    value: "",
    event: keyf1,
    name:"左",
    next:"mm",
    textarea: {
      width: 32
    },
  },
  {
    key: "pupilRight", //右(mm)
    value: "",
    event: keyf1,
    name:"右",
    next:"mm",
    textarea: {
      width: 32
    },
  },
  {
    key: "pupilReflect", //光反射
    value: "",
    name:"光反射",
    event: keyf1,
    autoComplete: {
      data: ['++','+','-']
    },
  },
  {
    key: "temperature", //体温
    value: "",
    name:"体温",
    next:"(°C)",
    event: keyf1
  },
  {
    key: "pulse", //   心率/脉搏
    value: "",
    name:" HR/PR",
    next:"（次/分）",
    event: keyf1,
  },
  {
    key: "breath", //呼吸
    value: "",
    name:"呼吸",
    next:"（次/分）",
    event: keyf1
  },
  {
    key: "bloodPressure", //血压
    value: "",
    name:"血压",
    next:"mmHg",
    event: keyf1,
  },
  {
    key: "spo2", //SPO2
    value: "",
    name:"SPO2",
    next:"mm%",
    event: keyf1,
  },
  {
    key: "oxygenWay", //氧疗方式
    value: "",
    name:"氧疗方式",
    event: keyf1,
    autoComplete: {
      data: ['鼻导管', '雾化面罩', '储氧面罩', '高流湿化吸氧', '无创面罩', '文丘里面罩', '呼吸机']
    },
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldSix", //氧疗L/min
    name:"氧疗L/min",
    value: "",
    event: keyf1
  },
  {
    key: "food", //项目
    value: "",
    name:"项目",
    event: keyf1,
    textarea: {
      width: 55
    },
  },
  {
    key: "foodSize", //入量(ml)
    value: "",
    name:"入量",
    next:"(ml)",
    event: keyf1,
    textarea: {
      width: 32
    },
  },
  {
    key: "fieldOne", //尿量
    value: "",
    name:"尿量",
    event: keyf1,
    textarea: {
      width: 32
    },
  },
  {
    key: "fieldTwo", //大便量
    value: "",
    name:"大便量",
    event: keyf1,
    textarea: {
      width: 32
    },
  },
  {
    key: "fieldThree", // 痰液量
    value: "",
    name:"痰液量",
    event: keyf1,
    textarea: {
      width: 32
    },
  },
  {
    key: "fieldFour", // 标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
  },
  {
    key: "discharge", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
  },
  {
    key: "accessCustomize", // 标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
  },
  {
    key: "dischargeSize", // 出量
    value: "",
    event: keyf1,
    name:"出量",
    next:"(ml)",
    textarea: {
      width: 32
    },
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
      width: "140px",
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
  },
  {
    key: "sign2",
    value: "",
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
    value: false
  }
];
