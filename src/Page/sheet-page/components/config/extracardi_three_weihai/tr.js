/**
  顺德龙江 - 护理记录单（骨科）
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

import { multiDictInfo } from "../../../api/index";
import { keyf1, limitChange } from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
import info from "../sheetInfo";

const tanyeColor = ["A", "B", "C"]
const tanyeSize = ["A", "B", "C"]
const tanye2 = ["A 稀薄","B 粘稠","C 血性"]
const yinliuyeColor = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const yinliuyexingzhi = ["A 血性",'B 澄清','C 浑浊','D 云絮状沉淀','E 乳糜状','F 脓性','G 有气体溢出'];
const niaose = ["A", "B", "C", "D"]
const Braden_cuoshi = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
const diedao_cuoshi = ['A', 'B', 'C', 'D', 'E', 'F']
const fjhxbg_cuoshi = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const tt_cuoshi = ['A', 'B', 'C', 'D', 'E']

const check = ["√"]

const colors = [
  {value:"",label:""},
  {value:"淡黄色",label:"淡黄色"},
  {value:"深黄色",label:"深黄色"},
  {value:"褐色",label:"褐色"},
  {value:"黄绿色",label:"黄绿色"},
  {value:"墨绿色",label:"墨绿色"},
  {value:"咖啡色",label:"咖啡色"},
  {value:"黑色",label:"黑色"},
  {value:"淡红色血性",label:"淡红色血性"},
  {value:"暗红色血性",label:"暗红色血性"},
  {value:"新鲜血性",label:"新鲜血性"},
  {value:"陶土血性",label:"陶土血性"},
  {value:"澄清无色",label:"澄清无色"},
]
let outProject1 = [
  [{pipingOne:"右颈内静脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"右锁骨下静脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"左肱动脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"左足背动脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"左桡动脉",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"右手背",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"右手腕",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"右前臂",unClear:true},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"",defaultInput:true,type:"textarea"},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"",defaultInput:true,type:"textarea"},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
  [{pipingOne:"",defaultInput:true,type:"textarea"},{pipingTwo:"",type:"input"},{pipingThree:"",type:"selectGou"}],
]
let outChoseItem1 = {
  th:[
    {title:"名称",colwidth:"50%"},
    {title:"外露长度",colwidth:"30%"},
    {title:"护理",colwidth:"20%"}
  ],
  outProject:outProject1,
  tableNum:3,
  maxLength:10,
  dischargeType:"动静脉置管",
  modalLabel:"管路",
  sheetypeCode:['pipingOne','pipingTwo','pipingThree']
}
let outProject2 = [
  [{pipingFout:"心包胸骨后引流",unClear:true},{pipingFive:"",type:"select",option:colors},{pipingSix:"",type:"input",autoComplete: { data:yinliuyexingzhi },},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"左胸腔闭式引流",unClear:true},{pipingFive:"",type:"select",option:colors},{pipingSix:"",type:"input",autoComplete: { data:yinliuyexingzhi },},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"左胸腔引流",unClear:true},{pipingFive:"",type:"select",option:colors},{pipingSix:"",type:"input",autoComplete: { data:yinliuyexingzhi },},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"",defaultInput:true,type:"textarea"},{pipingFive:"",type:"select",option:colors},{pipingSix:"",type:"input",autoComplete: { data:yinliuyexingzhi },},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"",defaultInput:true,type:"textarea"},{pipingFive:"",type:"select",option:colors},{pipingSix:"",type:"input",autoComplete: { data:yinliuyexingzhi },},{pipingSeven:"",type:"selectGou"}],
  [{pipingFout:"",defaultInput:true,type:"textarea"},{pipingFive:"",type:"select",option:colors},{pipingSix:"",type:"input",autoComplete: { data:yinliuyexingzhi },},{pipingSeven:"",type:"selectGou"}],
]
let outChoseItem2 = {
  th:[
    {title:"名称",colwidth:"30%"},
    {title:"颜色",colwidth:"30%"},
    {title:"性质",colwidth:"30%"},
    {title:"护理",colwidth:"10%"}
  ],
  outProject:outProject2,
  tableNum:3,
  dischargeType:"引流管",
  modalLabel:"管路",
  maxLength:5,
  sheetypeCode:['pipingFout','pipingFive','pipingSix','pipingSeven'],
}

export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "" },
  { key: "recordHour", event: event_time, click: click_time, value: "" },
  {
    key: "breatheOne",
    event: keyf1,
    value: "",
    name: "体疗",
    textarea: { width: 40 },
    autoComplete: { data: check },
  },
  {
    key: "breatheTwo",
    event: keyf1,
    value: "",
    name: "膨肺/吸痰",
    textarea: { width: 40 },
    autoComplete: { data: ["√/√", '√/', '/√'] },
  },
  {
    key: "breatheThree",
    event: keyf1,
    value: "",
    name: "痰液颜色",
    textarea: { width: 35 },
    autoComplete: { data: [{name: 'A白色', value: 'A'},{name: 'B黄色', value: 'B'},{name: 'C绿色', value: 'C'}]},
  },
  {
    key: "breatheFout",
    event: keyf1,
    value: "",
    name: "痰液性状",
    textarea: { width: 35 },
    autoComplete: { data: [{name: 'A稀薄', value: 'A'},{name: 'B粘稠', value: 'B'},{name: 'C血性', value: 'C'}] },
    splitFlag:" "
  },
  {
    key: "breatheFive",
    event: keyf1,
    value: "",
    name: "痰液量",
    textarea: { width: 35 },
    autoComplete: { data:[{name: 'A少量', value: 'A'},{name: 'B中量', value: 'B'},{name: 'C大量', value: 'C'}] },
  },
  {
    key: "pipingOne",
    event: keyf1,
    value: "",
    next: "",
    name: "动静脉置管:名称",
    outChoseItem:outChoseItem1,
    textarea: { width: 60 },
    change: (e, td) => limitChange(e, td, 10)
  },
  {
    key: "pipingTwo",
    event: keyf1,
    value: "",
    next: "cm",
    name: "外露长度",
    outChoseItem:outChoseItem1,
    textarea: { width: 40 },
  },
  {
    key: "pipingThree",
    event: keyf1,
    value: "",
    name: "动静脉置管:护理",
    textarea: { width: 35 },
    outChoseItem:outChoseItem1,
    autoComplete: { data: check },
  },
  {
    key: "pipingFout",
    event: keyf1,
    value: "",
    name: "引流管:名称",
    outChoseItem:outChoseItem2,
    textarea: { width: 60 },
  },
  {
    key: "pipingFive",
    event: keyf1,
    value: "",
    name: "引流液颜色",
    textarea: { width: 35 },
    outChoseItem:outChoseItem2,
    autoComplete: { data: [{name: 'A鲜红色', value: 'A'},{name: 'B暗红色', value: 'B'},{name: 'C淡红色', value: 'C'},{name: 'D淡黄色', value: 'D'},{name: ' E黄绿色', value: 'E'},{name: 'F黄褐色', value: 'F'},{name: 'G无色', value: 'G'}] },
  },
  {
    key: "pipingSix",
    event: keyf1,
    value: "",
    name: "引流液性质",
    outChoseItem:outChoseItem2,
    textarea: { width: 35 },
    autoComplete: { data: [{name: 'A血性', value: 'A'},{name: 'B澄清', value: 'B'},{name: 'C浑浊', value: 'C'},{name: 'D云絮状沉淀', value: 'D'},{name: ' E乳糜状', value: 'E'},{name: 'F脓性', value: 'F'},{name: 'G有气体溢出', value: 'G'}] },
    splitFlag:" "
  },
  {
    key: "pipingSeven",
    event: keyf1,
    value: "",
    name: "引流管护理",
    outChoseItem:outChoseItem2,
    textarea: { width: 35 },
    autoComplete: { data: check },
   },
  {
    key: "pipingEight",
    event: keyf1,
    value: "",
    name: "尿管尿色",
    textarea: { width: 35 },
    autoComplete: { data:[{name: 'A淡黄', value: 'A'},{name: 'B深黄', value: 'B'},{name: 'C酱油色', value: 'C'},{name: 'D血性', value: 'D'}] },
  },
  {
    key: "skin",
    event: keyf1,
    value: "",
    next: "",
    name: "皮肤护理",
    textarea: { width: 40 },
    autoComplete: { data: check },
  },
  {
    key: "riskOne",
    event: keyf1,
    value: "",
    name: "Braden压疮评分",
    textarea: { width: 40 },
  },
  {
    key: "riskTwo",
    event: keyf1,
    value: "",
    next: "",
    name: "Braden压疮护理措施",
    textarea: { width: 60 },
    splice: '.', 
    autoComplete: { data: [{name: 'A体位变换', value: 'A'},{name: 'B气垫床', value: 'B'},{name: 'C皮肤护理', value: 'C'},{name: 'D预防性敷料', value: 'D'},{name: 'E预防医疗器械性压疮', value: 'E'},{name: 'G营养评估支持', value: 'G'},{name: 'H健康宣教', value: 'H'},{name: 'I悬挂警示标识牌', value: 'I'}] },
  },
  {
    key: "riskThree",
    event: keyf1,
    value: "",
    name: "跌倒评分",
    textarea: { width: 40 },
  },
  {
    key: "riskFout",
    event: keyf1,
    value: "",
    next: "",
    name: "跌倒护理措施",
    textarea: { width: 60 },
    splice: '.',
    autoComplete: { data: [{name: 'A及时发现并满足患者需要', value: 'A'},{name: 'B使用床档', value: 'B'},{name: 'C使用约束带', value: 'C'},{name: 'D悬挂防跌倒、防坠床警示牌', value: 'D'},{name: 'E告知患者寻找协助的方法', value: 'E'},{name: 'F加强营养', value: 'F'}]},
  },
  {
    key: "riskFive",
    event: keyf1,
    value: "",
    name: "非计划性拔管评分",
    textarea: { width: 40 },
  },
  {
    key: "riskSix",
    event: keyf1,
    value: "",
    next: "",
    name: "非计划性拔管护理措施",
    textarea: { width: 60 },
    splice: '.',
    autoComplete: { data:  [{name: 'A保持通畅', value: 'A'},{name: 'B严格交接班', value: 'B'},{name: 'C妥善固定', value: 'C'},{name: 'D约束带', value: 'D'},{name: 'E药物镇静镇痛', value: 'E'},{name: 'F评估耐受性及依从性', value: 'F'},{name: 'G管路标识', value: 'G'},{name: 'H健康教育', value: 'H'}] },
  },
  {
    key: "rass",
    event: keyf1,
    value: "",
    name: "RASS镇静评估",
    textarea: { width: 40 },
  },
  {
    key: "painOne",
    event: keyf1,
    value: "",
    name: "疼痛评估工具/评分",
    textarea: { width: 50 },
  },
  {
    key: "painTwo",
    event: keyf1,
    value: "",
    next: "",
    name: "疼痛评估护理措施",
    textarea: { width: 60 },
    splice: '.',
    autoComplete: { data: [{name: 'A取舒适卧位', value: 'A'},{name: 'B心理护理', value: 'B'},{name: 'C理疗', value: 'C'},{name: 'D通知医生', value: 'D'},{name: 'E药物治疗', value: 'E'}] },
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
      width: "365px",
      background: "transparent"
    },
    textarea: { width: 365 },
    event: function(e, td) {
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  { key: "sign", value: "" }, //单签
  // { key: "sign2", value: "" },//双签
  // { key: "audit", value: "" },//审核签名
  { hidden: true, key: "id", value: "" },
  { hidden: true, key: "signerName", value: "" },
  { hidden: true, key: "signerName2", value: "" },
  { hidden: true, key: "status", value: "" },
  { hidden: true, key: "recordSource", value: "" },
  { hidden: true, key: "recordYear", value: "" },
  { hidden: true, key: "dataHash", value: "" },
  { hidden: true, key: "recordDate", value: "" },
  { hidden: true, key: "monthHour", value: "" },
  { hidden: false, key: "signerNo", value: "" }, //单签
  { hidden: true, key: "signerNo2", value: "" }, //双签
  { hidden: false, key: "auditorNo", value: "" }, //审核签名
  { hidden: true, key: "auditorName", value: "" },
  { hidden: true, key: "empNo", value: "" },
  { hidden: true, key: "multiSign", value: "" }
];

export function getListData4() {
  let list = [
    "痰液性状",
    "痰液颜色",
    "痰液量",
    "引流液颜色",
    "引流液性质",
    "尿管尿色",
    "Braden压疮护理措施",
    "跌倒护理措施",
    "非计划性拔管护理措施",
    "疼痛评估护理措施",
  ];
  multiDictInfo(list,info.sheetType).then(res => {
    let data = res.data.data;
    console.log(data);
    setList(tanye2, "痰液性状", data);
    setList(tanyeColor, "痰液颜色", data);
    setList(tanyeSize, "痰液量", data);
    setList(yinliuyeColor, "引流液颜色", data);
    setList(yinliuyexingzhi, "引流液性质", data);
    setList(niaose, "尿管尿色", data);
    setList(Braden_cuoshi, "Braden压疮护理措施", data);
    setList(diedao_cuoshi, "跌倒护理措施", data);
    setList(fjhxbg_cuoshi, "非计划性拔管护理措施", data);
    setList(tt_cuoshi, "疼痛评估护理措施", data);
  });
}
function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}

getListData4();
