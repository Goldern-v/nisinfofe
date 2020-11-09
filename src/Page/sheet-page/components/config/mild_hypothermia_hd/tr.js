import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = ["清醒(√)","嗜睡(+)","朦胧(++)","浅昏迷(+++)","深昏迷(++++)","麻醉未醒(△)"];
let chuList = [];
let ruList = [];
let isCheck=["","√"]
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
    event: keyf1
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function(e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "spo2", //血氧饱和度%
    value: "",
    event: keyf1
  },
  {
    key: "coolDown", //所处治疗阶段降温阶段
    value: "",
    event: keyf1
  },
  {
    key: "maintain", //所处治疗阶段维持治疗阶段72h
    value: "",
    event: keyf1
  },
  {
    key: "rewarming", //所处治疗阶段复温阶段
    value: "",
    event: keyf1
  },
  {
    key: "fieldOne", //自定义恒定温差模式
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwo", //仪器显示水温
    value: "",
    event: keyf1
  },
  {
    key: "fieldThree", //患儿实际肛温
    value: "",
    event: keyf1
  },
  {
    key: "fieldFourYes", //是否达到目标温度（33.5-34℃）是
    value: "",
    event: keyf1,
    // autoComplete: {
    //   data: ["1"]
    // }
  },
  {
    key: "fieldFourNo", //是否达到目标温度（33.5-34℃）否
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√"]
    }
  },
  {
    key: "fieldFive", //脑科观察q2h意识状态
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    }
  },
  {
    key: "fieldSixLeft", // 脑科观察q2h肢体活动左
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√"]
    }
  },
  {
    key: "fieldSixRight", // 脑科观察q2h肢体活动右
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√"]
    }
  },
  {
    key: "fieldSevenLeft", // 瞳孔直径左(mm)
    value: "",
    event: keyf1
  },
  {
    key: "fieldSevenRight", // 瞳孔直径右(mm)
    value: "",
    event: keyf1
  },
  {
    key: "fieldEightLeft", // 瞳对光反射径左
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["+", "-", "±"]
    }
  },
  {
    key: "fieldEightRight", // 瞳孔对光发射右
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["+", "-", "±"]
    }
  },
  {
    key: "fieldNineSupine", //患儿体位平卧
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√"]
    }
  },
  {
    key: "fieldNineLeft", //患儿体位左侧
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√"]
    }
  },
  {
    key: "fieldNineRight", //患儿体位右侧
    value: "",
    event: keyf1,
    autoComplete: {
      data: [ ,"√"]
    }
  },
  {
    key: "fieldTenYes", //检查患儿皮肤是否完好是
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√"]
    }
  },
  {
    key: "fieldTenNo", //检查患儿皮肤是否完好否
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["√"]
    }
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
      width: "180px",
      background: "transparent"
    },
    hidden: true,
    event: function(e, td) {
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

// export function getListData4() {
//   setList(ysList);
// }

// getListData4();
// /**
//  *
//  * @param {*} list 原数组
//  */
// function setList(list) {
//   console.log(list)
//   // list.splice(0, list.length);
//   // console.log(list);
//   // for (let item of data[key]) {
//   //   list.push(item.name);
//   // }
//   for(let i in list){
//     console.log(list[i])
//     let regex1 = /\((.+?)\)/g; 
//     // let item = new RegExp("/\((.+?)\)/g")
//     console.log(list[i].match(regex1))
//   }
// }
