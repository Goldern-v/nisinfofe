import {
  keyf1,
  limitChange
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
    name: "意识",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 58
    },
    autoComplete: {
      data: ['清醒', '模糊', '嗜睡', '昏睡', '谵妄', '浅昏迷', '昏迷', '深昏迷', '麻醉未醒', '冬眠状态']
    },
  },
  {
    key: "temperature", //T（体温）
    value: "",
    name: "T",
    next:"℃",
    event: keyf1,
  },
  {
    key: "pulse", // PR/HR
    value: "",
    name: "PR/HR",
    next:"次/分",
    event: keyf1
  },
  {
    key: "breath", //R
    value: "",
    name: "R",
    next:"次/分",
    event: keyf1,
  },
  {
    key: "bloodPressure", //BP
    value: "",
    name: "BP",
    next:"mmHg",
    event: keyf1
  },
  {
    key: "spo2", //spo2
    value: "",
    name: "SPO2",
    next:"%",
    event: keyf1,
  },
  {
    key: "therapy", //氧疗方式
    value: "",
    event: keyf1,
    name: "氧疗方式",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 80
    },
    autoComplete: {
      data: ['鼻导管', '面罩', '储氧面罩', 'HFNC', '无创辅助通气', '气管插管给氧', '气管切开给氧', '文丘里面罩']
    },
  },
  {
    key: "oxygen", //氧疗L/min
    value: "",
    name: "氧疗L/min",
    event: keyf1,
    textarea: {
      width: 40
    },
  },
  {
    key: "food", //入量
    value: "",
    event: keyf1,
    name: "入量",
    textarea: {
      width: 88
    },
  },
  {
    key: "foodSize", //量(ml)
    value: "",
    event: keyf1,
    name: "入量(量)",
    next:"ml",
    textarea: {
      width: 32
    },
  },
  {
    key: "discharge", //出量
    value: "",
    event: keyf1,
    name: "出量",
    change: (e, td) => limitChange(e, td, 7),
    autoComplete: {
      data: ['尿', '大便', '痰液', '呕吐物', '引流量', '其他']
    },
  },
  {
    key: "dischargeSize", //量(ml)
    value: "",
    event: keyf1,
    name: "出量(量)",
    next:"ml",
    textarea: {
      width: 32
    },
  },
  {
    key: "customTitle", //自定义
    value: "",
    event: keyf1
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
      width: "240px",
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
  //   key: "sign2",
  //   value: "",
  // },
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
