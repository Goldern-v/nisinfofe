
/*
  佛山市一 - 护理记录单(膝关节镜术护理记录单)
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    2、特殊情况默认 { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "163px",  maxWidth: "163px"}, }, 
*/

export default {
    // 科室的名称
    deptType: "",
    style: {
      width: "1210px"
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
                {"name":"患膝<br/>关节<br/>皮温","colspan":"1","rowspan":"3"},
                {"name":"患膝<br/>自主<br/>屈膝","colspan":"1","rowspan":"3"},
                {"name":"患膝<br/>关疼<br/>痛评<br/>分(分)","colspan":"1","rowspan":"3"},
                {"name":"伤口<br/>外敷<br/>料","colspan":"1","rowspan":"3"},
                {"name":"伤口<br/>引流<br/>管","colspan":"1","rowspan":"3"},
                {"name":"伤口<br/>引流<br/>液颜<br/>色","colspan":"1","rowspan":"3"},
                {"name":"患膝<br/>弹力<br/>绷带<br/>包扎","colspan":"1","rowspan":"3"},
                {"name":"患膝<br/>冰敷","colspan":"1","rowspan":"3"},
                {"name":"患肢<br/>各趾<br/>皮温","colspan":"1","rowspan":"3"},
                {"name":"患肢<br/>各趾<br/>甲床","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"163px","maxWidth":"163px"}},
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
