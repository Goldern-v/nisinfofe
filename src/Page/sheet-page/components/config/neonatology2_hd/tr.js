import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1,limitChange } from "../keyEvent/f1.js";
import { event_date, event_time, click_date, click_check } from "../keyEvent/date";
import info from "../sheetInfo";

let 哭声 = [];
let 皮肤颜色 = [];
let 吸吮力 = [];
let 大便 = [];
let 小便 = [];
let click= ['√'];


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
    next: "℃",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "bodyWeight", //体重
    value: "",
    event: keyf1,
    name: "体重",
    next: "kg",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldOne", //指尖血糖mmol/L
    value: "",
    event: keyf1,
    name: "指尖血糖",
    next: "mmol/L",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "fieldTwo", //哭声
    value: "",
    event: keyf1,
    name: "哭声",
    autoComplete: {
      data: 哭声
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldThree", //皮肤颜色
    value: "",
    event: keyf1,
    name: "皮肤颜色",
    autoComplete: {
      data: 皮肤颜色
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldFour", // 呕吐
    value: "",
    event: keyf1,
    name: "呕吐",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldFive", //吸吮力
    value: "",
    event: keyf1,
    name: "吸吮力",
    autoComplete: {
      data: 吸吮力
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldSix", // 喂养自吮
    value: "",
    event: keyf1,
    autoComplete: {
      data:click
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldSeven", //喂养母乳
    value: "",
    event: keyf1,
    autoComplete: {
      data:click
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldEight", // 喂养人工
    value: "",
    event: keyf1,
    autoComplete: {
      data:click
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldNine", // 喂养奶量ml
    value: "",
    event: keyf1,
    name: "喂养奶量",
    next: "ml",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldTen", // 脐部情况干洁
    value: "",
    event: keyf1,
    name: "脐部情况干洁",
    autoComplete: {
      data:click
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldEleven", // 脐部情况渗血
    value: "",
    event: keyf1,
    name: "脐部情况渗血",
    autoComplete: {
      data:click
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldTwelve", // 脐部情况渗液
    value: "",
    event: keyf1,
    name: "脐部情况渗液",
    autoComplete: {
      data:click
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldThirteen", //大便
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    name: "大便",
    autoComplete: {
      data: 大便
    },
  },
  {
    key: "fieldFourteen", //小便
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "小便",
    autoComplete: {
      data: 小便
    },
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldFifteen", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    }
  },
  {
    key: "fieldSixteen", //标题2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
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
      width: "150px",
      background: "transparent"
    },
    change: (e, td) => limitChange(e, td, 12),
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
  {
    key: "sign2",
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
    value: false
  }
];

let filterKey = '花都' + ':';
let filterKey2 = '新生儿护理记录单' + ':';
let filterKey2Arr = [ "哭声", "皮肤颜色", "吸吮力", "大便", "小便"]
export function getListData4() {
  let list = [
    "哭声",
    "皮肤颜色",
    "吸吮力",
    "大便",
    "小便"
  ];

  list = list.map(key => {
    return filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(哭声, "哭声", data);
    setList(皮肤颜色, "皮肤颜色", data);
    setList(吸吮力, "吸吮力", data);
    setList(大便, "大便", data);
    setList(小便, "小便", data);
  });
}

getListData4();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 * @param {*} isChildOptions 当前选项是否有下拉子选项
 */
function setList(list, key, data, isChildOptions) {
  key = filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;
  if (isChildOptions) {
    let arr = [], obj = {};
    let childKeys = ['肺功能锻炼', '静脉管路'];
    for (let item of data[key]) {
      let childArr = '';
      if (childKeys.includes(item.name)) {
        childArr = data[filterKey + item.name];
        if (childArr && childArr.constructor == Array) {
          childArr = childArr.map(child => {
            return child.name;
          });
        }
      }
      obj = {
        key: item.name,
        children: childArr
      }
      arr.push(obj);
    }
    list['childOptions'] = true;
    list['option'] = arr;
  } else {
    list.splice(0, list.length);
    for (let item of data[key]) {
      list.push(item.name);
    }
  }
}

