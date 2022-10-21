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
                {"name":"SpO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"泌<br/>乳<br/>情<br/>况","colspan":"1","rowspan":"3"},
                {"name":"宫<br/>底<br/>高<br/>度<br/>U=<br/>Fb","colspan":"1","rowspan":"3"},
                {"name":"子宫<br/>收缩","colspan":"2","rowspan":"1"},
                {"name":"伤口<br/>情况","colspan":"2","rowspan":"1"},
                {"name":"健康宣教","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem1"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem2"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem4"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem5"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem6"},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem7"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem8"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"带教<br/>护士","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"}}
            ]
        ,
        mid:
            [
                {"name":"日期","colspan":"1","rowspan":"2"},
                {"name":"时间","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"硬","colspan":"1","rowspan":"2"},
                {"name":"软","colspan":"1","rowspan":"2"},
                {"name":"腹部","colspan":"1","rowspan":"2"},
                {"name":"会阴","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom:
            []
        ,
    }
}
