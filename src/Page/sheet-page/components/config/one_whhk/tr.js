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

const jkjyList = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧']
const hlcsList = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']
let ysList = []; // 意识
let ruList = []  // 入量
let chuList = [] // 出量
let woweiList = [] // 卧位
let shouyaList = [] // 受压皮肤
let fangsheList = [] // 对光反射
let xzList = [] // 性状

export default [
  {
    hidden: true,
    key: "recordDate",
    value: ""
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
    click: click_time
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "意识",
    next: "",
    textarea: {
      width: 40
    },
    autoComplete: { data: ysList },
  },
  {
    key: "temperature", //T
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "T",
    next: "℃",
    textarea: {
      width: 30
    },
  },
  {
    key: "pulse", //P
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "P",
    next: "次/分",
    textarea: {
      width: 30
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "R",
    next: "次/分",
    textarea: {
      width: 30
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
    key: "eyeLeft", //左
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "左",
    next: "mm",
    textarea: {
      width: 30
    },
  },
  {
    key: "eyeRight", //右
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "右",
    next: "mm",
    textarea: {
      width: 30
    },
  },
  {
    key: "reflection", //对光反射
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "对光反射",
    next: "",
    textarea: {
      width: 40
    },
    autoComplete: { data: fangsheList },
  },
  {
    key: "spo2", //SPO₂
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "SPO₂",
    next: "%",
    textarea: {
      width: 40
    },
  },
  {
    key: "skin", //受压皮肤
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "受压皮肤",
    next: "",
    textarea: {
      width: 40
    },
    autoComplete: { data: shouyaList },
  },
  {
    key: "position", //卧位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "卧位",
    next: "",
    textarea: {
      width: 40
    },
    autoComplete: { data: woweiList },
  },
  {
    key: "intravenous", // 静脉置管自定义一
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "intravenous2", //静脉置管
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "静脉置管",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "tube1", //自定义二
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "tube2", //自定义三
    value: "",
    change: (e, td) => limitChange(e, td, 6),
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "food", //项目
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "项目",
    next: '',
    textarea: {
      width: 60
    },
    autoComplete: { data: ruList },
  },
  {
    key: "foodSize", //量
    value: "",
    event: keyf1,
    name: "入量",
    next: 'ml',
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "discharge", //项目
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "项目",
    next: '',
    textarea: {
      width: 60
    },
    autoComplete: { data: chuList },
  },
  {
    key: "dischargeSize", //量
    value: "",
    event: keyf1,
    name: "出量",
    next: 'ml',
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "color", //颜色
    value: "",
    event: keyf1,
    name: "颜色",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30,
    },
  },
  {
    key: "outType", //性状
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "性状",
    autoComplete: { data: xzList },
    textarea: {
      width: 30
    },
  },
  {
    key: "measures", // 护理措施
    value: "",
    event: keyf1,
    name: "护理措施",
    autoComplete: { data: hlcsList },
    splice: '',
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 50
    },
    multiple:true
  },
  {
    key: "education", // 健康教育
    value: "",
    event: keyf1,
    name: "健康教育",
    multiple:true,
    next: '',
    autoComplete: { data: jkjyList },
    splice: '',
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 50
    },
  },
  {
    key: "other1", // 其他1
    value: "",
    event: keyf1,
    name: "",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "other2", //其他2
    value: "",
    event: keyf1,
    name: "",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "other3", // 其他3
    value: "",
    event: keyf1,
    name: "",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "other4", // 其他4
    value: "",
    event: keyf1,
    name: "",
    next: '',
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
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

export function getListData4() {
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
  //   chuList.push("阴道出血");
  // });

  let list = ["意识", 'record:one_whhk:入量名称', 'record:one_whhk:出量名称',
  'record:one_whhk:卧位', 'record:one_whhk:受压皮肤', 'record:one_whhk:对光反射', 'record:one_whhk:性状'];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
    setList(ruList, "record:one_whhk:入量名称", data);
    setList(chuList, "record:one_whhk:出量名称", data);
    setList(woweiList, "record:one_whhk:卧位", data);
    setList(shouyaList, "record:one_whhk:受压皮肤", data);
    setList(fangsheList, "record:one_whhk:对光反射", data);
    setList(xzList, "record:one_whhk:性状", data);
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
