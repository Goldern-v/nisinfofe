
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
          {"name": "T­°C", "colspan": "1", "rowspan": "2"}, 
          {"name": "HR次/分", "colspan": "1", "rowspan": "2"}, 
          {"name": "BPmmHg", "colspan": "1", "rowspan": "2"}, 
          {"name": "R次/分", "colspan": "1", "rowspan": "2"}, 
          {"name": "SO₂%", "colspan": "1", "rowspan": "2"}, 
          {"name": "神志", "colspan": "1", "rowspan": "2"}, 
          {"name": "RASS", "colspan": "1", "rowspan": "2"}, 
          {"name": "心律", "colspan": "1", "rowspan": "2"}, 
          {"name": "CVPcmH₂O", "colspan": "1", "rowspan": "2"}, 
          {"name": "疼痛VAS评分", "colspan": "1", "rowspan": "2"}, 
          {"name": "入量ml", "colspan": "2", "rowspan": "1"}, 
          {"name": "出量ml", "colspan": "4", "rowspan": "1"}, 
          {"name": "吸氧", "colspan": "2", "rowspan": "1",style: { color:"red"},}, 
          {"name": "静脉置管内置cm", "colspan": "1", "rowspan": "2",style: { color:"red"},}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom1"}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom2"}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom3"}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom4"}, 
          { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"costom5"}, 
          { "name": "特殊情况记录", "colspan": "1", "rowspan": "2", style: { minWidth: "163px",  maxWidth: "163px"}, }, 
          { "name": "签名", "colspan": "1", "rowspan": "2"}, 
          { "name": "质控护士", "colspan": "1", "rowspan": "2"}
         ]
            
        , 
        mid:  
            [
              {"name": "项目", "colspan": "1", "rowspan": "1"}, 
              {"name": "量", "colspan": "1", "rowspan": "1"}, 
              {"name": "项目", "colspan": "1", "rowspan": "1"}, 
              {"name": "量", "colspan": "1", "rowspan": "1"}, 
              {"name": "颜色或性状", "colspan": "1", "rowspan": "1"}, 
              {"name": "刻度cm", "colspan": "1", "rowspan": "1"}, 
              {"name": "方式", "colspan": "1", "rowspan": "1",style: { color:"red"},}, 
              {"name": "流量L/min", "colspan": "1", "rowspan": "1",style: { color:"red"},}, 
            ]
            
        , 
        bottom: 
            []
        , 
    }
  }  
  