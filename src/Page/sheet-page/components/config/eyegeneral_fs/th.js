
/*
  佛山市一 - 护理记录单(眼科通用)
*/

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
      width: "1250px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "生命体征", "colspan": "7", "rowspan": "1"}, 
            { "name": "入量", "colspan": "2", "rowspan": "1"}, 
            { "name": "出量", "colspan": "2", "rowspan": "1"}, 
            { "name": "指导<br/>眼部<br/>卫生", "colspan": "1", "rowspan": "3"},
            { "name": "饮食<br/>指导", "colspan": "1", "rowspan": "3"},
            { "name": "呼叫<br/>铃置<br/>可及处", "colspan": "1", "rowspan": "3"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue4"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue5"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue6"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue7"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue8"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue9"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue10"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue11"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue12"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue13"},
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "153px",  maxWidth: "150px"}, }, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3"}
         ]
        , 
        mid:  
            [   
                //时间
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                // 生命体征
                {"name": "体<br/>温<br/>℃", "colspan": "1", "rowspan": "2"}, 
                {"name": "心率<br/>次/<br/>分", "colspan": "1", "rowspan": "2"}, 
                {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"}, 
                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2",},
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue2"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue3"},   
                // 入量
                {"name": "内容", "colspan": "1", "rowspan": "2"}, 
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"}, 
                // 出量
                {"name": "内容", "colspan": "1", "rowspan": "2"}, 
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"},
            ]
        , 
        bottom: 
            []
        , 
    }
  }  
  