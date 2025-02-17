import { getDictItemValueList, multiDictInfo } from "../../../api/index";
import info from "../sheetInfo";
import {
  keyf1,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
let ysList = [],ruList = [], chuList= [];
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
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    name: "意识"
  },
  // {
  //   key: "pupilLeft", //瞳孔-左-直径(mm）
  //   value: "",
  //   event: keyf1,
  //   name: "瞳孔-左-直径(mm）"
  // },
  // {
  //   key: "pupilReflectLeft", //瞳孔-左-对光反应
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ["+", "S", "-"]
  //   },
  //   name: "瞳孔-左-对光反应"
  // },
  // {
  //   key: "pupilRight", //瞳孔-右-直径(mm）
  //   value: "",
  //   event: keyf1,
  //   name: "瞳孔-右-直径(mm）"
  // },
  // {
  //   key: "pupilReflectRight", //瞳孔-右-对光反应
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ["+", "S", "-"]
  //   },
  //   name: "瞳孔-右-对光反应"
  // },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "heartrate", //心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分"
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
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
    change: (e, td) => limitChange(e, td, 26),
    textarea: {
      width:260
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
    name: "出量名称",
    autoComplete: {
      data: chuList
    },
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
    name: "出量-颜色性状",
    autoComplete: { data: ["Ⅰ","Ⅱ","Ⅲ"] },
  },
  // {
  //   key: "rassScore", //标题1
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 52
  //   },
  // },
  // {
  //   key: "fieldFive", //标题2
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 52
  //   },
  // },
  {
    key: "description", //特殊处理及病情观察
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "260px",
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
  let list = ["意识"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
  });
  let list2 = [
    "record:critical_new_weihai:入量名称",
    "record:critical_new_weihai:出量名称",
  ];
  const deptCode = localStorage.getItem("selectDeptValue");
  const promiseList = [];
  for (let i = 0; i < list2.length; i++) {
    promiseList.push(getDictItemValueList(list2[i], deptCode));
  }
  Promise.all(promiseList).then(([r1, r2]) => {
    setList1(ruList, r1.data.data);
    setList1(chuList, r2.data.data);
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
/**
 *
 * @param {*} list 原数组
 * @param {*} data 数据源
 */
function setList1(list, data) {
  for (let item of data) {
    list.push(item);
  }
}
