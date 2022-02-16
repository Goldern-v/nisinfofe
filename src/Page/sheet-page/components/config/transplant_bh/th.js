
/*
    北海人医 - 肢体与组织移植血液循环观察记录单

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
      width: "1000px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "观察部位", "colspan": "1", "rowspan": "3"}, 
            { "name": "颜色", "colspan": "1", "rowspan": "3"}, 
            { "name": "皮肤温度", "colspan": "1", "rowspan": "3"}, 
            { "name": "皮肤张力", "colspan": "1", "rowspan": "3"}, 
            { "name": "毛细血管反应", "colspan": "1", "rowspan": "3"}, 
            { "name": "活动", "colspan": "1", "rowspan": "3"},
            { "name": "感觉", "colspan": "1", "rowspan": "3"}, 
            { "name": "脉搏", "colspan": "1", "rowspan": "3"},  
            // { "name": "病情记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, }, 
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
  