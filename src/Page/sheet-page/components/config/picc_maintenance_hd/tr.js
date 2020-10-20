import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
import { multiDictInfo } from "../../../api/index.js";
let 换敷贴 = [];
let 冲管 = [];
let 换肝素冒 = [];

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
  key: "fieldOne", //外露/置管长度
  value: "",
  event: keyf1,
  name: "外露/置管长度",
  textarea: {
    width: 100
  }
}, {
  key: "fieldTwo", //手臂周长
  value: "",
  event: keyf1,
  name: "手臂周长",
  textarea: {
    width: 100
  }
}, {
  key: "fieldThree", //换敷贴
  value: "",
  event: keyf1,
  name: "换敷贴",
  autoComplete: {
    data: 换敷贴
  }
}, {
  key: "fieldFour", //冲管
  value: "",
  event: keyf1,
  name: "冲管",
  autoComplete: {
    data: 冲管
  }
}, {
  key: "fieldFive", //换肝素冒
  value: "",
  event: keyf1,
  name: "换肝素冒",
  autoComplete: {
    data: 换肝素冒
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
  key: "sign", //护士签名
  style: {
    minWidth: '72px',
    maxWidth: '72px',
  },
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
let filterKey = '花都' + ':';
let filterKey2 = '经外周插管的中心静脉导管（PICC）维护记录单' + ':';
let filterKey2Arr = ["换散贴", "冲管", "换肝素冒"]

export function getListData4() {
  let list = [
    "换散贴",
    "冲管",
    "换肝素冒"
  ];
  list = list.map(key => {
    return filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;
  })
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    console.log("换散贴", data);
  })
}

getListData4();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
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