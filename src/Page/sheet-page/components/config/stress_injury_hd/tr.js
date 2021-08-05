import {
  listItem
} from "../../../api/recordDesc";
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
import info from "../sheetInfo";
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
    key: "fieldPart", //部位
    value: "",
    event: keyf1,
    name: "部位",
    textarea: {
      width: 50
    },
  },
  {
    key: "installment", //分期
    value: "",
    event: keyf1,
    name: "分期",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldSize", //大小/长*宽*深
    value: "",
    event: keyf1,
    name: "大小",
    textarea: {
      width: 50
    },
  },
  {
    key: "baseColorRed", //基底颜色红色%
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "红色",
    next: "%",
    textarea: {
      width: 50
    },
  },
  {
    key: "baseColorYellow", // 基底颜色黄色%
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "黄色",
    next: "%",
    textarea: {
      width: 50
    },
  },
  {
    key: "baseColorBlack", // 基底颜色黑色%
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "黑色",
    next: "%",
    textarea: {
      width: 50
    },
  },
  {
    key: "baseColorOther", // 基底颜色其他%
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "其他",
    next: "%",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldOne", // 渗出液（量、性状、颜色）
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "渗出液（量、性状、颜色）",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldTwo", //渗液与敷料的关系
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "渗液与敷料的关系",
    textarea: {
      width: 50
    },
  },
  {
    key: "odor", //气味
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "气味",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldThree", //潜行/窦道
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "潜行/窦道",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldFour", //周围皮肤
    value: "",
    event: keyf1,
    change: calValueChange,
    name: "周围皮肤",
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
      width: "150px",
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
    hidden: true,
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

export function getListData() {

}

getListData();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
