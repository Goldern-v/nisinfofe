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

const jkjyList = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪']
const hlcsList = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']
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
    event: event_time,
    click: click_time
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "意识",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "temperature", //T
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "T",
    next: "℃",
    textarea: {
      width: 35
    },
  },
  {
    key: "pulse", //P
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "P",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "R",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "bloodPressure", //Bp
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "Bp",
    next: "mmHg",
    textarea: {
      width: 50
    },
  },
  {
    key: "one", //SPO₂
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "SpO₂",
    next: "%",
    textarea: {
      width: 40
    },
  },
  {
    key: "two", //胎心
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "胎心",
    next: "次/分",
    textarea: {
      width: 40
    },
  },
  {
    key: "three", //胎动
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "胎动",
    next: "次/分",
    textarea: {
      width: 40
    },
  },
  {
    key: "four", //胎膜
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "胎膜",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "five", //持续/间歇
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "持续/间歇",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "six", //先露方位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "先露方位",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "seven", // 先露高低
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "先露高低",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "eight", //宫颈大小
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "宫颈大小",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "nine", //宫颈厚薄
    value: "",
    change: (e, td) => limitChange(e, td, 4),
    name: "宫颈厚薄",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "ten", //切口敷料
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "切口敷料",
    next: '',
    textarea: {
      width: 35
    },
  },
  {
    key: "eleven", //阴道出血
    value: "",
    event: keyf1,
    name: "阴道出血",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "twelve", //子宫收缩
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "子宫收缩",
    next: '',
    textarea: {
      width: 35
    },
  },
  {
    key: "thirteen", //静脉置管
    value: "",
    event: keyf1,
    name: "静脉置管",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fourteen", //尿管
    value: "",
    event: keyf1,
    name: "尿管",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35,
    },
  },
  {
    key: "food", //入量项目
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "入量项目",
    textarea: {
      width: 35
    },
  },
  {
    key: "foodSize", //入量量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "入量",
    next: 'ml',
    textarea: {
      width: 35
    },
  },
  {
    key: "discharge", //出量项目
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "出量项目",
    textarea: {
      width: 35
    },
  },
  {
    key: "dischargeSize", //出量量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "出量",
    next: 'ml',
    textarea: {
      width: 35
    },
  },
  {
    key: "fifteen", // 健康教育
    value: "",
    event: keyf1,
    name: "健康教育",
    next: '',
    autoComplete: { data: jkjyList },
    splice: ',',
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 50
    },
  },
  {
    key: "sixteen", // 护理措施
    value: "",
    event: keyf1,
    name: "护理措施",
    autoComplete: { data: hlcsList },
    splice: ',',
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 50
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
    textarea: {
      width: 150
    },
    event: function (e, td) {
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

// export function getListData4() {
//   let list = [
//     "花都:通用护理记录单:入量名称",
//     "花都:通用护理记录单:出量名称",
//   ];
//   multiDictInfo(list).then(res => {
//     let data = res.data.data;
//     setList(入量名称, "花都:通用护理记录单:入量名称", data);
//     setList(出量名称, "花都:通用护理记录单:出量名称", data);
//   });
// }

// getListData4();
// /**
//  *
//  * @param {*} list 原数组
//  * @param {*} key 对应的key
//  * @param {*} data 数据源
//  */
// function setList(list, key, data) {
//   list.splice(0, list.length);
//   for (let item of data[key]) {
//     list.push(item.name);
//   }
// }
