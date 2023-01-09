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
    key: "normal", // 皮肤-正常
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
    key: "tenderness", // 压痛
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "局部皮肤压痛",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "induration", // 硬结
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "皮肤硬结",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "skinTemperature", // 皮温升高
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "皮温升高",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "purulentDischarge", // 脓性分泌物
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "脓性分泌物",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "cm", // 导管置入长度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "导管置入长度",
    next: "厘米",
    textarea: {
      width: 60
    },
  },
  {
    key: "unobstructed", // 管道通畅
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
    key: "noUnobstructed", // 管道不通畅
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
    key: "film", // 贴膜正常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "贴膜正常",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "damp", // 贴膜潮湿
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "贴膜潮湿",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "pollution", // 贴膜污染
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "贴膜污染",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "loose", // 贴膜松动
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "贴膜松动",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "replaceFilm", // 更换贴膜
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "更换贴膜",
    next: "",
    textarea: {
      width: 60
    },
  },
  {
    key: "openPipe", // 开管
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "开管",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "losePipe", // 封管
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    autoComplete: { data: check },
    name: "封管",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "tubeDrawing", // 拔管
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
