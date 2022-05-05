
/*
    北海人医 - 急诊ICU病情观察表

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
      width: "1220px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "病情观察、护理<br/>措施及效果", "colspan": "2", "rowspan": "1"}, 
            { "name": "GCS评分", "colspan": "3", "rowspan": "1"}, 
            { "name": "入量", "colspan": "2", "rowspan": "1"}, 
            { "name": "出量", "colspan": "4", "rowspan": "1"}, 
            { "name": "皮肤情况", "colspan": "1", "rowspan": "3"}, 
            { "name": "管路情况", "colspan": "1", "rowspan": "3"}, 
            { "name": "通气模式", "colspan": "1", "rowspan": "3"}, 
            { "name": "病情记录", "colspan": "1", "rowspan": "3",style: { minWidth: "180px",  maxWidth: "180px"} }, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3",style: { minWidth: "80px",  maxWidth: "80px"}}
         ]
        , 
        mid:  
            [   
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                {"name": "意识", "colspan": "1", "rowspan": "2"},
                {"name": "瞳孔", "colspan": "1", "rowspan": "2"},
                {"name": "E", "colspan": "1", "rowspan": "2"},
                {"name": "V", "colspan": "1", "rowspan": "2"},
                {"name": "M", "colspan": "1", "rowspan": "2"},
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
  