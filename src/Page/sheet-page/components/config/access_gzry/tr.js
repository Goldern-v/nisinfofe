import {
  multiDictInfo,getSecondDictSheet
} from "../../../api/index";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
let foodData = [],foodWayData=[],foodChannelData=[],dischargeData=[],dischargeWayData=[],dischargePropData=[];
export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    click: click_time
  },
  {
    key: "food", //入量名称
    value: "",
    event: keyf1,
    name: "入量名称",
    textarea: {
      width: 62,
    },
    style: {
      maxWidth: '62px',
      textAlign: "left",
    },
    autoComplete: {
      data: foodData
    },
    type: "select",
    editable: true
  },
  {
    key: "foodWay", //入量方式
    value: "",
    event: keyf1,
    name: "入量方式",
    textarea: {
      width: 62,
    },
    style: {
      maxWidth: '62px',
      textAlign: "left",
    },
    autoComplete: {
      data: foodWayData
    },
    type: "select",
    editable: true
  },
  {
    key: "foodChannel", //途径
    value: "",
    event: keyf1,
    name: "途径",
    textarea: {
      width: 62,
    },
    style: {
      maxWidth: '62px',
      textAlign: "left",
    },
    autoComplete: {
      data: foodChannelData,
    },
    type: "select",
    editable: true,
    parentKey: "foodWay"
  },
  {
    key: "foodSize", //量（单位ml）
    value: "",
    event: keyf1,
    name: "量(ml)",
    textarea: {
      width: 30
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    event: keyf1,
    name: "出量名称",
    textarea: {
      width: 62,
    },
    style: {
      maxWidth: '62px',
      textAlign: "left",
    },
    autoComplete: {
      data: dischargeData
    },
    type: "select",
    editable: true
  },
  {
    key: "dischargeWay", //出量方式
    value: "",
    event: keyf1,
    name: "出量方式",
    textarea: {
      width: 62,
    },
    style: {
      maxWidth: '62px',
      textAlign: "left",
    },
    autoComplete: {
      data: dischargeWayData
    },
    type: "select",
    editable: true
  },
  {
    key: "dischargeProp", //性质
    value: "",
    event: keyf1,
    name: "性质",
    textarea: {
      width: 62,
    },
    style: {
      maxWidth: '62px',
      textAlign: "left",
    },
    autoComplete: {
      data: dischargePropData
    },
    type: "select",
    editable: true,
    parentKey: "foodWay"
  },
  {
    key: "dischargeSize", //量（单位ml）
    value: "",
    event: keyf1,
    name: "量(ml)",
    textarea: {
      width: 30
    },
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

export function getListData4() {
  let list = [
    "入量名称",
    "出量名称",
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(foodData, "入量名称", data);
    setList(dischargeData, "出量名称", data);
  });

  getSecondDictSheet("record_intake_route").then(res => {
    foodChannelData.push(res.data.data)
    for(let key in res.data.data){
      foodWayData.push(key)
    }
  })
  getSecondDictSheet("record_discharge_property").then(res => {
    dischargePropData.push(res.data.data)
    for(let key in res.data.data){
      dischargeWayData.push(key)
    }
  })
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
