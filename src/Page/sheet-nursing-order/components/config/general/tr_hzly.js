import { listItem } from '@/Page/sheet-nursing-order/api/nursingOrder.js'
import { keyf1 } from '../keyEvent/f1.js'
import {
  multiDictInfo
} from "@/Page/sheet-page/api/index.js";
import {
  $params
} from '@/pages/sheet-print/tool/tool'
import { event_date, event_time, click_date, click_time } from "../keyEvent/date";

import { next } from '../oninput/next'
import sheetInfo from '../sheetInfo/index'

let orderContentList = []
let frequencyList = []

export default [
  {
    key: "startDate", //日期
    value: "",
    event: event_date,
    click: click_date
  },
  {
    key: "startTime", //时间
    value: "",
    click: click_time,
    event: function (e, td) {
      let k = e.keyCode
      console.log('time-input-onkeydown', e, k)
      if ((k >= 96 && k <= 105) || (k >= 48 && k <= 57) || (k >= 37 && k <= 40) || k === 8 || (e.target.selectionEnd !== e.target.selectionStart && ((k >= 96 && k <= 105) || (k >= 48 && k <= 57)))) {
        e.returnValue = true
      } else {
        e.returnValue = false
      }
      if (e.target.value.length >= 5 && (k != 8 && (k < 37 || k > 40)) && e.target.selectionEnd === e.target.selectionStart) { e.returnValue = false }
      if (e.target.value.length == '2' && e.target.value.indexOf('-') == -1 && k != 8) {
        td.value += ":"
      }
      console.log('returnValue', e.returnValue, e.target.selectionStart, e.target.selectionEnd)
    }
  },
  {
    // hidden: true,
    key: "signerNo", //开嘱护士签名
    value: ""
  },
  {
    // hidden: true,
    key: "signerName",
    value: ""
  },
  {
    key: "orderContent", //护嘱内容
    value: "",
    style: {
      textAlign: "left",
      // margin: "0px 8px",
    },
    // event: keyf1
    autoComplete: {
      data: orderContentList
    }
  },
  {
    key: "frequency", //护嘱频次
    value: "",
    style: {
      textAlign: "left",
      // margin: "0px 8px",
    },
    // event: keyf1
    autoComplete: {
      data: frequencyList
    }
  },
  {
    key: "stopDate", //日期
    value: "",
    click: click_date,
    event: event_date
  },
  {
    key: "stopTime", //时间
    value: "",
    click: click_time,
    event: function (e, td) {
      let k = e.keyCode
      console.log('time-input-onkeydown', e, k)
      if ((k >= 96 && k <= 105) || (k >= 48 && k <= 57) || (k >= 37 && k <= 40) || k === 8 || (e.target.selectionEnd !== e.target.selectionStart && ((k >= 96 && k <= 105) || (k >= 48 && k <= 57)))) {
        e.returnValue = true
      } else {
        e.returnValue = false
      }
      if (e.target.value.length >= 5 && (k != 8 && (k < 37 || k > 40)) && e.target.selectionEnd === e.target.selectionStart) { e.returnValue = false }
      if (e.target.value.length == '2' && e.target.value.indexOf('-') == -1 && k != 8) {
        td.value += ":"
      }
      console.log('returnValue', e.returnValue, e.target.selectionStart, e.target.selectionEnd)
    }
  },

  {
    // hidden: true,
    key: "signerNo2",
    value: ""
  },
  {
    // hidden: true,
    key: "signerName2",
    value: ""
  },
  // {
  //   key: "expand",
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
    hidden: true,
    key: "empNo",
    value: ""
  },
];


export function updateListData(data) {
  listItem(data).then(res => {
    NOList.splice(0, NOList.length);
    for (let item in res.data.data) {
      NOList.push(res.data.data[item].name);
    }
    console.log('更新字典list', data, NOList)
  });
}

export function getListData() {
  let list = [
    "护嘱单频次",
    "护嘱单内容",
  ];
  var token = (window.app && window.app.$getCookie && window.app.$getCookie('NURSING_USER').split('##')[1]) || (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token) || $params.token
  if(token){
    multiDictInfo(list).then(res => {
      let data = res.data.data;
      setList(frequencyList, "护嘱单频次", data);
      setList(orderContentList, "护嘱单内容", data);
    });
  }
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

