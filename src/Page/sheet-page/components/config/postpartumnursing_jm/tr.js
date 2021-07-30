import {
  listItem
} from "../../../api/recordDesc";
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
import info from "../sheetInfo";

const pgList = ['胀', '不胀'];
const gdgdList = ['U+1', 'U=0', 'U-1', 'U-2', 'U-3', 'U-4'];
const rfqkList = ['-'];
const mrqkList = ['多', '中', '少', '无'];
const skqkList = ['红肿', '渗液', '水肿', '(-)', '会阴(-)'];
const 意识 = ['清醒', '浅昏迷', '深昏迷', '模糊', '嗜睡', '昏睡', '谵妄'];
const zdjnList = ['✓'];
const 出量名称 = [];
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
      width: 50
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 50
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 50
    }
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
      width: 50
    }
  },
  {
    key: "breath", //spo2
    value: "",
    event: keyf1,
    name: "SPO2",
    next: "%",
    textarea: {
      width: 50
    }
  },
  {
    key: "breath", //膀胱情况
    value: "",
    event: keyf1,
    name: "膀胱情况",
    next: "次/分",
    autoComplete: {
      data: pgList
    },
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldTwo", //静脉
    value: "",
    event: keyf1,
    name: "指尖血糖",
    next: "mmol/L",
    textarea: {
      width: 43
    }
  },
  {
    key: "fieldThree", //口服
    value: "",
    event: keyf1,
    name: "阴道出血",
    next: "mL",
    textarea: {
      width: 43
    }
  },
  {
    key: "food", // 血
    value: "",
    event: keyf1,
    name: "入量内容",
    textarea: {
      width: 43
    },
  },
  {
    key: "foodSize", // 尿
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    textarea: {
      width: 43
    },
  },
  {
    key: "discharge", //其他
    value: "",
    event: keyf1,
    name: "出量内容",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: 出量名称
    },
  },
  {
    key: "dischargeSize", //乳量
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: mrqkList
    },
  },
  {
    key: "fieldFour", //宫底高度
    value: "",
    event: keyf1,
    name: "出量颜色",
    autoComplete: {
      data: gdgdList
    },
    textarea: {
      width: 50
    }
  },
  {
    key: "fieldFive", //子宫收缩
    value: "",
    event: keyf1,
    name: "健康宣教",
    textarea: {
      width: 50
    }
  },
  {
    key: "fieldFive", //腹部
    value: "",
    event: keyf1,
    name: "健康宣教",
    textarea: {
      width: 43
    }
  },
  {
    key: "fieldSix", //会阴
    value: "",
    event: keyf1,
    textarea: {
      width: 43,
      maxLength: 4
    },
  },
  {
    key: "fieldSeven", //留置尿管
    value: "",
    event: keyf1,
    textarea: {
      width: 50,
      maxLength: 4
    },
  },
  {
    key: "fieldEight", //尿色
    value: "",
    event: keyf1,
    textarea: {
      width: 50,
      maxLength: 4
    },
    
  },
  {
    key: "fieldNine", //镇痛泵
    value: "",
    event: keyf1,
    textarea: {
      width: 50,
      maxLength: 4
    },
    autoComplete: {
      data: mrqkList
    },
  },
  {
    key: "fieldTen", //母乳喂养指导
    value: "",
    event: keyf1,
    textarea: {
      width: 50,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldEleven", //vas评分
    value: "",
    event: keyf1,
    textarea: {
      width: 50,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldTwelve", //跌倒告知
    value: "",
    event: keyf1,
    textarea: {
      width: 50,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "description", //特殊情况
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
    value: true
  }
];

export function getListData() {
  let list = [,
    "花都:神经外科护理记录单:出量名称"
  ];
  multiDictInfo(list).then(res => {
    setList(出量名称, list[0], data);
  });
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
