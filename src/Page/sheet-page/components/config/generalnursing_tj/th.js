
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
      width: "1300px"
    },
    th: {
        top:
            [
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"体温T<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"P/HR<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"意识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"3","rowspan":"1"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem1","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem2","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem3","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem4","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem5","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem6","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem7","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem8","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"带教<br/>护士","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
            ]
        ,
        mid:
            [
                {"name":"日期","colspan":"1","rowspan":"2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                {"name":"反射","colspan":"2","rowspan":"1"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"颜色性状","colspan":"1","rowspan":"2"},
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
