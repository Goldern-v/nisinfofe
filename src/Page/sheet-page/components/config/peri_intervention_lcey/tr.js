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
  click_date
} from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = [];
let chuList = [];
let ruList = [];
export default [{
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
    key: "bloodPressure", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "pulse", //脉搏/心率
    value: "",
    event: keyf1
  },
  {
    key: "fieldOne", //左搏动
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    }
  },
  {
    key: "fieldTwo", //左皮肤温度
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④"]
    }
  },
  {
    key: "fieldThree", //左皮肤颜色
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④"]
    }
  },
  {
    key: "fieldFour", //右搏动
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    }
  },
  {
    key: "fieldSix", //右皮肤温度
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④"]
    }
  },
  {
    key: "fieldSeven", //右皮肤颜色
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③", "④"]
    }
  },
  {
    key: "fieldFourteen", //伤口情况左
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    }
  },
  {
    key: "fieldFifteen", //伤口情况右
    value: "",
    event: keyf1,
    autoComplete: {
      data: ["①", "②", "③"]
    }
  },
  {
    key: "painScore", //疼痛评分
    value: "",
    event: keyf1
  },
  {
    key: "urineVolume", //尿量
    value: "",
    event: keyf1
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
