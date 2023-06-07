
/*
  江门妇幼 - 内科护理记录单

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    
*/

import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
    // 科室的名称
    deptType: "", 
    style: {
      width: "1120px"
    },
    th: {
        top: [
          { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
          { "name": "体温<br />℃", "colspan": "1", "rowspan": "3"}, 
          { "name": "心率/脉搏<br />次/分", "colspan": "1", "rowspan": "3"}, 
          { "name": "呼吸<br />次/分", "colspan": "1", "rowspan": "3"}, 
          { "name": "血压<br />mmhg", "colspan": "1", "rowspan": "3"}, 
          { "name": "血氧饱和度<br />%", "colspan": "1", "rowspan": "3"}, 
          { "name": "意识", "colspan": "1", "rowspan": "3"}, 
          { "name": "血糖<br />mmol/L", "colspan": "1", "rowspan": "3"}, 
          { "name": "入量", "colspan": "2", "rowspan": "1"}, 
          { "name": "出量", "colspan": "2", "rowspan": "1"}, 
          { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "305px",  maxWidth: "305px"}, }, 
          { "name": "护士签名", "colspan": "1", "rowspan": "3"}
        ], 
        mid: [   
          {"name": "日期", "colspan": "1", "rowspan": "2"}, 
          {"name": "时间", "colspan": "1", "rowspan": "2"}, 
          {"name": "内容", "colspan": "1", "rowspan": "2"}, 
          {"name": "量<br/>（ml）", "colspan": "1", "rowspan": "2"}, 
          {"name": "内容", "colspan": "1", "rowspan": "2"}, 
          {"name": "量<br/>（ml）", "colspan": "1", "rowspan": "2"},
        ], 
        bottom: [], 
    }
  }  
  