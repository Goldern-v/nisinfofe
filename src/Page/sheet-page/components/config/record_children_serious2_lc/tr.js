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
let ysList = [];
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
    event: event_time
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: '体温',
    next: '℃'
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: '脉搏',
    next: '次/分'
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: '呼吸',
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
    name: '血压',
    next: 'mmHg'
  },
  {
    key: "oxygen", //氧饱和度%
    value: "",
    event: keyf1,
    name: '氧饱和度',
    next: '%'
  },
  {
    key: "consciousness", //神志
    value: "",
    event: keyf1,
    name: '神志',
    autoComplete: {
      data: ysList
    }
  },
  {
    key: "food", //入量名称
    value: "",
    event: keyf1,
    name: '尿量',
    next: 'ml',
  },
  {
    key: "foodSize", //入量ml
    value: "",
    event: keyf1,
    name: '呕吐',
    next: 'ml',
    statBottomLine: true
  },
  {
    key: "discharge", // 出量名称
    value: "",
    event: keyf1,
    name: '大便',
    next: 'ml',
  },
  {
    key: "dischargeSize", // 出量ml
    value: "",
    event: keyf1,
    name: '其他引流量',
    next: 'ml',
    statBottomLine: true
  },
  {
    key: "traits", // 颜色性状
    value: "",
    event: keyf1,
    name: '其他',
  },
  {
    key: "skin", // 皮肤情况
    value: "",
    event: keyf1,
    name: '皮肤情况'
  },
  {
    key: "pipe", // 管道护理
    value: "",
    event: keyf1,
    name: '管道护理'
  },
  {
    key: "airway", // 气道护理
    value: "",
    event: keyf1,
    name: '气道护理'
  },
  {
    key: "sputum", // 痰液性状
    value: "",
    event: keyf1,
    name: '痰液性状'
  },
  {
    key: "other", // 其他
    value: "",
    event: keyf1,
    name: '其他'
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
      width: "360px",
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
  let list = ["陵城神志"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, list[0], data);
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
