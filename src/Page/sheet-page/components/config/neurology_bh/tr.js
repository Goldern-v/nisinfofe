
/** 
  北海人医 - 神经内科危重护理单
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
    { hidden: true, key: 'recordDate', value: '' },
    { key: "recordMonth", event: event_date, click: click_date, value: ''},
    { key: "recordHour", event: event_time,  value: ''},
    { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏',textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: '心率',textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'nibp', event: keyf1, value: '', name: 'NIBP', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'ibp', event: keyf1, value: '', name: 'IBP', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'oxygenSaturation', event: keyf1, value: '', next: '%', name: '血氧饱和度', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'oxygen', event: keyf1, value: '',next: 'L/min',name: '吸氧', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 12),autoComplete: { data: ['无','鼻导管吸氧','小容量面罩','储氧面罩','面罩接湿化吸氧','气管切开接湿化吸氧','气管插管接湿化吸氧','气管插管接呼吸机辅助','气管切开接呼吸机辅助','文丘里','面罩接T管','无创通气'] },splice:true },
    { key: 'ventilator', event: keyf1, value: '',name: '呼吸机模式', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: { data: ['适应性通气','IPPV','SIMV','CPAPASB','BIPAP' ,'PIV','P-A/C','PC-SIMV','PSV','belevel','APRV','VCV','V-A/L','VC-SIML','其他'] }},
    { key: 'consciousness', event: keyf1, value: '',name: '意识', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4),autoComplete: { data: ['清','模糊','嗜睡','昏睡','浅昏迷','中昏迷','深昏迷','谵妄','麻醉未醒','镇静状态'] } },
    { key: 'leftDiameter', event: keyf1, value: '',next:"mm",name: '直径左', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'rightDiameter', event: keyf1, value: '',next:"mm",name: '直径右', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'leftPhotoreaction', event: keyf1, value: '',name: '光反应左', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: { data: ['+','±','-'] }},
    { key: 'rightPhotoreaction', event: keyf1, value: '',name: '光反应右', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: { data: ['+','±','-'] }},
    { key: 'leftUpperLimb', event: keyf1, value: '',name: '左上肢', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4),autoComplete: { data: ['0','I','II','III','IV','V'] }},
    { key: 'leftLowerLimbs', event: keyf1, value: '',name: '左下肢', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: { data: ['0','I','II','III','IV','V'] }},
    { key: 'rightUpperLimb', event: keyf1, value: '',name: '右上肢', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4),autoComplete: { data: ['0','I','II','III','IV','V'] } },
    { key: 'rightLowerLimbs', event: keyf1, value: '',name: '右下肢', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: { data: ['0','I','II','III','IV','V'] }},
    { key: 'food', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 90 }, change: (e, td) => limitChange(e, td, 14)},
    { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'discharge', event: keyf1, value: '', next: '', name: '出量', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8),autoComplete: { data: ['尿量','大便','胃液','呕吐液','痰液','胆汁','胰液','肠液','胃造瘘','左引流液','腹腔引流','左胸液','右胸液','上胸液','下胸液','盆腔引流','痰液','头部引流液'] } },
    { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'outputColor', event: keyf1, value: '', next: '', name: '出量颜色', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4),autoComplete: { data: ['淡黄色','黄白色','血丝色','血色','血性','淡青色','棕色','奶油色','灰色','绿色','粉红色','淡粉色','黄褐色','白色','黄色','其他'] } },
    { key: 'outputCharacter', event: keyf1, value: '', next: '', name: '出量性状', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4),autoComplete: { data: ['粘稠','稀薄','清','浑浊','絮状物'] }},
    { key: 'pipeline', event: keyf1, value: '', name: '管道情况', textarea: { width: 140 }, change: (e, td) => limitChange(e, td, 25),autoComplete: { data: ['无','口咽通气管','鼻咽通气管','导尿管','胃管','浅静脉留置针','气切','气管插管','气切套管','PICC','输液港','CVC','胸腔引流管','脑室引流管','硬膜下引流管','硬膜外引流管'] },splice:true},
    { key: 'skin', event: keyf1, value: '', name: '皮肤情况', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 12) ,autoComplete: { data: ['完整','苍白','黄疸','潮红','紫绀','干燥','出血点','压力性损伤','破损','水肿','皮疹','疤痕','淤青'] },splice:true},
    // { key: 'armValue', event: keyf1, value: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
    // { key: 'armValue2', event: keyf1, value: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },//去掉自定义，给入量名称添加位置
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
      textarea: { width: 150 },
      event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
    },
    { key: "sign", value: "" },//单签
    // { key: "sign2", value: "" },//双签
    // { key: "audit", value: "" },//审核签名
    { hidden:true, key:'id', value:''},
    { hidden:true, key:'signerName', value:''},
    { hidden:true, key:'signerName2', value:''},
    { hidden:true, key:'status', value:''},
    { hidden:true, key:'recordSource', value:''},
    { hidden:true, key:'recordYear', value:''},
    { hidden:true, key:'dataHash', value:''},
    { hidden:true, key:'recordDate', value:''},
    { hidden:true, key:'monthHour', value:''},
    { hidden:false, key:'signerNo', value:''},//单签
    { hidden:true, key:'signerNo2', value:''},//双签
    { hidden:false, key:'auditorNo', value:''},//审核签名
    { hidden:true, key:'auditorName', value:''},
    { hidden:true, key:'empNo', value:''},
    { hidden:true, key:'multiSign', value:''}
    
  ]
  