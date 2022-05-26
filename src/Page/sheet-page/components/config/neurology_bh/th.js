
/*
    北海人医 - 神经内科危重护理单

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
      width: "1450px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "体<br/>温<br/>°C", "colspan": "1", "rowspan": "3"}, 
            { "name": "脉<br/>搏<br/>次/<br/>分", "colspan": "1", "rowspan": "3"}, 
            { "name": "心<br/>率<br/>次/<br/>分", "colspan": "1", "rowspan": "3"}, 
            { "name": "呼<br/>吸<br/>次/<br/>分", "colspan": "1", "rowspan": "3"}, 
            { "name": "血压mmHg", "colspan": "2", "rowspan": "1"}, 
            { "name": "血氧<br/>饱和<br/>度%", "colspan": "1", "rowspan": "3"}, 
            { "name": "吸氧<br/>L/min", "colspan": "1", "rowspan": "3"}, 
            { "name": "呼吸<br/>机<br/>模式", "colspan": "1", "rowspan": "3"}, 
            { "name": "意识", "colspan": "1", "rowspan": "3"}, 
            { "name": "瞳孔", "colspan": "4", "rowspan": "1"}, 
            { "name": "肌力", "colspan": "4", "rowspan": "1"}, 
            { "name": "入量", "colspan": "2", "rowspan": "1"}, 
            { "name": "出量", "colspan": "4", "rowspan": "1"}, 
            { "name": "管道<br/>护理", "colspan": "1", "rowspan": "3"},
            { "name": "皮肤<br/>情况", "colspan": "1", "rowspan": "3"},
            // { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue"},
            // { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue2"},//去掉自定义，给入量名称添加位置
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, }, 
            { "name": "护士签名", "colspan": "1", "rowspan": "3"}
         ]
        , 
        mid:  
            [   
                {"name": "日期", "colspan": "1", "rowspan": "2"}, 
                {"name": "时间", "colspan": "1", "rowspan": "2"}, 
                {"name": "NIBP", "colspan": "1", "rowspan": "2"}, 
                {"name": "IBP", "colspan": "1", "rowspan": "2"}, 
                {"name": "直径<br/>mm", "colspan": "2", "rowspan": "1"}, 
                {"name": "光反应", "colspan": "2", "rowspan": "1"}, 
                {"name": "左", "colspan": "2", "rowspan": "1"}, 
                {"name": "右", "colspan": "2", "rowspan": "1"}, 
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
                {"name": "左", "colspan": "1", "rowspan": "1"}, 
                {"name": "右", "colspan": "1", "rowspan": "1"}, 
                {"name": "左", "colspan": "1", "rowspan": "1"}, 
                {"name": "右", "colspan": "1", "rowspan": "1"}, 
                {"name": "上肢", "colspan": "1", "rowspan": "1"}, 
                {"name": "下肢", "colspan": "1", "rowspan": "1"}, 
                {"name": "上肢", "colspan": "1", "rowspan": "1"}, 
                {"name": "下肢", "colspan": "1", "rowspan": "1"}, 
            ]
        , 
    }
  }  
  