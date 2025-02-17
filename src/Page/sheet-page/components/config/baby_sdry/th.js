
/*
  顺德人医 - 护理记录单(爱婴区新生儿护理记录)
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
            { "name": "体温<br/>℃", "colspan": "1", "rowspan": "2"},
            { "name": "呼吸<br/>次/分", "colspan": "1", "rowspan": "2"},
            { "name": "血氧饱和度<br/>%", "colspan": "1", "rowspan": "2"},
            { "name": "反应", "colspan": "1", "rowspan": "2" },
            { "name": "哭声", "colspan": "1", "rowspan": "2",},
            { "name": "皮肤<br/>颜色", "colspan": "1", "rowspan": "2"},
            { "name": "吸吮<br/>力", "colspan": "1", "rowspan": "2",},
            { "name": "母乳<br/>喂养", "colspan": "1", "rowspan": "2"},
            { "name": "人工喂养奶量ml", "colspan": "1", "rowspan": "2" },
            { "name": "呕吐", "colspan": "2", "rowspan": "1" },
            { "name": "脐部<br/>情况", "colspan": "1", "rowspan": "2"},
            { "name": "大便<br/>次数", "colspan": "1", "rowspan": "2"},
            { "name": "小便<br/>次数", "colspan": "1", "rowspan": "2"},
            { "name": "体重<br/>kg", "colspan": "1", "rowspan": "2"},
            { "name": "血糖<br/>mmol/L", "colspan": "1", "rowspan": "2"},
            { "name": "产瘤<br/>cm³", "colspan": "1", "rowspan": "2"},
            { "name": "血肿<br/>cm³", "colspan": "1", "rowspan": "2"},
          { "name": "", "colspan": "1", "rowspan": "3", "canSet": true, "key": "armValue","style":{"minWidth":"40px","maxWidth":"40px"} },
          { "name": "", "colspan": "1", "rowspan": "3", "canSet": true, "key": "armValue2", "style": { "minWidth": "40px", "maxWidth": "40px" } },
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", "style": { "minWidth": "220px",  "maxWidth": "220px"} },
          { "name": "护士签名", "colspan": "1", "rowspan": "3", "style": { "minWidth": "50px", "maxWidth": "50px" } },
          { "name": "查房签名", "colspan": "1", "rowspan": "3", "style": { "minWidth": "50px", "maxWidth": "50px" }, noPrint: true },

         ]
        ,
        mid:
            [
                {"name": "日期", "colspan": "1", "rowspan": "1","style": { "minWidth": "50px", "maxWidth": "50px" } },
                {"name": "时间", "colspan": "1", "rowspan": "1","style": { "minWidth": "50px", "maxWidth": "50px" } },
                {"name": "量ml", "colspan": "1", "rowspan": "1"},
                {"name": "颜色<br/>性质", "colspan": "1", "rowspan": "1"},
            ],
        bottom:
            [],
    }
  }
