
/*
  顺德龙江 - 护理记录单（泌尿外科）
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
      width: "1170px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"T<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"P/HR<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"R<br/>(次/min)<br/>/SPO₂(%)","colspan":"1","rowspan":"3", "style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"BP<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"恶心<br/>/呕吐","colspan":"1","rowspan":"3"},
                {"name":"腰部疼痛（数字分析法）","colspan":"1","rowspan":"3","canSet":true,"key":"armValue3","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"尿频<br/>/尿急<br/>/尿痛","colspan":"1","rowspan":"3"},
                {"name":"排尿<br/>困难<br/>/血尿","colspan":"1","rowspan":"3"},
                {"name":"留置<br/>尿管<br/>/尿色","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue2","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue4","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}},
                {"name":"上级签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid: 
            [
                {"name":"内<br/>容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>(ml)","colspan":"1","rowspan":"2"},
                {"name":"内<br/>容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>(ml)","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
