
/*
  佛山杏坛 - 外一护理记录单
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
      width: "1385px"
    },
    th: {
        top:
            [
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"HR/P<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"3","rowspan":"1"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue2","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue3","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue4","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"尿<br/>管","colspan":"1","rowspan":"3"},
                {"name":"尿<br/>液<br/>颜<br/>色","colspan":"1","rowspan":"3"},
                {"name":"胃<br/>管","colspan":"1","rowspan":"3"},
                {"name":"胃管<br/>置入<br/>刻度<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue5","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue6","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue7","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"启用相关护理表格","colspan":"1","rowspan":"3","canSet":true,"key":"armValue8","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"心<br/>电<br/>监<br/>护","colspan":"1","rowspan":"3"},
                {"name":"吸<br/>氧<br/>升/分","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"饮<br/>食<br/>指<br/>导","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>安<br/>全","colspan":"1","rowspan":"3"},
                {"name":"报<br/>告<br/>医<br/>生","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"审核<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}}
            ]
        ,
        mid:
            [
                {"name":"日期","colspan":"1","rowspan":"2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                {"name":"对光<br/>反射","colspan":"2","rowspan":"1"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"颜<br/>色","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom:
            [
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"}
            ]
        ,
    }
}
