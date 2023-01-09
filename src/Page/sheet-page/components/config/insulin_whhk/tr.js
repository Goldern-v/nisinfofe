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

const check = ['√']
export default [
  // {
  //   key: "recordDate", //年份
  //   value: "",
  //   hidden:true
  // },
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
    key: "normal", // 正常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "局部皮肤正常",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "swollen", // 红肿
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "局部皮肤红肿",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "pain", // 疼痛
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "局部皮肤疼痛",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "itching", // 瘙痒
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "局部皮肤瘙痒",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "bleeding", // 渗血
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "局部皮肤渗血",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "batteryNormal", // 电池电量正常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "电池电量正常",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "batteryAbnormal", // 电池电量异常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "电池电量异常",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "rateBase", // 基础率U/小时
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "基础率",
    next: "U/小时",
    textarea: {
      width: 60
    },
  },
  {
    key: "insulinSurplus", // 胰岛素剩余量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "胰岛素剩余量",
    next: "U",
    textarea: {
      width: 60
    },
  },
  {
    key: "smoothPipe", // 管道通畅
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "管道通畅",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "badPipe", // 管道不通畅
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "管道不通畅",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "film", // 更换贴膜
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    autoComplete: { data: check },
    name: "更换贴膜",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "replacement", // 更换部位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    autoComplete: { data: check },
    name: "更换部位",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "storageDevice", // 更换贮药器
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    autoComplete: { data: check },
    name: "更换贮药器",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "drawing", // 拔管
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "拔管",
    next: "",
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
