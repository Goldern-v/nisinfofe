
/*
  顺德龙江 - 儿科护理记录单
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
      width: "1200px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"2"},
                {"name":"时间","colspan":"1","rowspan":"2"},
                {"name":"T<br/>(℃)","colspan":"1","rowspan":"2"},
                {"name":"P/HR<br/>(次/分)","colspan":"1","rowspan":"2"},
                {"name":"R<br/>(次/分)","colspan":"1","rowspan":"2"},
                {"name":"BP<br/>(mmHg)","colspan":"1","rowspan":"2"},
                {"name":"意识","colspan":"1","rowspan":"2"},
                {"name":"吸氧<br/>（L/min）","colspan":"2","rowspan":"1"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"基础护理","colspan":"4","rowspan":"1"},
                {"name":"大便","colspan":"1","rowspan":"2"},
                {"name":"小便","colspan":"1","rowspan":"2"},
                {"name":"咳嗽","colspan":"1","rowspan":"2"},
                {"name":"痰液<br/>性状","colspan":"1","rowspan":"2"},
                {"name":"","colspan":"1","rowspan":"2","canSet":true,"key":"customItem5","style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2","canSet":true,"key":"customItem6","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"2","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士签名","colspan":"1","rowspan":"2","style":{"minWidth":"60px","maxWidth":"60px"}},
                {"name":"上级签名","colspan":"1","rowspan":"2","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid: 
            [
                {"name":"方式","colspan":"1","rowspan":"1"},
                {"name":"","colspan":"1","rowspan":"1","canSet":true,"key":"pupilReflexLeft","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"名称","colspan":"1","rowspan":"1"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"1"},
                {"name":"名称","colspan":"1","rowspan":"1"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"1"},
                {"name":"清洁<br/>护理","colspan":"1","rowspan":"1"},
                // {"name":"管道<br/>护理","colspan":"1","rowspan":"1"},
                {"name":"气道<br/>护理","colspan":"1","rowspan":"1"},
                {"name":"物理<br/>降温","colspan":"1","rowspan":"1"},
                {"name":"饮食<br/>护理","colspan":"1","rowspan":"1"},
            ]
        ,
        // bottom: 
        //     [
        //         {"name":"左","colspan":"1","rowspan":"1"},
        //         {"name":"右","colspan":"1","rowspan":"1"},
        //         {"name":"左","colspan":"1","rowspan":"1"},
        //         {"name":"右","colspan":"1","rowspan":"1"}
        //     ]
        // ,
    }
}  
