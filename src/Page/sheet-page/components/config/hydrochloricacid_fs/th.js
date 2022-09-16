
/*
  佛山市一 - 盐酸利托君(安宝)观察记录单
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
                { "name": "宫缩（s/min）", "colspan": "2", "rowspan": "1"},
                { "name": "浓度<br/>mg/500ml", "colspan": "1", "rowspan": "3"},
                { "name": "滴速<br/>gtt/min", "colspan": "1", "rowspan": "3"},
                { "name": "", "colspan": "1", "rowspan": "3", canSet: true, key: "titleOne"},
                { "name": "", "colspan": "1", "rowspan": "3", canSet: true, key: "titleTwo"},
                { "name": "特殊情况", "colspan": "1", "rowspan": "3", style: { minWidth: "300px",  maxWidth: "300px"}, },
                { "name": "签 名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px",  maxWidth: "60px"},},
            ]
        ,
        mid:
            [
                {"name": "持续<br/>（s）", "colspan": "1", "rowspan": "2"},
                {"name": "间隔<br/>min", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            []
        ,
    }
}
