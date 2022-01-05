
/*
  佛山市一 - 护理记录单(膝关节疾患)
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
      width: "1200px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"生命体征","colspan":"5","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"患膝<br/>关节<br/>肿胀","colspan":"1","rowspan":"3"},
                {"name":"患膝<br/>关节<br/>屈曲","colspan":"1","rowspan":"3"},
                {"name":"患膝<br/>疼痛<br/>评分<br/>(分)","colspan":"1","rowspan":"3"},
                {"name":"患膝<br/>关节<br/>皮温","colspan":"1","rowspan":"3"},
                {"name":"床边<br/>备便<br/>器","colspan":"1","rowspan":"3"},
                {"name":"防跌<br/>倒教<br/>育与<br/>评估","colspan":"1","rowspan":"3"},
                {"name":"呼叫<br/>铃置<br/>可及<br/>处","colspan":"1","rowspan":"3"},
                {"name":"股四<br/>头肌<br/>肌力<br/>训练","colspan":"1","rowspan":"3"},
                {"name":"膝关<br/>节活<br/>动度<br/>训练","colspan":"1","rowspan":"3"},
                {"name":"患肢<br/>足背<br/>动脉<br/>搏动","colspan":"1","rowspan":"3"},
                { "name":"标题1", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue"}, 
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3"},
                {"name":"质控护士","colspan":"1","rowspan":"3"}
            ]
        ,
        mid: 
            [
                {"name":"体温<br/>℃","colspan":"1","rowspan":"2"},
                {"name":"脉搏<br/>次/<br/>分","colspan":"1","rowspan":"2"},
                {"name":"呼吸<br/>次/<br/>分","colspan":"1","rowspan":"2"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"2"},
                {"name":"SPO2<br/>(%)","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量ml","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
