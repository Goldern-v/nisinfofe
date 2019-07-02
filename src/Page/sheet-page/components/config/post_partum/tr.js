import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = [];
let chuList = [];
let ruList = [];
export default [
  {
    hidden: true,
    key: "recordMonth", //日期
    value: "",
    style: {
      display: "none"
    },
  //   event: event_date,
    // click: click_date
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time
  }, {
    key: "pulse", //脉搏
    value: "",
    event: keyf1
  }, {
    key: "breath ", //呼吸
    value: "",
    event: keyf1
  }, {
    key: "bloodPressure", //血压
    value: "",
    event: keyf1
  }, {
    key: "bloodPressure ", //血氧饱和度 缺失
    value: "",
    event: keyf1
  }, {
    key: "fieldOne ", //宫底
    value: "",
    event: keyf1
  }, {
    key: "fieldTwo ", //子宫收缩
    value: "",
    event: keyf1
  }, {
    key: "fieldThree", //出血量
    value: "",
    event: keyf1
  }, {
    key: "fieldFour", //膀胱
    value: "",
    event: keyf1
  }, {
    key: "food", //入 项
    value: "",
    event: keyf1
  }, {
    key: "foodSize", // 入 量
    value: "",
    event: keyf1
  }, {
    key: "discharge", //出 项
    value: "",
    event: keyf1
  }, {
    key: "dischargeSize", //出 量
    value: "",
    event: keyf1
  }, {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "130px",
      background: "transparent"
    },
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
    key: "sign", //护士签名
    style: {
      minWidth: '72px',
      maxWidth: '72px',
    },
    value: ""
  },
  // {
  //   key: "audit", //审核签名
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
  });
  // let list = ["意识"];
  // multiDictInfo(list).then(res => {
  //   let data = res.data.data;
  //   setList(ysList, "意识", data);
  // });
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
