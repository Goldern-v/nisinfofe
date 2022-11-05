
/*
  佛山市一 - 产程观察记录单(含静滴催产素记录单)
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
                { "name": "宫缩", "colspan": "2", "rowspan": "1"},
                {"name": "胎心<br/>次/分", "colspan": "1", "rowspan": "3"},
                {"name": "宫颈扩张<br/>（cm）", "colspan": "1", "rowspan": "3"},
                { "name": "胎膜<br/>情况", "colspan": "1", "rowspan": "3"},
                { "name": "先露高低<br/>（cm）", "colspan": "1", "rowspan": "3"},
                { "name": "检查<br/>方法", "colspan": "1", "rowspan": "3"},
                { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "400px",  maxWidth: "400px"}, },
                { "name": "护士签 名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px",  maxWidth: "60px"},},
                { "name": "质控护士", "colspan": "1", "rowspan": "3"}
            ]
        ,
        mid:
            [
                {"name": "间歇<br/>（min）", "colspan": "1", "rowspan": "2"},
                {"name": "缩时<br/>（s）", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            []
        ,
    }
}
