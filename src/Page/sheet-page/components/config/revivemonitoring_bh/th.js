
/*
    北海人医 - 心胸外科术后复苏监测记录表
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
      width: "1200px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "心电监护", "colspan": "6", "rowspan": "1"}, 
            { "name": "机械通气", "colspan": "4", "rowspan": "1"}, 
            { "name": "病情记录", "colspan": "1", "rowspan": "3", style: { minWidth: "280px",  maxWidth: "280px"}, }, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3"}
         ]
        , 
        mid:  
            [   
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                {"name": "心率", "colspan": "1", "rowspan": "2"},
                {"name": "血压", "colspan": "1", "rowspan": "2"},
                {"name": "ABP", "colspan": "1", "rowspan": "2"},
                {"name": "CVP", "colspan": "1", "rowspan": "2"},
                {"name": "呼吸次数<br/>(次/分)", "colspan": "1", "rowspan": "2"},
                {"name": "SPO2<br/>(%)", "colspan": "1", "rowspan": "2"},
                {"name": "模式", "colspan": "1", "rowspan": "2"},
                {"name": "潮气量", "colspan": "1", "rowspan": "2"},
                {"name": "呼吸次数<br/>(次/分)", "colspan": "1", "rowspan": "2"},
                {"name": "FiO2<br/>(%)", "colspan": "1", "rowspan": "2"},
            ]
        , 
        bottom: 
            [
               
            ]
        , 
    }
  }  
  