/*
江门妇幼-产前待产护理记录单
*/
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  multiDictInfo
} from "../../../api/index";
import {
  event_date,
  event_time,
  event_date_time,
  click_date,
  click_date_time,
  click_time
} from "../keyEvent/date";

let tmList = [];
let ysxzList = [];
let gsqdList = [];
let xlgdList = [];
export default [
  {
    key: "recordDate", //年份
    value: "",
    hidden:true
  },
  {
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date,
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    // click: click_time,
  },
  {
    key: "contractionOne", //孕周
    value: "",
    event: keyf1,
    name: "孕周",
    textarea: {
      width: 35
    }
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 28
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 30
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 30
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
      width: 30
    }
  },
  // {
  //   key: "bloodSugar", //血糖
  //   value: "",
  //   event: keyf1,
  //   name: "血糖",
  //   next:"mol/L",
  //   textarea: {
  //     width: 32
  //   }
  // },
  {
    key: "preInputOne", //胎方位
    value: "",
    event: keyf1,
    name: "胎方位",
    textarea: {
      width: 30
    },
    autoComplete: {
      data: ['LOA','LOT','ROA','ROT','LST','RST','LSCA','RSCA']
    },
  },
  {
    key: "preInputTwo", //胎心音
    value: "",
    event: keyf1,
    name: "胎心音",
    next: "次/分",
    textarea: {
      width: 30
    },
  },
  {
    key: "uterineOne", //强度
    value: "",
    event: keyf1,
    name: "强度",
    textarea: {
      width: 28
    },
    autoComplete: {
      data: gsqdList
    },
  },
  {
    key: "uterineTwo", //持续
    value: "",
    event: keyf1,
    name: "持续",
    next: "s",
    textarea: {
      width: 28
    }
  },
  {
    key: "uterineThree", // 间歇
    value: "",
    event: keyf1,
    name: "间歇",
    next: "min",
    textarea: {
      width: 28
    },
  },
  {
    key: "uterineFour", // 扩张
    value: "",
    event: keyf1,
    name: "扩张",
    next: "cm",
    textarea: {
      width: 28
    },
  },
  {
    key: "uterineFive", //评分
    value: "",
    event: keyf1,
    name: "评分",
    textarea: {
      width: 28
    },
  },
  {
    key: "preFieldOne", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低",
    textarea: {
      width: 28
    },
    autoComplete: {
      data: xlgdList
    },
  },
  {
    key: "preFieldTwo", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜",
    autoComplete: {
      data: tmList
    },
    textarea: {
      width: 28
    }
  },
  {
    key: "preFieldThree", //羊水性质
    value: "",
    event: keyf1,
    name: "羊水性质",
    textarea: {
      width: 28
    },
    autoComplete: {
      data: ysxzList
    },
  },
  {
    key: "preFieldFour", //胎动
    value: "",
    event: keyf1,
    name: "胎动",
    next: "次/h",
    textarea: {
      width: 28
    }
  },
  {
    key: "preFieldFive", //排尿情况
    value: "",
    event: keyf1,
    name: "排尿情况",
    textarea: {
      width: 28
    },
  },
  {
    key: "preFieldSix", //破膜时间
    value: "",
    event: event_time,
    name: "破膜时间",
    textarea: {
      width: 35,
    },
  },
  {
    key: "preFieldSeven", //临产时间
    value: "",
    event: event_date_time,
    click: click_date_time,
    name: "临产时间",
    textarea: {
      width: 70,
    },
  },
  {
    key: "preFieldEight", //胎儿娩出时间
    value: "",
    event: event_time,
    // click: click_time,
    name: "胎儿娩出时间",
    textarea: {
      width: 40,
    },
  },
  {
    key: "preFieldNice", //缩宫素浓度
    value: "",
    event: keyf1,
    name: "缩宫素浓度",
    next: "U/500ml",
    textarea: {
      width: 75,
    },
  },
  {
    key: "preFieldTen", //滴数
    value: "",
    event: keyf1,
    name: "滴数",
    next: "滴/分",
    textarea: {
      width: 30,
      maxLength: 4
    },
  },
  {
    key: "vein", //静脉
    value: "",
    event: keyf1,
    name: "静脉",
    next: "ml",
    textarea: {
      width: 30,
      maxLength: 4
    },
  },
  {
    key: "oral", //口服
    value: "",
    event: keyf1,
    name: "口服",
    next: "ml",
    textarea: {
      width: 30,
      maxLength: 4
    },
  },
  {
    key: "blood", //滴数
    value: "",
    event: keyf1,
    name: "血",
    next: "ml",
    textarea: {
      width: 30,
      maxLength: 4
    },
  },
  {
    key: "urine", //尿
    value: "",
    event: keyf1,
    name: "尿",
    next: "ml",
    textarea: {
      width: 30,
      maxLength: 4
    },
  },
  {
    key: "armValue", //自定义1
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
    },
  },
  // {
  //   key: "armValue2", //自定义12
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 40,
  //   },
  // },
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
  {
    key: "sign2",
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
  let list = [
    "江门妇幼:产科护理记录单:宫缩强度",
    "江门妇幼:产科护理记录单:先露高度",
    "江门妇幼:产前待产护理记录单:胎膜",
    "江门妇幼:产前待产护理记录单:羊水性质",
  ];

  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(gsqdList, list[0], data);
    setList(xlgdList, list[1], data);
    setList(tmList, list[2], data);
    setList(ysxzList, list[3], data);
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
