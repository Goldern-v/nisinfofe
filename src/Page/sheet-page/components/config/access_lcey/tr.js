import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1,
  calValueChange
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
    key: "fieldOne", //液体
    value: "",
    event: keyf1,
    name: "液体",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldTwo", //血制品
    value: "",
    event: keyf1,
    name: "血制品",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldThree", //饮食
    value: "",
    event: keyf1,
    name: "饮食",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldFour", //口服药
    value: "",
    event: keyf1,
    name: "口服药",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldSix", //肠内营养
    value: "",
    event: keyf1,
    name: "肠内营养",
    textarea: {
      width: 48
    },
  },
  {
    key: "totalInput", //总入量
    value: "",
    event: keyf1,
    name: "总入量",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldSeven", //余液
    value: "",
    event: keyf1,
    name: "余液",
    textarea: {
      width: 62,
    },
  },
  {
    key: "fieldEight", //尿量
    value: "",
    event: keyf1,
    name: "尿量",
    textarea: {
      width: 62,
    },
  },
  {
    key: "fieldNine", //大便量
    value: "",
    event: keyf1,
    name: "大便量",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldTen", //呕吐量
    value: "",
    event: keyf1,
    name: "呕吐量",
    textarea: {
      width: 62,
    },
  },
  {
    key: "fieldEleven", //痰液量
    value: "",
    event: keyf1,
    name: "痰液量",
    textarea: {
      width: 62,
    },
  },
  {
    key: "fieldTwelve", //汗液量
    value: "",
    event: keyf1,
    name: "汗液量",
    textarea: {
      width: 62,
    },
  },
  {
    key: "fieldThirteen", //标题1
    value: "",
    event: keyf1,
    name: "标题1",
    textarea: {
      width: 62,
    },
  },
  {
    key: "fieldFourteen", //标题2
    value: "",
    event: keyf1,
    name: "标题2",
    textarea: {
      width: 62,
    },
  },
  {
    key: "totalOutput", //总出量
    value: "",
    event: keyf1,
    name: "总出量",
    textarea: {
      width: 62,
    },
  },
  {
    key: "balance", //平衡
    value: "",
    event: keyf1,
    name: "平衡",
    textarea: {
      width: 62,
    },
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
