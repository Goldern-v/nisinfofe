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
  click_date,
  click_time,
  click_cancel
} from "../keyEvent/date";
import info from "../sheetInfo";
import { name } from "file-loader";
// let info = {
//   sheetType: "neurology"
// };
let ysList = [];
let chuList = [];
let ruList = [];
let szList = ['√','-','±', '+', '++', '+++', '△'];
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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "fieldONE", //脉搏次/分
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分"
  },
  {
    key: "breath", //呼吸次/分
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "fieldTWO", //心率次/分
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分"
  },
  {
    key: "fieldTHREE", //神志
    value: "",
    event: keyf1,
    name: "神志",
    next: "",
    style: {
      width: '24px'
    },
    autoComplete: {
      data: szList
    }
  },
  {
    key: "fieldFOUR", //有创血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "有创血压",
    next: "mmHg"
  },
  {
    key: "fieldFIVE", //无创血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "无创血压",
    next: "mmHg"
  },
  {
    key: "fieldSIX", //血氧饱和度
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%"
  },
  {
    key: "fieldSEVEN", // 基础护理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["A", "B", "C", "D"]
    },
    name: "基础护理"
  },
  {
    key: "fieldTWENTYFIVE", // 镇静评分
    value: "",
    event: keyf1,
    name: "镇静评分"
  },
  {
    key: "fieldTWENTYSIX", // 镇痛评分
    value: "",
    event: keyf1,
    name: "镇痛评分"
  },
  {
    key: "fieldTWENTYSEVEN", // 约束
    value: "",
    event: keyf1,
    name: "约束",
    next: "",
    style: {
      width: '24px'
    },
    click: click_cancel
  },
  {
    key: "fieldTHIRTEEN", // 吸氧方式
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["A", "B", "C", "D", "E"]
    },
    name: "吸氧方式"
  },
  {
    key: "fieldTWELVE", //  吸氧流量
    value: "",
    event: keyf1,
    name: "吸氧流量",
    next: "L"
  },
  {
    key: "fieldEIGHT", // 瞳孔大小左
    value: "",
    event: keyf1,
    name: "瞳孔大小左"
  },
  {
    key: "fieldNINE", // 瞳孔大小右
    value: "",
    event: keyf1,
    name: "瞳孔大小右"
  },
  {
    key: "fieldTEN", // 瞳孔反应左
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√", "+", "-"]
    },
    name: "瞳孔反应左"
  },
  {
    key: "fieldELEVEN", // 瞳孔反应右
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√", "+", "-"]
    },
    name: "瞳孔反应右"
  },
  // 入量
  {
    key: "food", //名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: ruList
    },
    textarea: {
      width: 52
    },
    name: "入量名称"
  },
  {
    key: "foodSize", //量
    value: "",
    event: keyf1,
    name: "入量",
    next: "ml"
  },
  {
    key: "fieldEIGHTTEEN", //途径
    value: "",
    event: keyf1,
    textarea: {
      width: 46
    },
    name: "入量途径"
  },
  // 出量
  {
    key: "discharge", //名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: chuList
    },
    textarea: {
      width: 52
    },
    name: "出量名称"
  },
  {
    key: "dischargeSize", //量
    value: "",
    event: keyf1,
    name: "出量",
    next: "ml"
  },
  // 引流管
  {
    key: "fieldSEVENTEEN", // 名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤', '⑥', "⑦", '⑧']
    },
    name: "引流管名称"
  },
  {
    key: "fieldFOURTEEN", //颜色
    value: "",
    event: keyf1,
    name: "引流管颜色"
  },
  {
    key: "fieldSIXTEEN", //长度
    value: "",
    event: keyf1,
    name: "引流管长度",
    next: "cm",
  },
  {
    key: "fieldFIFTEEN", //通畅
    value: "",
    event: keyf1,
    name: "引流管通畅"
  },
  {
    key: "fieldTWENTYONE", //持续心电监测
    value: "",
    event: keyf1,
    autoComplete: { 
      data: ["S", "AF", "VF", "PM", "PVC", "PAC"]
    },
    name: "持续心电监测"
  },
  {
    key: "description", //病情与措施
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "220px",
      background: "transparent"
    },
    event: function (e, td) {
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
    // chuList.push("阴道出血")
  });
  let list = ["意识"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
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
