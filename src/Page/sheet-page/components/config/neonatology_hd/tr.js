import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
let ysList = [];
let chuList = [];
let ruList = [];
let suctionquality = [
  "WL", "YWT", "YT", "B",
];
let suctionSize = [
  "+", "++", "+++"
]
export default [
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
    next: "℃"
  },
  {
    key: "pulse", //心率
    value: "",
    event: keyf1,
    name: "心率",
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
    name: "血压",
    next: "mmHg"
  },
  {
    key: "fieldOne", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "箱温/床温",
    next: "℃"
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "SPO₂",
    next: "%"
  },
  {
    key: "food", // 入量
    value: "",
    event: keyf1,
    name: "入量名称",
    autoComplete: {
      data: ruList
    },
  },
  {
    key: "foodSize", //食物数量  入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml"
  },
  {
    key: "discharge", // 出量
    value: "",
    event: keyf1,
    name: "出量名称",
    autoComplete: {
      data: chuList
    }
  },
  {
    key: "dischargeSize", //排出物数量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml"
  },
  {
    key: "dischargeColor", // 出量颜色
    value: "",
    event: keyf1,
    name: "出量颜色"
  },
  {
    key: "fieldTwo", // 吸痰部位
    value: "",
    event: keyf1,
    name: "吸痰部位",
  },
  {
    key: "fieldThree", // 吸痰性质
    value: "",
    event: keyf1,
    name: "吸痰性质",
    autoComplete: {
      data: suctionquality
    },
  },
  {
    key: "fieldFour", // 吸痰量
    value: "",
    event: keyf1,
    name: "吸痰量",
    autoComplete: {
      data: suctionSize
    },
  },
  {
    key: "fieldFive", // 吸吮力
    value: "",
    event: keyf1,
    name: "吸吮力"
  },
  {
    key: "fieldSix", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldSeven", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldEight", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "fieldNine", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
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
  });
  let list = ["意识"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
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
