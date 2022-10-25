
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
      width: "1370px"
    },
    th: {
        top:
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "生命体征", "colspan": "5", "rowspan": "1"},
            { "name": "入量", "colspan": "2", "rowspan": "1"},
            { "name": "出量", "colspan": "2", "rowspan": "1"},
            { "name": "乳<br/>房<br/>情<br/>况", "colspan": "1", "rowspan": "2"},
            { "name": "泌<br/>乳<br/>情<br/>况", "colspan": "1", "rowspan": "2"},
            { "name": "宫<br/>底<br/>高<br/>度<br/>U=Fb", "colspan": "1", "rowspan": "2"},
            { "name": "子<br/>宫<br/>收<br/>缩", "colspan": "1", "rowspan": "2"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue1"},
            { "name": "伤口", "colspan": "2", "rowspan": "1"},
            { "name": "指<br/>导<br/>挤<br/>奶", "colspan": "1", "rowspan": "2"},
            { "name": "产<br/>后<br/>康<br/>复", "colspan": "1", "rowspan": "2"},
            { "name": "母<br/>乳<br/>喂<br/>养", "colspan": "1", "rowspan": "2"},
            { "name": "婴<br/>二<br/>护<br/>理", "colspan": "1", "rowspan": "2"},
            
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue2"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"armValue3"},
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "163px",  maxWidth: "163px"}, },
            { "name": "签名", "colspan": "1", "rowspan": "3"},
         ]
        ,
        mid:
            [
                {"name": "日期", "colspan": "1", "rowspan": "2", style: { minWidth: "50px",  maxWidth: "50px"},},
                {"name": "时间", "colspan": "1", "rowspan": "2", style: { minWidth: "50px",  maxWidth: "50spx"},},
                {"name": "体温<br/>℃", "colspan": "1", "rowspan": "2"},
                { "name": "", "colspan": "1", "rowspan": "2",canSet:true,key:"armValue5"},
                {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2"},
                {"name": "SOP2<br/>(%)", "colspan": "1", "rowspan": "2",},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "腹<br/>部", "colspan": "1", "rowspan": "1"},
                {"name": "会<br/>阴", "colspan": "1", "rowspan": "1"},
            ]
        ,
        bottom:
            [
            ]
        ,
    }
  }
