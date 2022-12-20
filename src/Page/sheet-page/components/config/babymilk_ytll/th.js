
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
                {"name": "加奶量<br />（ml）", "colspan": "1", "rowspan": "3"},
                {"name": "新生儿", "colspan": "2", "rowspan": "1"},
                { "name": "病情观察及护理措施", "colspan": "1", "rowspan": "3", style: { minWidth: "330px",  maxWidth: "330px"}, },
                { "name": "护士签名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px",  maxWidth: "60px"},},
            ]
        ,
        mid:
            [   
                {"name": "大便（次）", "colspan": "1", "rowspan": "2"},
                {"name": "小便(次)", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            []
        ,
    }
}
