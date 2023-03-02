
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
      width: "1410px"
    },
    th: {
        top:
            [
                { "name": "日期", "colspan": "1", "rowspan": "3"},
                { "name": "时间", "colspan": "1", "rowspan": "3"},
                // {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "3"},
                { "name": "生命体征", "colspan": "8", "rowspan": "1"},
                { "name": "入量", "colspan": "2", "rowspan": "1"},
                { "name": "出量", "colspan": "3", "rowspan": "1"},
                { "name": "宫缩", "colspan": "2", "rowspan": "1" , style: { minWidth: "33px",  maxWidth: "33px"},},
                {"name": "胎心<br/>次/分", "colspan": "1", "rowspan": "3",style: { minWidth: "33px",  maxWidth: "33px"}},
                {"name": "宫颈扩张<br/>（cm）", "colspan": "1", "rowspan": "3"},
                { "name": "胎膜<br/>情况", "colspan": "1", "rowspan": "3"},
                { "name": "先露高低<br/>（cm）", "colspan": "1", "rowspan": "3"},
                { "name": "检查<br/>方法", "colspan": "1", "rowspan": "3"},
                { "name": "催产素浓度<br/>（u/500ml）", "colspan": "1", "rowspan": "3"},
                { "name": "滴速<br/>（滴/分）", "colspan": "1", "rowspan": "3"},
                { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"customValue3"},
                { "name": "", "colspan": "1", "rowspan": "3",canSet:true,key:"customValue4"},
                { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "163px",  maxWidth: "163px"}, },
                { "name": "护士签名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px",  maxWidth: "60px"},},
                { "name": "质控护士", "colspan": "1", "rowspan": "3"}
            ]
        ,
        mid:
            [
              {"name": "体温<br/>℃", "colspan": "1", "rowspan": "2"},
                {"name": "脉搏<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "心率<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "呼吸<br/>次/<br/>分", "colspan": "1", "rowspan": "2"},
                {"name": "血压<br/>mmHg", "colspan": "1", "rowspan": "2"},
                {"name": "SPO2<br/>(%)", "colspan": "1", "rowspan": "2",},
                {"name": "", "colspan": "1", "rowspan": "2", canSet: true, key: "customValue1"},
                {"name": "", "colspan": "1", "rowspan": "2", canSet: true, key: "customValue2"},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "内容", "colspan": "1", "rowspan": "2"},
                {"name": "量ml", "colspan": "1", "rowspan": "2"},
                {"name": "颜色/性状", "colspan": "1", "rowspan": "2"},
                {"name": "间歇<br/>（min）", "colspan": "1", "rowspan": "2"},
                {"name": "缩时<br/>（s）", "colspan": "1", "rowspan": "2"},

            ]
        ,
        bottom:
            []
        ,
    }
}
