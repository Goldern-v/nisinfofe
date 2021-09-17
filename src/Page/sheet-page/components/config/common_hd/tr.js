import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1,
  calValueChange,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
let 入量名称 = [];
let 出量名称 = [];
let 意识 = ['清醒', '浅昏迷', '深昏迷', '模糊', '嗜睡', '昏睡', '谵妄'];
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
      width: 30
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
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
    change: (e, td) => limitChange(e, td, 4),
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
    change: (e, td) => limitChange(e, td, 4),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 30
    },
  },
  {
    key: "bloodPressure", //血压
    value: "",
    change: (e, td) => limitChange(e, td, 6),
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
      width: 40
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
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "food", //食物, 入量
    value: "",
    event: keyf1,
    name: "入量名称",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 50,
    },
    autoComplete: {
      data: 入量名称
    }
  },
  {
    key: "foodSize", //食物数量  入量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "入量大小",
    next: "ml",
    textarea: {
      width: 30
    },
  },
  {
    key: "discharge", //排出物
    value: "",
    event: keyf1,
    name: "出量名称",
    change: (e, td) => limitChange(e, td, 14),
    textarea: {
      width: 95,
    },
    autoComplete: {
      data: 出量名称
    }
  },
  {
    key: "dischargeSize", //排出物数量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "出量大小",
    next: "ml",
    textarea: {
      width: 30
    },
  },
  {
    key: "dischargeColor", //排出物颜色
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "出量颜色",
    textarea: {
      width: 40
    },
  },
  {
    key: "healthEducation", //健康宣教
    value: "",
    event: keyf1,
    name: "健康宣教",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 100
    },
  },
  {
    key: "fieldOne", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 52
    },
  },
  {
    key: "fieldTwo", //标题2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 52
    },
  },
  {
    key: "fieldThree", //标题3
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 52
    },
  },
  {
    key: "fieldFour", //标题4
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 52
    },
  },
  {
    key: "fieldFive", //标题5
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 52
    },
  },
  {
    key: "fieldSix", //标题6
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 52
    },
  }, {
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
      limitChange(e, td, 11)
    }
    // oninput: next
  },
  {
    key: "sign",
    value: ""
  },
  {
    key: "sign2",
    value: "",
    style: {
      maxWidth: '80px',
    },
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
    "花都:通用护理记录单:入量名称",
    "花都:通用护理记录单:出量名称",
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(入量名称, "花都:通用护理记录单:入量名称", data);
    setList(出量名称, "花都:通用护理记录单:出量名称", data);
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
