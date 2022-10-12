
/*
  临沂沂州 - 新生儿护理记录单
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"

*/

export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "1230px"
    },
    th: {
        top:
            [
                { "name": "日期", "colspan": "1", "rowspan": "3"},
                { "name": "时间", "colspan": "1", "rowspan": "3"},
                { "name": "班次", "colspan": "1", "rowspan": "3"},
                {"name": "面色", "colspan": "3", "rowspan": "1"},
                {"name": "反应", "colspan": "2", "rowspan": "1"},
                {"name": "哭声", "colspan": "2", "rowspan": "1"},
                {"name": "吸吮", "colspan": "2", "rowspan": "1"},
                {"name": "喂养", "colspan": "2", "rowspan": "1"},
                {"name": "脐带", "colspan": "2", "rowspan": "1"},
                { "name": "大便", "colspan": "1", "rowspan": "3"},
                { "name": "小便", "colspan": "1", "rowspan": "3"},
                { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "300px",  maxWidth: "300px"}, },
                { "name": "签 名", "colspan": "1", "rowspan": "3", style: { minWidth: "60px",  maxWidth: "60px"},},
            ]
        ,
        mid:
            [
                {"name": "红润", "colspan": "1", "rowspan": "2"},
                {"name": "苍白", "colspan": "1", "rowspan": "2"},
                {"name": "黄染", "colspan": "1", "rowspan": "2"},
                {"name": "正常", "colspan": "1", "rowspan": "2"},
                {"name": "迟钝", "colspan": "1", "rowspan": "2"},
                {"name": "响亮", "colspan": "1", "rowspan": "2"},
                {"name": "低弱", "colspan": "1", "rowspan": "2"},
                {"name": "强", "colspan": "1", "rowspan": "2"},
                {"name": "弱", "colspan": "1", "rowspan": "2"},
                {"name": "母乳", "colspan": "1", "rowspan": "2"},
                {"name": "代乳品", "colspan": "1", "rowspan": "2"},
                {"name": "干燥", "colspan": "1", "rowspan": "2"},
                {"name": "渗出", "colspan": "1", "rowspan": "2"},
            ]
        ,
        bottom:
            []
        ,
    }
}
