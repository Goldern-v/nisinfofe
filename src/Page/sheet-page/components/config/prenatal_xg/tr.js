/*
东莞谢岗 - 产前待产记录单
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6) 的意思是宽度设置45，字数限制6个。
    2、（1）autoComplete: { data: [] } 为下拉框显示序号，根据需要添加。（2）autoComplete: { data: [{name:'',value:''}] } 为下拉框显示序号+内容，根据需要添加。
    3、splice: '' 为下拉框多选功能，搭配autoComplete使用, (''内容可自定义,splice: '/'为用“/”分隔)。
    4、name、next 为双击弹窗的内容，name为标题，next是单位。
    5、自定义项目，在th里要写 canSet: true , key: '' , key值为th对应tr的key值。
    6、{ key: "sign", value: "" } { hidden: false, key: 'signerNo', value: ''} 单签
        { key: "sign2", value: "" } { hidden: false, key: 'signerNo2', value: ''} 双签
        { key: "audit", value: "" } { hidden: false, key: 'auditorNo', value: ''} 审核签名
        当开启多个签名功能时，记得将hidden变为false，如果是true, 就会被隐藏,根据需要使用。
    7、多个签名时还需要在sheet-print-page.vue和excel.vue里配置打印样式。
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

export default [
  {
    key: "recordDate", //年份
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
    event: event_time,
    // click: click_time
  },
  {
    key: "bloodPressure", //血压
    value: "",
    change: (e, td) => limitChange(e, td, 6),
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "血压",
    next: "mmHg",
    textarea: {
      width: 45
    },
  },
  {
    key: "pulse", //P/HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "fetalPosition", //胎方位
    value: "",
    event: keyf1,
    name: "胎方位",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: { data: 
      [
        {name:'LOA',value:'LOA'},
        {name:'LOT',value:'LOT'},
        {name:'LOP',value:'LOP'},
        {name:'ROA',value:'ROA'},
        {name:'ROT',value:'ROT'},
        {name:'ROP',value:'ROP'},
        {name:'LMA',value:'LMA'},
        {name:'RMA',value:'RMA'},
        {name:'LSA',value:'LSA'},
        {name:'RSA',value:'RSA'},
        {name:'横位',value:'横位'},
      ] 
    },
  },
  {
    key: "fetalHeart", //胎心
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "胎心",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "cohesion", //衔接
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "衔接",
    textarea: {
      width: 35
    },
  },
  {
    key: "noContractions", //宫缩无
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "宫缩无",
    textarea: {
      width: 35
    },
  },
  {
    key: "contractionsStrength", //宫缩强度
    value: "",
    name: "宫缩强度",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "contractionsContinued", //宫缩持续
    value: "",
    name: "宫缩持续",
    next: "S",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "contractionsIntermittent", //间歇
    value: "",
    name: "间歇",
    next: "min",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "cervicalDilation", //宫颈扩张
    value: "",
    name: "宫颈扩张",
    next: "cm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "reveal", //先露高低
    value: "",
    name: "先露高低",
    next: "cm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: { data: ['S-3','S-2','S-1','S=0','S+1','S+2','S+3'] },
  },
  {
    key: "ruptured", //胎膜破裂
    value: "",
    name: "胎膜破裂",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: { data: ['已','未','自然','人工'] },
  },
  {
    key: "amniotic", //羊水性状
    value: "",
    name: "羊水性状",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: ['清','Ⅰ度','Ⅱ度','Ⅲ度','血性羊水'] },
    textarea: {
      width: 35
    },
  },
  {
    key: "checkType", //检查方式
    value: "",
    name: "检查方式",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: ['阴查','杠查','腹','阴+杠'] } ,
    textarea: {
      width: 35
    },
  },
  {
    key: "fetalMovement", //胎动情况
    value: "",
    name: "胎动情况",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: ['如常'] },
    textarea: {
      width: 35
    },
  },
  {
    key: "heartMonitoring", //胎心监护
    value: "",
    name: "胎心监护",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: ['持续','停止','√'] },
    textarea: {
      width: 35
    },
  },
  {
    key: "barthe", //barthel评分
    value: "",
    name: "barthel评分",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 50
    },
  },
  {
    key: "healthEducation", //健康宣教
    value: "",
    name: "健康宣教",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: { data: 
      [
        {name:'1.入院宣教',value:'1'},
        {name:'2.辅助检查目的及注意事项',value:'2'},
        {name:'3.吸氧目的及注意事项',value:'3'},
        {name:'4.心电监护目的及注意事项',value:'4'},
        {name:'5.术前宣教',value:'5'},
        {name:'6.术后宣教',value:'6'},
        {name:'7.饮食指导',value:'7'},
        {name:'8.防跌倒',value:'8'},
        {name:'9.出院宣教',value:'9'},
        {name:'10.用药指导',value:'10'},
        {name:'11.输血注意事项',value:'11'},
        {name:'12.特殊感染隔离注意事项',value:'12'},
        {name:'13.产褥期宣教',value:'13'},
        {name:'14.自数胎动的方法',value:'14'},
        {name:'15.分娩知识宣教',value:'15'},
        {name:'16.减痛技巧指导',value:'16'},
        {name:'17.指导用力',value:'17'},
        
      ] 
    },
    splice:true,
    textarea: {
      width: 75
    },
  },
  {
    key: "customItem", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
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
    value: true,
  },
];

