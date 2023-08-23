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
    name: "体温",
    next: '%',
    event: keyf1
  },
  {
    key: "breath", //呼吸 次/分
    value: "",
    name: "呼吸",
    next: "次/分",
    event: keyf1
  },
  {
    key: "pulse", //心率 次/分
    value: "",
    name: "心率",
    next: "次/分",
    event: keyf1
  },
  {
    key: "skinCondition", //皮肤
    value: "",
    name: "皮肤情况",
    event: keyf1
  },
  {
    key: "umbilical", //脐带情况
    value: "",
    name: "脐带情况",
    event: keyf1,
  },
  {
    key: "breastFeeding", //母乳
    value: "",
    name: "母乳",
    event: keyf1,
    autoComplete: {
      data: ['√']
    },
  },
  {
    key: "breastFeedingOther", //其他
    value: "",
    name: "其他",
    event: keyf1,
  },
  {
    key: "defecateColor", //大便有无
    value: "",
    name: "大便有无",
    event: keyf1,
  },
  {
    key: "stoolQuality", //大便性质
    value: "",
    name: "大便性质",
    event: keyf1,
  },
  {
    key: "urinate", //小便
    value: "",
    name: "小便",
    event: keyf1,
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
      width: "240px",
      background: "transparent",
    },
    textarea: {
      width: 240
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
    key: "sign", //护士签名
    style: {
      minWidth: '50px',
      maxWidth: '50px',
    },
    value: ""
  },
  // {
  //   key: "audit", //审核签名
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
  let list = [
    "宫底",
    "子宫收缩",
    "膀胱情况",
    "入量项目",
    "出量项目"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    console.log(data);
    setList(宫底, "宫底", data);
    setList(子宫收缩, "子宫收缩", data);
    setList(膀胱情况, "膀胱情况", data);
    setList(入量项目, "入量项目", data);
    setList(出量项目, "出量项目", data);
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
