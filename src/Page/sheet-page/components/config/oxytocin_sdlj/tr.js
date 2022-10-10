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
  }, {
    key: "fieldOne", //催产素浓度
    value: "",
    name: "催产素浓度",
    event: keyf1
  }, {
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
  }, {
    key: "fieldFour", //宫缩强度
    value: "",
    name: "宫缩强度",
    event: keyf1
  }, {
    key: "fieldFive", //胎方位
    value: "",
    event: keyf1,
    name: "胎方位",
    autoComplete: {
      data: []
    }
  }, {
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
      width: 36
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
      width: "153px",
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
  let list = [
    "宫底",
    "子宫收缩",
    "膀胱情况",
    "入量项目",
    "出量项目"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    console.log(data);
    setList(宫底, "宫底", data);
    setList(子宫收缩, "子宫收缩", data);
    setList(膀胱情况, "膀胱情况", data);
    setList(入量项目, "入量项目", data);
    setList(出量项目, "出量项目", data);
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
