/*
  江门妇幼-儿科护理记录单
*/
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
// let ysList = ['母乳喂养','人工喂养','混合喂养','清淡饮食','禁食','禁饮','禁食禁饮'];
let ymList = ['勃脉力500ml', 'NS250m1+缩宫素', '0.9%NS100+托烷司琼', '0.9%NS100+昂丹司琼', '5%GS500m1', '地米5mg', '力月西', '芬太尼', '造影剂']
let yfList = ['drip', 'iv', '肌注', '含服', '口服']
let tcList = ['是', '否']
let twList = ['俯卧位', '平卧位']
let pfList = ['完整','皮损']
let xhList = ['温','冷']
let ttList = ['左小腿', '左大腿', '右小腿', '右大腿', '足背', '足跟', '臀部', '骶尾部', '腹部', '左腹股沟', '右腹股沟', '左臀部皮肤褶皱区', '右臀部皮肤褶皱区']
let lxList = ['尿管', '腹腔引流管']
let ylList = ['夹闭','开放']
export default [
  // {
  //   key: "recordDate", //年份
  //   value: "",
  //   hidden:true
  // },
  {
  key: "recordMonth", //日期
  value: "",
  event: event_date,
  click: click_date,
  // textarea: {
  //   width: 40
  // }
},
{
  key: "recordHour", //时间
  value: "",
  event: event_time,
  click: click_time,
  // textarea: {
  //   width: 40
  // }
},
{
  key: "pulse", //脉搏
  name: "脉搏",
  next: "次/分",
  value: "",
  event: keyf1,
  textarea: {
    width: 40
  }
},
{
  key: "bloodOxygen", //血氧饱和度
  value: "",
  name: "血氧饱和度",
  next: "%",
  event: keyf1,
  textarea: {
    width: 50
  }
},
{
  key: "breath", //呼吸
  value: "",
  name: "呼吸",
  next: "次/分",
  event: keyf1,
  textarea: {
    width: 40
  }
},
{
  key: "bloodPressure", //血压
  value: "",
  name: "血压",
  next: "mmHg",
  event: function (e, td) {
    if (e.keyCode == 32) {
      e.target.value += "/";
      e.preventDefault();
    }
    keyf1(e, td);
  },
  textarea: {
    width: 60
  }
},
{
  key: "drugName", //药名
  value: "",
  name: "药名",
  next: "",
  event: keyf1,
  textarea: {
    width: 200
  },
  autoComplete: {
    data: ymList
  },
  splice: true
},
{
  key: "usage", //用法
  value: "",
  name: "用法",
  event: keyf1,
  autoComplete: {
    data: yfList
  },
  // change: (e, td) => limitChange(e, td, 8),
  textarea: {
    width: 40
  },
},
{
  key: "dripSpeed", // 滴速
  value: "",
  name: "滴速",
  next: "滴/分",
  event: keyf1,
  textarea: {
    width: 40
  }
},
{
  key: "unobstructed", // 是否通畅
  value: "",
  name: "是否通畅",
  next: "ml",
  event: keyf1,
  autoComplete: {
    data: tcList
  },
  textarea: {
    width: 40
  }
},
{
  key: "bodyPosition", // 体位
  value: "",
  name: "体位",
  next: "ml",
  event: keyf1,
  autoComplete: {
    data: twList
  },
  textarea: {
    width: 40
  }
},
{
  key: "skinCondition", // 皮肤情况
  value: "",
  name: "皮肤情况",
  next: "ml",
  event: keyf1,
  autoComplete: {
    data: pfList
  },
  textarea: {
    width: 40
  }
},
{
  key: "limbCirculation", // 肢体循环
  value: "",
  name: "肢体循环",
  event: keyf1,
  autoComplete: {
    data: xhList
  },
  textarea: {
    width: 40
  }
},
{
  key: "pain", // 疼痛
  value: "",
  name: "疼痛部位",
  next: "ml",
  event: keyf1,
  autoComplete: {
    data: ttList
  },
  textarea: {
    width: 60
  },
  splice: true
},
{
  key: "painScore", // 疼痛
  value: "",
  name: "疼痛评分",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 60
  },
},
{
  key: "pipeType", // 类型
  value: "",
  name: "类型",
  event: keyf1,
  autoComplete: {
    data: lxList
  },
  textarea: {
    width: 60
  }
},
{
  key: "drainageSituation", // 引流情况
  value: "",
  name: "引流情况",
  next: "",
  event: keyf1,
  autoComplete: {
    data: ylList
  },
  textarea: {
    width: 40
  }
},
{
  key: "description", //特殊情况记录
  value: "",
  splice: true,
  style: {
    textAlign: "left",
    position: "absolute",
    top: "1px",
    bottom: "1px",
    left: "1px",
    width: "200px",
    background: "transparent",
    fontSize: "12px"
  },
  event: function (e, td) {
    console.log(e.keyCode);
    if (e.keyCode == 9) {
      td.value = "    " + td.value;
      e.preventDefault();
    }
    keyf1(e, td);
  },
  textarea: {
    width: 200
  }

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
  value: false
}
];
