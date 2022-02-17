
/*
  东莞谢岗 - 腹膜透析记录单
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
                {"name":"透析次数<br/>(次)","colspan":"1","rowspan":"3"},
                {"name":"透析浓度<br/>(%)","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>(次/min)","colspan":"1","rowspan":"3"},
                {"name":"透入量<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"透出量<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"超滤量<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"颜色","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>(mmHg)","colspan":"1","rowspan":"3"},
                {"name":"体重<br/>(kg)","colspan":"1","rowspan":"3"},
                {"name":"尿量<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"备注","colspan":"1","rowspan":"3",style:{ minWidth:"150px", maxWidth:"150px"},},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3",style:{ minWidth:"70px", maxWidth:"70px"},}
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
