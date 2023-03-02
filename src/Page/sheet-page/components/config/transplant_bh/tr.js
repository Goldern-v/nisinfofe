
/**
  北海人医 -肢体与组织移植血液循环观察记录单
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
  const hzysList = ['红润','暗红','紫绀','苍白']
  export default [
    { hidden: true, key: 'recordDate', value: '' },
    { key: "recordMonth", event: event_date, click: click_date, value: ''},
    { key: "recordHour", event: event_time,  value: ''},
    { key: 'watchParts', event: keyf1, value: '', next: '', name: '观察部位',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16) },
    { key: 'color', event: keyf1, value: '', next: '', name: '颜色',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16),autoComplete: { data: hzysList } },
    { key: 'temperature', event: keyf1, value: '', next: '', name: '皮肤温度',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16) ,autoComplete: { data: ['温暖','冰凉','稍凉'] }},
    { key: 'skinTension', event: keyf1, value: '', next: '', name: '皮肤张力',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16) ,autoComplete: { data: ['正常','肿胀','干瘪'] }},
    { key: 'capillaries', event: keyf1, value: '', next: '', name: '毛细血管反应',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16) ,autoComplete: { data: ['好','迟钝','差'] }},
    { key: 'activity', event: keyf1, value: '', next: '', name: '活动',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16) ,autoComplete: { data: ['自如','受限','障碍'] }},
    { key: 'feeling', event: keyf1, value: '', next: '', name: '感觉',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16) ,autoComplete: { data: ['有','无'] }},
    { key: 'pulse', event: keyf1, value: '', next: '', name: '脉搏',textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16) },
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
      textarea: { width: 150 },
      event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) },
      hidden:true
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

export function getListData() {
  let list = ["患肢颜色"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(hzysList, "患肢颜色", data);
  });
}

getListData();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}
