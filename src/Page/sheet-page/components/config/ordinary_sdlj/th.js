
/*
  顺德龙江 - 护理普通记录单
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
      width: "1180px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"T<br/>(℃)","colspan":"1","rowspan":"3"},
                {"name":"P/HR<br/>(次/min)","colspan":"1","rowspan":"3"},
                {"name":"R<br/>(次/min)<br/>/SPO₂(%)","colspan":"1","rowspan":"3"},
                {"name":"BP<br/>(mmHg)","colspan":"1","rowspan":"3"},
                {"name":"意识","colspan":"1","rowspan":"3"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue2","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue3","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue4","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"303px","maxWidth":"303px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}},
                {"name":"上级签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid: 
            [
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>(ml)","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>(ml)","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
