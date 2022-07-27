
/*
  顺德龙江 - 护理记录单（显微外科）
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
      width: "1250px"
    },
    th: {
        top:
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"T<br/>(℃)","colspan":"1","rowspan":"3"},
                {"name":"P/HR<br/>(次/分)","colspan":"1","rowspan":"3"},
                {"name":"R<br/>(次/分)","colspan":"1","rowspan":"3"},
                {"name":"BP<br/>(mmHg)","colspan":"1","rowspan":"3"},
                {"name":"意识","colspan":"1","rowspan":"3"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"抬高<br/>患肢","colspan":"1","rowspan":"3"},
                {"name":"伤口<br/>疼痛","colspan":"1","rowspan":"3"},
                {"name":"伤口<br/>敷料","colspan":"1","rowspan":"3"},
                {"name":"石膏<br/>固定","colspan":"1","rowspan":"3"},
                // {"name":"皮瓣<br/>固定","colspan":"1","rowspan":"3"},

                {"name":"功能<br/>锻炼","colspan":"1","rowspan":"3"},
                {"name":"患肢<br/>情况","colspan":"4","rowspan":"1"},
                {"name":"","colspan":"1","rowspan":"3", "canSet":true,"key":"flapFixed","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}},
                {"name":"上级签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid:
            [
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"颜色","colspan":"1","rowspan":"2"},
                {"name":"皮肤","colspan":"1","rowspan":"2"},
                {"name":"肿胀","colspan":"1","rowspan":"2"},
                {"name":"感觉","colspan":"1","rowspan":"2"},
            ]
        ,
        bottom:
            [
            ]
        ,
    }
}
