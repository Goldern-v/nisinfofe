/*
北海人一-血压脉搏呼吸记录（产科）
*/
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
  click_date,
  click_time
} from "../keyEvent/date";
let 入量名称 = [];
let 出量名称 = [];
let 意识 = ['清醒', '浅昏迷', '深昏迷', '模糊', '嗜睡', '昏睡', '谵妄'];
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
    next: "mmHg",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
    },
  },
  {
    key: "breatheFrequency", //呼吸频率
    value: "",
    event: keyf1,
    name: "呼吸频率",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
    },
  },
  {
    key: "spo2", //spo2
    value: "",
    event: keyf1,
    name: "SPO2",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
    },
  },
  {
    key: "vaginalBleeding", //阴道出血量
    value: "",
    event: keyf1,
    name: "阴道出血量",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 105
    },
  },
  {
    key: "customItem1", //自定义1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
    },
  },
  {
    key: "customItem2", //自动义2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 95
    },
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
      background: "transparent",
    },
    change: (e, td) => limitChange(e, td, 12),
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
    value: true,
  },
];

let filterKey = '花都' + ':';
let filterKey2 = '统一护理记录单' + ':';

export function getListData4() {
  let list = [
    "入量名称",
    "出量名称",
  ];
  list = list.map(key => {
    return key.includes('出量名称') ? filterKey + filterKey2 + key : filterKey + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(入量名称, "入量名称", data);
    setList(出量名称, "出量名称", data);
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
  key = key.includes('出量名称') ? filterKey + filterKey2 + key : filterKey + key;
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}
