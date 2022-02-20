
/*
    北海人医 - 心胸外科心电监护观察记录

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
      width: "1150px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "循环", "colspan": "4", "rowspan": "1"}, 
            { "name": "呼吸", "colspan": "2", "rowspan": "1"}, 
            { "name": "其他", "colspan": "3", "rowspan": "1"}, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3",style: { minWidth: "80px",  maxWidth: "80px"},}
         ]
        , 
        mid:  
            [   
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                {"name": "体温<br/>(°C)", "colspan": "1", "rowspan": "2"}, 
                {"name": "心率<br/>(次/分)", "colspan": "1", "rowspan": "2"}, 
                {"name": "血压<br/>(mmHg)", "colspan": "1", "rowspan": "2"}, 
                {"name": "脉搏<br/>(次/分)", "colspan": "1", "rowspan": "2"}, 
                {"name": "呼吸频率<br/>(次/分)", "colspan": "1", "rowspan": "2"}, 
                {"name": "SPO₂<br/>(%)", "colspan": "1", "rowspan": "2"}, 
                {"name": "cvp<br/>(cmH₂O)", "colspan": "1", "rowspan": "2"}, 
                {"name": "ABP<br/>(mmHg)", "colspan": "1", "rowspan": "2"}, 
                {"name": "CO₂<br/>(mmHg)", "colspan": "1", "rowspan": "2"}, 
            ]
        , 
        bottom: 
            [
               
            ]
        , 
    }
  }  
  