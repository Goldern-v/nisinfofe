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
    key: "temperature", //入量-项目
    value: "",
    event: keyf1
  },
  {
    key: "pulse", //入量-实入量
    value: "",
    event: keyf1,
  },
  {
    key: "temperature0", //出量-尿量
    value: "",
    event: keyf1
  },
  {
    key: "pulse0", //出量-大便
    value: "",
    event: keyf1,
  },
  {
    key: "temperature1", //出量-呕吐
    value: "",
    event: keyf1
  },
  {
    key: "pulse1", //出量-引流
    value: "",
    event: keyf1,
  },
  {
    key: "temperature2", //出量-其它
    value: "",
    event: keyf1
  },
  {
    key: "pulse2", //出量-总出量
    value: "",
    event: keyf1,
  },
  {
    key: "pulse3", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
  },
  {
    key: "breath5", //瞳孔-左
    value: "",
    event: keyf1
  },
  {
    key: "breath6", //瞳孔-右
    value: "",
    event: keyf1
  },
  {
    key: "breath7", //瞳孔-光反射
    value: "",
    event: keyf1
  },
  {
    key: "breath", //体温
    value: "",
    event: keyf1
  },
  {
    key: "breath1", //心率/脉搏
    value: "",
    event: keyf1
  },
  {
    key: "bloodPressure", //呼吸 次/min
    value: "",
    event: keyf1
  },
  {
    key: "bloodPressure1", //血压(mmHg)
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
    },
    style: {
      'line-height': '14px'
    }
  },
  {
    key: "consciousness", //血氧饱和度%
    value: "",
    event: keyf1,
  },
  {
    key: "pupilSizeRight", // 氧疗 升/分
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③']
    },
  },
  {
    key: "puplie", // 疼痛
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
