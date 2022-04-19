
/*
  佛山杏坛 - 护理记录单(心血管呼吸专科)
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
      width: "1450px"
    },
    th: {
        top:
            [
                {"name":"日期","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"体<br/>温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"HR/P<br/>次/<br/>分","colspan":"1","rowspan":"3"},
                {"name":"呼<br/>吸<br/>次/<br/>分","colspan":"1","rowspan":"3"},
                {"name":"血<br/>压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SPO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"胃管","colspan":"1","rowspan":"3","canSet":true,"key":"tube","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"刻度 cm","colspan":"1","rowspan":"3","canSet":true,"key":"calibration","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"尿管","colspan":"1","rowspan":"3","canSet":true,"key":"urine","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"吸<br/>氧<br/>升<br/>/分","colspan":"1","rowspan":"3"},
                {"name":"体<br/>位","colspan":"1","rowspan":"3"},
                {"name":"气<br/>促","colspan":"1","rowspan":"3"},
                {"name":"咳<br/>嗽","colspan":"1","rowspan":"3"},
                {"name":"咳<br/>痰","colspan":"1","rowspan":"3"},
                {"name":"口唇颜色","colspan":"1","rowspan":"3","canSet":true,"key":"lipColor","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"心<br/>悸","colspan":"1","rowspan":"3"},
                {"name":"胸<br/>闷","colspan":"1","rowspan":"3"},
                {"name":"眩晕","colspan":"1","rowspan":"3","canSet":true,"key":"vertigo","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"头晕","colspan":"1","rowspan":"3","canSet":true,"key":"dizzy","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"恶心","colspan":"1","rowspan":"3","canSet":true,"key":"nausea","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"头痛","colspan":"1","rowspan":"3","canSet":true,"key":"haveHadache","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"胸痛","colspan":"1","rowspan":"3","canSet":true,"key":"chestPain","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"吞咽困难","colspan":"1","rowspan":"3","canSet":true,"key":"swallowing","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"饮水呛咳","colspan":"1","rowspan":"3","canSet":true,"key":"chokingCugh","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"呕吐","colspan":"1","rowspan":"3","canSet":true,"key":"replaceProbe","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"水肿护理措施","colspan":"1","rowspan":"3","canSet":true,"key":"edemaNursing","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"水肿部位及程度","colspan":"1","rowspan":"3","canSet":true,"key":"edemaArea","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"新活素 mg / h","colspan":"1","rowspan":"3","canSet":true,"key":"live","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"多巴胺","colspan":"1","rowspan":"3","canSet":true,"key":"dopamine","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"","colspan":"1","rowspan":"3", canSet: true, key: "armValue","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"","colspan":"1","rowspan":"3", canSet: true, key: "armValue2","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"饮<br/>食<br/>指<br/>导","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>安<br/>全","colspan":"1","rowspan":"3"},
                {"name":"启用<br/>相关<br/>护理<br/>表格","colspan":"1","rowspan":"3"},
                {"name":"报<br/>告医<br/>生","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"审核<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"45px","maxWidth":"45px"}}
            ]
        ,
        mid:
            [
                {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                {"name":"反射","colspan":"2","rowspan":"1"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"}
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
