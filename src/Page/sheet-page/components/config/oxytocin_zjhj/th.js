
/*
  湛江海军 - 催产素使用观察记录
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    2、特殊情况默认 { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, },
*/

export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "1100px"
    },
    th: {
        top:
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                { "name": "体温", "colspan": "1", "rowspan": "3" },
                { "name": "脉搏", "colspan": "1", "rowspan": "3" },
                { "name": "呼吸", "colspan": "1", "rowspan": "3" },
                { "name": "血压", "colspan": "1", "rowspan": "3" },
                { "name": "SPO2", "colspan": "1", "rowspan": "3" },

                {"name":"尿量","colspan":"1","rowspan":"3"},
                {"name":"膝反","colspan":"1","rowspan":"3"},
                {"name":"宫缩","colspan":"1","rowspan":"1"},
                {"name":"胎心率<br/>次/min","colspan":"1","rowspan":"3"},
                {"name":"宫颈<br/>扩张<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"先露<br/>高低<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"滴速<br/>次/mmHg","colspan":"1","rowspan":"3"},
                {"name":"特殊情况及处理","colspan":"1","rowspan":"3",style: { minWidth: "300px",  maxWidth: "300px"},},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3",style: { minWidth: "70px",  maxWidth: "70px"}}
            ]
        ,
        mid:
            [
                { "name": "持续/间歇", "colspan": "1", "rowspan": "2" },

            ]
        ,
        bottom:
            []
        ,
    }
}
