
/*
  佛山杏坛 - 护理记录单(产前待产记录)
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
      width: "1360px"
    },
    th: {
        top:
            [
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"P/HR<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO2<br/>%","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"胎<br/>位","colspan":"1","rowspan":"3"},
                {"name":"胎<br/>心<br/>音<br/>次<br/>/分","colspan":"1","rowspan":"3"},
                {"name":"数<br/>胎<br/>动<br/>次<br/>/h","colspan":"1","rowspan":"3"},
                {"name":"衔<br/>接","colspan":"1","rowspan":"3"},
                {"name":"宫缩","colspan":"4","rowspan":"1"},
                {"name":"宫<br/>颈<br/>扩<br/>张<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"先<br/>露<br/>高<br/>低<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"胎<br/>膜","colspan":"1","rowspan":"3"},
                {"name":"羊<br/>水<br/>性<br/>状","colspan":"1","rowspan":"3"},
                {"name":"宫<br/>颈<br/>内<br/>口<br/>探<br/>查","colspan":"1","rowspan":"3"},
                {"name":"吸<br/>氧<br/>升<br/>/分","colspan":"1","rowspan":"3"},
                {"name":"微<br/>机<br/>血<br/>糖<br/>mmol<br/>/L","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"护<br/>理<br/>安<br/>全","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"审核<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}}
            ]
        ,
        mid:
            [
                {"name":"日期","colspan":"1","rowspan":"2", "style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"2", "style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"项目","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"无","colspan":"1","rowspan":"2"},
                {"name":"持<br/>续","colspan":"1","rowspan":"2"},
                {"name":"间<br/>歇","colspan":"1","rowspan":"2"},
                {"name":"强<br/>度","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom:
            []
        ,
    }
}
