import {
  keyf1
} from "../keyEvent/f1.js";
import {
  multiDictInfo
} from "../../../api/index";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
import info from "../sheetInfo";

let pgList = [];
let gdgdList = [];
let ztbList = [];
let mrqkList = [];
let lzngList = [];
let nsList = [];
let gsList = [];
let zdjnList = ['✓'];
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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 35
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 30
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 30
    }
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
    textarea: {
      width: 50
    }
  },
  {
    key: "preFieldOne", //spo2
    value: "",
    event: keyf1,
    name: "SPO2",
    next: "%",
    textarea: {
      width: 35
    }
  },
  {
    key: "preFieldTwo", //膀胱情况
    value: "",
    event: keyf1,
    name: "膀胱情况",
    next: "",
    autoComplete: {
      data: pgList
    },
    textarea: {
      width: 35
    },
  },
  {
    key: "preInputOne", //静脉
    value: "",
    event: keyf1,
    name: "静脉",
    next: "ml",
    textarea: {
      width: 30
    }
  },
  {
    key: "preInputTwo", //口服
    value: "",
    event: keyf1,
    name: "口服",
    next: "mL",
    textarea: {
      width: 30
    }
  },
  {
    key: "preInputThree", // 血
    value: "",
    event: keyf1,
    name: "血",
    next: "mL",
    textarea: {
      width: 30
    },
  },
  {
    key: "postOutputOne", // 尿
    value: "",
    event: keyf1,
    name: "尿",
    next: "ml",
    textarea: {
      width: 30
    },
  },
  {
    key: "postOutputTwo", //其他
    value: "",
    event: keyf1,
    name: "其他",
    next: "ml",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldOne", //乳量
    value: "",
    event: keyf1,
    name: "乳量",
    textarea: {
      width: 30
    },
    autoComplete: {
      data: mrqkList
    },
  },
  {
    key: "fieldTwo", //宫底高度
    value: "",
    event: keyf1,
    name: "宫底高度",
    autoComplete: {
      data: gdgdList
    },
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldThree", //子宫收缩
    value: "",
    event: keyf1,
    name: "子宫收缩",
    textarea: {
      width: 30
    },
    autoComplete: {
      data: gsList
    },
  },
  {
    key: "positionFour", //腹部
    value: "",
    event: keyf1,
    name: "腹部",
    autoComplete:{
      data:["(-)","渗血"]
    },
    textarea: {
      width: 43
    }
  },
  {
    key: "positionFive", //会阴
    value: "",
    name: "会阴",
    event: keyf1,
    autoComplete:{
      data:["(-)"]
    },
    textarea: {
      width: 43,
      maxLength: 4
    },
  },
  {
    key: "fieldFour", //留置尿管
    value: "",
    name: "留置尿管",
    event: keyf1,
    textarea: {
      width: 30,
      maxLength: 4
    },
    autoComplete: {
      data: lzngList
    },
  },
  {
    key: "preFieldFive", //尿色
    value: "",
    name: "尿色",
    event: keyf1,
    textarea: {
      width: 30,
      maxLength: 4
    },
    autoComplete: {
      data: nsList
    },

  },
  {
    key: "preFieldSix", //镇痛泵
    value: "",
    name: "镇痛泵",
    event: keyf1,
    textarea: {
      width: 30,
      maxLength: 4
    },
    autoComplete: {
      data: ztbList
    },
  },
  {
    key: "preFieldSeven", //母乳喂养指导
    value: "",
    name: "母乳喂养指导",
    event: keyf1,
    textarea: {
      width: 30,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "preFieldEight", //vas评分
    value: "",
    name: "vas评分",
    event: keyf1,
    textarea: {
      width: 30,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "preFieldNice", //跌倒告知
    value: "",
    name: "跌倒告知",
    event: keyf1,
    textarea: {
      width: 30,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "preFieldTen", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    },
  },
  {
    key: "preFieldEleven", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    },
  },
  {
    key: "description", //特殊情况
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "150px",
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
    key: "sign2",
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
    value: true
  }
];

export function getListData() {
  let list = [
    "江门妇幼:产后护理记录单:膀胱情况",
    "江门妇幼:产后护理记录单:宫底高度",
    "江门妇幼:产后护理记录单:镇痛泵",
    "江门妇幼:产后护理记录单:乳量",
    "江门妇幼:产后护理记录单:留置尿管",
    "江门妇幼:产后护理记录单:尿色",
    "江门妇幼:产后护理记录单:子宫收缩",
  ];

  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(pgList, list[0], data);
    setList(gdgdList, list[1], data);
    setList(ztbList, list[2], data);
    setList(mrqkList, list[3], data);
    setList(lzngList, list[4], data);
    setList(nsList, list[5], data);
    setList(gsList, list[6], data);
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
