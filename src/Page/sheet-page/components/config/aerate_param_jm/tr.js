/*
江门妇幼-产前待产护理记录单
*/
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  multiDictInfo
} from "../../../api/index";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let ylList = ['低流量','高流量','呼吸机','BI-PAP','无创呼吸机'];
let tqList = ['HFO','NIPPV','S₂MV','NS₂MV'];

export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date,
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
  },
  {
    key: "therapyMode", //氧疗模式
    value: "",
    event: keyf1,
    name: "氧疗模式",
    textarea: {
      width: 75
    },
    autoComplete: {
      data: ylList
    },
  },
  {
    key: "flow", //流量
    value: "",
    event: keyf1,
    name: "流量",
    textarea: {
      width: 75
    }
  },
  {
    key: "ventilation", //通气模式
    value: "",
    event: keyf1,
    name: "通气模式",
    textarea: {
      width: 75
    },
    autoComplete: {
      data: tqList
    },
  },
  {
    key: "PIP", //pip
    value: "",
    event: keyf1,
    name: "pip",
    next: "cmH2O",
    textarea: {
      width: 75
    }
  },
  {
    key: "peep", //peep
    value: "",
    name: "PEEP",
    next: "cmH2O",
    textarea: {
      width: 75
    }
  },
  {
    key: "pmean", //pmean
    value: "",
    event: keyf1,
    name: "Pmean",
    textarea: {
      width: 75
    }
  },
  {
    key: "fio2", //fio2
    value: "",
    event: keyf1,
    name: "FiO2",
    next: "%",
    textarea: {
      width: 75
    },
  },
  {
    key: "ti", //ti
    value: "",
    event: keyf1,
    name: "Ti",
    next: "Ampl/秒",
    textarea: {
      width: 75
    },
  },
  {
    key: "mv", //mv
    value: "",
    event: keyf1,
    name: "MV",
    next: "L/min",
    textarea: {
      width: 75
    }
  },
  {
    key: "rr", // rr
    value: "",
    event: keyf1,
    name: "RR",
    next: "次/min",
    textarea: {
      width: 75
    },
  },
  {
    key: "amplitude", // p
    value: "",
    event: keyf1,
    name: "P/振幅",
    textarea: {
      width: 75
    },
  },
  {
    key: "humidifier", //温度
    value: "",
    event: keyf1,
    name: "湿化器显示温度",
    next: "℃",
    textarea: {
      width: 75
    },
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
  //     width: "700px",
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
  //   // oninput: next
  // },
  {
    key: "sign",
    value: ""
  },
  // {
  //   key: "sign2",
  //   value: ""
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
