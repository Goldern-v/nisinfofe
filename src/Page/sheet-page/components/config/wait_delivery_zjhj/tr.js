import {
  listItem
} from "../../../api/recordDesc";
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
import info from "../sheetInfo";

const twList = [];
const jsList = ["均", "缺损",];
const ysxzList = [];
const xlgdList = ["-5","-4","-3","-2","-1","0","+1","+2","+3","+4","+5"];
const txbwList = ["右下腹", "左下腹", "右上腹", "左上腹", "中上腹", "脐中部", "脐上部", "脐下部", ];

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
  },
  {
    key: "bloodPressure", //血压
    value: "",
    textarea: {
      width: 45
    },
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    change: (e, td) => limitChange(e, td, 6),
    name: "血压",
    next: "mmHg"
  },
  {
    key: "fieldOne", //胎位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "胎位",
    splice: "/",
    autoComplete: {
      data: twList
    },
    textarea: {
      width: 68
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldTwo", //胎心部位
    value: "",
    event: keyf1,
    name: "胎心部位",
    change: (e, td) => limitChange(e, td, 10),
    splice: "/",
    autoComplete: {
      data: txbwList
    },
    textarea: {
      width: 70
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldThree", //胎心心率
    value: "",
    event: keyf1,
    name: "胎心心率",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldFour", //衔接
    value: "",
    event: keyf1,
    name: "衔接",
    autoComplete: {
      data: ["已", "未"]
    },
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  {
    key: "fieldFive", //宫缩间歇
    value: "",
    event: keyf1,
    name: "宫缩间歇",
    next: "min",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldSix", //宫缩持续
    value: "",
    event: keyf1,
    name: "宫缩持续",
    next: "s",
    autoComplete: {
      data: ["无", "敏感", "不规则"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldSeven", // 宫缩缩力
    value: "",
    event: keyf1,
    name: "宫缩缩力",
    autoComplete: {
      data: ["强", "中", "中强", "中弱", "弱", "敏感", "不规则", "无"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldEight", // 宫颈开张
    value: "",
    event: keyf1,
    name: "宫颈开张",
    next: "cm",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldNine", //宫颈均势
    value: "",
    event: keyf1,
    name: "宫颈均势",
    autoComplete: {
      data: jsList
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldTen", //宫颈质
    value: "",
    event: keyf1,
    name: "宫颈质",
    autoComplete: {
      data: ["软","中","硬","水肿"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldEleven", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低",
    autoComplete: {
      data: xlgdList
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldTwelve", //矢状缝
    value: "",
    event: keyf1,
    name: "矢状缝",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldThirteen", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜",
    autoComplete: {
      data: ["已破", "未破"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldFourteen", //羊水性状
    value: "",
    event: keyf1,
    name: "羊水性状",
    autoComplete: {
      data: ysxzList
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldFifteen", //检查方式
    value: "",
    event: keyf1,
    name: "检查方式",
    autoComplete: {
      data: ["外", "阴", "肛"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldSixteen", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "fieldSeventeen", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "fieldEighteen", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 45
    },
    change: (e, td) => limitChange(e, td, 6),
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
      width: "242px",
      background: "transparent"
    },
    textarea: {
      width: 242
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
    value: "",
    style: {
      width: "60px",
    },
  },
  {
    key: "sign2",
    value: "",
    style: {
      width: "60px",
    },
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
    value: false
  }
];

export function getListData() {
  // listItem("入量名称", info.sheetType).then(res => {
  //   ruList.splice(0, ruList.length);
  //   for (let item of res.data.data) {
  //     ruList.push(item.name);
  //   }
  // });
  // listItem("出量名称", info.sheetType).then(res => {
  //   chuList.splice(0, chuList.length);
  //   for (let item of res.data.data) {
  //     chuList.push(item.name);
  //   }
  // });
  let list = [
    "湛江海军:侯产记录单:胎位",
    "湛江海军:侯产记录单:羊水性状",
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(twList, list[0], data);
    setList(ysxzList, list[1], data);
    // setList(xlgdList, list[2], data);
    // setList(xlgdList, list[3], data);
    // setList(gjgList, list[4], data);
    // setList(ysxzList, list[5], data);
    // setList(gjkzList, list[6], data);
    // setList(gsqdList, list[7], data);
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
