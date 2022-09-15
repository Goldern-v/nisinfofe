
/*
  佛山市一 - 护理记录单(麻醉科IPACU护理记录单)
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
      width: "1210px"
    },
    th: {
        top: 
         [
          {"name": "日期", "colspan": "1", "rowspan": "2"}, 
          {"name": "时间", "colspan": "1", "rowspan": "2"}, 
          {"name": "T<br/>­°C", "colspan": "1", "rowspan": "2"}, 
          {"name": "HR<br/>次<br/>/<br/>分", "colspan": "1", "rowspan": "2"}, 
          {"name": "BP<br/>mmHg", "colspan": "1", "rowspan": "2"}, 
          {"name": "R<br/>次<br/>/<br/>分", "colspan": "1", "rowspan": "2"}, 
          {"name": "SPO₂<br/>%", "colspan": "1", "rowspan": "2"}, 
          {"name": "神<br/>志", "colspan": "1", "rowspan": "2"}, 
          {"name": "R<br/>A<br/>S<br/>S", "colspan": "1", "rowspan": "2"}, 
          {"name": "心<br/>律", "colspan": "1", "rowspan": "2"}, 
          {"name": "CVP<br/>cmH₂O", "colspan": "1", "rowspan": "2"}, 
          {"name": "疼<br/>痛<br/>VAS<br/>评<br/>分", "colspan": "1", "rowspan": "2"}, 
          {"name": "入量ml", "colspan": "2", "rowspan": "1"}, 
          {"name": "出量ml", "colspan": "4", "rowspan": "1"},   
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom1","style":{"minWidth":"30px","maxWidth":"30px"}}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom2","style":{"minWidth":"30px","maxWidth":"30px"}}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom3","style":{"minWidth":"30px","maxWidth":"30px"}}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom4","style":{"minWidth":"30px","maxWidth":"30px"}}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom5","style":{"minWidth":"30px","maxWidth":"30px"}}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom6","style":{"minWidth":"30px","maxWidth":"30px"}},
          { "name": "特殊情况记录", "colspan": "1", "rowspan": "2", style: { minWidth: "163px",  maxWidth: "163px"}, }, 
          { "name": "签名", "colspan": "1", "rowspan": "2"}, 
          { "name": "质控签名", "colspan": "1", "rowspan": "2"}
         ]
            
        , 
        mid:  
            [
              {"name": "项<br/>目", "colspan": "1", "rowspan": "1"}, 
              {"name": "量", "colspan": "1", "rowspan": "1"}, 
              {"name": "项<br/>目", "colspan": "1", "rowspan": "1"}, 
              {"name": "量", "colspan": "1", "rowspan": "1"}, 
              {"name": "颜<br/>色<br/>或<br/>性<br/>状", "colspan": "1", "rowspan": "1"},  
              {"name": "流量<br/>L/min", "colspan": "1", "rowspan": "1"}, 
            ]
            // ,style: { color:"red"},
        , 
        bottom: 
            []
        , 
    }
  }  
  