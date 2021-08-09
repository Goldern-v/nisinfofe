import {
  keyf1
} from "../keyEvent/f1.js";
import {
  multiDictInfo
} from "../../../api/index";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let gsqdList = [];
let xlgdList = [];
let ydlxList = [];
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
      width: 60
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 60
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
      width: 60
    }
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    textarea: {
      width: 50
    }
  },
  {
    key: "contractionOne", //强度
    value: "",
    event: keyf1,
    name: "强度",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: gsqdList
    },
  },
  {
    key: "contractionTwo", //持续
    value: "",
    event: keyf1,
    name: "持续",
    next: "s",
    textarea: {
      width: 43
    }
  },
  {
    key: "contractionThree", // 间歇
    value: "",
    event: keyf1,
    name: "间歇",
    next: "min",
    textarea: {
      width: 43
    },
  },
  {
    key: "preFieldOne", // 宫口扩张
    value: "",
    event: keyf1,
    name: "宫口扩张",
    next: "cm",
    textarea: {
      width: 43
    },
  },
  {
    key: "preFieldTwo", //先露
    value: "",
    event: keyf1,
    name: "先露",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: xlgdList
    },
  },
  {
    key: "preFieldThree", //宫底高度
    value: "",
    event: keyf1,
    name: "宫底高度",
    textarea: {
      width: 50
    },
  },
  {
    key: "preFieldFour", //排尿情况
    value: "",
    event: keyf1,
    name: "排尿情况",
    textarea: {
      width: 50
    }
  },
  {
    key: "preFieldFive", //阴道流血
    value: "",
    event: keyf1,
    name: "阴道流血",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: ydlxList
    },
  },
  {
    key: "preFieldSix", //健康教育
    value: "",
    event: keyf1,
    name: "健康教育",
    textarea: {
      width: 50
    }
  },
  {
    key: "preFieldSeven", //基础护理
    value: "",
    event: keyf1,
    name: "基础护理",
    textarea: {
      width: 50
    },
  },
  {
    key: "preFieldEight", //标题1
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
    },
  },
  {
    key: "preFieldNice", //标题2
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
    },
  },
  {
    key: "preFieldTen", //标题3
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
    },
  },
  {
    key: "preFieldEleven", //标题4
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
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
  let list = [
    "江门妇幼:产科护理记录单:宫缩强度",
    "江门妇幼:产科护理记录单:先露高度",
    "江门妇幼:产科护理记录单:阴道流血",
  ];

  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(gsqdList, list[0], data);
    setList(xlgdList, list[1], data);
    setList(ydlxList, list[2], data);
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