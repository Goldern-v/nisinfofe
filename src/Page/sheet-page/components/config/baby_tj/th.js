
/*
  广东同江 - 新生儿护理记录单
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"

*/

export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "1400px"
    },
    th: {
        top:
            [
                { "name": "日期", "colspan": "1", "rowspan": "3"},
                { "name": "时间", "colspan": "1", "rowspan": "3"},
                { "name": "箱温<br/>℃", "colspan": "1", "rowspan": "3"},
                { "name": "T<br/>℃", "colspan": "1", "rowspan": "3"},
                { "name": "HR<br/>次/分", "colspan": "1", "rowspan": "3"},
                { "name": "R<br/>次/分", "colspan": "1", "rowspan": "3"},
                { "name": "BP<br/>mmHg", "colspan": "1", "rowspan": "3"},
                { "name": "Spo2<br/>%", "colspan": "1", "rowspan": "3"},
                { "name": "血糖<br/>mmol/L", "colspan": "1", "rowspan": "3"},
                { "name": "经皮胆<br/>红素测<br/>定<br/>umol/l", "colspan": "1", "rowspan": "3"},
                { "name": "哭声", "colspan": "1", "rowspan": "3"},
                { "name": "反应", "colspan": "1", "rowspan": "3"},
                { "name": "肤色", "colspan": "1", "rowspan": "3"},
                { "name": "吸吮力", "colspan": "1", "rowspan": "3"},
                { "name": "体位", "colspan": "1", "rowspan": "3"},
                { "name": "沐浴", "colspan": "1", "rowspan": "3"},
                { "name": "入量", "colspan": "3", "rowspan": "1"},
                { "name": "出量", "colspan": "3", "rowspan": "1"},
                { "name": "", "colspan": "1", "rowspan": "3", canSet: true, key: "fieldOne", style: { minWidth: "35px",  maxWidth: "35px"}},
                { "name": "", "colspan": "1", "rowspan": "3", canSet: true, key: "fieldTwo", style: { minWidth: "35px",  maxWidth: "35px"}},
                { "name": "", "colspan": "1", "rowspan": "3", canSet: true, key: "fieldThree", style: { minWidth: "35px",  maxWidth: "35px"}},
                { "name": "", "colspan": "1", "rowspan": "3", canSet: true, key: "fieldFour", style: { minWidth: "35px",  maxWidth: "35px"}},
                { "name": "", "colspan": "1", "rowspan": "3", canSet: true, key: "fieldFive", style: { minWidth: "35px",  maxWidth: "35px"}},
                { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "160px",  maxWidth: "160px"}, },
                { "name": "签 名", "colspan": "1", "rowspan": "3", style: { minWidth: "50px",  maxWidth: "50px"},},
                { "name": "带教<br/>护士", "colspan": "1", "rowspan": "3", style: { minWidth: "50px",  maxWidth: "50px"},},


            ]
        ,
        mid:
            [
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "ml", "colspan": "1", "rowspan": "2"},
                {"name": "方式", "colspan": "1", "rowspan": "2"},
                {"name": "名称", "colspan": "1", "rowspan": "2"},
                {"name": "颜色<br/>性状", "colspan": "1", "rowspan": "2"},
                {"name": "ml/g", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            []
        ,
    }
}
