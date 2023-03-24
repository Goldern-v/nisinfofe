import {
  listItem
} from "../../../api/recordDesc";
import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time,
  click_cancel
} from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = [];
let szList = ['√','-','±', '+', '++', '+++', '△'];
let msList =['A','B','C','D','E','F'];
let chuList = [];
let ruList = [];
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
    key: "boxTemperature", //箱温
    value: "",
    event: keyf1,
    name: "箱温",
    next: "℃"
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "breath", //呼吸次/分
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "heartRate", //心率次/分
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分"
  },
  {
    key: "cry", //哭声
    value: "",
    event: keyf1,
    name: "哭声",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: ['A', 'B', 'C', 'D']
    }
  },
  {
    key: "reflct", //反应
    value: "",
    event: keyf1,
    name: "反应",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: ['A', 'B', 'C', 'D']
    }
  },
  {
    key: "muscleTension", //肌张力
    value: "",
    event: keyf1,
    name: "肌张力",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: ['A', 'B', 'C', 'D']
    }
  },
  {
    key: "skin", //皮肤
    value: "",
    event: keyf1,
    name: "皮肤",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: ['A', 'B', 'C', 'D']
    }
  },
  {
    key: "face", //面色
    value: "",
    event: keyf1,
    name: "面色",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: msList
    }
  },
  {
    key: "consciousness1", //神志
    value: "",
    event: keyf1,
    name: "神志",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: szList
    }
  },
  {
    key: "navel", //脐部
    value: "",
    event: keyf1,
    name: "脐部",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: ['A', 'B', 'C', 'D']
    }
  },
  {
    key: "bloodSugar", // 血糖
    value: "",
    name: "血糖",
    event: keyf1,
    next: "mmol/L"
  },
  {
    key: "bloodPressure", // 血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "血压",
    next: "mmHg"
  },
  {
    key: "spo2", //血氧饱和度
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%"
  },
  {
    key: "oxygenFlow", // 吸氧流量
    value: "",
    event: keyf1,
    name: "吸氧流量"
  },
  {
    key: "concentration", // 吸氧浓度
    value: "",
    event: keyf1,
    name: "吸氧浓度",
  },
  {
    key: "oxygenMethod", // 吸氧方式
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["A", "B", "C", "D"]
    },
    name: "吸氧方式",
  },
  // 入量
  {
    key: "food", //名称
    value: "",
    name: "入量名称",
    event: keyf1,
    autoComplete: {
      data: ruList
    },
    textarea: {
      width: 58
    }
  },
  {
    key: "foodSize", //量
    value: "",
    event: keyf1,
    name: "入量",
    next: 'ml',
  },
  // 出量
  {
    key: "discharge", //名称
    value: "",
    event: keyf1,
    name: "出量名称",
    autoComplete: {
      data: chuList
    },
    textarea: {
      width: 58
    }
  },
  {
    key: "dischargeSize", //量
    value: "",
    event: keyf1,
    name: "出量",
    next: "ml",
  },
  {
    key: "stoolFrequency", //大便次数
    value: "",
    event: keyf1,
    name: "出量大便次数"
  },
  {
    key: "stoolColor ", // 大便
    value: "",
    event: keyf1,
    name: "大便",
  },
  {
    key: "gastricJuice", //胃液
    value: "",
    event: keyf1,
    name: "胃液",
  },
  {
    key: "description", //病情与措施
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "220px",
      background: "transparent"
    },
    event: function (e, td) {
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

export function getListData4() {
  listItem("入量名称", info.sheetType).then(res => {
    ruList.splice(0, ruList.length);
    for (let item of res.data.data) {
      ruList.push(item.name);
    }
  });
  listItem("出量名称", info.sheetType).then(res => {
    chuList.splice(0, chuList.length);
    for (let item of res.data.data) {
      chuList.push(item.name);
    }
    // chuList.push("阴道出血")
  });
  let list = ["意识"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
  });
}

getListData4();
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
