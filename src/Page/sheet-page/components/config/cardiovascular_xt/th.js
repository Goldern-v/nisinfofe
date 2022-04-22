
/*
  佛山杏坛 - 护理记录单(心血管呼吸专科)
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
      width: "1450px"
    },
    th: {
        top:
            [
                {"name":"日期","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"体<br/>温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"HR/P<br/>次/<br/>分","colspan":"1","rowspan":"3"},
                {"name":"呼<br/>吸<br/>次/<br/>分","colspan":"1","rowspan":"3"},
                {"name":"血<br/>压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SPO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem1"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem2"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem4"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem5"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem6"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem7"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem8"},
                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>安<br/>全","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"审核<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"}}
            ]
        ,
        mid:
            [
                {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                {"name":"反射","colspan":"2","rowspan":"1"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom:
            [
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
            ]
        ,
    }
}
