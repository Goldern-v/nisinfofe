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
let ysList = [];
let chuList = [];
let ruList = [];
let lzng = [];
let lzztb = [];
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
    event: function (e, td) {
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
    key: "consciousness", //神志
    value: "",
    event: keyf1,
    name: "神志",
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
    key: "fieldOne", //乳房情况
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
    key: "fieldTwo", //泌乳情况
    value: "",
    event: keyf1,
    name: "泌乳情况",
    autoComplete: {
      data: ["少", "中", "多"]
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldThree", //宫底高度
    value: "",
    event: keyf1,
    name: "宫底高度",
    autoComplete: {
      data: ["U+2", "U+1", "U=0", "U-1", "U-2"]
    },
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldFour", //子宫收缩
    value: "",
    event: keyf1,
    name: "子宫收缩",
    autoComplete: {
      data: ["硬", "软"]
    },
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldFive", //腹部术口
    value: "",
    event: keyf1,
    name: "腹部术口",
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldSix", //留置饮口
    value: "",
    event: keyf1,
    name: "留置饮口",
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldSeven", //饮食
    value: "",
    event: keyf1,
    name: "饮食",
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldEight", //肛门排气
    value: "",
    event: keyf1,
    name: "肛门排气",
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldNine", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 38
    }
  },
  {
    key: "fieldTen", //标题2
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
      width: "260px",
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
