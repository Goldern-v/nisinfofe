import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
export default [{
  key: "dateStr", //日期
  value: "",
  event: event_date,
  click: click_date
}, {
  key: "fieldOne", //外露/置管长度
  value: "",
  event: keyf1,
  name: "外露/置管长度",
  textarea: {
    width: 50
  }
}, {
  key: "fieldTwo", //手臂周长
  value: "",
  event: keyf1,
  name: "手臂周长",
  textarea: {
    width: 50
  }
}, {
  key: "fieldThree", //换敷贴
  value: "",
  event: keyf1,
  name: "换敷贴",
  textarea: {
    width: 50
  }
}, {
  key: "fieldFour", //冲管
  value: "",
  event: keyf1,
  name: "冲管",
  textarea: {
    width: 50
  }
}, {
  key: "fieldFive", //换肝素冒
  value: "",
  event: keyf1,
  name: "换肝素冒",
  textarea: {
    width: 50
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
  key: "sign", //护士签名
  style: {
    minWidth: '72px',
    maxWidth: '72px',
  },
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


/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */