
/*
  佛山杏坛 - 危重症护理记录单
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
      width: "1300px"
    },
    th: {
        top:
            [
                {"name":"","colspan":"2","rowspan":"1","key":'recordYear'},
                {"name":"T<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"HR<br/>次/<br/>分","colspan":"1","rowspan":"3"},
                {"name":"R<br/>次/<br/>分","colspan":"1","rowspan":"3"},
                {"name":"BP<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SPO2<br/>%","colspan":"1","rowspan":"3"},
                {"name":"血糖<br/>mmol<br/>/L","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"吸<br/>痰","colspan":"1","rowspan":"3"},
                {"name":"气管<br/>插管<br/>置管<br/>刻度<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"呼吸机参数","colspan":"5","rowspan":"1"},
                {"name":"防压<br/>疮护<br/>理","colspan":"1","rowspan":"3", canSet: true, key: "pressureDefense"},
                {"name":"使用<br/>约束<br/>带","colspan":"1","rowspan":"3", canSet: true, key: "constraintTape"},
                {"name":"约束<br/>带处<br/>皮肤","colspan":"1","rowspan":"3", canSet: true, key: "restraintSkin"},
                {"name":"肾上<br/>腺素<br/>(mg)","colspan":"1","rowspan":"3", canSet: true, key: "adrenaline"},
                // {"name":"多巴<br/>胺","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3", canSet: true, key: "armValue1","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"审核<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}}
            ]
        ,
        mid:
            [
                {"name":"日期","colspan":"1","rowspan":"2", "style": {"minWidth": "35px"}},
                {"name":"时间","colspan":"1","rowspan":"2", "style": {"minWidth": "35px"}},
                {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                {"name":"反射","colspan":"2","rowspan":"1"},
                {"name":"项目","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"项目","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"呼<br/>吸<br/>模<br/>式","colspan":"1","rowspan":"2"},
                {"name":"FiO2<br/>%","colspan":"1","rowspan":"2"},
                {"name":"频<br/>率","colspan":"1","rowspan":"2"},
                {"name":"PS<br/>CmH2O","colspan":"1","rowspan":"2"},
                {"name":"PEEP<br/>CmH2O","colspan":"1","rowspan":"2"},

            ]
        ,
        bottom:
            [
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
            ]
        ,
    }
}
