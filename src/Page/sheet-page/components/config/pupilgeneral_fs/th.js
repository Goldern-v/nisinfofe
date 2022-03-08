
/*
  佛山市一 - 护理记录单(儿科二区带瞳孔通用)
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
            { "name": "生命体征", "colspan": "6", "rowspan": "1"}, 
            { "name": "瞳孔", "colspan": "5", "rowspan": "1"}, 
            { "name": "入量", "colspan": "2", "rowspan": "1"}, 
            { "name": "出量", "colspan": "2", "rowspan": "1"}, 
            { "name": "留置针<br/>部位", "colspan": "1", "rowspan": "3"},
            { "name": "肢体", "colspan": "1", "rowspan": "3"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue2"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue3"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue4"},
            { "name": "", "colspan": "1", "rowspan": "3","canSet":true,"key":"armValue5"},
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "240px",  maxWidth: "240px"}, }, 
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
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue"}, 
                {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2",},
                {"name": "SPO2<br/>%", "colspan": "1", "rowspan": "2",},
                {"name": "神志", "colspan": "1", "rowspan": "2"}, 
                // 瞳孔
                {"name": "直径<br/>mm", "colspan": "2", "rowspan": "1"}, 
                {"name": "对光<br/>反射", "colspan": "2", "rowspan": "1"}, 
                {"name": "瞳孔<br/>形状", "colspan": "1", "rowspan": "2"}, 
                // 入量
                {"name": "内容", "colspan": "1", "rowspan": "2"}, 
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"}, 
                // 出量
                {"name": "内容", "colspan": "1", "rowspan": "2"}, 
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"},
            ]
        , 
        bottom: 
            [
              {"name": "左", "colspan": "1", "rowspan": "1"}, 
              {"name": "右", "colspan": "1", "rowspan": "1"}, 
              {"name": "左", "colspan": "1", "rowspan": "1"}, 
              {"name": "右", "colspan": "1", "rowspan": "1"}
            ]
        , 
    }
  }  
  