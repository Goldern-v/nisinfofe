// 胎心记录单
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time,
  click_double,
  click_cancel,
} from "../keyEvent/date";

const color= ['鲜红色', '暗红色', '淡红色', '淡黄色', '深黄色', '黄绿色', '黄褐色', '黑色', '无色'];
const stoolColorOption= ['鲜红色', '暗红色',  '黄色',  '褐色', '黑色','陶土样'];
export default [{
  key: "recordDate",
  value: "",
  hidden:true
},{
  key: "recordMonth", //日期
  value: "",
  event: event_date,
  click: click_date
},
{
  key: "recordHour", //时间
  value: "",
  event: event_time,
  click:click_time
},
{
  key: "oralCare",
  value: "",
  event: keyf1,
  name: "口腔护理/会阴护理",
  next: "",
  style: {
    width: '32px'
  },
  click: click_double
},
{
  key: "bedBath",
  value: "",
  event: keyf1,
  name: "床上擦浴/洗头",
  next: "",
  style: {
    width: '26px'
  },
  click: click_double
},
{
  key: "rollOver",
  value: "",
  event: keyf1,
  name: "翻身/扣背",
  next: "",
  style: {
    width: '26px'
  },
  click: click_double
},
{
  key: "gasCutting",
  value: "",
  event: keyf1,
  name: "气切护理",
  next: "",
  style: {
    width: '24px'
  },
  click: click_cancel
},
{
  key: "restraintCare",
  value: "",
  event: keyf1,
  name: "约束护理",
  next: "",
  style: {
    width: '24px'
  },
  click: click_cancel
},
{
  key: "fieldNineteen",
  value: "",
  event: keyf1,
  name: "动静脉置管护理",
  next: "",
  style: {
    width: '32px'
  },
  click: click_cancel
},
{
  key: "arteriovenous",
  value: "",
  event: keyf1,
  name: "引流管护理",
  next: "",
  style: {
    width: '32px'
  },
  click: click_cancel
},
{
  key: "sputum",
  value: "",
  event: keyf1,
  name: "吸痰",
  next: "",
  style: {
    width: '26px'
  },
  click: click_cancel
},
{
  key: "sputumColor",
  value: "",
  event: keyf1,
  name: "痰液颜色",
  next: "",
  autoComplete: {
    data: ['血色', '白色', '黄色', '绿色']
  },
  textarea: {
    width: 26
  },
},
{
  key: "sputumCharacter",
  value: "",
  event: keyf1,
  name: "痰液性状",
  next: "",
  autoComplete: {
    data: ['粘稠', '稀薄']
  },
  textarea: {
    width: 26
  },
},
{
  key: "sputumNum",
  value: "",
  event: keyf1,
  name: "痰液量",
  next: "",
  autoComplete: {
    data: ['少量', '中量', '大量']
  },
  textarea: {
    width: 26
  },
},
{
  key: "urineColor",
  value: "",
  event: keyf1,
  name: "尿液颜色",
  next: "",
  textarea: {
    width: 26
  },
  autoComplete: {
    data:color
  },
},
{
  key: "stoolColor",
  value: "",
  event: keyf1,
  name: "大便颜色",
  next: "",
  textarea: {
    width: 26
  },
  autoComplete: {
    data:stoolColorOption
  },
},
// {
//   key: "customTitle1",
//   value: "",
//   event: keyf1,
//   name: "自定义标题1",
//   next: "",
//   textarea: {
//     width: 32
//   },
//   autoComplete: {
//     data:color
//   }
// },
// {
//   key: "customTitle2",
//   value: "",
//   event: keyf1,
//   name: "自定义标题2",
//   next: "",
//   textarea: {
//     width: 32
//   },
//   autoComplete: {
//     data:color
//   }
// },
// {
//   key: "customTitle3",
//   value: "",
//   event: keyf1,
//   name: "自定义标题3",
//   next: "",
//   textarea: {
//     width: 32
//   },
//   autoComplete: {
//     data:color
//   }

// },
// {
//   key: "customTitle4",
//   value: "",
//   event: keyf1,
//   name: "自定义标题4",
//   next: "",
//   textarea: {
//     width: 32
//   },
//   autoComplete: {
//     data:color
//   }
// },
{
  key: "infusion",
  value: "",
  event: keyf1,
  name: "输液/注射用药",
  next: "",
  textarea: {
    width:180
  },
},
{
  key: "consumption",
  value: "",
  event: keyf1,
  name: "用量(ml)",
  next: "",
  textarea: {
    width: 32
  },
},
{
  key: "oral",
  value: "",
  event: keyf1,
  name: "口服/鼻饲用药",
  next: "",
  textarea: {
    width: 180
  },
},
{
  key: "consumption2",
  value: "",
  event: keyf1,
  name: "用量(ml)",
  next: "",
  textarea: {
    width: 32
  },
},
{
  key: "description", //备注
  value: "",
  style: {
    textAlign: "left",
    position: "absolute",
    top: "1px",
    bottom: "1px",
    left: "1px",
    width: "250px",
    background: "transparent"
  },
  textarea: {
    width: 250
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
