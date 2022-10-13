
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
      width: "850px"
    },
    th: {
        top:
            [   
                {"name": '', style: {}, "colspan": "2", "rowspan": "1", key:'recordYear'},
                {"name": "入量ml", "colspan": "2", "rowspan": "1"},
                {"name": "出量ml", "colspan": "6", "rowspan": "1"},
                // { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "300px",  maxWidth: "300px"}, },
                // { "name": "签 名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px",  maxWidth: "60px"},},
            ]
        ,
        mid:
            [   
                { "name": "日期", "colspan": "1", "rowspan": "2"},
                { "name": "时间", "colspan": "1", "rowspan": "2"},
                {"name": "项目", "colspan": "1", "rowspan": "2"},
                {"name": "实入量", "colspan": "1", "rowspan": "2"},
                {"name": "尿", "colspan": "1", "rowspan": "2"},
                {"name": "大便(g)", "colspan": "1", "rowspan": "2"},
                {"name": "呕吐", "colspan": "1", "rowspan": "2"},
                {"name": "引流", "colspan": "1", "rowspan": "2"},
                {"name": "其他", "colspan": "1", "rowspan": "2"},
                {"name": "总出量", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            []
        ,
    }
}
