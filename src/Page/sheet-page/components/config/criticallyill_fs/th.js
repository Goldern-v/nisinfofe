
/*
  佛山市一 - 护理记录单(危重患者护理记录单)
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
            { "name": "生命体征", "colspan": "7", "rowspan": "1"},
            { "name": "瞳孔", "colspan": "4", "rowspan": "1"},
            { "name": "入量", "colspan": "2", "rowspan": "1"},
            { "name": "出量", "colspan": "2", "rowspan": "1"},
            { "name": "翻身<br/>拍背", "colspan": "1", "rowspan": "3"},
            { "name": "氧流<br/>量L<br/>/分<br/>", "colspan": "1", "rowspan": "3"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue1"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue2"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue3"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue4"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue5"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue6"},
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "163px",  maxWidth: "163px"}, },
            { "name": "护士签名", "colspan": "1", "rowspan": "3"},
            { "name": "质控护士", "colspan": "1", "rowspan": "3"}
         ]
        ,
        mid:
            [
                {"name": "日期", "colspan": "1", "rowspan": "2", style: { minWidth: "50px",  maxWidth: "50px"},},
                {"name": "时间", "colspan": "1", "rowspan": "2", style: { minWidth: "50px",  maxWidth: "50spx"},},
                {"name": "体温<br/>℃", "colspan": "1", "rowspan": "2"},
                {"name": "脉搏<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "心率<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "SOP2<br/>(%)", "colspan": "1", "rowspan": "2",},
                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2"},
                {"name": "神志", "colspan": "1", "rowspan": "2"},
                {"name": "直径mm", "colspan": "2", "rowspan": "1"},
                {"name": "对光<br/>反射", "colspan": "2", "rowspan": "1"},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"}
            ]
        ,
        bottom:
            [
              {"name": "左", "colspan": "1", "rowspan": "1"},
              {"name": "右", "colspan": "1", "rowspan": "1"},
              {"name": "左", "colspan": "1", "rowspan": "1"},
              {"name": "右", "colspan": "1", "rowspan": "1"},
            ]
        ,
    }
  }
