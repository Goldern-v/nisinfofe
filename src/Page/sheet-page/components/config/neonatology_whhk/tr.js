import {
  multiDictInfo
} from "../../../api/index";
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

export default [
  {
    key: "recordDate", //年份
    value: "",
    hidden:true
  },
  {
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
    key: "temperature", // T℃
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "T",
    next: "℃",
    textarea: {
      width: 35
    },
  },
  {
    key: "pulse", // HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "HR",
    next: "次/分",
    textarea: {
      width: 40
    },
  },
  {
    key: "breath", // R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "R",
    next: "次/分",
    textarea: {
      width: 40
    },
  },
  {
    key: "bloodPressure", // BP
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "BP",
    next: "mmHg",
    textarea: {
      width: 40
    },
  },
  {
    key: "spo2", // SpO₂
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "SpO₂",
    next: "%",
    textarea: {
      width: 40
    },
  },
  {
    key: "weight", // 体重
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "体重",
    next: "Kg",
    textarea: {
      width: 40
    },
  },
  {
    key: "boxTemperature", // 箱温
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "箱温",
    next: "℃",
    textarea: {
      width: 40
    },
  },
  {
    key: "complexion", // 面色
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "面色",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "ventilatorMode", // 呼吸机模式
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "呼吸机模式",
    next: "",
    textarea: {
      width: 45
    },
  },
  {
    key: "ffTime", // f
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "f",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "fio2", // FiO₂
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "FiO₂",
    next: "%",
    textarea: {
      width: 35
    },
  },
  {
    key: "oneDepth", // 插管深度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "插管深度",
    next: "cm",
    textarea: {
      width: 35
    },
  },
  {
    key: "cpap", // CPAP
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "CPAP",
    next: "%",
    textarea: {
      width: 35
    },
  },
  {
    key: "boxOxygen", // 氧疗箱
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "氧疗箱",
    next: "%",
    textarea: {
      width: 40
    },
  },
  {
    key: "mask", // 面罩
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "面罩",
    next: "l/min",
    textarea: {
      width: 40
    },
  },
  {
    key: "catheter", // 静脉导管-自定义1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "oneOrder", // 自定义2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "次数",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "intravenousItem", // 静默给药项目
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "静默给药项目",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "intravenousDose", // 静默给药量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "静默给药量",
    next: "",
    textarea: {
      width: 30
    },
  },
  {
    key: "dietaryItem", // 饮食项目
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "饮食项目",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "dietaryDose", // 饮食量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "胸",
    next: "",
    textarea: {
      width: 30
    },
  },
  {
    key: "urination", // 小便
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "小便",
    next: "次",
    textarea: {
      width: 30
    },
  },
  {
    key: "stools", // 大便
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "大便",
    next: "次",
    textarea: {
      width: 30
    },
  },
  {
    key: "otherItem", // 出量其他项目
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "出量其他项目",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "otherDose", // 出量其他量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "出量其他量",
    next: "",
    textarea: {
      width: 30
    },
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
      width: "190px",
      background: "transparent",
    },
    textarea: {
      width: 190
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
    value: true,
  },
];

// export function getListData4() {
//   let list = [
//     "花都:通用护理记录单:入量名称",
//     "花都:通用护理记录单:出量名称",
//   ];
//   multiDictInfo(list).then(res => {
//     let data = res.data.data;
//     setList(入量名称, "花都:通用护理记录单:入量名称", data);
//     setList(出量名称, "花都:通用护理记录单:出量名称", data);
//   });
// }

// getListData4();
// /**
//  *
//  * @param {*} list 原数组
//  * @param {*} key 对应的key
//  * @param {*} data 数据源
//  */
// function setList(list, key, data) {
//   list.splice(0, list.length);
//   for (let item of data[key]) {
//     list.push(item.name);
//   }
// }
