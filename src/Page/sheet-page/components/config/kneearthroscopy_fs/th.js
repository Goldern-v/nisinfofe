
/*
  佛山市一 - 护理记录单(膝关节镜术护理记录单)
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
                {"name":"患膝关节皮温","colspan":"1","rowspan":"3"},
                {"name":"患膝自主屈膝","colspan":"1","rowspan":"3"},
                {"name":"患膝关疼痛评分(分)","colspan":"1","rowspan":"3"},
                {"name":"伤口外敷料","colspan":"1","rowspan":"3"},
                {"name":"伤口引流管","colspan":"1","rowspan":"3"},
                {"name":"伤口引流液颜色","colspan":"1","rowspan":"3"},
                {"name":"患膝弹力绷带包扎","colspan":"1","rowspan":"3"},
                {"name":"患膝冰敷","colspan":"1","rowspan":"3"},
                {"name":"患肢各趾皮温","colspan":"1","rowspan":"3"},
                {"name":"患肢各趾甲床","colspan":"1","rowspan":"3"},
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
