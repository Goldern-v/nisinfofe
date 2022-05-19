
/*
  佛山杏坛 - 护理记录单(儿科)
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
      width: "1360px"
    },
    th: {
        top:
            [
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"HR/P<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"意识<br/>/<br/>精神<br/>状态","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"3","rowspan":"1"},
                // {"name":"皮肤颜色","colspan":"1","rowspan":"3","canSet":true,"key":"armValue","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"脱水貌","colspan":"1","rowspan":"3","canSet":true,"key":"armValue2","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"上<br/>呼<br/>吸<br/>道<br/>症<br/>状","colspan":"1","rowspan":"3"},
                // {"name":"张口呼吸","colspan":"1","rowspan":"3","canSet":true,"key":"armValue3","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"咳<br/>嗽","colspan":"1","rowspan":"3"},
                // {"name":"咳<br/>痰","colspan":"1","rowspan":"3"},
                // {"name":"痰<br/>液<br/>性<br/>质","colspan":"1","rowspan":"3"},
                // {"name":"痰<br/>量","colspan":"1","rowspan":"3"},
                // {"name":"喘息","colspan":"1","rowspan":"3","canSet":true,"key":"armValue4","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"喘憋","colspan":"1","rowspan":"3","canSet":true,"key":"armValue5","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"气促","colspan":"1","rowspan":"3","canSet":true,"key":"armValue6","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"呼吸困难","colspan":"1","rowspan":"3","canSet":true,"key":"armValue7","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"鼻翼煽动","colspan":"1","rowspan":"3","canSet":true,"key":"armValue8","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"三凹征","colspan":"1","rowspan":"3","canSet":true,"key":"armValue9","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"皮肤黏膜异常部位","colspan":"1","rowspan":"3","canSet":true,"key":"armValue10","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"皮肤黏膜性质程度","colspan":"1","rowspan":"3","canSet":true,"key":"armValue11","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"恶心","colspan":"1","rowspan":"3","canSet":true,"key":"armValue12","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"呕吐","colspan":"1","rowspan":"3","canSet":true,"key":"armValue13","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"腹痛","colspan":"1","rowspan":"3","canSet":true,"key":"armValue14","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"腹胀","colspan":"1","rowspan":"3","canSet":true,"key":"armValue15","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"大便性状及颜色","colspan":"1","rowspan":"3","canSet":true,"key":"armValue16","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue17","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue18","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue19","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue20","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue21","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue22","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"留<br/>置<br/>针<br/>部<br/>位","colspan":"1","rowspan":"3"},
                // {"name":"留<br/>置<br/>针<br/>情<br/>况","colspan":"1","rowspan":"3"},
                // {"name":"冲<br/>管<br/>护<br/>理","colspan":"1","rowspan":"3"},
                // {"name":"吸氧方式","colspan":"1","rowspan":"3","canSet":true,"key":"armValue24","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"氧流量L/min","colspan":"1","rowspan":"3","canSet":true,"key":"armValue25","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"心电监护","colspan":"1","rowspan":"3","canSet":true,"key":"armValue26","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"更换脱氧探头位置","colspan":"1","rowspan":"3","canSet":true,"key":"armValue27","style":{"minWidth":"18px","maxWidth":"18px"}},

                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem1","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem2","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem3","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem4","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem5","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem6","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem7","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem8","style":{"minWidth":"50px","maxWidth":"50px"}},

                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>安<br/>全","colspan":"1","rowspan":"3"},
                // {"name":"报<br/>告<br/>医<br/>生","colspan":"1","rowspan":"3"},
                {"name":"遵<br/>医<br/>嘱<br/>继<br/>续<br/>观<br/>察","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"100px","maxWidth":"100px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"审核<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"}}
            ]
        ,
        mid:
            [
                {"name":"日期","colspan":"1","rowspan":"2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                {"name":"反射","colspan":"2","rowspan":"1"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"颜色<br/>性状","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom:
            [
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"}
            ]
        ,
    }
}
