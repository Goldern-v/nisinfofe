import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
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
  },
  {
    key: "temperature", //体温-体温℃
    value: "",
    event: keyf1
  },
  {
    key: "temperatureMeasure", //体温-措施
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤']
    },
  },
  {
    key: "pulse", //心率
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸 次/min
    value: "",
    event: keyf1
  },
  {
    key: "bloodPressure", //血压(mmHg)
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    },
    style: {
      'line-height': '30px'
    }
  },
  {
    key: "bloodPressureHandle", //血压 - 异常处理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②']
    },
  },
  {
    key: "fieldOne", // 氧疗 升/分
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③']
    },
  },
  {
    key: "spo2", // 血氧饱和度%
    value: "",
    event: keyf1,
  },
  {
    key: "fieldTwo", // 手术术前-准备
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤', '⑥']
    },
  },
  {
    key: "fieldThree", // 手术术前-宣教
    value: "",
    event: keyf1,
  },
  {
    key: "fieldFour", // 手术-感染指标送检
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSix", // 手术-麻醉方式
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSeven", // 手术-离开病房
    value: "",
    event: keyf1,
  },
  {
    key: "fieldEight", // 手术-返回病房
    value: "",
    event: keyf1,
  },
  {
    key: "fieldNine", // 手术术后-护理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧']
    },
  },
  {
    key: "fieldTen", //手术术后-宣教
    value: "",
    event: keyf1,
  },
  {
    key: "fieldEleven", //刀(伤)口敷料
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③']
    },
  },
  {
    key: "painScore", //疼痛护理-评分
    value: "",
    event: keyf1,
  },
  {
    key: "painMessure", //疼痛护理-措施
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②']
    },
  },
  {
    key: "painAfterScore", //疼痛护理-处理后评分
    value: "",
    event: keyf1,
  },
  {
    key: "fieldTwelve", //腹部症状-腹胀
    value: "",
    event: keyf1,
  },
  {
    key: "fieldThirteen", //腹部症状-便秘
    value: "",
    event: keyf1,
  },
  {
    key: "fieldFourteen", //腹部症状-措施
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②']
    }
  },
  {
    key: "fieldFifteen", //腹部症状-处理后效果
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②']
    },
  },
  {
    key: "fieldSixteen", //呼吸道管理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤']
    },
  },
  {
    key: "sleep", //睡眠
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤', '⑥']
    },
  },
  {
    key: "fieldSeventeen", //其他评估-患者依从性
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③']
    },
  },
  {
    key: "fieldEighteen", //其他评估-自理能力
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③']
    },
  },
  {
    key: "fieldNineteen", //其他评估-教育需求
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤', '⑥']
    },
  },
  {
    key: "fieldTwenty", //其他评估-心理状态
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['1', '2', '3', '4', '5', '6']
    },
  },
  {
    key: "description", //病情观察及处理
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
