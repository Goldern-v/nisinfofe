
// import {listItem} from '../../../api/recordDesc'
import { listItem } from '@/Page/sheet-nursing-order/api/nursingOrder.js'
import { keyf1 } from '../keyEvent/f1.js'

import { event_date, event_time, click_date, click_time } from "../keyEvent/date";

import { next } from '../oninput/next'
import sheetInfo from '../sheetInfo/index'

let info = {
  sheetType: 'neurology'
}
let NOList = []
let ysList = []
let chuList = []
let ruList = []
let list3 = []
let list4 = []
let list5 = []
let list6 = []


function isNumber(n) {
  // charCodeAt
  console.log('isNumber', typeof (n), n)
  if (typeof (n) === 'string') {
    return n.charCodeAt(0) >= "0".charCodeAt(0) && n.charCodeAt(0) <= "9".charCodeAt(0);
  }
  return n > 47 && n < 58;
}

function isReturn() {

}

/**
 *
 *
{
    "id": 29,        // 必须
    "empNo": "admin",// 必须
    "password": "",  // 必须
    "signType": 1,  // 签名类型（1:签名第一个， 2：签名第二个）
    "list": [
        {
            "parentId": 29,
            "dataHash": "1cbc315a0b2f51b87eec7ba7c08cec3c",
            "id": 4,
            "startDate": "08-20",
            "startTime": "08:20",
            "signerNo": null,
            "signerName": null,
            "orderContent": "协助更衣",
            "stopDate": "08-20",
            "stopTime": "08:20",
            "signerNo2": null,
            "signerName2": null,
            "expand": null
        }
    ]
}
 *
 *
*/


export default [
  {
    key: "recordDate", //日期
    value: "",
    hidden:true
  },
  {
    key: "startDate", //日期
    value: "",
    event: event_date,
    click: click_date
    // event: function(e, td) {
    //   // console.log(e.keyCode);
    //   // e.returnValue = isNumber(e.keyCode);
    //   // if (td.value.length > 4) {
    //   //   e.returnValue = false
    //   // }
    //   // if (e.keyCode === 8 || (e.keyCode <= 40 && e.keyCode >= 37)) {
    //   //   e.returnValue = true;
    //   // }
    //   // if (
    //   //   e.target.value.length == "2" &&
    //   //   e.target.value.indexOf("-") == -1 &&
    //   //   e.keyCode != 8
    //   // ) {
    //   //   td.value += "-";
    //   // }
    //   // 小键盘 0-9 96-105
    //   // 数字 0-9 48-57
    //   // 方向键 上下左右 37-40
    //   // 删除 8
    //   let k = e.keyCode
    //   console.log('date-input-onkeydown',e,k)
    //   if( (k>=96 && k<=105) || (k>=48 && k<=57) || (k>=37 && k<=40) || k===8 || (e.target.selectionEnd !== e.target.selectionStart&&((k>=96 && k<=105) || (k>=48 && k<=57)) ) ){
    //     e.returnValue = true
    //   }else{
    //     e.returnValue = false
    //   }
    //   if(e.target.value.length>=5&&(k!=8&&(k<37||k>40))&&e.target.selectionEnd===e.target.selectionStart ){e.returnValue = false}
    //   if(e.target.value.length == '2' && e.target.value.indexOf('-') == -1 && k != 8) {
    //     td.value += "-"
    //   }
    //   console.log('returnValue',e.returnValue,e.target.selectionStart,e.target.selectionEnd)
    // }
  },
  {
    key: "startTime", //时间
    value: "",
    click: click_time,
    event: event_time,
    // event: function (e, td) {
    //   // e.returnValue = isNumber(e.keyCode);
    //   // if (td.value.length > 4) {
    //   //   e.returnValue = false
    //   // }
    //   // if (e.keyCode === 8 || (e.keyCode <= 40 && e.keyCode >=37) ) {
    //   //   e.returnValue = true;
    //   // }
    //   // if (
    //   //   e.target.value.length == "2" &&
    //   //   e.target.value.indexOf(":") == -1 &&
    //   //   e.keyCode != 8
    //   // ) {
    //   //   td.value += ":";
    //   // }
    //   let k = e.keyCode
    //   // if(e.target.selectionEnd === e.target.selectionStart){

    //   // }
    //   console.log('time-input-onkeydown', e, k)
    //   if ((k >= 96 && k <= 105) || (k >= 48 && k <= 57) || (k >= 37 && k <= 40) || k === 8 || (e.target.selectionEnd !== e.target.selectionStart && ((k >= 96 && k <= 105) || (k >= 48 && k <= 57)))) {
    //     e.returnValue = true
    //   } else {
    //     e.returnValue = false
    //   }
    //   if (e.target.value.length >= 5 && (k != 8 && (k < 37 || k > 40)) && e.target.selectionEnd === e.target.selectionStart) { e.returnValue = false }
    //   if (e.target.value.length == '2' && e.target.value.indexOf('-') == -1 && k != 8) {
    //     td.value += ":"
    //   }
    //   console.log('returnValue', e.returnValue, e.target.selectionStart, e.target.selectionEnd)
    // }
  },
  {
    // hidden: true,
    key: "signerNo", //开嘱护士签名
    value: ""
  },
  {
    // hidden: true,
    key: "signerName", //
    value: ""
  },
  {
    key: "orderContent", //护嘱内容
    value: "",
    autoComplete: {
      data: NOList
    }
  },
  {
    key: "frequency", //频次
    value: "",
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
  // {
  //   key: "bloodPressure", //血压
  //   value: "",
  //   event: function(e, td) {
  //     if (e.keyCode == 32) {
  //       e.target.value += "/";
  //       e.preventDefault();
  //     }
  //     keyf1(e, td);
  //   }
  // },
  // {
  //   key: "consciousness", //意识
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ysList
  //   }
  // },
  // {
  //   key: "pupilSizeLeft", // 大小左
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "pupilSizeRight", // 大小右
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "pupilReflexLeft", // 反射左
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ["+", "-", "±", ""]
  //   }
  // },
  // {
  //   key: "pupilReflexRight", // 反射右
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ["+", "-", "±", ""]
  //   }
  // },
  // {
  //   key: "food", //入
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ruList
  //   }
  // },
  // {
  //   key: "foodSize", //入量
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "discharge", //出
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: chuList
  //   }
  // },
  // {
  //   key: "dischargeSize", //出量
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "fieldOne", //标题1
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "fieldTwo", //标题2
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "fieldThree", //标题3
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "fieldFour", //标题4
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "fieldFive", //标题5
  //   value: "",
  //   event: keyf1
  // },
  // {
  //   key: "fieldSix", //标题6
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: list6
  //   }
  // },
  // {
  //   key: "description", //特殊情况记录
  //   value: "",
  //   style: {
  //     textAlign: "left",
  //     position: "absolute",
  //     top: "1px",
  //     bottom: "1px",
  //     left: "1px",
  //     width: "180px",
  //     background: "transparent"
  //   },
  //   event: function(e, td) {
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
    // hidden: true,
    key: "signerNo2",
    value: ""
  },
  {
    // hidden: true,
    key: "signerName2",
    value: ""
  },
  {
    key: "expand",
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
  // {
  //   hidden: true,
  //   key: "startOrderSignNo",
  //   value: ""
  // },
  // {
  //   hidden: true,
  //   key: "stopOrderSignNo",
  //   value: ""
  // },
  // {
  //   hidden: true,
  //   key: "auditorName",
  //   value: ""
  // },
  {
    hidden: true,
    key: "empNo",
    value: ""
  },
  // {
  //   hidden: true,
  //   key: "formTitle",
  //   value: sheetInfo.formTitle||""
  // },
];


export function updateListDataHd(data) {
  listItem(data).then(res => {
    NOList.splice(0, NOList.length);
    for (let item in res.data.data) {
      NOList.push(res.data.data[item].name);
    }
    console.log('更新花都字典list', data, NOList)
  });
}

// export function getListData4() {
//   listItem('意识', info.sheetType).then(res => {
//     ysList.splice(0, ysList.length)
//     for(let item in res.data.data) {
//       ysList.push(res.data.data[item].name)
//     }
//   })
//   listItem('入量名称', info.sheetType).then(res => {
//     ruList.splice(0, ruList.length)
//     for(let item in res.data.data) {
//       ruList.push(res.data.data[item].name)
//     }
//   })
//   listItem('出量名称', info.sheetType).then(res => {
//     chuList.splice(0, chuList.length)
//     for(let item in res.data.data) {
//       chuList.push(res.data.data[item].name)
//     }
//   })
// }
