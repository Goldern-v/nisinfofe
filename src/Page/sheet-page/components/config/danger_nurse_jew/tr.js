/**
   925医院 - 危重患者护理记录单
/**
 * @description: 开发注意事项:
    1、textarea: { width:30 }, change: (e, td) => limitChange(e, td, 4) 的意思是宽度设置30，字数限制4个。
    2、（1）autoComplete: { data: [] } 为下拉框显示序号，根据需要添加。（2）autoComplete: { data: [{name:'',value:''}] } 为下拉框显示序号+内容，根据需要添加。
    3、splice: '' 为下拉框多选功能，搭配autoComplete使用, (''内容可自定义,splice: '/'为用“/”分隔)。
    4、name、next 为双击弹窗的内容，name为标题，next是单位。
    5、自定义项目，在th里要写 canSet: true , key: '' , key值为th对应tr的key值。
    4、{ key: "sign", value: "" } { hidden: false, key: 'signerNo', value: ''} 单签
        { key: "sign2", value: "" } { hidden: false, key: 'signerNo2', value: ''} 双签
        { key: "audit", value: "" } { hidden: false, key: 'auditorNo', value: ''} 审核签名
        当开启多个签名功能时，记得将hidden变为false，如果是true, 就会被隐藏,根据需要使用。
    7、多个签名时还需要在sheet-print-page.vue和excel.vue里配置打印样式。
*/

import {
  keyf1,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
export default [
  { 
    key: "recordDate", 
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
    event: event_time
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: '意识',
    next: '',
    autoComplete: { data: ['√','+','++','+++','++++']},
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "pupilSizeLeft", //左瞳孔大小
    value: "",
    event: keyf1,
    name: '左瞳孔大小',
    next: '',
    autoComplete: { data: ['√','+','++']},
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "pupilSizeRight", //右瞳孔大小
    value: "",
    event: keyf1,
    name: '右瞳孔大小',
    next: '',
    autoComplete: { data: ['√','+','++']},
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "pupilReflexLEFT", //左瞳孔反射
    value: "",
    event: keyf1,
    name: '左瞳孔反射',
    next: '',
    autoComplete: { data: ['√','+','++']},
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "pupilReflexRight", //右瞳孔反射
    value: "",
    event: keyf1,
    name: '右瞳孔反射',
    next: '',
    autoComplete: { data: ['√','+','++']},
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: '体温',
    next: '℃',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: '脉搏',
    next: '次/分',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: '呼吸',
    next: '次/分',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: keyf1,
    name: '血压',
    next: 'mmHg',
    textarea:{ width:50},
    change: (e, td) => limitChange(e, td, 6)
  },
  {
    key: "heart", //心率
    value: "",
    event: keyf1,
    name: '心率',
    next: '次/分',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
  },
  {
    key: "heartRhythm", //心律
    value: "",
    event: keyf1,
    name: '心律',
    next: '',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: ['齐','不齐']},
  },
  {
    key: "bloodOxygen", //血氧饱和度
    value: "",
    event: keyf1,
    name: '血氧饱和度',
    next: '%',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "oxygenTherapy", //氧疗方式
    value: "",
    event: keyf1,
    name: '氧疗方式',
    next: '',
    textarea:{ width:50},
    change: (e, td) => limitChange(e, td, 6),
    autoComplete: { data: ['鼻导管','面罩','储氧面罩','HFNC','无创辅助通气','气管插管给氧','气管切开给氧','文丘里面罩']},
  },
  {
    key: "oxygenMin", //氧疗L/min
    value: "",
    event: keyf1,
    name: '氧疗',
    next: 'L/min',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4),
  },
  {
    key: "food", //入量名称或用法
    value: "",
    event: keyf1,
    name: '入量名称或用法',
    next: '',
    textarea:{ width:80},
    change: (e, td) => limitChange(e, td, 12),
  },
  {
    key: "foodSize", //入量量
    value: "",
    event: keyf1,
    name: '入量量',
    next: '',
    textarea:{ width:45},
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "discharge", //出量名称
    value: "",
    event: keyf1,
    name: '出量名称',
    next: '',
    textarea:{ width:50},
    change: (e, td) => limitChange(e, td, 6),
    autoComplete: { data: ['尿','大便','痰','呕吐物','咯血','引流液']},
  },
  {
    key: "dischargeSize", //出量量
    value: "",
    event: keyf1,
    name: '出量量',
    next: '',
    textarea:{ width:45},
    change: (e, td) => limitChange(e, td, 6),
  },
  {
      key: "position", //体位
      value: "",
      event: keyf1,
      name: '体位',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: { data: ['平','左','右','半坐','端坐','斜坡','中凹','站立','坐位']},
  },
  {
      key: "diseasePatrol", //病情巡视
      value: "",
      event: keyf1,
      name: '病情巡视',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: { data: ['√','×']},
  },
  {
    key: "opCase", //护理操作
    value: "",
    event: keyf1,
    name: '护理操作',
    next: '',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: ['口腔护理','雾化吸入','膀胱冲洗','会阴擦洗','吸痰','鼻饲']},
  },
  {
    key: "custom", //自定义
    value: "",
    event: keyf1,
    name: '',
    next: '',
    textarea:{ width:32},
    change: (e, td) => limitChange(e, td, 4)
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
      width: "190px",
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
