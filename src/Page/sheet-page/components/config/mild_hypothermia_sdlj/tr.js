import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1,limitChange } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = ["清醒(√)","嗜睡(+)","朦胧(++)","浅昏迷(+++)","深昏迷(++++)","麻醉未醒(△)"];
let zthdList = [];
let isCheck=["√"]
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
    key: "pulse", //脉搏/心率
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
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
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "spo2", //血氧饱和度%
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "coolDown", //所处治疗阶段降温阶段
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "maintain", //所处治疗阶段维持治疗阶段72h
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "rewarming", //所处治疗阶段复温阶段
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldOne", //自定义恒定温差模式
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldTwo", //仪器显示水温
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldThree", //患儿实际肛温
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldFourYes", //是否达到目标温度：是
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldFourNo", //是否达到目标温度：否
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldFive", //脑科观察q2h意识状态
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldSixLeft", // 脑科观察q2h肢体活动左
    value: "",
    event: keyf1,
    autoComplete: {
      data: zthdList
    },
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldSevenLeft", // 瞳孔直径左(mm)
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldSevenRight", // 瞳孔直径右(mm)
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldEightLeft", // 瞳对光反射径左
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["+", "-", "±"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldEightRight", // 瞳孔对光发射右
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["+", "-", "±"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldNineSupine", //患儿体位平卧
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldNineLeft", //患儿体位左侧
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldNineRight", //患儿体位右侧
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldTenYes", //检查患儿皮肤是否完好：是
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldTenNo", //检查患儿皮肤是否完好：否
    value: "",
    event: keyf1,
    autoComplete: {
      data: isCheck
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  // {
  //   key: "description", //特殊情况记录
  //   value: "",
  //   style: {
  //     textAlign: "left",
  //     position: "absolute",
  //     top: "1px",
  //     bottom: "1px",
  //     left: "1px",
  //     width: "150px",
  //     background: "transparent"
  //   },
  //   hidden: true,
  //   event: function(e, td) {
  //     console.log(e.keyCode);
  //     if (e.keyCode == 9) {
  //       td.value = "    " + td.value;
  //       e.preventDefault();
  //     }
  //     keyf1(e, td);
  //   }
  // },
  {
    key: "sign",
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
  let list = ["花都:新生儿亚低温治疗护理记录表:肢体活动左右"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(zthdList, "花都:新生儿亚低温治疗护理记录表:肢体活动左右", data);
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
