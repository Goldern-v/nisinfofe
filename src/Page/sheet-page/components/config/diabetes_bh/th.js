
/*
    北海人医 - 糖尿病治疗观察表

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
            { "name": "体重<br/>(kg)", "colspan": "1", "rowspan": "3"}, 
            { "name": "口服降糖药", "colspan": "4", "rowspan": "1"}, 
            { "name": "胰岛素用量", "colspan": "5", "rowspan": "1"}, 
            { "name": "毛细血管血糖(mmol/L)", "colspan": "7", "rowspan": "1"}, 
            { "name": "开单医生", "colspan": "1", "rowspan": "3"}, 
            { "name": "备注", "colspan": "1", "rowspan": "3", style: { minWidth: "180px",  maxWidth: "180px"}, }, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3"}
         ]
        , 
        mid:  
            [   
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                {"name": "降糖药", "colspan": "1", "rowspan": "2"}, 
                {"name": "早", "colspan": "1", "rowspan": "2"}, 
                {"name": "中", "colspan": "1", "rowspan": "2"}, 
                {"name": "晚", "colspan": "1", "rowspan": "2"}, 
                {"name": "种类", "colspan": "1", "rowspan": "2"}, 
                {"name": "早", "colspan": "1", "rowspan": "2"}, 
                {"name": "中", "colspan": "1", "rowspan": "2"}, 
                {"name": "晚", "colspan": "1", "rowspan": "2"}, 
                {"name": "睡前", "colspan": "1", "rowspan": "2"}, 
                {"name": "早餐前", "colspan": "1", "rowspan": "2"}, 
                {"name": "早餐后", "colspan": "1", "rowspan": "2"}, 
                {"name": "午餐前", "colspan": "1", "rowspan": "2"}, 
                {"name": "午餐后", "colspan": "1", "rowspan": "2"}, 
                {"name": "晚餐前", "colspan": "1", "rowspan": "2"}, 
                {"name": "晚餐后", "colspan": "1", "rowspan": "2"}, 
                {"name": "睡前", "colspan": "1", "rowspan": "2"}, 
            ]
        , 
        bottom: 
            [
               
            ]
        , 
    }
  }  
  