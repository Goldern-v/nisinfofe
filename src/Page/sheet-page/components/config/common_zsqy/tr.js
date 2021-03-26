import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1,
  calValueChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
let 入量名称 = [];
let 出量名称 = [];
let 神志 = ['清醒', '浅昏迷', '深昏迷', '模糊', '嗜睡', '昏睡', '谵妄'];
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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 30
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 30
    },
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分",
    textarea: {
      width: 30
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 30
    },
  },
  {
    key: "bloodPressure", //血压
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
      width: 48
    },
  },
  {
    key: "spo2", //血氧饱和度%
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldOne", //微量血糖测量mmol/L
    value: "",
    event: keyf1,
    name: "微量血糖测量",
    next: "mmol/L",
    textarea: {
      width: 42
    },
  },
  {
    key: "fieldTwo", //氧疗
    value: "",
    event: keyf1,
    name: "氧疗",
    textarea: {
      width: 30
    },
  },
  {
    key: "consciousness", //神志
    value: "",
    event: keyf1,
    name: "神志",
    autoComplete: {
      data: 神志
    },
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldThree", //胃纳
    value: "",
    event: keyf1,
    name: "胃纳",
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldFour", //恶心
    value: "",
    event: keyf1,
    name: "恶心",
    textarea: {
      width: 20
    },
  },
  {
    key: "fieldFive", //呕吐
    value: "",
    event: keyf1,
    name: "呕吐",
    textarea: {
      width: 20
    },
  },
  {
    key: "fieldSix", //腹胀
    value: "",
    event: keyf1,
    name: "腹胀",
    textarea: {
      width: 20
    },
  },
  {
    key: "fieldSeven", //头晕
    value: "",
    event: keyf1,
    name: "头晕",
    textarea: {
      width: 20
    },
  },
  {
    key: "fieldEight", //胸闷
    value: "",
    event: keyf1,
    name: "胸闷",
    textarea: {
      width: 20
    },
  },
  // 痰start
  {
    key: "fieldEleven", //痰吸/咳
    value: "",
    event: keyf1,
    name: "痰吸/咳",
    textarea: {
      width: 20
    },
  },
  {
    key: "fieldTwelve", //痰色
    value: "",
    event: keyf1,
    name: "痰色",
    textarea: {
      width: 20
    },
  },
  {
    key: "fieldThirteen", //痰量
    value: "",
    event: keyf1,
    name: "痰量",
    textarea: {
      width: 20
    },
  },
  {
    key: "fieldFourteen", //痰质
    value: "",
    event: keyf1,
    name: "痰质",
    textarea: {
      width: 20
    },
  },
  // 痰end
  {
    key: "pupilSizeLeft", //瞳孔大小（mm）左
    value: "",
    event: keyf1,
    name: "瞳孔大小（mm）左",
    textarea: {
      width: 20
    },
  },
  {
    key: "pupilReflexLeft", //瞳孔反射左
    value: "",
    event: keyf1,
    name: "瞳孔反射左",
    textarea: {
      width: 20
    },
  },
  {
    key: "pupilSizeRight", //瞳孔大小（mm）右
    value: "",
    event: keyf1,
    name: "瞳孔大小（mm）右",
    textarea: {
      width: 20
    },
  },
  {
    key: "pupilReflexRight", //瞳孔反射右
    value: "",
    event: keyf1,
    name: "瞳孔反射右",
    textarea: {
      width: 20
    },
  },
  
  {
    key: "limbsLeftUpper", //四肢肌力左侧上肢
    value: "",
    event: keyf1,
    name: "四肢肌力左侧上肢",
    textarea: {
      width: 20
    },
  },
  {
    key: "limbsLeftLower", //四肢肌力左侧下肢
    value: "",
    event: keyf1,
    name: "四肢肌力左侧下肢",
    textarea: {
      width: 20
    },
  },
  {
    key: "limbsRightUpper", //四肢肌力右侧上肢
    value: "",
    event: keyf1,
    name: "四肢肌力右侧上肢",
    textarea: {
      width: 20
    },
  },
  {
    key: "limbsRightLower", //四肢肌力右侧下肢
    value: "",
    event: keyf1,
    name: "四肢肌力右侧下肢",
    textarea: {
      width: 20
    },
  },
  {
    key: "foodSize", //食物数量  入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    textarea: {
      width: 30
    },
  },
  {
    key: "dischargeSize", //排出物数量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    textarea: {
      width: 30
    },
  },
  {
    key: "totalSize", //统计量
    value: "",
    event: keyf1,
    name: "统计量",
    next: "ml",
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldNine", //管道记录
    value: "",
    event: keyf1,
    name: "管道记录",
    textarea: {
      width: 70
    },
  },
  {
    key: "fieldTen", //补充
    value: "",
    event: keyf1,
    change: calValueChange,
    textarea: {
      width: 50
    },
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
      // width: "180px",
      background: "transparent",
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
    value: true
  }
];

let filterKey = '花都' + ':';
let filterKey2 = '统一护理记录单' + ':';

export function getListData4() {
  let list = [
    "入量名称",
    "出量名称",
  ];
  list = list.map(key => {
    return key.includes('出量名称') ? filterKey + filterKey2 + key : filterKey + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(入量名称, "入量名称", data);
    setList(出量名称, "出量名称", data);
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
  key = key.includes('出量名称') ? filterKey + filterKey2 + key : filterKey + key;
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}
