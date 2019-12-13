import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
let ysList = [];
let chuList = [];
let ruList = [];
export default [
  {
    key: "recordHour", //日期时间
    value: "",
    event: event_time
  },
  {
    key: "consciousness", //神志
    value: "",
    event: keyf1
  },
  {
    key: "pupilSizeLeft", // 直径左
    value: "",
    event: keyf1
  },
  {
    key: "pupilSizeRight", // 光反应左（灵敏 迟钝 消失 无法观察）
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["+", "S","-", "X"]
    }
  },
  {
    key: "pupilReflexLeft", // 直径右
    value: "",
    event: keyf1
  },
  {
    key: "pupilReflexRight", // 光反应右（灵敏 迟钝 消失 无法观察）
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["+", "S","-", "X"]
    }
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1
  },
  {
    key: "pulse", //心率
    value: "",
    event: keyf1
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
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1
  },
  {
    key: "temperature", //SpO2
    value: "",
    event: keyf1
  },
  {
    key: "food", //项目（入）
    value: "",
    event: keyf1,
    autoComplete: {
      data: ruList
    },
    textarea: {
      width: 68
    }
  },
  {
    key: "foodSize", //入量
    value: "",
    event: keyf1
  },
  {
    key: "discharge", //项目（出）
    value: "",
    event: keyf1,
    autoComplete: {
      data: chuList
    },
    textarea: {
      width: 40
    }
  },
  {
    key: "dischargeSize", //出量
    value: "",
    event: keyf1
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
    event: function(e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "sign",//签名
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
    chuList.push("阴道出血")
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
