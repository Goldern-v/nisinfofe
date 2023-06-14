import {
  listItem
} from "../../../api/recordDesc";
import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
import info from "../sheetInfo";
let bwList = ['左枕骨处','右枕骨处','左耳廊','右耳廊','左肩峰处','右肩峰处','左肩胛骨处','右肩胛骨处','左胸椎骨处','右胸椎骨处','左腰椎骨处','右腰椎骨处','背部','左肘部','右肘部','骶尾部','左臀部','右臀部','左坐骨处','右坐骨处','左髋部','右髋部','左足内踝处','左足外踝处','右足内踝处','右足外踝处','左足跟','右足跟'];
let fqList = ['1','2','3','4','5','6']
let jdysList = ['25%','50%','75%','100%']
let syList = ['干燥','湿润','潮湿','饱和','漏出']
let qwList = ['无','轻度','中度','重度']
let pfList = ['水肿','浸渍','红斑','硬结','脱屑']

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
    autoComplete: {
      data: bwList
    },
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "installment", //分期
    value: "",
    event: keyf1,
    name: "分期",
    autoComplete: {
      data: fqList
    },
    textarea: {
      width: 55
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "fieldSize", //大小/长*宽*深
    value: "",
    event: keyf1,
    name: "大小",
    textarea: {
      width: 85
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "baseColorRed", //基底颜色红色%
    value: "",
    event: keyf1,
    name: "红色",
    next: "%",
    autoComplete: {
      data: jdysList
    },
    textarea: {
      width: 63
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "baseColorYellow", // 基底颜色黄色%
    value: "",
    event: keyf1,
    name: "黄色",
    next: "%",
    autoComplete: {
      data: jdysList
    },
    textarea: {
      width: 63
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "baseColorBlack", // 基底颜色黑色%
    value: "",
    event: keyf1,
    name: "黑色",
    next: "%",
    autoComplete: {
      data: jdysList
    },
    textarea: {
      width: 63
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "baseColorOther", // 基底颜色其他%
    value: "",
    event: keyf1,
    name: "其他",
    next: "%",
    autoComplete: {
      data: jdysList
    },
    textarea: {
      width: 63
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "fieldOne", // 渗出液（量、性状、颜色）
    value: "",
    event: keyf1,
    name: "渗出液（量、性状、颜色）",
    textarea: {
      width: 63
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "fieldTwo", //渗液与敷料的关系
    value: "",
    event: keyf1,
    name: "渗液与敷料的关系",
    autoComplete: {
      data: syList
    },
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "odor", //气味
    value: "",
    event: keyf1,
    name: "气味",
    autoComplete: {
      data: qwList
    },
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "fieldThree", //潜行/窦道
    value: "",
    event: keyf1,
    name: "潜行/窦道",
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 10),
  },
  {
    key: "fieldFour", //周围皮肤
    value: "",
    event: keyf1,
    name: "周围皮肤",
    autoComplete: {
      data: pfList
    },
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 10),
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
    textarea: {
      width: 150
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
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
