import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = [];
let chuList = [];
let ruList = [];
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
    event: keyf1
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function(e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 45
    }
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    textarea: {
      width: 35
    }
  },
  {
    key: "pupil", // 瞳孔
    value: "",
    event: keyf1,
    autoComplete: {
      data: [
        '2.5+/2.5+',
        '2.5-/2.5-',
        '2.5±/2.5±'
      ]
    },
    textarea: {
      width: 40
    }
  },
  {
    key: "food", //入
    value: "",
    event: keyf1,
    autoComplete: {
      data: ruList
    },
    textarea: {
      width: 120
    }
  },
  {
    key: "foodSize", //入量
    value: "",
    event: keyf1
  },
  {
    key: "discharge", //排出物
    value: "",
    event: keyf1,
    autoComplete: {
      data: chuList
    },
    textarea: {
      width: 70
    }
  },
  {
    key: "dischargeSize", //排出物数量
    value: "",
    event: keyf1
  },
  {
    key: "fieldOne", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldTwo", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldThree", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldFour", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 38
    }
  },
  // {
  //   key: "fieldFive", //标题5
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 38
  //   }
  // },
  // {
  //   key: "fieldSix", //标题6
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 38
  //   }
  // },
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "275px",
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
    key: "expand",
    value: ""
  },
  {
    hidden: true,
    key: "expand2",
    value: ""
  },
  {
    hidden: true,
    key: "expand3",
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

export function getListData4() {
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

getListData4();
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
