import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
let ysList = [];
let chuList = [];
let ruList = [];
let lzng = [];
let lzztb = [];
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
    textarea: {
      width: 32
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    textarea: {
      width: 42
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    textarea: {
      width: 42
    }
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: keyf1,
    event: function(e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 50
    }
  },
  {
    key: "spo2", //spo2
    value: "",
    event: keyf1,
    textarea: {
      width: 38
    }
  },
  {
    key: "food", //入
    value: "",
    autoComplete: {
      data: ruList
    },
    event: keyf1,
    textarea: {
      width: 66
    }
  },
  {
    key: "foodSize", //入量
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    }
  },
  {
    key: "discharge", //出
    value: "",
    autoComplete: {
      data: chuList
    },
    event: keyf1,
    textarea: {
      width: 38
    }
  },
  {
    key: "dischargeSize", //出量
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    }
  },
  {
    key: "fieldOne", //标题1
    value: "",
    event: keyf1,
    name: "乳房情况",
    autoComplete: {
      data: ["(-)", "(+)"]
    },
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldTwo", //标题2
    value: "",
    event: keyf1,
    name: "泌乳情况",
    autoComplete: {
      data: ["少", "中","多"]
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldThree", //标题3
    value: "",
    event: keyf1,
    name: "宫底高度U=Fb",
    autoComplete: {
      data: ["U+2","U+1","U=0","U-1","U-2"]
    },
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldFour", //标题4
    value: "",
    event: keyf1,
    name: "子宫收缩",
    autoComplete: {
      data: ["硬","软"]
    },
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldFive", //标题5
    value: "",
    event: keyf1,
    name: "伤口",
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldSix", //标题6
    value: "",
    event: keyf1,
    name: "留置尿管",
    // autoComplete: {
    //   data: lzng
    // },
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldSeven", //标题7
    value: "",
    event: keyf1,
    name: "留置镇痛泵",
    // autoComplete: {
    //   data: lzztb
    // },
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldEight", //标题8
    value: "",
    event: keyf1,
    name: "受压皮肤",
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldNine", //标题9
    value: "",
    event: keyf1,
    textarea: {
      width: 38
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
    chuList.push("出血")
  });

  let list = ["意识", "留置尿管", "留置镇痛泵"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
    setList(lzng, "留置尿管", data);
    setList(lzztb, "留置镇痛泵", data);
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
