

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
      width: "1300px"
    },
    th: {
        top:
         [
            { "name": '',"colspan": "2","rowspan": "1", "key":'recordYear'},
            { "name": "意识", "colspan": "1", "rowspan": "2"},
            { "name": "T<br/>℃", "colspan": "1", "rowspan": "2"},
            { "name": "P<br/>次<br/>/分", "colspan": "1", "rowspan": "2",},
            { "name": "R<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
            { "name": "BP<br/>mmHg", "colspan": "1", "rowspan": "2"},
            { "name": "血<br/>氧<br/>饱<br/>和<br/>度<br/>(%)", "colspan": "1", "rowspan": "2",},
            { "name": "泌<br/>乳<br/>情<br/>况", "colspan": "1", "rowspan": "2"},
            { "name": "乳<br/>房<br/>情<br/>况", "colspan": "1", "rowspan": "2"},
            { "name": "宫<br/>高<br/><br/>U=FB", "colspan": "1", "rowspan": "2"},
            { "name": "子宫<br/>收缩", "colspan": "1", "rowspan": "2"},
            { "name": "伤口情况", "colspan": "3", "rowspan": "1"},
            { "name": "入量", "colspan": "2", "rowspan": "1"},
            { "name": "出量", "colspan": "3", "rowspan": "1"},
            { "name": "尿管", "colspan": "1", "rowspan": "2"},
            { "name": "硬膜外<br/>/静脉镇<br/>痛泵情况", "colspan": "1", "rowspan": "2"},
          { "name": "膀胱充盈度", "colspan": "1", "rowspan": "2"},


          { "name": "", "colspan": "1", "rowspan": "3", "canSet": true, "key": "armValue", "style": { "minWidth": "45px", "maxWidth": "45px" } },
          { "name": "", "colspan": "1", "rowspan": "3", "canSet": true, "key": "armValue2", "style": { "minWidth": "45px", "maxWidth": "45px" } },
            { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", "style": { "minWidth": "225px",  "maxWidth": "225px"}, },
          { "name": "护士签名", "colspan": "1", "rowspan": "3", style: { minWidth: "50px", maxWidth: "50px" } },
          { "name": "查房签名", "colspan": "1", "rowspan": "3", noPrint:true,style: { minWidth: "50px", maxWidth: "50px" } },

            // { "name": "质控护士", "colspan": "1", "rowspan": "3"}
         ],
        mid:
            [
                {"name": "日期", "colspan": "1", "rowspan": "2", style: { minWidth: "40px",  maxWidth: "40px"},},
                {"name": "时间", "colspan": "1", "rowspan": "2", style: { minWidth: "40px",  maxWidth: "40spx"},},
                {"name": "腹<br/>部", "colspan": "1", "rowspan": "1"},
                {"name": "会<br/>阴", "colspan": "1", "rowspan": "1"},
                { "name": "疼<br/>痛", "colspan": "1", "rowspan": "1" },
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "颜<br/>色<br/>性<br/>状", "colspan": "1", "rowspan": "2"},
            ],
        bottom:
            [
            ]
        ,
    }
  }
