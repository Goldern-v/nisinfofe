import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
let ysList = [];
let rfList = [];
let qrList = [];
let gdList = [];
let zgList = [];
let skList = [];
let allList = [ysList,rfList,qrList,gdList,zgList,skList]
// let chuList = [];
// let ruList = [];
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
    event: keyf1
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function(e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 45
    }
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    textarea: {
      width: 45
    }
  },
  {
    key: "food", //入
    value: "",
    event: keyf1,
    // autoComplete: {
    //   data: ruList
    // },
    // textarea: {
    //   width: 120
    // }
  },
  {
    key: "foodSize", //入量
    value: "",
    event: keyf1
  },
  {
    key: "discharge", //排出物
    value: "",
    event: keyf1,
    // autoComplete: {
    //   data: chuList
    // },
    // textarea: {
    //   width: 70
    // }
  },
  {
    key: "dischargeSize", //排出物数量
    value: "",
    event: keyf1
  },
  {
    key: "breast", // 乳房情况
    value: "",
    event: keyf1,
    autoComplete: {
      data: rfList
    },
    textarea: {
      width: 40
    }
  },
  {
    key: "lactation", // 沁乳情况
    value: "",
    event: keyf1,
    autoComplete: {
      data: qrList
    },
    textarea: {
      width: 40
    }
  },
  {
    key: "fundus", // 宫底高度
    value: "",
    event: keyf1,
    autoComplete: {
      data: gdList
    },
    textarea: {
      width: 40
    }
  },
  {
    key: "uterineContractions", // 子宫收缩
    value: "",
    event: keyf1,
    autoComplete: {
      data: zgList
    },
    textarea: {
      width: 40
    }
  },
  {
    key: "vulnus", // 伤口
    value: "",
    event: keyf1,
    autoComplete: {
      data: skList
    },
    textarea: {
      width: 40
    }
  },
  {
    key: "customField1", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 38
    }
  },
  {
    key: "customField2", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 38
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
      width: "275px",
      background: "transparent"
    },
    event: function(e, td) {
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
    key: "expand",
    value: ""
  },
  {
    hidden: true,
    key: "expand2",
    value: ""
  },
  {
    hidden: true,
    key: "expand3",
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
  // listItem("入量名称", info.sheetType).then(res => {
  //   ruList.splice(0, ruList.length);
  //   for (let item of res.data.data) {
  //     ruList.push(item.name);
  //   }
  // });
  // listItem("出量名称", info.sheetType).then(res => {
  //   chuList.splice(0, chuList.length);
  //   for (let item of res.data.data) {
  //     chuList.push(item.name);
  //   }
  // });
  let list = [
    "意识",
    "record:postpartum_nurse_wj:乳房情况",
    "record:postpartum_nurse_wj:泌乳情况",
    "record:postpartum_nurse_wj:宫底高度",
    "record:postpartum_nurse_wj:子宫收缩",
    "record:postpartum_nurse_wj:伤口",
  ];
  
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    console.log(1111,data);
    for(let i=0;i<list.length;i++) {
      setList(allList[i], list[i], data);
    }
    // setList(ysList, "意识", data);
    // setList(rfList, "record:postpartum_nurse_wj:乳房情况", data);
    // setList(qrList, "record:postpartum_nurse_wj:泌乳情况", data);
    // setList(gdList, "record:postpartum_nurse_wj:宫底高度", data);
    // setList(zgList, "record:postpartum_nurse_wj:子宫收缩", data);
    // setList(skList, "record:postpartum_nurse_wj:伤口", data);
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
