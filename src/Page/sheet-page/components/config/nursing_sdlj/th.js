
/*
  顺德龙江 - 产科护理记录单
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
                {"name":'',"style":{},"colspan":"2","rowspan":"1","key":'recordYear'},
                {"name":"产妇","colspan":"15","rowspan":"1"},
                {"name":"新生儿","colspan":"9","rowspan":"1"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid: 
            [
                {"name":"日期","colspan":"1","rowspan":"2"},
                {"name":"时间","colspan":"1","rowspan":"2"},
                {"name":"T<br/>(℃)","colspan":"1","rowspan":"2"},
                {"name":"P<br/>(次<br/>/min)","colspan":"1","rowspan":"2"},
                {"name":"R<br/>(次<br/>/min)","colspan":"1","rowspan":"2"},
                {"name":"BP<br/>(mmHg)","colspan":"1","rowspan":"2"},
                {"name":"意<br/>识","colspan":"1","rowspan":"2"},
                {"name":"宫底<br/>高度<br/>U=Fb","colspan":"1","rowspan":"2"},
                {"name":"子<br/>宫<br/>收<br/>缩","colspan":"1","rowspan":"2"},
                {"name":"产后<br/>出血<br/>量<br/>(ml)","colspan":"1","rowspan":"2"},
                {"name":"伤口","colspan":"1","rowspan":"2", canSet: true, key: "wound", "style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"乳<br/>房<br/>情<br/>况","colspan":"1","rowspan":"2"},
                {"name":"泌<br/>乳<br/>情<br/>况","colspan":"1","rowspan":"2"},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue", "style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue2", "style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue3", "style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue4", "style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"T<br/>(℃)","colspan":"1","rowspan":"2"},
                {"name":"R<br/>(次<br/>/min)","colspan":"1","rowspan":"2"},
                {"name":"反<br/>应","colspan":"1","rowspan":"2"},
                {"name":"哭<br/>声","colspan":"1","rowspan":"2"},
                {"name":"吸<br/>吮<br/>力","colspan":"1","rowspan":"2"},
                {"name":"自<br/>吮<br/>种<br/>类","colspan":"1","rowspan":"2"},
                {"name":"皮<br/>肤<br/>颜<br/>色","colspan":"1","rowspan":"2"},
                {"name":"脐<br/>部<br/>情<br/>况","colspan":"1","rowspan":"2"},
                {"name":"早早<br/>接吮<br/>触吸","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
