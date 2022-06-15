
/*
    北海人医 - 普外危重患者护理记录

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
      width: "1350px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "意识", "colspan": "1", "rowspan": "3"}, 
            { "name": "体温", "colspan": "1", "rowspan": "3"}, 
            { "name": "心率", "colspan": "1", "rowspan": "3"}, 
            { "name": "呼吸", "colspan": "1", "rowspan": "3"}, 
            { "name": "血压", "colspan": "1", "rowspan": "3"}, 
            { "name": "入量", "colspan": "2", "rowspan": "1"}, 
            { "name": "出量", "colspan": "4", "rowspan": "1"}, 
            { "name": "疼痛<br/>部位<br/>及评分", "colspan": "1", "rowspan": "3"}, 
            { "name": "腹胀", "colspan": "1", "rowspan": "3"}, 
            { "name": "恶心", "colspan": "1", "rowspan": "3"}, 
            { "name": "呕吐", "colspan": "1", "rowspan": "3"}, 
            { "name": "伤口渗血", "colspan": "1", "rowspan": "3"}, 
            { "name": "排气通便", "colspan": "1", "rowspan": "3"}, 
            { "name": "血氧<br/>饱和<br/>度%", "colspan": "1", "rowspan": "3"}, 
            { "name": "吸氧<br/>L/<br/>min", "colspan": "1", "rowspan": "3"}, 
            { "name": "管道护理", "colspan": "1", "rowspan": "3"}, 
            { "name": "皮肤情况", "colspan": "1", "rowspan": "3"}, 
            { "name": "病情记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, }, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3"}
         ]
        , 
        mid:  
            [   
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"},  
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"},  
                {"name": "颜色", "colspan": "1", "rowspan": "2"},
                {"name": "性状", "colspan": "1", "rowspan": "2"},  
            ]
        , 
        bottom: 
            [
               
            ]
        , 
    }
  }  
  