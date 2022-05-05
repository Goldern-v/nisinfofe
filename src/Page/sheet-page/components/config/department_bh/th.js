
/*
    北海人医 - 急诊科重症监护室(EICU)CRRT 治疗记录单

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
            { "name": "输入压<br/>mmHg", "colspan": "1", "rowspan": "3"}, 
            { "name": "过滤压<br/>mmHg", "colspan": "1", "rowspan": "3"}, 
            { "name": "回输压<br/>mmHg", "colspan": "1", "rowspan": "3"}, 
            { "name": "压力下降<br/>mmHg", "colspan": "1", "rowspan": "3"}, 
            { "name": "跨膜压TMP<br/>mmHg", "colspan": "1", "rowspan": "3"}, 
            { "name": "病人脱水量<br/>ml/h", "colspan": "1", "rowspan": "3"}, 
            { "name": "总病人脱水量<br/>ml", "colspan": "1", "rowspan": "3"}, 
            { "name": "治疗时间<br/>h", "colspan": "1", "rowspan": "3"}, 
            { "name": "血流<br/>ml/min", "colspan": "1", "rowspan": "3"}, 
            { "name": "置换液<br/>DF(SF)<br/>ml/h", "colspan": "1", "rowspan": "3"}, 
            { "name": "反应与处理", "colspan": "1", "rowspan": "3", style: { minWidth: "240px",  maxWidth: "240px"}, }, 
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
  