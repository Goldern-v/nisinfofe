
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
      width: "1260px"
    },
    th: {
        top:
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "体温<br/>℃", "colspan": "1", "rowspan": "2"},
            { "name": "呼吸<br/>次/分", "colspan": "1", "rowspan": "2"},
            { "name": "反应", "colspan": "1", "rowspan": "2"},
            { "name": "血氧饱和度<br/>%", "colspan": "1", "rowspan": "2"},
            { "name": "哭声", "colspan": "1", "rowspan": "2",},
            { "name": "皮肤<br/>颜色", "colspan": "1", "rowspan": "2"},
            { "name": "吸吮<br/>力", "colspan": "1", "rowspan": "2",},
            { "name": "呕吐", "colspan": "2", "rowspan": "1"},
            { "name": "母乳喂养", "colspan": "1", "rowspan": "2"},
            { "name": "人工喂养奶量ml", "colspan": "1", "rowspan": "2"},
            { "name": "脐部情况", "colspan": "1", "rowspan": "2"},
            { "name": "大便次", "colspan": "1", "rowspan": "2"},
            { "name": "小便次", "colspan": "1", "rowspan": "2"},
            { "name": "体重", "colspan": "1", "rowspan": "2"},
            { "name": "血糖<br/>mmol/L", "colspan": "1", "rowspan": "2"},
            { "name": "产瘤", "colspan": "1", "rowspan": "2"},
            { "name": "血肿", "colspan": "1", "rowspan": "2"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"title1"},
            { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"title2"},
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", "style": { "minWidth": "220px",  "maxWidth": "220px"} },
          { "name": "签名", "colspan": "1", "rowspan": "3", "style": { "minWidth": "50px", "maxWidth": "50px" } },
         ]
        ,
        mid:
            [
                {"name": "日期", "colspan": "1", "rowspan": "1"},
                {"name": "时间", "colspan": "1", "rowspan": "1"},
                {"name": "量", "colspan": "1", "rowspan": "1"},
                {"name": "颜色<br/>性质", "colspan": "1", "rowspan": "1"},
            ],
        bottom:
            [],
    }
  }
