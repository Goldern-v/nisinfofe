
/*
  佛山市一 - 护理记录单(新生儿科通用)
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
      width: "1310px"
    },
    th: {
        top: 
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "生命体征", "colspan": "4", "rowspan": "1"}, 
            { "name": "观察项目", "colspan": "8", "rowspan": "1"}, 
            { "name": "入量", "colspan": "2", "rowspan": "1"}, 
            { "name": "出量", "colspan": "2", "rowspan": "1"},
            { "name": "基础护理", "colspan": "3", "rowspan": "1"},
            { "name": "专科护理", "colspan": "10", "rowspan": "1"},    
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "163px",  maxWidth: "163px"}, }, 
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
                {"name": "SOP2<br/>(%)", "colspan": "1", "rowspan": "2",}, 
                // 观察项目
                {"name": "反应", "colspan": "1", "rowspan": "2"}, 
                {"name": "哭声", "colspan": "1", "rowspan": "2"}, 
                {"name": "吸吮力", "colspan": "1", "rowspan": "2"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue2"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue3"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue4"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue5"}, 
                // 入量
                {"name": "内容", "colspan": "1", "rowspan": "2"}, 
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"}, 
                // 出量
                {"name": "内容", "colspan": "1", "rowspan": "2"}, 
                {"name": "量<br/>ml", "colspan": "1", "rowspan": "2"},
                // 基础护理
                {"name": "晨间护理", "colspan": "1", "rowspan": "2"},
                {"name": "晚间护理", "colspan": "1", "rowspan": "2"},
                {"name": "更换<br/>探头<br/>部位", "colspan": "1", "rowspan": "2"},
                // 专科护理
                {"name": "留置针位置", "colspan": "1", "rowspan": "2"},
                {"name": "输液", "colspan": "1", "rowspan": "2"},
                {"name": "体位", "colspan": "1", "rowspan": "2"},
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue6"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue7"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue8"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue9"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue10"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue11"}, 
                {"name": "", "colspan": "1", "rowspan": "2","canSet":true,"key":"armValue12"}, 
            ]
        , 
        bottom: 
            []
        , 
    }
  }  
  