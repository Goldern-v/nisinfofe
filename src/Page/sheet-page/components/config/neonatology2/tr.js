import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
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
    key: "box", //台/箱温度（℃）
    value: "",
    event: keyf1,
    name: "温箱编号",
    textarea: {
      width: 34
    },
    autoComplete: {
      data: wxbhList
    }
  },
  {
    key: "boxTemp", //台/箱温度（℃）
    value: "",
    event: keyf1,
    name: "温度（℃）",
    textarea: {
      width: 34
    }
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    textarea: {
      width: 34
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    textarea: {
      width: 37
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    }
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    }
  },
  {
    key: "fieldOne", //反应
    value: "",
    name: "反应",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: fyList
    }
  },
  {
    key: "fieldTwo", //哭声
    value: "",
    name: "哭声",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ksList
    }
  },
  {
    key: "fieldThree", //吸吮力
    value: "",
    name: "吸吮力",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: xslList
    }
  },
  {
    key: "fieldFour", //肌张力
    value: "",
    name: "肌张力",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: jzlList
    }
  },
  {
    key: "fieldFive", //肤色
    value: "",
    name: "肤色",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: fsList
    }
  },
  {
    key: "fieldSix", //体位
    value: "",
    name: "体位",
    event: keyf1,
    textarea: {
      width: 32
    },
    autoComplete: {
      data: twList
    }
  },
  {
    key: "fieldSeven", //入量：静脉（ml）
    value: "",
    name: "入量：静脉（ml）",
    event: keyf1,
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldEight", //入量：奶（ml）
    value: "",
    name: "入量：奶（ml）",
    event: keyf1,
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldNine", //入量自定义
    value: "",
    event: keyf1,
    textarea: {
      width: 26
    }
  },
  {
    key: "fieldTen", //出量：大便g/性状
    value: "",
    name: "出量：大便g/性状",
    event: keyf1,
    textarea: {
      width: 33
    }
  },
  {
    key: "fieldEleven", //出量：小便
    value: "",
    name: "出量：小便",
    event: keyf1,
    textarea: {
      width: 31
    }
  },
  {
    key: "fieldTwelve", //出量自定义
    value: "",
    event: keyf1,
    textarea: {
      width: 33
    }
  },
  {
    key: "fieldThirteen", //喂养方式
    value: "",
    name: "喂养方式",
    event: keyf1,
    textarea: {
      width: 33
    },
    autoComplete: {
      data: wyfsList
    }
  },
  {
    key: "fieldFourteen", // 喂养种类
    value: "",
    name: "喂养种类",
    event: keyf1,
    textarea: {
      width: 33
    },
    autoComplete: {
      data: wyzlList
    }
  },
  {
    key: "fieldFifteen", // 标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 34
    }
  },
  {
    key: "fieldSixteen", // 标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 34
    }
  },
  {
    key: "fieldSeventeen", // 标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 34
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
    event: function(e, td) {
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
    "反应",
    "哭声",
    "吸吮力",
    "肌张力",
    "肤色",
    "体位",
    "喂养方式",
    "喂养种类",
    "温箱编号"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(fyList, list[0], data);
    setList(ksList, list[1], data);
    setList(xslList, list[2], data);
    setList(jzlList, list[3], data);
    setList(fsList, list[4], data);
    setList(twList, list[5], data);
    setList(wyfsList, list[6], data);
    setList(wyzlList, list[7], data);
    setList(wxbhList, list[8], data);
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
