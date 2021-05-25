import {
  listItem
} from "@/api/record";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  multiDictInfo
} from "../../../api/index";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
import info from '../sheetInfo'
let ysList = [];
let list1 = [];
let list2 = [];
let list3 = [];
let list4 = [];
let list5 = [];
let list6 = [];
let list7 = [];
let list8 = [];
let list9 = [];
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
    key: "temperature", //体温T
    value: "",
    event: keyf1
  },
  {
    key: "pulse", //脉搏P
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸R
    value: "",
    event: keyf1
  },
  {
    key: "bloodPressure", //血压Bp
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
    key: "fieldOne", //胎位
    value: "",
    event: keyf1
  },
  {
    key: "fieldEight", //胎膜
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwo", //胎心
    value: "",
    event: keyf1
  },
  {
    key: "spo2", //血氧饱和度Spo2
    value: "",
    event: keyf1
  },
  {
    key: "food", //入
    value: "",
    event: keyf1,
  },
  {
    key: "foodSize", //入量
    value: "",
    event: keyf1
  },
  {
    key: "discharge", //出
    value: "",
    event: keyf1,
  },
  {
    key: "dischargeSize", //出量
    value: "",
    event: keyf1
  },
  {
    key: "fieldThree", // 宫缩强度
    name: '宫缩强度',
    value: "",
    event: keyf1
  },
  {
    key: "fieldFour", // 宫缩持续（s）
    name: '宫缩持续',
    next: "(s)",
    value: "",
    event: keyf1
  },
  {
    key: "fieldSeven", //  宫缩间歇(s/min)
    name: '宫缩间歇',
    next: "(s/min)",
    value: "",
    event: keyf1
  },
  {
    key: "fieldFive", //  宫颈扩张(cm)
    name: '宫颈扩张',
    next: '(cm)',
    value: "",
    event: keyf1
  },
  {
    key: "fieldSix", //  先露高低(cm)
    name: '先露高低',
    next: '(cm)',
    value: "",
    event: keyf1
  },
  {
    key: "description", //特殊情况记录
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

export function getListData() {
  listItem("入量名称", info.sheetType).then(res => {
    list7.splice(0, list7.length);
    for (let item in res.data.data) {
      list7.push(res.data.data[item].name);
    }
  });
  listItem("出量名称", info.sheetType).then(res => {
    list8.splice(0, list8.length);
    for (let item in res.data.data) {
      list8.push(res.data.data[item].name);
    }
  });
  let list = [
    "意识",
    "伤口疼痛",
    "伤口敷料",
    "患肢皮温",
    "患肢颜色",
    "患肢感觉",
    "疼痛评分",
    "患肢肿胀"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
    setList(list1, "伤口疼痛", data);
    setList(list2, "伤口敷料", data);
    setList(list3, "患肢皮温", data);
    setList(list4, "患肢颜色", data);
    setList(list5, "患肢感觉", data);
    setList(list6, "患肢肿胀", data);
    setList(list9, "疼痛评分", data);
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
