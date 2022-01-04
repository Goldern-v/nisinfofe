
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
    // style: {
    //   width: "1300px"
    // },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"生命体征","colspan":"5","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"患膝关节肿胀","colspan":"1","rowspan":"3"},
                {"name":"患膝关节屈曲","colspan":"1","rowspan":"3"},
                {"name":"患膝疼痛评分(分)","colspan":"1","rowspan":"3"},
                {"name":"患膝关节皮温","colspan":"1","rowspan":"3"},
                {"name":"床边备便器","colspan":"1","rowspan":"3"},
                {"name":"防跌倒教育与评估","colspan":"1","rowspan":"3"},
                {"name":"呼叫铃置可及处","colspan":"1","rowspan":"3"},
                {"name":"股四头肌肌力训练","colspan":"1","rowspan":"3"},
                {"name":"膝关节活动度训练","colspan":"1","rowspan":"3"},
                {"name":"患肢足背动脉搏动","colspan":"1","rowspan":"3"},
                { "name": "标题1", "colspan": "1", "rowspan": "3", canSet: true, key: "armValue"}, 
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
                {"name":"量ml","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
