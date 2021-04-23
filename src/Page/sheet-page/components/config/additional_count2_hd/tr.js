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
} from "../keyEvent/date";
let wether = ['有', '无'];
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
  },
  {
    key: "bellySize", //腹围（cm）
    value: "",
    event: keyf1,
    name: "腹围（cm）",
    textarea: {
      width: 48
    },
  },
  {
    key: "fieldOne", //膀胱充盈
    value: "",
    event: keyf1,
    name: "膀胱充盈",
    textarea: {
      width: 48
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "fieldTwo", //肠胀气
    value: "",
    event: keyf1,
    name: "肠胀气",
    textarea: {
      width: 48
    },
    autoComplete: {
      data: wether
    },
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
    hidden: true,
    key: "signerNo",
    value: ""
  },
  {
    hidden: true,
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

let filterKey = '花都' + ':';
let filterKey2 = '通用护记副单' + ':';

export function getListData4() {
  let list = [
    "护理操作项目",
    "护理操作结果",
    "护理问题",
    "护理类型",
    "安全护理",
    "导管护理",
    "气管护理",
    "心理护理",
    "饮食情况"
  ];
  list = list.map(key => {
    return filterKey + filterKey2 + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(护理操作项目, "护理操作项目", data);
    setList(护理操作结果, "护理操作结果", data);
    setList(护理问题, "护理问题", data);
    setList(护理类型, "护理类型", data);
    setList(安全护理, "安全护理", data);
    setList(导管护理, "导管护理", data);
    setList(气管护理, "气管护理", data);
    setList(心理护理, "心理护理", data);
    setList(饮食情况, "饮食情况", data);
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
  key = filterKey + filterKey2 + key;
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}
