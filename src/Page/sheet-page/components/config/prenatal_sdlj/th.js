
/*
  顺德龙江 - 产前待产记录单
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
                {"name":"观察项目","colspan":"21","rowspan":"1"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}},
                {"name":"上级签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid:
            [
                {"name":"日期","colspan":"1","rowspan":"2"},
                {"name":"时间","colspan":"1","rowspan":"2"},
                {"name":"体温<br/>(℃)","colspan":"1","rowspan":"2"},
                {"name":"脉搏<br/>(次/分)","colspan":"1","rowspan":"2"},
                {"name":"呼吸<br/>(次/分)","colspan":"1","rowspan":"2"},
                {"name":"吸氧<br/>(L/min)","colspan":"1","rowspan":"2"},
                {"name":"血压<br/>(mmHg)","colspan":"1","rowspan":"2"},
                {"name":"胎<br/>位","colspan":"1","rowspan":"2"},
                {"name":"胎心<br/>(次<br/>/min)","colspan":"1","rowspan":"2"},
                {"name":"衔<br/>接","colspan":"1","rowspan":"2"},
                {"name":"宫缩","colspan":"3","rowspan":"1"},
                {"name":"宫颈<br/>扩张<br/>(cm)","colspan":"1","rowspan":"2"},
                {"name":"先露<br/>高低<br/>(cm)","colspan":"1","rowspan":"2"},
                {"name":"胎<br/>膜","colspan":"1","rowspan":"2"},
                {"name":"羊水<br/>性状","colspan":"1","rowspan":"2"},
                {"name":"阴道<br/>流血<br/>(ml)","colspan":"1","rowspan":"2"},
                {"name":"数<br/>胎动<br/>(次/h)","colspan":"1","rowspan":"2"},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue2","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue3","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue4","style":{"minWidth":"45px","maxWidth":"45px"}}
            ]
        ,
        bottom:
            [
                {"name":"强度","colspan":"1","rowspan":"1"},
                {"name":"持续<br/>(s)","colspan":"1","rowspan":"1"},
                {"name":"间歇<br/>(min)","colspan":"1","rowspan":"1"}
            ]
        ,
    }
}
