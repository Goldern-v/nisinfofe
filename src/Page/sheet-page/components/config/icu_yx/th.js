
/*
    武汉亚心 - ICU护理记录单

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
            { "name": "入量(ml)", "colspan": "5", "rowspan": "1"}, 
            { "name": "出量(ml)", "colspan": "11", "rowspan": "1"}, 
            { "name": "血管活性药物<br/>ug/kg/min", "colspan": "2", "rowspan": "3"}, 
            { "name": "其他药物", "colspan": "1", "rowspan": "3"}, 
            { "name": "静脉置管", "colspan": "3", "rowspan": "1"}, 
            { "name": "签名", "colspan": "1", "rowspan": "3",style: { minWidth: "60px",  maxWidth: "60px"},}
         ]
        , 
        mid:  
            [   
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                {"name": "静脉用药", "colspan": "1", "rowspan": "2"}, 
                {"name": "饮食", "colspan": "2", "rowspan": "1"}, 
                {"name": "每时", "colspan": "1", "rowspan": "2"}, 
                {"name": "总量", "colspan": "1", "rowspan": "2"}, 
                {"name": "每时", "colspan": "1", "rowspan": "2"}, 
                {"name": "总量", "colspan": "1", "rowspan": "2"}, 
                {"name": "尿量", "colspan": "1", "rowspan": "2"}, 
                {"name": "尿量累计", "colspan": "1", "rowspan": "2"}, 
                {"name": "引流", "colspan": "5", "rowspan": "1"}, 
                {"name": "其他", "colspan": "2", "rowspan": "1"}, 
                {"name": "CVC深度", "colspan": "1", "rowspan": "2"}, 
                {"name": "CVC状态", "colspan": "1", "rowspan": "2"}, 
                {"name": "留置针状态", "colspan": "1", "rowspan": "2"}, 
            ]
        , 
        bottom: 
            [
                {"name": "项目", "colspan": "1", "rowspan": "1"}, 
                {"name": "量", "colspan": "1", "rowspan": "1"}, 
                {"name": "项目", "colspan": "1", "rowspan": "1"}, 
                {"name": "通畅", "colspan": "1", "rowspan": "1"}, 
                {"name": "颜色", "colspan": "1", "rowspan": "1"}, 
                {"name": "性状", "colspan": "1", "rowspan": "1"}, 
                {"name": "量", "colspan": "1", "rowspan": "1"}, 
                {"name": "项目", "colspan": "1", "rowspan": "1"}, 
                {"name": "量", "colspan": "1", "rowspan": "1"}, 

            ]
        , 
    }
  }  
  