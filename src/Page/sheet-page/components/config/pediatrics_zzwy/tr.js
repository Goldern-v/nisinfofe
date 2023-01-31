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
  click_date,
  click_time
} from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = [];
let szList = ['√','-','±', '+', '++', '+++', '△'];
let msList =['A','B','C','D','E','F'];
let chuList = [];
let ruList = [];
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
    key: "temperature", //体温
    value: "",
    event: keyf1
  },
  {
    key: "One", //脉搏次/分
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸次/分
    value: "",
    event: keyf1
  },
  {
    key: "Two", //心率次/分
    value: "",
    event: keyf1
  },
  {
    key: "Three", //神志
    value: "",
    event: keyf1,
    autoComplete: {
      data: szList
    }
  },
  {
    key: "Four", //面色
    value: "",
    event: keyf1,
    autoComplete: {
      data: msList
    }
  },
  {
    key: "Five", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "spo2", //血氧饱和度
    value: "",
    event: keyf1
  },
  {
    key: "Six", //血糖mol/L
    value: "",
    event: keyf1
  },
  {
    key: "Eight", // 瞳孔大小左
    value: "",
    event: keyf1
  },
  {
    key: "Nine", // 瞳孔大小右
    value: "",
    event: keyf1
  },
  {
    key: "Ten", // 瞳孔反应左
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√", "+", "-"]
    }
  },
  {
    key: "Eleven", // 瞳孔反应右
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√", "+", "-"]
    }
  },
  {
    key: "Twelve", //吸氧浓度
    value: "",
    event: keyf1
  },
  {
    key: "Thirteen", //吸氧方式
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["A", "B", "C","D"]
    }
  },
  // 入量
  {
    key: "food", //名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: ruList
    },
    textarea: {
      width: 52
    }
  },
  {
    key: "foodSize", //量
    value: "",
    event: keyf1
  },
  // 出量
  {
    key: "discharge", //名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: chuList
    },
    textarea: {
      width: 52
    }
  },
  {
    key: "dischargeSize", //量
    value: "",
    event: keyf1
  },
  // 引流管
  {
    key: "Fourteen", //颜色
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["A", "B", "C"]
    }
  },
  {
    key: "Fifteen", //通畅
    value: "",
    event: keyf1,
  },
  {
    key: "Sixteen", //长度
    value: "",
    event: keyf1,
  },
  // 肢端
  {
    key: "Seventeen", //血运
    value: "",
    event: keyf1,
  },
  {
    key: "Eightteen", //感觉
    value: "",
    event: keyf1,
  },
  {
    key: "Nineteen", //肌力
    value: "",
    event: keyf1,
  },
  {
    key: "Twenty", //皮肤情况
    value: "",
    event: keyf1,
  },
  {
    key: "Twentyone", //病情与措施
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "220px",
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
    // chuList.push("阴道出血")
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
