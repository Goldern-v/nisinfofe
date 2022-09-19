
/*
  佛山市一 - 硫酸镁注射静脉滴注观察记录
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"

*/

export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "1150px"
    },
    th: {
        top:
            [
                { "name": "日期", "colspan": "1", "rowspan": "3"},
                { "name": "时间", "colspan": "1", "rowspan": "3"},
                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "3"},
                {"name": "心率<br/>次/分", "colspan": "1", "rowspan": "3"},
                {"name": "呼吸<br/>次/分", "colspan": "1", "rowspan": "3"},
                { "name": "宫缩（s/min）", "colspan": "1", "rowspan": "3"},
                { "name": "尿量<br/>（ml）", "colspan": "1", "rowspan": "3"},
                { "name": "膝反射", "colspan": "1", "rowspan": "3"},
                { "name": "滴速<br/>（ml/h）", "colspan": "1", "rowspan": "3"},
                { "name": "特殊情况", "colspan": "1", "rowspan": "3", style: { minWidth: "400px",  maxWidth: "400px"}, },
                { "name": "签 名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px",  maxWidth: "60px"},},
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
