import {
  multiDictInfo
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
let 入量名称 = [];
let 出量名称 = [];
let 意识 = ['清醒','浅昏迷','深昏迷','模糊','嗜睡','昏睡','谵望'];
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
    next: "℃"
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分"
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分"
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
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
    next: "mmHg"
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    autoComplete: {
      data: 意识
    }
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%"
  },
  {
    key: "food", //食物, 入量
    value: "",
    event: keyf1,
    // autoComplete: {
    //   data: 入量名称
    // },
    name: "入量名称"
  },
  {
    key: "foodSize", //食物数量  入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml"
  },
  {
    key: "discharge", //排出物
    value: "",
    event: keyf1,
    // autoComplete: {
    //   data: 出量名称
    // },
    name: "出量名称",
  },
  {
    key: "dischargeSize", //排出物数量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml"
  },
  {
    key: "dischargeColor", //排出物颜色
    value: "",
    event: keyf1,
    name: "出量颜色"
  },
  {
    key: "healthEducation", //健康教育
    value: "",
    event: keyf1,
    name: "健康教育",
  },
  {
    key: "fieldOne", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    },
  },
  {
    key: "fieldTwo", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "fieldThree", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "fieldFour", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "fieldFive", //标题5
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "fieldSix", //标题6
    value: "",
    event: keyf1,
    textarea: {
      width: 36
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
      width: "150px",
      background: "transparent",
      'word-wrap':'wrap'
    },
    event: function (e, td) {
      console.log(e.keyCode);
      // console.log(e);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      // console.log('eqe',e)
      console.log('eqe',e.path[0].dataset.value.length)
      if(e.path[0].dataset.value.length > 12){
        console.log('eqe')
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
    key: "audit",
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
