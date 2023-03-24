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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "fieldTwo", //脉搏次/分
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分"
  },
  {
    key: "breath", //呼吸次/分
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "fieldOne", //心率次/分
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分"
  },
  {
    key: "fieldTHREE", //神志
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
    key: "fieldThree", // 面容
    value: "",
    event: keyf1,
    autoComplete: {
      data: msList
    },
    name: "面容",
  },
  {
    key: "levelCare", // 护理级别
    value: "",
    event: keyf1,
    name: "护理级别",
  },
  {
    key: "fieldFour", // 肢端 颜色
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["A", "B", "C"]
    },
    name: "肢端颜色",
  },
  {
    key: "fieldFive", // 肢端 温度
    value: "",
    event: keyf1,
    name: "肢端温度",
    next: "",
    autoComplete: {
      data: ["A", "B"]
    },
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
  {
    key: "oxygenFlow", //  吸氧流量
    value: "",
    event: keyf1,
    name: "吸氧流量",
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
      width: 52
    }
  },
  {
    key: "foodSize", //量
    value: "",
    event: keyf1,
    name: "入量",
    next: 'ml',
  },
  {
    key: "fieldSix", //途径
    value: "",
    event: keyf1,
    name: "入量途径",
    textarea: {
      width: 46
    }
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
      width: 52
    }
  },
  {
    key: "dischargeSize", //量
    value: "",
    event: keyf1,
    name: "出量",
    next: "ml",
  },
  // 引流管
  {
    key: "tubeName", // 名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤', '⑥', "⑦", '⑧']
    },
    name: "引流管名称",
  },
  {
    key: "color", //颜色
    value: "",
    event: keyf1,
    name: "引流管颜色",
  },
  {
    key: "fieldEight", //长度cm
    value: "",
    name: "引流管长度",
    next: "cm",
    event: keyf1,
  },
  {
    key: "smooth", //通畅
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['√', '×']
    },
    name: "引流管通畅",
  },
  {
    key: "pump", //镇通泵
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['√', '×']
    },
    name: "引流管镇通泵",
  },
  {
    key: "fbs", //宫底FBS
    value: "",
    name: "宫底FBS",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "kneeReflex", // 膝反射
    value: "",
    event: keyf1,
    name: "膝反射",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: ['√', '-', "土"]
    }
  },
  {
    key: "diet", //饮食
    value: "",
    name: "饮食",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldSeven", //持续心电监测
    value: "",
    event: keyf1,
    autoComplete: { 
      data: ["S", "AF", "VF", "PM", "PVC", "PAC"]
    },
    name: "持续心电监测",
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
