import { multiDictInfo } from "../../../api/index";
import info from "../sheetInfo";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
let ysList = [],ruList = [];
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
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    name: "意识"
  },
  {
    key: "pupilLeft", //瞳孔-左-直径(mm）
    value: "",
    event: keyf1,
    name: "瞳孔-左-直径(mm）"
  },
  {
    key: "pupilReflectLeft", //瞳孔-左-对光反应
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["+", "S", "-"]
    },
    name: "瞳孔-左-对光反应"
  },
  {
    key: "pupilRight", //瞳孔-右-直径(mm）
    value: "",
    event: keyf1,
    name: "瞳孔-右-直径(mm）"
  },
  {
    key: "pupilReflectRight", //瞳孔-右-对光反应
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["+", "S", "-"]
    },
    name: "瞳孔-右-对光反应"
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "pulse", //心率脉搏
    value: "",
    event: keyf1,
    name: "心率/脉搏",
    next: "次/分"
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    next: "mmHg",
    textarea: {
      width: 48
    },
    name: "血压"
  },
  {
    key: "spo2", //血氧饱和度
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%"
  },
  {
    key: "fieldOne", //氧疗（L/min)-鼻导管
    value: "",
    event: keyf1,
    name: "氧疗（L/min)-鼻导管"
  },
  {
    key: "fieldTwo", //氧疗（L/min)-面罩
    value: "",
    event: keyf1,
    name: "氧疗（L/min)-面罩"
  },
  {
    key: "fieldThree", //氧疗（L/min)-自定义
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    },
    name: "氧疗（L/min)-自定义"
  },
  {
    key: "food", //入量-名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: ruList
    },
    name: "入量名称"
  },
  {
    key: "foodSize", //入量-ml
    value: "",
    event: keyf1,
    name: "入量",
    next: "ml",
    statBottomLine: true
  },
  {
    key: "discharge", //出量-名称
    value: "",
    event: keyf1,
    name: "出量名称"
  },
  {
    key: "dischargeSize", //出量-ml
    value: "",
    event: keyf1,
    name: "出量",
    next: "ml",
    statBottomLine: true
  },
  {
    key: "fieldFour", //出量-颜色性状
    value: "",
    event: keyf1,
    name: "出量-颜色性状"
  },
  {
    key: "rassScore", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    },
  },
  {
    key: "fieldFive", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    },
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
      width: "360px",
      background: "transparent",
      fontSize:"12px"
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
export function getListData() {
  let list = ["意识",`${info.sheetType}入量名称`];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
    setList(ruList, `${info.sheetType}入量名称`, data);
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
