
/*
  东莞谢岗 - 硫酸镁注射液静脉滴注观察记录单
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    2、特殊情况默认 { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, }, 
*/

export default {
    // 科室的名称
    deptType: "",
    // style: {
    //   width: "1300px"
    // },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"用量<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"滴速<br/>(ml/h)","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>(次/min)","colspan":"1","rowspan":"3"},
                {"name":"心率<br/>(次/min)","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>(mmHg)","colspan":"1","rowspan":"3"},
                {"name":"膝反射","colspan":"1","rowspan":"3"},
                {"name":"宫缩<br/>(s/min)","colspan":"1","rowspan":"3"},
                {"name":"尿量<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"特殊情况","colspan":"1","rowspan":"3",style: { minWidth: "150px",  maxWidth: "150px"},},
                {"name":"记录者<br/>签名","colspan":"1","rowspan":"3",style: { minWidth: "70px",  maxWidth: "70px"}}
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
