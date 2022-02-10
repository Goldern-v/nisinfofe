/*
北海人一-神经外科危重护理记录
*/
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
let 入量名称 = [];
let 出量名称 = ['尿量', '大便', '胃液', '胆汁', '胰液', '肠液', '呕吐液','胃造痿', '咯血量', '左引流液', '腹腔引流', '左胸液', '右胸液', '上胸液','下胸液', '盆腔引流', '痰液', '头部引流液'];
let 意识 = ['清', '模糊', '嗜睡', '昏睡', '浅昏迷', '昏迷', '深昏迷', '谵妄' , '麻醉未醒', '镇静状态'];
let 管道护理 = ['无', '导尿管', '胃管', '深静脉导管', '浅静脉留置针', '胸腔引流管', '气管插管', '气管套管', '脑室引流管', '血肿腔引流管', '硬膜下引流管', '硬膜外引流管', '颅内压监测管', '腹腔引流管', '动脉导管'];
let 皮肤情况 = ['完整', '苍白', '黄疸', '潮红', '紫绀', '干燥', '出血点', '压疮' , '破损', '水肿' , '皮疹', '疤痕' , '淤青', '失禁性皮炎'];
let 颜色 = ['黄白色', '血丝色', '血色', '淡青色', '棕色', '奶油色', '灰色', '绿色' , '粉红色', '淡粉色' , '黄褐色' , '白色', '黄色'];
let 性状 = ['粘稠', '稀薄'];
let 睁眼 = ['4', '3', '2', '1'];
let 语言 = ['5', '4', '3', '2', '1'];
let 运动 = ['6', '5', '4', '3', '2', '1'];
let 肌力 = ['0', '1', '2', '3', '4', '5'];
let 瞳孔 = ['+', '±', '-'];

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
    event: keyf1,
    name: "体温",
    next: "℃",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 30
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 30
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 30
    },
  },
  {
    key: "nibp", //NIBP
    value: "",
    name: "NIBP",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "ibp", //IBP
    value: "",
    name: "IBP",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "saturation", //血氧饱和度
    value: "",
    name: "血氧饱和度",
    next: "%",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "oxygenInhalation", //吸氧
    value: "",
    name: "吸氧",
    next: "L/min",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 50
    },
  },
  {
    key: "consciousness", //意识
    value: "",
    name: "意识",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 意识
    },
  },
  {
    key: "eyesOpen", //睁眼
    value: "",
    name: "睁眼",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 睁眼
    },
  },
  {
    key: "language", //语言
    value: "",
    name: "语言",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 语言
    },
  },
  {
    key: "sports", //运动
    value: "",
    name: "运动",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 运动
    },
  },
  {
    key: "diameterLeft", //瞳孔直径左
    value: "",
    name: "瞳孔直径左",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    // autoComplete: {
    //   data: 瞳孔
    // },
  },
  {
    key: "diameterRight", //瞳孔直径右
    value: "",
    name: "瞳孔直径右",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    // autoComplete: {
    //   data: 瞳孔
    // },
  },
  {
    key: "reactionLeft", //瞳孔光反应左
    value: "",
    name: "瞳孔光反应左",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 瞳孔
    },
  },
  {
    key: "reactionRight", //瞳孔光反应右
    value: "",
    name: "瞳孔光反应右",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 瞳孔
    },
  },
  {
    key: "strengthLeftOn", //肌力左上肢
    value: "",
    name: "肌力左上肢",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 肌力
    },
  },
  {
    key: "strengthLeftDown", //肌力左下肢
    value: "",
    name: "肌力左下肢",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 肌力
    },
  },
  {
    key: "strengthRightOn", //肌力右上肢
    value: "",
    event: keyf1,
    name: "肌力右上肢",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 肌力
    },
  },
  {
    key: "strengthRightDown", //肌力右下肢
    value: "",
    name: "肌力右下肢",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
    autoComplete: {
      data: 肌力
    },
  },
  {
    key: "icp", //特殊监测icp
    value: "",
    name: "ICP",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "cvp", //特殊监测cvp
    value: "",
    name: "CVP",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "food", //入量名称
    value: "",
    name: "入量名称",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 20),
    textarea: {
      width: 125
    },
  },
  {
    key: "foodSize", //入量量
    value: "",
    name: "入量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 30
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    name: "出量名称",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: 出量名称
    },
  },
  {
    key: "dischargeSize", //出量量
    value: "",
    name: "出量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 30
    },
  },
  {
    key: "outputColor", //出量颜色
    value: "",
    name: "出量颜色",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: 颜色
    },
  },
  {
    key: "outputTraits", //出量性状
    value: "",
    name: "出量性状",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: 性状
    },
  },
  {
    key: "pipeCare", //管道护理
    value: "",
    event: keyf1,
    name: "管道护理",
    change: (e, td) => limitChange(e, td, 22),
    textarea: {
      width: 140
    },
    splice: true,
    autoComplete: {
      data: 管道护理
    },
  },
  {
    key: "skinCondition", //皮肤情况
    value: "",
    event: keyf1,
    name: "皮肤情况",
    change: (e, td) => limitChange(e, td, 14),
    textarea: {
      width: 90
    },
    splice: true,
    autoComplete: {
      data: 皮肤情况
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
      background: "transparent",
    },
    change: (e, td) => limitChange(e, td, 12),
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
    value: true,
  },
];
