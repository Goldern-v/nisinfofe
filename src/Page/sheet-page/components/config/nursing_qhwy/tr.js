/**perinealCare
   青海五院 - 一般护理记录单
*/

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
      key: "temperature", //体温
      value: "",
      event: keyf1,
      name: '体温',
      next: '℃',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "pulse", //脉搏
      value: "",
      event: keyf1,
      name: '脉搏',
      next: '次/分',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "breath", //呼吸
      value: "",
      event: keyf1,
      name: '呼吸',
      next: '次/分',
      textarea:{ width:35},
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
      key: "spo2", //SpO2
      value: "",
      event: keyf1,
      name: 'spo2',
      next: '%',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "heartRate", //心率
      value: "",
      event: keyf1,
      name: '心率',
      next: '',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "consciousness", //意识
      value: "",
      event: keyf1,
      name: '意识',
      next: '',
      autoComplete: { data: ['昏睡','嗜睡','浅昏迷','深昏迷','清醒','模糊','谵望']},
      textarea:{ width:50},
      change: (e, td) => limitChange(e, td, 6)
    },
    {
      key: "oxygenTherapy", //氧疗
      value: "",
      event: keyf1,
      name: '氧疗',
      next: 'L/分',
      // autoComplete: { data: ['√']},
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "leftSize", //左瞳孔大小
      value: "",
      event: keyf1,
      name: '左瞳孔大小',
      next: 'mm',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "leftReflex", //左瞳孔光反射
      value: "",
      event: keyf1,
      name: '左瞳孔光反射',
      next: '',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "rightSize", //右瞳孔大小
      value: "",
      event: keyf1,
      name: '右瞳孔大小',
      next: 'mm',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "rightReflex", //右瞳孔光反射
      value: "",
      event: keyf1,
      name: '右瞳孔光反射',
      next: '',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "food", //入量名称
      value: "",
      event: keyf1,
      name: '入量名称',
      next: '',
      textarea:{ width:50},
      change: (e, td) => limitChange(e, td, 8)
    },
    {
      key: "incomingCategory", //入量类别
      value: "",
      event: keyf1,
      name: '入量类别',
      next: '',
      autoComplete: { data: ['输液','口入','鼻饲','空肠注入','术中输液','静脉输液','皮下注射','输血']},
      textarea:{ width:50},
      change: (e, td) => limitChange(e, td, 8)
    },
    {
      key: "foodSize", //入量量
      value: "",
      event: keyf1,
      name: '入量量',
      next: 'ml',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "discharge", //出量名称
      value: "",
      event: keyf1,
      name: '出量名称',
      next: '',
      autoComplete: { data: ['尿量','呕血','大便','颈部引流量','胸壁引流量','胃肠减压','T管引流','腹腔引流','闭式引流','PTCD引流','肝上引流','胰周引流','盆腔引流','腋下引流','皮下引流','骶前引流','腹膜引流']},
      textarea:{ width:50},
      change: (e, td) => limitChange(e, td, 8)
    },
    {
      key: "dischargeSize", //出量量
      value: "",
      event: keyf1,
      name: '出量量',
      next: 'ml',
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "outputColor", //出量颜色
      value: "",
      event: keyf1,
      name: '出量颜色',
      next: '',
      autoComplete: { data: ['淡黄','澄清','草绿色']},
      textarea:{ width:35},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "outputShape", //出量性状
      value: "",
      event: keyf1,
      name: '出量性状',
      next: '',
      autoComplete: { data: ['澄清','血性','黏稠']},
      textarea:{ width:35},
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
        width: "320px",
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
