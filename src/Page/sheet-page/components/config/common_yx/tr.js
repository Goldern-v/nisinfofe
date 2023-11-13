
/**
  武汉亚心 -护理记录单
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
  let outSizeFile = ['尿', '大便', '汗', '心包纵隔', '纵膈引流', '左胸引', '右胸引', '心包引流', '呕吐物', '胃液', '痰液', '咯血', '超滤', '转科出量', '腹水', '胸水', '脑脊液', '左腹腔引流液', '右腹腔引流液', '血液','腹透']
  let IncisionDressings = ['敷料干燥', '愈合良好', '少量渗血', '大量渗血', '可见瘀斑', '可见血肿', '可见肿胀','N']
  let IndwellingNeedle = ['A左上肢N', 'A置入左上肢N', 'A拔除左上肢N', 'A右上肢N', 'A置入右上肢N', 'A拔除右上肢N', 'A左下肢N', 'A置入左下肢N', 'A拔除左下肢N', 'A右下肢N', 'A置入右下肢N', 'A拔除右下肢N', 'A头皮N', 'A置管头皮N', 'A拔除头皮N', '带入', 'A左股静脉N', 'A左股静脉置管N', 'A左股静脉拔除N', 'A右股静脉N', 'A右股静脉置管N','A右股静脉拔除N']
  let DeepVeins = ['B左锁骨下N', 'B置入左锁骨下N', 'B拔除左锁骨下N', 'B左颈内N', 'B置入左颈内N', 'B拔除左颈内N', 'B右锁骨下N', 'B置入右锁骨下N', 'B拔除右锁骨下N', 'B右颈内N', 'B置入右颈内N', 'B拔除右颈内N', 'B左股静脉N', 'B置入左股静脉N', 'B拔除左股静脉N', 'B右股静脉N', 'B置入右股静脉N', 'B拔除右股静脉N', 'R左上肢N', 'R置入左上肢N', 'R拔除左上肢N', 'R右上肢N', 'R置入右上肢N', 'R拔除右上肢N', 'R头静脉N', 'R置入头静脉N', 'R拔除头静脉N','带入']
  let consciousness = ['清楚', '嗜睡', '浅昏迷', '深昏迷', '模糊', '谵妄','镇静']
  let catheterMode = ['正常', '置管', '拔除', '封管','带入']
  let catheterPosition = ['左颈内', '右颈内', '左上肢', '右上肢', '双上肢', '左下肢', '右下肢', '双下肢', '左锁骨下', '右锁骨下', '左股', '右股', '左肱', '右肱', '左桡', '右桡','头部']
  let catheterTraits = ['澄清', '浑浊', '血性', '絮状物','洗肉水样']
  let catheterColour = ['淡黄澄清', '肉眼血尿', '无色透明', '深黄', '洗肉水样', '鲜红色', '暗红', '浓茶色', '酱油色', '咖啡色', '墨绿色','淡红色']
  let oxygen = ['鼻导管', '面罩', '双通道', 'CPAP', 'pexp', 'pinsp', 'BIPAP', '有创呼吸机','停']
  let compressedSkin = ['N', '压红','皮损']
  let cardiac = ['窦律', '窦速', '窦性心动过缓', '窦性心律不齐', '窦性停搏', '交界性心律', '室上速', '频发房早', '房扑', '房颤', '房速', '偶见室早', '频发室早', '短阵室速', '室颤', '室性自主心律', '室性逸搏', '心室停搏', 'Ⅲ度AVB', 'Ⅱ度AVB', 'Ⅰ度AVB', '起搏心律', '起搏与自主心律交替', '交界性逸搏', '心电机械分离', '停','室速']
  let lying = ['斜坡位', '平卧', '右侧', '左侧', '端坐','俯卧位']
  export default [
    { hidden: true, key: 'recordDate', value: '' },
    { key: "recordMonth", event: event_date, click: click_date, value: ''},
    { key: "recordHour", event: event_time, click: click_time ,value: ''},
    { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: consciousness } },
    { key: 'temperature', event: keyf1, value: '', next: '℃', name: 'T',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'pulse', event: keyf1, value: '', next: '次/分', name: 'HR',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'BP',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'spo2', event: keyf1, value: '', next: '%', name: 'Sp02',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'cvp', event: keyf1, value: '', next: 'mmHg', name: 'CVP',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'cardiac', event: keyf1, value: '', next: '', name: '心电监测', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: cardiac } },
  { key: 'incision', event: keyf1, value: '', next: '', name: '切口敷料', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: IncisionDressings }},
  { key: 'oxygen', event: keyf1, value: '', next: '升/分', name: '吸氧方式', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: oxygen } },
  { key: 'intravenous', event: keyf1, value: '', next: '升/分', name: '留置针', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: IndwellingNeedle } },
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '深静脉', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: DeepVeins } },
    { key: 'customItem2', event: keyf1, value: '', next: '', name: '',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
    { key: 'catheterName', event: keyf1, value: '', next: '', name: '导管及引流管名称',textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 12), autoComplete: { data: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'] },splice:true},
  { key: 'catheterPosition', event: keyf1, value: '', next: '', name: '导管及引流管部位', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: catheterPosition }},
  { key: 'catheterMode', event: keyf1, value: '', next: '', name: '导管及引流管状态', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: catheterMode } },
    { key: 'catheterDepth', event: keyf1, value: '', next: 'cm', name: '导管及引流管深度',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'catheterColour', event: keyf1, value: '', next: '', name: '导管及引流管颜色', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: catheterColour } },
  { key: 'catheterTraits', event: keyf1, value: '', next: '', name: '导管及引流管性状', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: catheterTraits } },
  { key: 'lying', event: keyf1, value: '', next: '', name: '卧位', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: lying } },
  { key: 'compressedSkin', event: keyf1, value: '', next: '', name: '受压皮肤', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: compressedSkin } },
    { key: 'inputReserve', event: keyf1, value: '', next: 'ml', name: '入量项目(备用量)',textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6) },
    { key: 'practicalAmount', event: keyf1, value: '', next: 'ml', name: '入量实用量',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputItem', event: keyf1, value: '', next: '', name: '出量项目', textarea: { width: 42 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: outSizeFile } },
    { key: 'outputQuantity', event: keyf1, value: '', next: 'ml', name: '量',textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'measures', event: keyf1, value: '', next: '', name: '护理措施', textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 14), autoComplete: { data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'] }, splice: true },

    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
      textarea: { width: 150 },
      event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
    },
    { key: "sign", value: "" },//单签
    // { key: "sign2", value: "" },//双签
    { key: "audit", value: "" },//审核签名
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
