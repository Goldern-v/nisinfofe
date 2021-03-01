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
    key: "temperature", //体温-数值
    value: "",
    event: keyf1
  },
  {
    key: "pulse", //体温-措施
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['适量饮水', '温水/酒精擦浴', '冰块冷敷', '减少盖被', '遵医嘱用药']
      data: ['①', '②', '③', '④', '⑤']
    },
    // textarea: {
    //   width: 48
    // },
  },
  {
    key: "breath", //脉搏
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
      // data: ['观察做好宣教', '遵医嘱应用药物']
      data: ['①', '②']
    },
    // textarea: {
    //   width: 48
    // },
  },
  {
    key: "pupilSizeRight", // 睡眠-状态
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['安静休息', '间断入眠', '入睡困难']
      data: ['①', '②', '③']
    },
    // textarea: {
    //   width: 30
    // },
  },
  {
    key: "pupilReflexLeft", // 睡眠-措施
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['暗化病室', '用药']
      data: ['①', '②']
    },
    // textarea: {
    //   width: 30
    // },
  },
  {
    key: "pupilReflexRight", // 饮食
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['①', '②', '③', '④', '⑤', '⑥', '⑦']
    },
    // textarea: {
    //   width: 48
    // },
  },
  {
    key: "pupilReflexRight0", // 食欲
    value: "",
    event: keyf1,
    autoComplete: {
      data: ['a', 'b', 'c', 'd', 'e', 'f']
    },
    // textarea: {
    //   width: 48
    // },
  },
  {
    key: "pupilReflexRight1", // 临床表现-疼痛-部位
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['腹部', '胸部', '头部', ' ']
      data: ['①', '②', '③', '④']
    },
    // textarea: {
    //   width: 30
    // },
  },
  {
    key: "pupilReflexRight2", // 临床表现-疼痛-评分
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight3", // 临床表现-疼痛-措施
    value: "",
    event: keyf1,
  },
  {
    key: "pupilReflexRight4", // 临床表现-其他症状
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['恶心', '呕吐', '腹胀', '纳差', '烧心', '返酸', '大便失禁', '大便不成形', '腹泻', '便秘', '黑便', '血便', '小便失禁', '尿频', '尿色异常']
      data: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑾', '⑿', '⒀', '⒁', '⒂', '⒃']
    },
    // textarea: {
    //   width: 36
    // },
  },
  {
    key: "pupilReflexRight5", // 临床表现-措施
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['观察做好宣教', '遵医嘱用药', ' ']
      data: ['①', '②', '③']
    },
    // textarea: {
    //   width: 46
    // },
  },
  {
    key: "food", //临床表现-效果
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['未再出现上述症状', '减轻', '差']
      data: ['①', '②', '③']
    },
    // textarea: {
    //   width: 48
    // },
  },
  {
    key: "foodSize", //临床表现-VTE-选项
    value: "",
    event: keyf1
  },
  {
    key: "discharge", //临床表现-VTE-评分
    value: "",
    event: keyf1,
  },
  {
    key: "dischargeSize", //临床表现-VTE-措施
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['健康宣教', '基础预防', '物理预防', '药物预防', '放警示标示']
      data: ['A', 'B', 'C', 'D', 'E']
    },
    // textarea: {
    //   width: 36
    // },
  },
  {
    key: "fieldOne", //临床表现-压疮评分
    value: "",
    event: keyf1,
  },
  {
    key: "fieldTwo", //临床表现-心理状态
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['稳定', '紧张', '焦虑', '抑郁', '恐惧', '烦躁']
      data: ['①', '②', '③', '④', '⑤', '⑥']
    },
    // textarea: {
    //   width: 30
    // },
  },
  {
    key: "fieldThree", //临床表现-营养状况
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['良好', '一般', '差']
      data: ['①', '②', '③']
    }
  },
  {
    key: "fieldThree1", //临床表现-依从性
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['好', '一般', '差']
      data: ['①', '②', '③']
    }
  },
  {
    key: "fieldThree2", //临床表现-教育需求
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['饮食', '检查化验', '药物', '活动']
      data: ['①', '②', '③', '④']
    },
    // textarea: {
    //   width: 30
    // },
  },
  {
    key: "fieldThree3", //化验-主要阳性项目
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['血红蛋白', '白细胞', '血小板', '血氨', '血钾', '血钠', '血淀粉酶', '血凝', '肝功']
      data: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩']
    },
    // textarea: {
    //   width: 30
    // },
  },
  {
    key: "fieldThree4", //化验-结果
    value: "",
    event: keyf1,
  },
  {
    key: "fieldThree5", //化验-措施
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['遵医嘱用药', '观察做好宣教']
      data: ['①', '②']
    },
    // textarea: {
    //   width: 36
    // },
  },
  {
    key: "fieldThree6", //检查/检验-项目
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['胃镜', '肠镜', '胃/肠息肉电切', '胃镜下碎石', '食管扩张术', '食管静脉曲张套扎术', '支架植入', '介入治疗']
      data: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨']
    },
    // textarea: {
    //   width: 60
    // },
  },
  {
    key: "fieldThree7", //检查/检验-措施
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['检查/治疗前指导', '检查/治疗后指导']
      data: ['①', '②']
    },
    // textarea: {
    //   width: 48
    // },
  },
  {
    key: "fieldThree8", //检查/检验-效果
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['知晓并依从', '知晓但依从性差']
      data: ['①', '②']
    },
    // textarea: {
    //   width: 42
    // },
  },
  {
    key: "fieldThree9", //出院/转科指导
    value: "",
    event: keyf1,
    autoComplete: {
      // data: ['饮食', '休息与活动', '药物', '复诊', '转至___病区 ']
      data: ['①', '②', '③', '④', '⑤']
    },
    // textarea: {
    //   width: 48
    // },
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
