/*
江门妇幼-产前待产护理记录单
*/
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  multiDictInfo
} from "../../../api/index";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let tmList = [];
let ysxzList = [];
let gsqdList = [];
let xlgdList = [];
export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date,
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    click: click_time,
  },
  {
    key: "contractionOne", //氧疗模式
    value: "",
    event: keyf1,
    name: "孕周",
    textarea: {
      width: 80
    }
  },
  {
    key: "temperature", //流量
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 80
    }
  },
  {
    key: "pulse", //通气模式
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 80
    }
  },
  {
    key: "breath", //pip
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 80
    }
  },
  {
    key: "bloodPressure", //peep
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
    textarea: {
      width: 80
    }
  },
  {
    key: "preInputOne", //pmean
    value: "",
    event: keyf1,
    name: "胎方位",
    textarea: {
      width: 80
    }
  },
  {
    key: "preInputTwo", //fio2
    value: "",
    event: keyf1,
    name: "胎心音",
    next: "次/分",
    textarea: {
      width: 80
    },
  },
  {
    key: "uterineOne", //ti
    value: "",
    event: keyf1,
    name: "强度",
    textarea: {
      width: 80
    },
    autoComplete: {
      data: gsqdList
    },
  },
  {
    key: "uterineTwo", //mv
    value: "",
    event: keyf1,
    name: "持续",
    next: "s",
    textarea: {
      width: 80
    }
  },
  {
    key: "uterineThree", // rr
    value: "",
    event: keyf1,
    name: "间歇",
    next: "min",
    textarea: {
      width: 80
    },
  },
  {
    key: "uterineFour", // p
    value: "",
    event: keyf1,
    name: "扩张",
    next: "cm",
    textarea: {
      width: 80
    },
  },
  {
    key: "uterineFive", //温度
    value: "",
    event: keyf1,
    name: "评分",
    textarea: {
      width: 80
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
  //     width: "700px",
  //     background: "transparent"
  //   },
  //   event: function (e, td) {
  //     console.log(e.keyCode);
  //     if (e.keyCode == 9) {
  //       td.value = "    " + td.value;
  //       e.preventDefault();
  //     }
  //     keyf1(e, td);
  //   }
  //   // oninput: next
  // },
  {
    key: "sign",
    value: ""
  },
  // {
  //   key: "sign2",
  //   value: ""
  // },
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
    value: true
  }
];

export function getListData() {
  let list = [
    "江门妇幼:产科护理记录单:宫缩强度",
    "江门妇幼:产科护理记录单:先露高度",
    "江门妇幼:产前待产护理记录单:胎膜",
    "江门妇幼:产前待产护理记录单:羊水性质",
  ];

  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(gsqdList, list[0], data);
    setList(xlgdList, list[1], data);
    setList(tmList, list[2], data);
    setList(ysxzList, list[3], data);
  });
}

getListData();
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