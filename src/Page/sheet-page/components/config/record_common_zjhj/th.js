
/*
  佛山同江 - 护理记录单（全院通用）
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
      width: "1280px"
    },
    th: {
        top:
            [
                // {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"日期","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"T<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"P<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"R<br/>次/分","colspan":"1","rowspan":"3"},
                // {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"Bp<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO₂<br/>%","colspan":"1","rowspan":"3"},
                {"name":"氧流量<br/>L/min","colspan":"1","rowspan":"3"},
                {"name":"意识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"2","rowspan":"1"},
                {"name":"光反射","colspan":"2","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"3","rowspan":"1"},
                // {"name":"健康宣教","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"fieldOne","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"fieldTwo","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"fieldThree","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"fieldFour","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"fieldFive","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"fieldSix","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"180px","maxWidth":"180px"}},
                {"name":"签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
                // {"name":"带教<br/>护士","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
            ]
        ,
        mid:
            [
                // {"name":"日期","colspan":"1","rowspan":"2","style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"时间","colspan":"1","rowspan":"2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"左","colspan":"1","rowspan":"2"},
                {"name":"右","colspan":"1","rowspan":"2"},
                {"name":"左","colspan":"1","rowspan":"2"},
                {"name":"右","colspan":"1","rowspan":"2"},
                // {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                // {"name":"反射","colspan":"2","rowspan":"1"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"颜色性状","colspan":"1","rowspan":"2"},
            ]
        ,
        bottom:[]
    }
}
