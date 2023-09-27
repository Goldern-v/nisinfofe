
/*
  佛山市一 - 护理记录单(上肢骨折术后)
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
      width: "1254px"
    },
    th: {
        top:
         [
          {"name": "日期", "colspan": "1", "rowspan": "2",style: { minWidth: "38px",  maxWidth: "38px"},},
          {"name": "时间", "colspan": "1", "rowspan": "2",style: { minWidth: "38px",  maxWidth: "38px"},},
          {"name": "意识", "colspan": "1", "rowspan": "2"},
          {"name": "T<br/>℃", "colspan": "1", "rowspan": "2"},
          {"name": "P<br/>次/分", "colspan": "1", "rowspan": "2"},
          {"name": "R<br/>次/分", "colspan": "1", "rowspan": "2"},
          {"name": "BP<br/>mmHg", "colspan": "1", "rowspan": "2"},
          { "name": "spo2<br/>%", "colspan": "1", "rowspan": "2",style: { minWidth: "30px",  maxWidth: "30px"},},
          {"name": "吸氧<br/>L/min", "colspan": "1", "rowspan": "2",style: { minWidth: "25px",  maxWidth: "25px"},},
          {"name": "心率<br/>次/分", "colspan": "1", "rowspan": "2",style: { minWidth: "25px",  maxWidth: "25px"},},
          { "name": "入量", "colspan": "2", "rowspan": "1"},
          { "name": "出量", "colspan": "4", "rowspan": "1"},
          { "name": "皮肤情况", "colspan": "1", "rowspan": "3"},
          { "name": "卧位", "colspan": "1", "rowspan": "3"},
          { "name": "静脉置管", "colspan": "2", "rowspan": "1"},
          { "name": "管道护理", "colspan": "3", "rowspan": "1"},
          { "name": "病情观察及辩护措施", "colspan": "1", "rowspan": "3", style: { minWidth: "230px",  maxWidth: "230px"}, },
          { "name": "签名", "colspan": "1", "rowspan": "3", style: { minWidth: "50px",  maxWidth: "50px"},},
         ]
        ,
        mid:
            [

                {"name": "项目", "colspan": "1", "rowspan": "2",style: { minWidth: "20px",  maxWidth: "20px"},},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "项目", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "颜色", "colspan": "1", "rowspan": "2"},
                {"name": "状态", "colspan": "1", "rowspan": "2"},
                {"name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"intravenous1"},
                {"name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"intravenous2"},
                {"name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"pipeCare1"},
                {"name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"pipeCare2"},
                {"name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"pipeCare3"},
            ]
        ,
        bottom:
            []
        ,
    }
  }
