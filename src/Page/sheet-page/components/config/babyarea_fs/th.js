
/*
  佛山市一 - 护理记录单(爱婴区新生儿护理记录)
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
            {"name": "体温<br/>℃", "colspan": "1", "rowspan": "2"},
            {"name": "体重<br/>kg", "colspan": "1", "rowspan": "2"},
            {"name": "反应", "colspan": "1", "rowspan": "2"},
            {"name": "哭声", "colspan": "1", "rowspan": "2"},
            {"name": "吸吮<br/>力", "colspan": "1", "rowspan": "2",},
            { "name": "皮肤<br/>颜色", "colspan": "1", "rowspan": "2"},
            { "name": "脐带<br/>情况", "colspan": "1", "rowspan": "2"},
            { "name": "脐部<br/>护理", "colspan": "1", "rowspan": "2"},
            { "name": "婴儿<br/>抚触", "colspan": "1", "rowspan": "2"},
            { "name": "喂养", "colspan": "2", "rowspan": "1"},
            { "name": "沐浴", "colspan": "1", "rowspan": "2"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"title1"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"title2"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"title3"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"title4"},
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "220px",  maxWidth: "220px"}, },
            { "name": "签名", "colspan": "1", "rowspan": "3"},
         ]
        ,
        mid:
            [
                {"name": "日期", "colspan": "1", "rowspan": "1"},
                {"name": "时间", "colspan": "1", "rowspan": "1"},
                {"name": "母乳", "colspan": "1", "rowspan": "1"},
                {"name": "人工<br/>（ml）", "colspan": "1", "rowspan": "1"},
            ]
        ,
        bottom:
            []
        ,
    }
  }
