
/*
  顺德龙江 - 硫酸镁、安宝静脉点滴观察记录表
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
      width: "900px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"液体<br/>名称<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"硫酸镁","colspan":"1","rowspan":"3"},
                {"name":"安宝","colspan":"1","rowspan":"3"},
                {"name":"滴速<br/>(滴/分)","colspan":"1","rowspan":"3"},
                {"name":"宫缩<br/>(s/min)","colspan":"1","rowspan":"3"},
                {"name":"心率<br/>(次/分)","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>(次/分)","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>(mmHg)","colspan":"1","rowspan":"3"},
                {"name":"尿量<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"膝反射","colspan":"2","rowspan":"1"},
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}}
            ]
        ,
        mid: 
            [
                {"name":"左侧","colspan":"1","rowspan":"2"},
                {"name":"右侧","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
