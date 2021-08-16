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

let gfsList = [];
let yspdList = [];

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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 45
    }
  },
  {
    key: "pulse", //HR
    value: "",
    event: keyf1,
    name: "HR",
    next: "次/分",
    textarea: {
      width: 45
    }
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    name: "R",
    next: "次/分",
    textarea: {
      width: 45
    }
  },
  {
    key: "fieldNBP", //NBP
    value: "",
    event: keyf1,
    name: "NBP",
    next: "次/分",
    textarea: {
      width: 45
    }
  },
  {
    key: "fieldABP", //ABP
    value: "",
    event: keyf1,
    name: "ABP",
    textarea: {
      width: 45
    }
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1,
    name: "心率",
    textarea: {
      width: 45
    }
  },
  {
    key: "cvpcmH2O", //CVP
    value: "",
    event: keyf1,
    name: "CVP",
    textarea: {
      width: 45
    },
  },
  {
    key: "spO2", //SPO2
    value: "",
    event: keyf1,
    name: "SPO2",
    next: "s",
    textarea: {
      width: 45
    }
  },
  {
    key: "pattern", // 模式
    value: "",
    event: keyf1,
    name: "模式",
    next: "min",
    textarea: {
      width: 45
    },
  },
  {
    key: "frequency", // 频率
    value: "",
    event: keyf1,
    name: "频率",
    next: "cm",
    textarea: {
      width: 45
    },
  },
  {
    key: "vtml", //VT
    value: "",
    event: keyf1,
    name: "VT",
    textarea: {
      width: 45
    },
  },
  {
    key: "ipap", //IPAP
    value: "",
    event: keyf1,
    name: "IPAP",
    textarea: {
      width: 45
    },
  },
  {
    key: "epap", //EPAP
    value: "",
    event: keyf1,
    name: "EPAP",
    textarea: {
      width: 45
    },
  },
  {
    key: "peep", //PEEP
    value: "",
    event: keyf1,
    name: "PEEP",
    textarea: {
      width: 45
    }
  },
  {
    key: "intubationDepth", //插管深度
    value: "",
    event: keyf1,
    name: "插管深度",
    textarea: {
      width: 45
    },
  },
  {
    key: "fiO2", //FIO2
    value: "",
    event: keyf1,
    name: "FIO2",
    textarea: {
      width: 45
    },
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    textarea: {
      width: 45
    },
    autoComplete: {
      data: yspdList
    },
  },
  {
    key: "gcs_e", //E
    value: "",
    event: keyf1,
    name: "E",
    textarea: {
      width: 45
    }
  },
  {
    key: "gcs_m", //M
    value: "",
    event: keyf1,
    name: "M",
    textarea: {
      width: 45
    }
  },
  {
    key: "gcs_v", //V
    value: "",
    event: keyf1,
    name: "V",
    textarea: {
      width: 45
    }
  },
  {
    key: "left_pupil", //瞳孔左
    value: "",
    event: keyf1,
    name: "瞳孔左",
    textarea: {
      width: 45
    }
  },
  {
    key: "right_pupil", //瞳孔右
    value: "",
    event: keyf1,
    name: "瞳孔右",
    textarea: {
      width: 45
    }
  },
  {
    key: "left_reflection", //光反射左
    value: "",
    event: keyf1,
    name: "光反射左",
    autoComplete: {
      data: gfsList
    },
    textarea: {
      width: 45
    }
  },
  {
    key: "right_reflection", //光反射右
    value: "",
    event: keyf1,
    name: "光反射右",
    autoComplete: {
      data: gfsList
    },
    textarea: {
      width: 45
    }
  },
  {
    key: "sedationScore", //镇静评分
    value: "",
    event: keyf1,
    name: "镇静评分",
    textarea: {
      width: 45
    }
  },
  {
    key: "description", //护理记录
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

export function getListData() {
  let list = [
    "贵州人医:生命体征监测及观察记录单:光反射",
    "贵州人医:生命体征监测及观察记录单:意识判断",
  ];

  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(gfsList, list[0], data);
    setList(yspdList, list[1], data);
  });
}

getListData();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}