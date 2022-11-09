
/*
  佛山市一 - 产前待产记录单
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
      width: "1400px"
    },
    th: {
        top:
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "生命体征", "colspan": "5", "rowspan": "1"},
            { "name": "观 察 内 容", "colspan": "7", "rowspan": "1"},
            { "name": "入量", "colspan": "2", "rowspan": "1"},
            { "name": "出量", "colspan": "2", "rowspan": "1"},
            { "name": "脉<br/>搏<br/>次<br/>/分", "colspan": "1", "rowspan": "3",canSet:true,key:"custom2"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"custom3"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"custom4"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"custom5"},
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "400px",  maxWidth: "400px"}, },
            { "name": "护士签名", "colspan": "1", "rowspan": "3"},
            { "name": "质控护士", "colspan": "1", "rowspan": "3"}
         ]
        ,
        mid:
            [
                {"name": "日期", "colspan": "1", "rowspan": "2", style: { minWidth: "50px",  maxWidth: "50px"},},
                {"name": "时间", "colspan": "1", "rowspan": "2", style: { minWidth: "50px",  maxWidth: "50spx"},},
                {"name": "体温<br/>℃", "colspan": "1", "rowspan": "2"},
                { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"custom1"},
                {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2"},
                {"name": "SOP2<br/>(%)", "colspan": "1", "rowspan": "2",},
                {"name": "胎心<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "胎动<br/>次/<br/>小时", "colspan": "1", "rowspan": "2"},
                {"name": "宫缩", "colspan": "3", "rowspan": "1"},
                {"name": "宫颈<br/>扩张<br/>cm", "colspan": "1", "rowspan": "2"},
                {"name": "先<br/>露<br/>高<br/>低", "colspan": "1", "rowspan": "2"},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            [
              {"name": "强度", "colspan": "1", "rowspan": "1"},
              {"name": "持<br/>续<br/>s", "colspan": "1", "rowspan": "1"},
              {"name": "间<br/>歇<br/>min", "colspan": "1", "rowspan": "1"},
            ]
        ,
    }
  }
