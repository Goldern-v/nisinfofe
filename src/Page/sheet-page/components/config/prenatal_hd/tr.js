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
  click_date
} from "../keyEvent/date";
import info from "../sheetInfo";

let tmList = [];
let twList = [];
let gscxjxList = [];
let xlgdList = [];
let gjgList = [];
let ysxzList = [];
let gjkzList = [];
let gsqdList = [];
let 意识 = ['清醒', '浅昏迷', '深昏迷', '模糊', '嗜睡', '昏睡', '谵妄'];
let 入量名称 = ['输液', '口服', '输血', '肌注', '静注', '鼻饲', '静脉泵入', '灌肠', '饮水'];
let 出量名称 = [];
let 出量颜色 = ['黄色','鲜红色','暗红色','墨绿色','浓茶色','淡红色','茶褐色'];

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
    event: event_time
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 38
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
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
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
    name: "血压",
    next: "mmHg"
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    autoComplete: {
      data: 意识
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldOne", //血氧饱和度%
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 25
    },
  },
  {
    key: "fieldTwo", //指尖血糖mmol/L
    value: "",
    event: keyf1,
    name: "指尖血糖",
    next: "mmol/L",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldThree", //阴道出血mL
    value: "",
    event: keyf1,
    name: "阴道出血",
    next: "mL",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "food", // 入量内容
    value: "",
    event: keyf1,
    name: "入量内容",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 62
    },
    autoComplete: {
      data: 入量名称
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "foodSize", // 入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 30
    },
  },
  {
    key: "discharge", //出量内容
    value: "",
    event: keyf1,
    name: "出量内容",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 62
    },
    autoComplete: {
      data: 出量名称
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldFour", //出量颜色
    value: "",
    event: keyf1,
    name: "出量颜色",
    autoComplete: {
      data: 出量颜色
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 25
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldFive", //健康宣教
    value: "",
    event: keyf1,
    name: "健康宣教",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 73
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldSix", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "fieldSeven", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "fieldEight", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "fieldNine", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "fieldTen", //标题5
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "fieldEleven", //标题6
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    },
    change: (e, td) => limitChange(e, td, 6),
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
  let list = [
    "胎膜",
    "胎位",
    "宫缩持续/间歇",
    "先露高低",
    "宫颈管",
    "羊水性状",
    "宫颈扩张",
    "宫缩强度",
    "花都:产前护理记录单:出量名称"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(tmList, list[0], data);
    setList(twList, list[1], data);
    setList(gscxjxList, list[2], data);
    setList(xlgdList, list[3], data);
    setList(gjgList, list[4], data);
    setList(ysxzList, list[5], data);
    setList(gjkzList, list[6], data);
    setList(gsqdList, list[7], data);
    // setList(入量名称, "入量名称", data);
    setList(出量名称, list[8], data);
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
