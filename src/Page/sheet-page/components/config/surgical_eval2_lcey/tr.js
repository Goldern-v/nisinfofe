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
    key: "fieldTwo", // 呼吸机型号/气管插管内置
    value: "",
    event: keyf1,
  },
  {
    key: "fieldThree", // 呼吸机-辅助方式
    value: "",
    event: keyf1,
  },
  {
    key: "fieldFour", // 呼吸机-潮气量
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSix", // 呼吸机-呼吸频率
    value: "",
    event: keyf1,
  },
  {
    key: "fieldSeven", // 呼吸机-I:E
    value: "",
    event: keyf1,
  },
  {
    key: "oxygenDensity", // 呼吸机-氧浓度%
    value: "",
    event: keyf1,
  },
  {
    key: "fieldEight", // 呼吸机-PS/PEEP
    value: "",
    event: keyf1,
  },
  {
    key: "fieldNine", //呼吸机-气囊压力
    value: "",
    event: keyf1,
  },
  {
    key: "fieldTen", //呼吸机-痰色/痰量
    value: "",
    event: keyf1,
  },
  {
    key: "fieldNineteen", //呼吸机-拔除气管插管
    value: "",
    event: keyf1,
  },
  {
    key: "fieldTwenty", //呼吸机-呼吸音
    value: "",
    event: keyf1,
  },
  {
    key: "consciousness", //意识
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
    key: "fieldFive", //活动-床上/下床
    value: "",
    event: keyf1,
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
    key: "fieldSeventeen", //泵入药物-药物名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
    },
  },
  {
    key: "fieldEighteen", //泵入药物-泵速
    value: "",
    event: keyf1,
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
