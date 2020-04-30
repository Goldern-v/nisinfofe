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
  click_date
} from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };

let fyList = [];
let ksList = [];
let xslList = [];
let jzlList = [];
let fsList = [];
let twList = [];
let wyfsList = [];
let wyzlList = [];
let wxbhList = [];
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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    },
    name: "体温",
    next: '℃'
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    },
    name: "呼吸",
    next: '次/分'
  },
  {
    key: "pulse", //心率
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    },
    name: "心率",
    next: '次/分'
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
    next: 'mmHg'
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    },
    name: "SPO₂",
    next: '%'
  },
  {
    key: "repercussion", //反应
    value: "",
    name: "反应",
    event: keyf1,
    textarea: {
      width: 36
    },
    autoComplete: {
      data: fyList
    }
  },
  {
    key: "cry", //哭声
    value: "",
    name: "哭声",
    event: keyf1,
    textarea: {
      width: 36
    },
    autoComplete: {
      data: ksList
    }
  },
  {
    key: "muscularTension", //肌张力
    value: "",
    name: "肌张力",
    event: keyf1,
    textarea: {
      width: 36
    },
    autoComplete: {
      data: jzlList
    }
  },
  {
    key: "suckingForce", //吸吮力
    value: "",
    name: "吸吮力",
    event: keyf1,
    textarea: {
      width: 36
    },
    autoComplete: {
      data: xslList
    }
  },
  {
    key: "food", //入量：项目
    value: "",
    name: "入量：项目",
    event: keyf1,
    textarea: {
      minWidth: "50px",
    }
  },
  {
    key: "foodSize", //入量：量
    value: "",
    name: "入量：量",
    event: keyf1,
    textarea: {
      minWidth: "50px",
    },
    statBottomLine: true
  },
  {
    key: "discharge", //出量：项目
    value: "",
    name: "出量：项目",
    event: keyf1,
    textarea: {
      minWidth: "50px",
    }
  },
  {
    key: "dischargeSize", //出量：量
    value: "",
    name: "出量：量",
    event: keyf1,
    textarea: {
      minWidth: "50px",
    },
    statBottomLine: true
  },
  {
    key: "description", //护理记录
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
  {
    hidden: true,
    key: "audit",
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
  // listItem("入量名称", info.sheetType).then(res => {
  //   ruList.splice(0, ruList.length);
  //   for (let item of res.data.data) {
  //     ruList.push(item.name);
  //   }
  // });
  // listItem("出量名称", info.sheetType).then(res => {
  //   chuList.splice(0, chuList.length);
  //   for (let item of res.data.data) {
  //     chuList.push(item.name);
  //   }
  //   chuList.push("阴道出血");
  // });
  let list = [
    "陵城反应",
    "陵城哭声",
    "陵城肌张力",
    "陵城吸吮力",
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(fyList, list[0], data);
    setList(ksList, list[1], data);
    setList(jzlList, list[2], data);
    setList(xslList, list[3], data);
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
