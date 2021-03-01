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
    key: "pulse", //体温-措施
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤']
    },
  },
  {
    key: "breath", //心率
    value: "",
    event: keyf1
  },
  {
    key: "bloodPressure", //呼吸 次/min
    value: "",
    event: keyf1
  },
  {
    key: "bloodPressure1", //血压(mmHg)
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
    style: {
      'line-height': '14px'
    }
  },
  {
    key: "consciousness", //血压 - 异常处理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②']
    },
  },
  {
    key: "pupilSizeRight", // 氧疗 升/分
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③']
    },
  },
  {
    key: "pupilReflexLeft", // 血氧饱和度%
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight", // 呼吸机型号/气管插管内置
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight0", // 呼吸机-辅助方式
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight1", // 呼吸机-潮气量
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight2", // 呼吸机-呼吸频率
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight3", // 呼吸机-I:E
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight4", // 呼吸机-氧浓度%
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight5", // 呼吸机-PS/PEEP
    value: "",
    event: keyf1,
  },
  {
    key: "food", //呼吸机-气囊压力
    value: "",
    event: keyf1,
  },
  {
    key: "foodSize", //呼吸机-痰色/痰量
    value: "",
    event: keyf1,
  },
  {
    key: "discharge", //呼吸机-拔除气管插管
    value: "",
    event: keyf1,
  },
  {
    key: "dischargeSize", //呼吸机-呼吸音
    value: "",
    event: keyf1,
  },
  {
    key: "fieldOne", //意识
    value: "",
    event: keyf1,
  },
  {
    key: "fieldTwo", //刀(伤)口敷料
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③']
    },
  },
  {
    key: "discharge", //疼痛护理-评分
    value: "",
    event: keyf1,
  },
  {
    key: "dischargeSize", //疼痛护理-措施
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②']
    },
  },
  {
    key: "fieldOne", //疼痛护理-处理后评分
    value: "",
    event: keyf1,
  },
  {
    key: "fieldThree", //腹部症状-腹胀
    value: "",
    event: keyf1,
  },
  {
    key: "fieldThree", //腹部症状-便秘
    value: "",
    event: keyf1,
  },
  {
    key: "fieldThree1", //腹部症状-措施
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②']
    }
  },
  {
    key: "fieldThree2", //腹部症状-处理后效果
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②']
    },
  },
  {
    key: "fieldThree3", //呼吸道管理
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤']
    },
  },
  {
    key: "fieldThree4", //活动-床上/下床
    value: "",
    event: keyf1,
  },
  {
    key: "fieldThree6", //睡眠
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤', '⑥']
    },
  },
  {
    key: "fieldThree7", //泵入药物-药物名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
    },
  },
  {
    key: "fieldThree8", //泵入药物-泵速
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
