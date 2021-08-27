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
  click_time
} from "../keyEvent/date";
let 护理操作项目 = [];
let 护理操作结果 = [];
let 护理问题 = [];
let 护理类型 = [];
let 安全护理 = [];
let 导管护理 = [];
let 气管护理 = [];
let 心理护理 = [];
let 饮食情况 = [];
let wether = ['是', '否'];
export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date,
    style: {
      width: "40px"
    },
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    // click: click_time
    style: {
      width: "40px"
    },
  },
  {
    key: "nursingOperationItem", //护理操作项目
    value: "",
    event: keyf1,
    name: "护理操作项目",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 护理操作项目
    },
  },
  {
    key: "nursingOperationResult", //护理操作结果
    value: "",
    event: keyf1,
    name: "护理操作结果",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 护理操作结果
    },
  },
  {
    key: "nursingProblem", //护理问题
    value: "",
    event: keyf1,
    name: "护理问题",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 护理问题
    },
  },
  {
    key: "nursingType", //护理类型
    value: "",
    event: keyf1,
    name: "护理类型",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 护理类型
    },
  },
  {
    key: "safeCare", //安全护理
    value: "",
    event: keyf1,
    name: "安全护理",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 安全护理
    },
  },
  {
    key: "catheterCare", //导管护理
    value: "",
    event: keyf1,
    name: "导管护理",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 导管护理
    },
  },
  {
    key: "skinCare", //皮肤护理
    value: "",
    event: keyf1,
    name: "皮肤护理",
    textarea: {
      width: 150
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "trachealCare", //气管护理
    value: "",
    event: keyf1,
    name: "气管护理",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 气管护理
    },
  },
  {
    key: "bodyCare", //体位护理
    value: "",
    event: keyf1,
    name: "体位护理",
    textarea: {
      width: 150
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "nutritionCare", //营养护理
    value: "",
    event: keyf1,
    name: "营养护理",
    textarea: {
      width: 150
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "psychologyCare", //心理护理
    value: "",
    event: keyf1,
    name: "心理护理",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 心理护理
    },
  },
  {
    key: "diet", //饮食情况
    value: "",
    event: keyf1,
    name: "饮食情况",
    textarea: {
      width: 150
    },
    splice: true,
    autoComplete: {
      data: 饮食情况
    },
  },
  {
    key: "urinationTrouble", //排尿困难
    value: "",
    event: keyf1,
    name: "排尿困难",
    textarea: {
      width: 150
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "isolation", //隔离
    value: "",
    event: keyf1,
    name: "隔离",
    textarea: {
      width: 150
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "bellySize", //腹围
    value: "",
    event: keyf1,
    name: "腹围",
    textarea: {
      width: 150
    },
  },
  {
    hidden: true,
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      // width: "180px",
      background: "transparent",
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
