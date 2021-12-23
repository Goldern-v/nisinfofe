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
export default [
  {
    key: "recordDate", //年份
    value: "",
    hidden:true
  },
  {
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    // click: click_time
  },
  {
    key: "vein", //静脉
    value: "",
    event: keyf1,
    name: "静脉",
    textarea: {
      width: 130
    },
    change: (e, td) => limitChange(e, td, 36),
  },
  {
    key: "intravenousVolume", //入量
    value: "",
    event: keyf1,
    name: "入量",
    statBottomLine: true
  },
  {
    key: "gastrointestinal", //胃肠
    value: "",
    event: keyf1,
    name: "胃肠",
    textarea: {
      width: 75
    },
    change: (e, td) => limitChange(e, td, 12),
  },
  {
    key: "intake", //入量
    value: "",
    event: keyf1,
    name: "入量",
    statBottomLine: true
  },
  {
    key: "totalInput", //总入量
    value: "",
    event: keyf1,
    name: "总入量",
    statBottomLine: true,
  },
  {
    key: "liquid", //余液
    value: "",
    event: keyf1,
    name: "余液",
    statBottomLine: true
  },
  {
    key: "urine", //尿量
    value: "",
    event: keyf1,
    name: "尿量",
    statBottomLine: true
  },
  {
    key: "stool", //大便量
    value: "",
    event: keyf1,
    name: "大便量",
    statBottomLine: true
  },
  {
    key: "vomiting", //呕吐量
    value: "",
    event: keyf1,
    name: "呕吐量",
    statBottomLine: true
  },
  {
    key: "sputum", //痰液量
    value: "",
    event: keyf1,
    name: "痰液量",
    statBottomLine: true
  },
  {
    key: "customTitle1", //标题1
    value: "",
    event: keyf1,
    name: "标题1",
    statBottomLine: true
  },
  {
    key: "customTitle2", //标题2
    value: "",
    event: keyf1,
    name: "标题2",
    statBottomLine: true
  },
  {
    key: "customTitle3", //标题3
    value: "",
    event: keyf1,
    name: "标题3",
    statBottomLine: true
  },
  {
    key: "totalOutput", //总出量
    value: "",
    event: keyf1,
    name: "出量",
    statBottomLine: true
  },
  {
    key: "balance", //平衡
    value: "",
    event: keyf1,
    name: "平衡",
    statBottomLine: true
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
    hidden: true,
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
