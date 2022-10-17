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
  click_date
} from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = [];
let chuList = [];
let ruList = [];
let cxList = [];
let xfsList = [
  { name: '存在',value: '存在'},
  { name: '减弱',value: '减弱'},
  { name: '消失',value: '消失'},
];


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
    event: event_time
  },
  {
    key: "pulse", //脉搏
    value: "",
    name:'脉搏',
    event: keyf1,
    textarea: {
      width: 80
    },
    change: (e, td) => limitChange(e, td, 12),
  },
  {
    key: "breath", //呼吸
    value: "",
    name:'呼吸',
    event: keyf1,
    textarea: {
      width: 80
    },
    change: (e, td) => limitChange(e, td, 12),
  },
  {
    key: "bloodPressure", //血压
    value: "",
    name:'血压',
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 80
    },
    change: (e, td) => limitChange(e, td, 12),
  },
  {
    key: "titleOne", //宫缩间歇
    value: "",
    name:'宫缩间歇',
    event: keyf1,
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "titleTwo", // 宫缩持续
    value: "",
    name:'宫缩持续',
    event: keyf1,
    autoComplete: {
      data: cxList
    },
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "titleThree", // 尿量
    value: "",
    name:'尿量',
    event: keyf1,
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "titleFour", // 膝反射
    value: "",
    name:'膝反射',
    event: keyf1,
    autoComplete: {
      data: xfsList
    },
    textarea: {
      width: 32
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "titleFive", // 胎心音
    value: "",
    name:'胎心音',
    event: keyf1,
    autoComplete: {},
    textarea: {
      width: 33
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "fieldSix", //自定义标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 18),
    textarea: {
      width: 115
    }
  },
  /*{
    key: "fieldFive", //自定义标题2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 18),
    textarea: {
      width: 115
    }
  },*/
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
      background: "transparent"
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
    chuList.push("阴道出血")
  });
  let list = ["同江:硫酸镁注射液静脉滴注观察记录单:膝反射"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(xfsList, "花都:硫酸镁注射液静脉滴注观察记录单:膝反射", data);
  });
  let list2 = ["同江:硫酸镁注射液静脉滴注观察记录单:持续"];
  multiDictInfo(list2).then(res => {
    let data = res.data.data;
    setList(cxList, "同江:硫酸镁注射液静脉滴注观察记录单:持续", data);
    console.log('1111', cxList)
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
