
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
      width: "1320px"
    },
    th: {
        top:
            [
                // {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"日期","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"T<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"HR<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"R<br/>次/分","colspan":"1","rowspan":"3"},
                // {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"Bp<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO₂<br/>%","colspan":"1","rowspan":"3"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"颜<br/>色<br/>性<br/>状","colspan":"1","rowspan":"3"},
                {"name":"反应","colspan":"1","rowspan":"3"},
                {"name":"哭声","colspan":"1","rowspan":"3"},
                {"name":"吸吮力","colspan":"1","rowspan":"3"},
                {"name":"喂养","colspan":"2","rowspan":"1"},
                {"name":"吸氧","colspan":"2","rowspan":"1"},
                {"name":"皮肤颜色","colspan":"1","rowspan":"3"},
                {"name":"脐部情况","colspan":"1","rowspan":"3"},
                {"name":"箱温","colspan":"1","rowspan":"3"},
                {"name":"体重","colspan":"1","rowspan":"3"},
                {"name":"血糖","colspan":"1","rowspan":"3"},
                {"name":"新生儿护理","colspan":"1","rowspan":"3"},
                // {"name":"健康宣教","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"fieldOne","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"fieldTwo","style":{"minWidth":"30px","maxWidth":"30px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"130px","maxWidth":"150px"}},
                {"name":"护士<br/>签  名","colspan":"1","rowspan":"3","style":{"minWidth":"42px","maxWidth":"42px"}},
                {"name":"审核人<br/>签  名","colspan":"1","rowspan":"3","style":{"minWidth":"42px","maxWidth":"42px"}},
            ]
        ,
        mid:
            [
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量ml","colspan":"1","rowspan":"2"},
                {"name":"方式","colspan":"1","rowspan":"2"},
                {"name":"种类","colspan":"1","rowspan":"2"},
                {"name":"方式","colspan":"1","rowspan":"2"},
                {"name":"流量","colspan":"1","rowspan":"2"},
            ]
        ,
        bottom:[]
    }
}
