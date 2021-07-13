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
let ysList = [];
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
    event: keyf1
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1
  },
  {
    key: "heartRate", //心率
    value: "",
    event: keyf1
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
    }
  },
  {
    key: "spo2", //血氧饱和度
    value: "",
    event: keyf1,
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    }
  },
  {
    key: "pupilSizeLeft", // 瞳孔-大小-左
    value: "",
    event: keyf1
  },
  {
    key: "pupilSizeRight", // 瞳孔-大小-右
    value: "",
    event: keyf1
  },
  {
    key: "pupilReflexLeft", // 瞳孔-反射反应-左
    value: "",
    event: keyf1
  },
  {
    key: "pupilReflexRight", // 瞳孔-反射反应-右
    value: "",
    event: keyf1
  },
  {
    key: "food", //入
    value: "",
    event: keyf1,
    textarea: {
      width: 68
    }
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
    textarea: {
      width: 68
    }
  },
  {
    key: "dischargeSize", //排出物数量
    value: "",
    event: keyf1
  },
  {
    key: "fieldFour", //出量-颜色性状
    value: "",
    event: keyf1
  },
  {
    key: "fieldFive", //皮肤情况
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "fieldSix", //管路护理
    value: "",
    event: keyf1,
    textarea: {
      width: 36
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
      width: "360px",
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

function getListData() {
  let list = [
    "山南:通用护理记录单（妇产科）:意识",
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, list[0], data);
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
