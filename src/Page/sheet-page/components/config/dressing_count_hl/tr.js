import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
let 宫底 = [];
let 子宫收缩 = [];
let 膀胱情况 = [];
let 入量项目 = [];
let 出量项目 = [];
let colList=["暗红","鲜红","粉红"]
let bladderList=["空虚","稍胀","充盈"]
export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time
  }, {
    key: "fieldThree", //出血量
    value: "",
    event: keyf1,
    name: "出血量",
      textarea: {
      width: 36
    },
  }, {
    key: "fieldFive", //性状颜色
    value: "",
    event: keyf1,
    autoComplete: {
      data: colList
    }
  }, {
    key: "fieldOne", //宫底U-Fb
    value: "",
    event: keyf1,
    name: "宫底",
    autoComplete: {
      data: 宫底
    }
  }, {
    key: "bloodPressure", //血压
    value: "",
    event: keyf1,
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  }, {
    key: "pulse", //脉搏
    value: "",
    event: keyf1
  }, {
    key: "breath", //呼吸
    value: "",
    event: keyf1
  }, {
    key: "spo2", //血氧饱和度
    value: "",
    event: keyf1
  }, {
    key: "fieldFour", //膀胱情况
    value: "",
    event: keyf1,
    name: "膀胱情况",
    autoComplete: {
      data: bladderList
    }
  }, {
    key: "fieldTwo", //肛查
    value: "",
    event: keyf1
  }, {
    key: "description", //附注
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "240px",
      background: "transparent"
    },
    // textarea: {
    //   width: 190
    // },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    },
    // oninput: next
  },
  {
    key: "sign", //护士签名
    style: {
      minWidth: '72px',
      maxWidth: '72px',
    },
    value: ""
  },
  // {
  //   key: "audit", //审核签名
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
  let list = [
    "宫底",
    "子宫收缩",
    "膀胱情况",
    "入量项目",
    "出量项目"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    console.log(data);
    setList(宫底, "宫底", data);
    setList(子宫收缩, "子宫收缩", data);
    setList(膀胱情况, "膀胱情况", data);
    setList(入量项目, "入量项目", data);
    setList(出量项目, "出量项目", data);
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
