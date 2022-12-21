
/*
  烟台玲珑 - 出入量记录单
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"

*/

export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "800px"
    },
    th: {
        top:
            [   
                // {"name": '', style: {}, "colspan": "2", "rowspan": "1", key:'recordYear'},
                { "name": "日期", "colspan": "1", "rowspan": "3"},
                { "name": "时间", "colspan": "1", "rowspan": "3"},
                {"name": "血压<br />（mmHg）", "colspan": "1", "rowspan": "3"},
                {"name": "胎心<br />(次/分)", "colspan": "1", "rowspan": "3"},
                {"name": "宫缩", "colspan": "1", "rowspan": "3"},
                {"name": "胎动", "colspan": "1", "rowspan": "3"},
                {"name": "先露部", "colspan": "1", "rowspan": "3"},
                { "name": "备注", "colspan": "1", "rowspan": "3", style: { minWidth: "240px",  maxWidth: "240px"}, },
                { "name": "签名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px",  maxWidth: "60px"},},
            ]
        ,
        mid:
            []
        ,
        bottom:
            []
        ,
    }
}
