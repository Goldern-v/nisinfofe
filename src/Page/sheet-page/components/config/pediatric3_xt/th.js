
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
      width: "1290px"
    },
    th: {
        top: 
            [
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"心率<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"SpO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"大<br/>便<br/>次<br/>数","colspan":"1","rowspan":"3"},
                {"name":"小<br/>便<br/>次<br/>数","colspan":"1","rowspan":"3"},
                {"name":"反应","colspan":"3","rowspan":"1"},
                {"name":"哭声","colspan":"2","rowspan":"1"},
                {"name":"吸吮力","colspan":"3","rowspan":"1"},
                {"name":"喂养","colspan":"5","rowspan":"1"},
                {"name":"呕<br/>吐","colspan":"1","rowspan":"3"},
                {"name":"性<br/>质","colspan":"1","rowspan":"3"},
                {"name":"脐部情况","colspan":"3","rowspan":"1"},
                {"name":"皮<br/>肤<br/>颜<br/>色","colspan":"1","rowspan":"3"},
                {"name":"皮<br/>肤<br/>弹<br/>性","colspan":"1","rowspan":"3"},
                {"name":"皮<br/>疹<br/>位<br/>置","colspan":"1","rowspan":"3"},
                {"name":"性<br/>质<br/>程<br/>度","colspan":"1","rowspan":"3"},
                {"name":"产<br/>瘤<br/>位<br/>置","colspan":"1","rowspan":"3"},
                {"name":"产<br/>瘤<br/>大<br/>小<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"头<br/>部<br/>血<br/>肿<br/>位<br/>置","colspan":"1","rowspan":"3"},
                {"name":"头<br/>部<br/>血<br/>肿<br/>大<br/>小<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"臀<br/>部<br/>护<br/>理","colspan":"1","rowspan":"3"},
                {"name":"水<br/>疗","colspan":"1","rowspan":"3"},
                {"name":"抚<br/>触","colspan":"1","rowspan":"3"},
                {"name":"脐<br/>部<br/>护<br/>理","colspan":"1","rowspan":"3"},
                {"name":"经<br/>皮<br/>胆<br/>红<br/>素<br/>测<br/>定<br/>额<br/>mg","colspan":"1","rowspan":"3"},
                {"name":"经<br/>皮<br/>胆<br/>红<br/>素<br/>测<br/>定<br/>胸<br/>dl","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue","style":{"minWidth":"25px","maxWidth":"25px"}},
                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"报<br/>告<br/>医<br/>生","colspan":"1","rowspan":"3"},
                {"name":"遵<br/>医<br/>嘱<br/>继<br/>续<br/>观<br/>察","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}}
            ]
        ,
        mid: 
            [
                {"name":"日期","colspan":"1","rowspan":"2"},
                {"name":"时间","colspan":"1","rowspan":"2"},
                {"name":"好","colspan":"1","rowspan":"2"},
                {"name":"激<br/>惹","colspan":"1","rowspan":"2"},
                {"name":"差","colspan":"1","rowspan":"2"},
                {"name":"大","colspan":"1","rowspan":"2"},
                {"name":"微<br/>弱","colspan":"1","rowspan":"2"},
                {"name":"好","colspan":"1","rowspan":"2"},
                {"name":"一<br/>般","colspan":"1","rowspan":"2"},
                {"name":"差","colspan":"1","rowspan":"2"},
                {"name":"种类","colspan":"3","rowspan":"1"},
                {"name":"方式","colspan":"2","rowspan":"1"},
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
                {"name":"自<br/>吮","colspan":"1","rowspan":"1"},
                {"name":"口<br/>饲","colspan":"1","rowspan":"1"}
            ]
        ,
    }
}  
