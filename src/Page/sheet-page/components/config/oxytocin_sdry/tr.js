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
  // {
  //   key: "temperature", //催产素浓度
  //   value: "",
  //   name: "体温",
  //   event: keyf1
  // },
  // {
  //   key: "sph", //催产素浓度
  //   value: "",
  //   name: "脉搏",
  //   event: keyf1
  // },
  // {
  //   key: "breath", //催产素浓度
  //   value: "",
  //   name: "呼吸",
  //   event: keyf1
  // },
  {
    key: "fieldOne", //催产素浓度
    value: "",
    name: "催产素浓度",
    event: keyf1
  },
  {
    key: "fieldTwo", //滴速
    value: "",
    name: "滴速",
    event: keyf1
  }, {
    key: "fieldThree", //宫缩
    value: "",
    name: "宫缩",
    event: keyf1,
    // event: function (e, td) {
    //   if (e.keyCode == 32) {
    //     e.target.value += "/";
    //     e.preventDefault();
    //   }
    //   keyf1(e, td);
    // }
  },  {
    key: "fieldSix", //胎心
    value: "",
    event: keyf1,
    name: "胎心",
    autoComplete: {
      data: []
    }
  }, {
    key: "fieldSeven", //宫口扩张
    value: "",
    event: keyf1,
    name: "宫口扩张"
  }, {
    key: "fieldEight", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低",
    autoComplete: {
      data: []
    }
  }, {
    key: "bloodPressure", //血压mmHg
    value: "",
    event: keyf1,
    name: "血压mmHg",
    autoComplete: {
      data: []
    },
    textarea: {
      width: 65
    }
  },
  {
    key: "pulse", // 脉搏<br>(次/分)
    value: "",
    event: keyf1,
    name: " 脉搏<br>(次/分)",
    autoComplete: {
      data: []
    },
  },
  {
    key: "breath", // 呼吸
    value: "",
    event: keyf1,
    name: " 呼吸",
    // autoComplete: {
    //   data: []
    // },
  },
  {
    key: "spo2", //血氧饱和度(%)
    value: "",
    event: keyf1,
    name: "血氧饱和度(%)",
    autoComplete: {
      data: []
    },
  },
  {
    key: "temperature", //体温<br>℃
    value: "",
    event: keyf1,
    name: "体温℃",
    autoComplete: {
      data: []
    },
  },
  {
    key: "membranes", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜"
  },
  {
    key: "amnion", //羊水性质
    value: "",
    event: keyf1,
    name: "羊水性质",
    textarea: {
      width: 44
    }
  },
  {
    key: "bladder", //膀胱充盈度
    value: "",
    event: keyf1,
    name: "膀胱充盈度",
    textarea: {
      width: 44
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
      width: "153px",
      background: "transparent"
    },
    textarea: { width: 153 },
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

  multiDictInfo(list).then(res => {

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
