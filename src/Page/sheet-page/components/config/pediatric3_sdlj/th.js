
/*
  佛山杏坛 - 护理记录单(产科新生儿科)
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
      width: "1370px"
    },
    th: {
        top:
            [
                // {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"日期","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"心率<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"反应","colspan":"3","rowspan":"1"},
                {"name":"哭声","colspan":"2","rowspan":"1"},
                {"name":"吸吮力","colspan":"3","rowspan":"1"},
                {"name":"喂养","colspan":"3","rowspan":"1"},
                {"name":"脐部情况","colspan":"3","rowspan":"1"},
                {"name":"SpO2<br/>%","colspan":"1","rowspan":"3"},
                {"name":"皮肤颜色","colspan":"1","rowspan":"3","canSet":true,"key":"skinColor"},
                {"name":"皮肤弹性","colspan":"1","rowspan":"3","canSet":true,"key":"customItem1"},
                {"name":"皮疹位置","colspan":"1","rowspan":"3","canSet":true,"key":"customItem2"},
                {"name":"性质程度","colspan":"1","rowspan":"3","canSet":true,"key":"extent"},
                {"name":"产瘤、头部血肿位置","colspan":"1","rowspan":"3","canSet":true,"key":"position"},
                {"name":"呕吐物性质","colspan":"1","rowspan":"3","canSet":true,"key":"vomit"},
                {"name":"电子血糖mmol/L","colspan":"1","rowspan":"3","canSet":true,"key":"customItem3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem4"},
                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"上级<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}}
            ]
        ,
        mid:
            [

                {"name":"好","colspan":"1","rowspan":"2"},
                {"name":"激<br/>惹","colspan":"1","rowspan":"2"},
                {"name":"差","colspan":"1","rowspan":"2"},
                {"name":"大","colspan":"1","rowspan":"2"},
                {"name":"微<br/>弱","colspan":"1","rowspan":"2"},
                {"name":"好","colspan":"1","rowspan":"2"},
                {"name":"一<br/>般","colspan":"1","rowspan":"2"},
                {"name":"差","colspan":"1","rowspan":"2"},
                {"name":"种类","colspan":"3","rowspan":"1"},
                {"name":"干<br/>洁","colspan":"1","rowspan":"2"},
                {"name":"渗<br/>血","colspan":"1","rowspan":"2"},
                {"name":"渗<br/>液","colspan":"1","rowspan":"2"},
            ]
        ,
        bottom:
            [
                {"name":"母<br/>乳","colspan":"1","rowspan":"1"},
                {"name":"代<br/>乳<br/>物","colspan":"1","rowspan":"1"},
                {"name":"混<br/>合","colspan":"1","rowspan":"1"},
            ]
        ,
    }
}
