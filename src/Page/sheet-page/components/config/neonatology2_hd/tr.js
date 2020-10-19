import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";

let 吸痰 = [];
let 气垫 = [];
let 雾化吸入 = [];
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
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "bodyWeight", //体重
    value: "",
    event: keyf1,
    name: "体重",
    next: "kg"
  },
  {
    key: "fieldOne", //指尖血糖mmol/L
    value: "",
    event: keyf1,
    name: "指尖血糖",
    next: "mmol/L"
  },
  {
    key: "fieldTwo", //哭声
    value: "",
    event: keyf1,
    name: "哭声",
  },
  {
    key: "fieldThree", //皮肤颜色
    value: "",
    event: keyf1,
    name: "皮肤颜色"
  },
  {
    key: "fieldFour", // 呕吐
    value: "",
    event: keyf1,
    name: "呕吐",
  },
  {
    key: "fieldFive", //吸吮力
    value: "",
    event: keyf1,
    name: "吸吮力"
  },
  {
    key: "fieldSix", // 喂养自吮
    value: "",
    event: keyf1,
    autoComplete: {
      data: 雾化吸入
    },
    name: "雾化吸入"
  },
  {
    key: "fieldSeven", //喂养母乳
    value: "",
    event: keyf1,
    autoComplete: {
      data: 吸痰
    },
    name: "吸痰"
  },
  {
    key: "fieldEight", // 喂养人工
    value: "",
    event: keyf1,
    autoComplete: {
      data: 气垫
    },
    name: "气垫"
  },
  {
    key: "fieldNine", // 喂养奶量ml
    value: "",
    event: keyf1,
    name: "喂养奶量",
    next: "ml"
  },
  {
    key: "fieldTen", // 脐部情况干洁
    value: "",
    event: keyf1,
    name: "脐部情况干洁"
  },
  {
    key: "fieldEleven", // 脐部情况渗血
    value: "",
    event: keyf1,
    name: "脐部情况渗血"
  },
  {
    key: "fieldTwelve", // 脐部情况渗液
    value: "",
    event: keyf1,
    name: "脐部情况渗液"
  },
  {
    key: "fieldThirteen", //大便
    value: "",
    event: keyf1,
    textarea: {
      width: 68
    },
    name: "大便",
  },
  {
    key: "fieldFourteen", //小便
    value: "",
    event: keyf1,
    name: "小便"
  },
  {
    key: "fieldFifteen", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldSixteen", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 48
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

let filterKey = '威县' + ':';
let filterKey2 = '脑外科重症监护单' + ':';
let filterKey2Arr = [ "吸痰", "气垫", "雾化吸入"]

export function getListData4() {
  let list = [
    "吸痰",
    "气垫",
    "雾化吸入"
  ];

  list = list.map(key => {
    return filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(吸痰, "吸痰", data);
    setList(气垫, "气垫", data);
    setList(雾化吸入, "雾化吸入", data);
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

