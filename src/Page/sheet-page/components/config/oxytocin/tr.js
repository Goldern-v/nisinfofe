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
let 宫缩 = [];
let 宫缩强度 = [];
let 胎方位 = [];
let 胎心 = [];
let 宫口扩张 = [];
let 先露高低 = [];
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
  }, {
    key: "fieldOne", //催产素浓度
    value: "",
    event: keyf1,
    name: "催产素浓度",
    textarea: {
      width: 50
    }
  }, {
    key: "fieldTwo", //滴数（滴/分）
    value: "",
    event: keyf1,
    name: "滴数（滴/分）",
    textarea: {
      width: 50
    }
  }, {
    key: "fieldThree", //宫缩
    value: "",
    event: keyf1,
    name: "宫缩",
    autoComplete: {
      data: 宫缩
    },
    textarea: {
      width: 50
    }
  }, 
  // {
  //   key: "fieldSeven", //宫缩强度
  //   value: "",
  //   event: keyf1,
  //   name: "宫缩强度",
  //   autoComplete: {
  //     data: 宫缩强度
  //   },
  //   textarea: {
  //     width: 50
  //   }
  // }, 
  {
    key: "fieldEight", //胎方位
    value: "",
    event: keyf1,
    name: "胎方位",
    autoComplete: {
      data: 胎方位
    },
    textarea: {
      width: 50
    }
  }, {
    key: "fieldFour", //胎心
    value: "",
    event: keyf1,
    name: "胎心",
    autoComplete: {
      data: 胎心
    },
    textarea: {
      width: 50
    }
  }, {
    key: "fieldFive", //宫口扩张
    value: "",
    event: keyf1,
    name: "宫口扩张",
    autoComplete: {
      data: 宫口扩张
    },
    textarea: {
      width: 50
    }
  }, {
    key: "fieldSix", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低",
    autoComplete: {
      data: 先露高低
    },
    textarea: {
      width: 50
    }
  }, {
    key: "bloodPressure", //血压mmHg
    value: "",
    event: keyf1,
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 50
    }
  }, {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "200px",
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
    key: "sign", //护士签名
    style: {
      minWidth: '72px',
      maxWidth: '72px',
    },
    value: ""
  },
  {
    key: "audit",
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
  let list = [
    "宫缩",
    // "宫缩强度",
    "胎方位",
    "胎心",
    "宫口扩张",
    "先露高低"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(宫缩, "宫缩", data);
    // setList(宫缩强度, "宫缩强度", data);
    setList(胎方位, "胎方位", data);
    setList(胎心, "胎心", data);
    setList(宫口扩张, "宫口扩张", data);
    setList(先露高低, "先露高低", data);
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
