
/*
  东莞谢岗 - 催产素静脉点滴观察单
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
                {"name":"催产素<br/>浓度<br/>U/500ml","colspan":"1","rowspan":"3"},
                {"name":"滴数<br/>(滴/分)","colspan":"1","rowspan":"3"},
                {"name":"宫缩<br/>(s/min)","colspan":"1","rowspan":"3"},
                {"name":"胎心<br/>(次/min)","colspan":"1","rowspan":"3"},
                {"name":"宫口<br/>扩张<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"先露<br/>高低<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>(mmHg)","colspan":"1","rowspan":"3"},
                {"name":"特殊情况及处理","colspan":"1","rowspan":"3",style: { minWidth: "150px",  maxWidth: "150px"},},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3",style: { minWidth: "70px",  maxWidth: "70px"}}
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
