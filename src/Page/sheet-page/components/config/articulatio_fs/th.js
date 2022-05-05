
/*
  佛山市一 - 护理记录单(髋关节置换术后)
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
              { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
              { "name": "生命体征", "colspan": "5", "rowspan": "1"}, 
              { "name": "入量", "colspan": "2", "rowspan": "1"}, 
              { "name": "出量", "colspan": "2", "rowspan": "1"}, 
              { "name": "患髋<br/>疼痛<br/>评分(分)", "colspan": "1", "rowspan": "3"}, 
              { "name": "患肢<br/>肿胀<br/>°", "colspan": "1", "rowspan": "3"}, 
              { "name": "助行器<br/>行走(米)", "colspan": "1", "rowspan": "3"}, 
              { "name": "呼叫铃<br/>置可<br/>及处", "colspan": "1", "rowspan": "3"}, 
              { "name": "防跌倒<br/>评估护理", "colspan": "1", "rowspan": "3"}, 
              { "name": "引导式<br/>教育训练", "colspan": "1", "rowspan": "3"}, 
              { "name": "患肢<br/>外展<br/>中立位", "colspan": "1", "rowspan": "3"}, 
              { "name": "伤口<br/>外敷料", "colspan": "1", "rowspan": "3"}, 
              { "name": "防脱位<br/>教育", "colspan": "1", "rowspan": "3"}, 
              { "name": "踝泵<br/>及股<br/>四头肌<br/>训练", "colspan": "1", "rowspan": "3"}, 
              { "name": "", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue"}, 
              { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "163px",  maxWidth: "163px"}, }, 
              { "name": "护士签名", "colspan": "1", "rowspan": "3"}, 
              { "name": "质控护士", "colspan": "1", "rowspan": "3"}
          ]
      , 
      mid:  
          [
              {"name": "日期", "colspan": "1", "rowspan": "2"}, 
              {"name": "时间", "colspan": "1", "rowspan": "2"}, 
              {"name": "体温<br/>℃", "colspan": "1", "rowspan": "2"}, 
              {"name": "脉搏<br/>次/<br/>分", "colspan": "1", "rowspan": "2"}, 
              {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"}, 
              {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2"}, 
              {"name": "SOP2<br/>(%)", "colspan": "1", "rowspan": "2",}, 
              {"name": "内容", "colspan": "1", "rowspan": "2"}, 
              {"name": "量ml", "colspan": "1", "rowspan": "2"}, 
              {"name": "内容", "colspan": "1", "rowspan": "2"}, 
              {"name": "量ml", "colspan": "1", "rowspan": "2"}
          ]
      , 
      bottom: 
          []
      , 
  }
}  
