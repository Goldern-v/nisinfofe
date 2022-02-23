
/*
  顺德龙江 - 机械通气监护记录单（儿科）
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"            
    2、表格头部年份显示 {"name":'',"style":{},"colspan":"2","rowspan":"1","key":'recordYear'},
    3、特殊情况默认 { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "150px",  maxWidth: "150px"}, }, 
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
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"护理评估","colspan":"4","rowspan":"1"},
                {"name":"呼吸机参数设置","colspan":"10","rowspan":"1"},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid: 
            [
                {"name":"日期","colspan":"1","rowspan":"2"},
                {"name":"时间","colspan":"1","rowspan":"2"},
                {"name":"体<br/>位","colspan":"1","rowspan":"2"},
                {"name":"痰<br/>液<br/>形<br/>状","colspan":"1","rowspan":"2"},
                {"name":"插<br/>管<br/>深<br/>度<br/>cm","colspan":"1","rowspan":"2"},
                {"name":"湿<br/>化<br/>温<br/>度<br/>℃","colspan":"1","rowspan":"2"},
                {"name":"通<br/>气<br/>模<br/>式","colspan":"1","rowspan":"2"},
                {"name":"呼<br/>吸<br/>频<br/>率","colspan":"1","rowspan":"2"},
                {"name":"吸<br/>气<br/>时<br/>间<br/>(s)","colspan":"1","rowspan":"2"},
                {"name":"吸<br/>气<br/>峰<br/>值<br/>cmH2o","colspan":"1","rowspan":"2"},
                {"name":"PEEP<br/>(压力)","colspan":"1","rowspan":"2"},
                {"name":"氧<br/>浓<br/>度<br/>%","colspan":"1","rowspan":"2"},
                {"name":"吸<br/>气<br/>流<br/>量<br/>L/min","colspan":"1","rowspan":"2"},
                {"name":"震<br/>荡<br/>幅<br/>度<br/>mbar","colspan":"1","rowspan":"2"},
                {"name":"HFO<br/>频<br/>率<br/>Hz","colspan":"1","rowspan":"2"},
                {"name":"平<br/>均<br/>压<br/>mbar","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
