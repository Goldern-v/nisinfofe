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
  click_date,
  click_time
} from "../keyEvent/date";
// let 入量名称 = [];
// let 出量名称 = [];

let 意识 = ['清醒', '浅昏迷', '深昏迷', '模糊', '嗜睡', '谵妄'];
let other = ['√', '×',];
let have = ['有', '无',];

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
    event: event_time,
    // click: click_time
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "体温",
    next: "℃",
    textarea: {
      width: 40
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 25
    },
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "心率",
    next: "次/分",
    textarea: {
      width: 25
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 25
    },
  },
  {
    key: "bloodPressure", //血压
    value: "",
    change: (e, td) => limitChange(e, td, 5),
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
      width: 55
    },
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "意识",
    autoComplete: {
      data: 意识
    },
    textarea: {
      width: 40
    },
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  // {
  //   key: "needleOne", //第一针
  //   value: "",
  //   event: keyf1,
  //   name: "第一针",
  //   change: (e, td) => limitChange(e, td, 10),
  //   textarea: {
  //     width: 35,
  //   },
  //   autoComplete: {
  //     data: other
  //   },
  // },
  // {
  //   key: "needleTwo", //第二针
  //   value: "",
  //   event: keyf1,
  //   name: "第二针",
  //   change: (e, td) => limitChange(e, td, 10),
  //   textarea: {
  //     width: 35,
  //   },
  //   autoComplete: {
  //     data: other
  //   },
  // },
  // {
  //   key: "needleThree", //第三针
  //   value: "",
  //   event: keyf1,
  //   name: "第三针",
  //   change: (e, td) => limitChange(e, td, 10),
  //   textarea: {
  //     width: 35,
  //   },
  //   autoComplete: {
  //     data: other
  //   },
  // },
  {
    key: "covidOne", //发热
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "发热",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidTwo", //干咳
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "干咳",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidThree", //乏力
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "乏力",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidFour", //鼻塞流涕
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "鼻塞流涕",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidFive", //咽痛
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "咽痛",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidSix", //结膜炎
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "结膜炎",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidSEVEN", //腹泻
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "腹泻",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidEIGHT", //肌痛
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "肌痛",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidTen", //嗅觉减退或消失
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "嗅觉减退或消失",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  {
    key: "covidNine", //味觉减退或消失
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "味觉减退或消失",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: have
    },
  },
  // {
  //   key: "daySix", //第6天
  //   value: "",
  //   event: keyf1,
  //   name: "第6天",
  //   change: (e, td) => limitChange(e, td, 10),
  //   textarea: {
  //     width: 35,
  //   },
  //   autoComplete: {
  //     data: other
  //   },
  // },
  // {
  //   key: "daySeven", //第7天
  //   value: "",
  //   event: keyf1,
  //   name: "第7天",
  //   change: (e, td) => limitChange(e, td, 10),
  //   textarea: {
  //     width: 35,
  //   },
  //   autoComplete: {
  //     data: other
  //   },
  // },

  {
    key: "fieldOne", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldTwo", //标题2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldThree", //标题3
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldFour", //标题4
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldFive", //标题5
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldSix", //标题6
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldSeven", //标题7
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldEight", //标题8
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
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
      width: "155px",
      background: "transparent",
    },
    textarea: {
      width: 155
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "sign",
    value: ""
  },
  {
    hidden: true,
    key: "sign2",
    value: "",
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
    value: true,
  },
];

// export function getListData4() {
//   let list = [
//     "花都:通用护理记录单:入量名称",
//     "花都:通用护理记录单:出量名称",
//   ];
//   multiDictInfo(list).then(res => {
//     let data = res.data.data;
//     setList(入量名称, "花都:通用护理记录单:入量名称", data);
//     setList(出量名称, "花都:通用护理记录单:出量名称", data);
//   });
// }

// getListData4();
// /**
//  *
//  * @param {*} list 原数组
//  * @param {*} key 对应的key
//  * @param {*} data 数据源
//  */
// function setList(list, key, data) {
//   list.splice(0, list.length);
//   for (let item of data[key]) {
//     list.push(item.name);
//   }
// }
