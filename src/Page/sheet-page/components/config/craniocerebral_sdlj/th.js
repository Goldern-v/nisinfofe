
/*
  顺德龙江 - 护理记录单（颅脑外科）
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
      width: "1290px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"T<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"P/HR<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"R<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"BP<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"血<br/>氧<br/>饱<br/>和<br/>度<br/>%","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"恶<br/>心<br/>/<br/>呕<br/>吐","colspan":"1","rowspan":"3"},
                // {"name":"呕<br/>吐","colspan":"1","rowspan":"3"},
                {"name":"头<br/>晕<br/>/<br/>头<br/>痛","colspan":"1","rowspan":"3"},
                // {"name":"头<br/>痛","colspan":"1","rowspan":"3"},
                {"name":"心<br/>电<br/>监<br/>护","colspan":"1","rowspan":"3"},
                {"name":"吸<br/>氧<br/>L/<br/>min","colspan":"1","rowspan":"3"},
                {"name":"四肢肌力","colspan":"4","rowspan":"1"},
                {"name":"头<br/>部<br/>伤<br/>口<br/>敷<br/>料","colspan":"1","rowspan":"3"},
                {"name":"疼<br/>痛","colspan":"1","rowspan":"3"},
                {"name":"留<br/>置<br/>尿<br/>管","colspan":"1","rowspan":"3"},
                {"name":"尿<br/>色","colspan":"1","rowspan":"3"},
                // {"name":"抬<br/>高<br/>床<br/>头<br/>15<br/>度","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3", canSet: true, key: "armValue1","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3", canSet: true, key: "armValue2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}},
                {"name":"上级签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid: 
            [
                {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                {"name":"反射","colspan":"2","rowspan":"1"},
                {"name":"内<br/>容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内<br/>容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"上肢","colspan":"2","rowspan":"1"},
                {"name":"下肢","colspan":"2","rowspan":"1"}
            ]
            ,
        bottom: 
            [
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"}
            ]
        ,
    }
}  
