import {
  listItem
} from "../../../api/recordDesc";
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
import info from "../sheetInfo";
let ysList = ['清醒', '嗜睡', '昏睡', '模糊', '昏迷', '谵妄状态', '镇静状态'];
let 入量名称 = ['输液', '口服', '输血', '肌注', '静注', '鼻饲', '静脉泵入', '灌肠', '饮水'];
let 出量名称 = [];
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
    click: click_date,
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    // click: click_time,
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 38
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
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
    name: "血压",
    next: "mmHg",
    textarea: {
      width: 55
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    name: "意识",
    textarea: {
      width: 40
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "food", // 入量
    value: "",
    event: keyf1,
    name: "入量名称",
    autoComplete: {
      data: 入量名称
    },
    textarea: {
      width: 62
    },
    style: {
      textAlign: "left",
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "foodSize", //食物数量  入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    textarea: {
      width: 30
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "discharge", // 出量
    value: "",
    event: keyf1,
    name: "出量名称",
    autoComplete: {
      data: 出量名称
    },
    style: {
      textAlign: "left",
    },
    textarea: {
      width: 62
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "dischargeSize", //排出物数量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    textarea: {
      width: 30
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "healthEducation", // 健康教育
    value: "",
    event: keyf1,
    name: "健康教育",
    textarea: {
      width: 100
    },
    style: {
      textAlign: "left",
    },
    change: (e, td) => limitChange(e, td, 16),
  },
  {
    key: "pupilSizeLeft", // 瞳孔直径（mm）左
    value: "",
    event: keyf1,
    name: "瞳孔直径左",
    next: "mm",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "pupilSizeRight", // 瞳孔直径（mm）右
    value: "",
    event: keyf1,
    name: "瞳孔直径右",
    next: "mm",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "pupilReflexLeft", // 瞳孔对光反应左
    value: "",
    event: keyf1,
    name: "瞳孔对光反应左",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
    autoComplete: {
      data: ["+", "±", "-"]
    }
  },
  {
    key: "pupilReflexRight", // 瞳孔对光反应右
    value: "",
    event: keyf1,
    name: "瞳孔对光反应右",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
    autoComplete: {
      data: ["+", "±", "-"]
    }
  },
  {
    key: "fieldOne", //吸氧（升/分）
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
    name: "吸氧",
    next: "升/分",
  },
  {
    key: "fieldTwo", //人工气道途径
    value: "",
    event: keyf1,
    name: "人工气道途径",
    textarea: {
      width: 25
    },
    autoComplete: {
      data: ["A1", "A2", "B"]
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "fieldThree", //头痛
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
    name: "头痛",
  },
  {
    key: "fieldFour", //指尖血糖mmol/L
    value: "",
    event: keyf1,
    name: "指尖血糖",
    next: "mmol/L",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "fieldFive", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "fieldSix", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "fieldEight", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "fieldNine", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "fieldTen", //标题5
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    },
    change: (e, td) => limitChange(e, td, 4),
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
      width: "150px",
      background: "transparent"
    },
    textarea: {
      width: 150
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
  {
    key: "sign2",
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
    value: true
  }
];

export function getListData() {
  let list = [
    "花都:神经外科护理记录单:出量名称"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(出量名称, list[0], data);
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
