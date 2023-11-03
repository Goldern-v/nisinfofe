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
  click_time,
  click_cancel
} from "../keyEvent/date";

const check = ['√']
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
    click: click_time
  },
  {
    key: "insulinPumpRun", // 正常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "胰岛素泵运行-正常",
    click: click_cancel,
    next: "",
  },
  {
    key: "insulinPumpPause", // 红肿
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "胰岛素泵运行-暂停",
    click: click_cancel,
    next: "",
  },
  {
    key: "skinNormal", // 疼痛
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "皮肤情况-正常",
    click: click_cancel,
    next: "",
  },
  {
    key: "skinRed", // 瘙痒
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "皮肤情况-红肿",
    next: "",
    click: click_cancel,
  },

  {
    key: "lineNormal", // 电池电量正常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "输注管路-正常",
    click: click_cancel,
    next: "",
  },
  {
    key: "lineCurve", // 电池电量异常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "输注管路-曲折",
    next: "",
    click: click_cancel,
  },
  {
    key: "applicationNormal", // 基础率U/小时
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    click: click_cancel,
    name: "敷贴-正常",
  },
  {
    key: "applicationCurve", // 胰岛素剩余量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "敷贴-卷边",
    click: click_cancel,
    next: "U",
  },
  {
    key: "leftDosage", // 管道通畅
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "剩余药量(U)",
    next: "",
  },
  {
    key: "baseRate", // 管道不通畅
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "基础率(U)",
    next: "",
  },
  {
    key: "changeRefill", // 更换贴膜
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "更换笔芯",
    click: click_cancel,
    next: "",
  },
  {
    key: "changeTube", // 更换部位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "更换管道",
    click: click_cancel,
    next: "",
  },
  {
    key: "changeAccumulator", // 更换贮药器
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "更换储药器",
    click: click_cancel,
    next: "",
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
      width: "200px",
      background: "transparent",
    },
    textarea: {
      width: 200
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
