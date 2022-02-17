
/*
    北海人医 - 产程观察记录

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
            { "name": "血压<br/>mmHg", "colspan": "1", "rowspan": "3"}, 
            { "name": "宫缩", "colspan": "1", "rowspan": "3"}, 
            { "name": "间歇", "colspan": "1", "rowspan": "3"}, 
            { "name": "持续", "colspan": "1", "rowspan": "3"}, 
            { "name": "强度", "colspan": "1", "rowspan": "3"}, 
            { "name": "先露", "colspan": "1", "rowspan": "3"},
            { "name": "先露<br/>高低", "colspan": "1", "rowspan": "3"}, 
            { "name": "胎位", "colspan": "1", "rowspan": "3"},  
            { "name": "胎心", "colspan": "1", "rowspan": "3"},  
            { "name": "速率", "colspan": "1", "rowspan": "3"},  
            { "name": "强弱", "colspan": "1", "rowspan": "3"},  
            { "name": "位置", "colspan": "1", "rowspan": "3"},  
            { "name": "宫颈<br/>扩张", "colspan": "1", "rowspan": "3"},  
            { "name": "胎膜", "colspan": "1", "rowspan": "3"}, 
            { "name": "检查<br/>方式", "colspan": "1", "rowspan": "3"},   
            { "name": "备注", "colspan": "1", "rowspan": "3", style: { minWidth: "240px",  maxWidth: "240px"}, }, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3",style: { minWidth: "80px",  maxWidth: "80px"},}
         ]
        , 
        mid:  
            [   
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
            ]
        , 
        bottom: 
            [
               
            ]
        , 
    }
  }  
  