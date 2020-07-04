import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
let 吸氧方式 = [], 小便 = [], 大便颜色 = [], 吸吮力 = [], 皮肤颜色 = [], 脐部情况 = [], 呕吐性质 = [], 哭声 = [];
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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分"
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "fieldOneWay", //吸氧方式
    value: "",
    event: keyf1,
    name: "吸氧方式",
    autoComplete: {
      data: 吸氧方式
    },
  },
  {
    key: "fieldOneValue", //吸氧流量
    value: "",
    event: keyf1,
    name: "吸氧流量",
    next: "次/分"
  },
  {
    key: "milk", //饮食：奶
    value: "",
    event: keyf1,
    name: "饮食：奶"
  },
  {
    key: "fieldTwo", //饮食：量
    value: "",
    event: keyf1,
    name: "饮食：量"
  },
  {
    key: "water", //饮食：水
    value: "",
    event: keyf1,
    name: "饮食：水"
  },
  {
    key: "fieldThree", //饮食：量
    value: "",
    event: keyf1,
    name: "饮食：量"
  },
  {
    key: "fieldFour", //出量：小便
    value: "",
    event: keyf1,
    name: "出量：小便",
    next: '次数',
    autoComplete: {
      data: 小便
    }
  },
  {
    key: "fieldFive", //出量：大便颜色
    value: "",
    event: keyf1,
    name: "出量：大便颜色",
    autoComplete: {
      data: 大便颜色
    }
  },
  {
    key: "fieldSix", //出量：大便次数
    value: "",
    event: keyf1,
    name: "出量：大便次数"
  },
  {
    key: "suckingForce", //吸吮力
    value: "",
    event: keyf1,
    name: "吸吮力",
    autoComplete: {
      data: 吸吮力
    }
  },
  {
    key: "skinColor", //皮肤颜色
    value: "",
    event: keyf1,
    name: "皮肤颜色",
    autoComplete: {
      data: 皮肤颜色
    }
  },
  {
    key: "jaundice", //黄疸
    value: "",
    event: keyf1,
    name: "黄疸"
  },
  {
    key: "cry", //哭声
    value: "",
    event: keyf1,
    autoComplete: {
      data: 哭声
    },
    name: "哭声"
  },
  {
    key: "fieldEight", //脐部情况
    value: "",
    event: keyf1,
    name: "脐部情况",
    autoComplete: {
      data: 脐部情况
    }
  },
  {
    key: "fieldNine", //呕吐性质
    value: "",
    event: keyf1,
    autoComplete: {
      data: 呕吐性质
    },
    name: "呕吐性质",
    width: 90
  },
  {
    key: "fieldTen", //呕吐量
    value: "",
    event: keyf1,
    name: "呕吐量"
  },
  {
    key: "temporaryOne", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "temporaryTwo", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "temporaryThree", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "temporaryFour", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 36
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
  let list = [
    "吸氧方式",
    "小便",
    "大便颜色",
    "吸吮力",
    "皮肤颜色",
    "脐部情况",
    "呕吐性质",
    "哭声"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(吸氧方式, "吸氧方式", data);
    setList(小便, "小便", data);
    setList(大便颜色, "大便颜色", data);
    setList(吸吮力, "吸吮力", data);
    setList(皮肤颜色, "皮肤颜色", data);
    setList(脐部情况, "脐部情况", data);
    setList(呕吐性质, "呕吐性质", data);
    setList(哭声, "哭声", data);
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
