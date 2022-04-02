
/*
  顺德龙江 - 新生儿护理记录单
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
      width: "1355px"
    },
    th: {
        top: 
            [   
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"箱<br/>温<br/>(℃)","colspan":"1","rowspan":"3"},
                {"name":"T<br/>(℃)","colspan":"1","rowspan":"3"},
                {"name":"HR<br/>(次/<br/>min)","colspan":"1","rowspan":"3"},
                {"name":"R<br/>(次/<br/>min)","colspan":"1","rowspan":"3"},
                {"name":"氧<br/>饱<br/>和<br/>度<br/>(%)","colspan":"1","rowspan":"3"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"肤<br/>色","colspan":"1","rowspan":"3"},
                {"name":"反<br/>应","colspan":"1","rowspan":"3"},
                {"name":"哭<br/>声","colspan":"1","rowspan":"3"},
                {"name":"留<br/>置<br/>针","colspan":"1","rowspan":"3"},
                {"name":"脐<br/>部<br/>情<br/>况","colspan":"1","rowspan":"3"},
                {"name":"肛<br/>周<br/>皮<br/>肤","colspan":"1","rowspan":"3"},
                {"name":"光<br/>疗<br/>情<br/>况","colspan":"1","rowspan":"3"},
                {"name":"喂养","colspan":"2","rowspan":"1"},
                {"name":"吸氧<br/>(L/min)","colspan":"2","rowspan":"1"},
                {"name":"护理措施","colspan":"4","rowspan":"1"},
                {"name":"病<br/>情","colspan":"1","rowspan":"3"},
                {"name":"自定义","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"},canSet: true, key: "armValue"},
                // {"name":"自定义","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"},canSet: true, key: "armValue2"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"55px","maxWidth":"55px"}},
                {"name":"上级<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"55px","maxWidth":"55px"}}
            ]
        ,
        mid: 
            [
                {"name":"自定义","colspan":"1","rowspan":"2","style":{"minWidth":"45px","maxWidth":"45px"},canSet: true, key: "outputCustom"},
                {"name":"量<br/>(ml)","colspan":"1","rowspan":"2"},
                {"name":"自定义","colspan":"1","rowspan":"2","style":{"minWidth":"45px","maxWidth":"45px"},canSet: true, key: "outputCustom2"},
                {"name":"量<br/>(ml)","colspan":"1","rowspan":"2"},
                {"name":"方<br/>式","colspan":"1","rowspan":"2"},
                {"name":"种<br/>类","colspan":"1","rowspan":"2"},
                {"name":"方<br/>式","colspan":"1","rowspan":"2"},
                {"name":"自定义","colspan":"1","rowspan":"2","style":{"minWidth":"45px","maxWidth":"45px"},canSet: true, key: "oxygenFlow"},
                {"name":"清<br/>洁<br/>护<br/>理","colspan":"1","rowspan":"2"},
                {"name":"光<br/>疗<br/>护<br/>理","colspan":"1","rowspan":"2"},
                {"name":"气<br/>道<br/>护<br/>理","colspan":"1","rowspan":"2"},
                {"name":"专<br/>科<br/>护<br/>理","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
