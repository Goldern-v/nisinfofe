
/*
    北海人医 - 急诊CRRT治疗记录单

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
            { "name": "动脉压<br/>(PA)", "colspan": "1", "rowspan": "3"}, 
            { "name": "滤前压<br/>(PBE)", "colspan": "1", "rowspan": "3"}, 
            { "name": "静脉压<br/>(PV)", "colspan": "1", "rowspan": "3"},
            { "name": "滤器压<br/>(PFD)", "colspan": "1", "rowspan": "3"},   
            { "name": "跨膜压<br/>(TMP)", "colspan": "1", "rowspan": "3"}, 
            { "name": "超滤率<br/>(UFR)", "colspan": "1", "rowspan": "3"},  
            { "name": "超滤量<br/>(UF)", "colspan": "1", "rowspan": "3"},  
            { "name": "滤器压<br/>(PFD)", "colspan": "1", "rowspan": "3"},  
            { "name": "会阴/<br/>尿道口<br/>护理", "colspan": "1", "rowspan": "3"}, 
            { "name": "卧位<br/>护理", "colspan": "1", "rowspan": "3"},
            { "name": "褥疮<br/>护理", "colspan": "1", "rowspan": "3"},
            { "name": "气道<br/>护理", "colspan": "1", "rowspan": "3"},
            { "name": "动静脉<br/>护理", "colspan": "1", "rowspan": "3"},
            { "name": "吸痰", "colspan": "1", "rowspan": "3"},
            { "name": "雾化", "colspan": "1", "rowspan": "3"},
            { "name": "保护性<br/>约束", "colspan": "1", "rowspan": "3"},
            { "name": "冷疗", "colspan": "1", "rowspan": "3"},
            { "name": "其他", "colspan": "1", "rowspan": "3" }, 
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
  