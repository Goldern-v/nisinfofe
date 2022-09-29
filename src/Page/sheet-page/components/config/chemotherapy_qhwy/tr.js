/**
   青海五院 - 化疗观察记录单
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
      key: "chemotherapyDrugs", //化疗药物
      value: "",
      event: keyf1,
      name: '化疗药物',
      next: '%',
      textarea:{ width:200},
      change: (e, td) => limitChange(e, td, 32)
    },
    {
      key: "punctureSite", //刺穿部位
      value: "",
      event: keyf1,
      name: '刺穿部位',
      next: '',
      textarea:{ width:32},
      autoComplete: { data: ['留置针','PICC','CUC','输液管']},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "unobstructed", //通畅
      value: "",
      event: keyf1,
      name: '通畅',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "returnBlood", //回血
      value: "",
      event: keyf1,
      name: '回血',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "noRedness", //无红肿
      value: "",
      event: keyf1,
      name: '无红肿',
      next: '',
      textarea:{ width:45},
      change: (e, td) => limitChange(e, td, 6)
    },
    {
      key: "noExtravasation", //无外滲
      value: "",
      event: keyf1,
      name: '无外滲',
      next: '',
      textarea:{ width:45},
      change: (e, td) => limitChange(e, td, 6)
    },
    {
      key: "noPhlebitis", //无静脉炎
      value: "",
      event: keyf1,
      name: '无静脉炎',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "skinIntact", //皮肤完整
      value: "",
      event: keyf1,
      name: '皮肤完整',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "nausea", //恶心
      value: "",
      event: keyf1,
      name: '恶心',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "vomit", //呕吐
      value: "",
      event: keyf1,
      name: '呕吐',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "anorexia", //厌食
      value: "",
      event: keyf1,
      name: '厌食',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "diarrhea", //腹泻
      value: "",
      event: keyf1,
      name: '腹泻',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "constipate", //便秘
      value: "",
      event: keyf1,
      name: '便秘',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "oralMucositis", //口腔黏膜炎
      value: "",
      event: keyf1,
      name: '口腔黏膜炎',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "patientSafety", //病人安全
      value: "",
      event: keyf1,
      name: '病人安全',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "relatedInformation", //相关知识
      value: "",
      event: keyf1,
      name: '相关知识',
      next: '',
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "pipelineCare", //管路护理
      value: "",
      event: keyf1,
      name: '管路护理',
      next: '',
      autoComplete: { data: ['√','静脉置管','留置胃管','留置尿管','负压引流','营养管']},
      textarea:{ width:32},
      change: (e, td) => limitChange(e, td, 4)
    },
    {
      key: "dietCare", //饮食护理
      value: "",
      event: keyf1,
      name: '饮食护理',
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
        width: "240px",
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
  