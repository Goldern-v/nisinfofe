
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
      width: "1500px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"体<br/>温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"HR/P<br/>次/<br/>分","colspan":"1","rowspan":"3"},
                {"name":"呼<br/>吸<br/>次/<br/>分","colspan":"1","rowspan":"3"},
                {"name":"血<br/>压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SPO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"胃<br/>管","colspan":"1","rowspan":"3"},
                {"name":"刻<br/>度<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"尿<br/>管","colspan":"1","rowspan":"3"},
                {"name":"吸<br/>氧<br/>升<br/>/分","colspan":"1","rowspan":"3"},
                {"name":"体<br/>位","colspan":"1","rowspan":"3"},
                {"name":"气<br/>促","colspan":"1","rowspan":"3"},
                {"name":"咳<br/>嗽","colspan":"1","rowspan":"3"},
                {"name":"咳<br/>痰","colspan":"1","rowspan":"3"},
                {"name":"口<br/>唇<br/>颜<br/>色","colspan":"1","rowspan":"3"},
                {"name":"心<br/>悸","colspan":"1","rowspan":"3"},
                {"name":"胸<br/>闷","colspan":"1","rowspan":"3"},
                {"name":"眩<br/>晕","colspan":"1","rowspan":"3"},
                {"name":"头<br/>晕","colspan":"1","rowspan":"3"},
                {"name":"恶<br/>心","colspan":"1","rowspan":"3"},
                {"name":"头<br/>痛","colspan":"1","rowspan":"3"},
                {"name":"胸<br/>痛","colspan":"1","rowspan":"3"},
                {"name":"吞<br/>咽<br/>困<br/>难","colspan":"1","rowspan":"3"},
                {"name":"饮<br/>水<br/>呛<br/>咳","colspan":"1","rowspan":"3"},
                {"name":"呕<br/>吐","colspan":"1","rowspan":"3"},
                {"name":"水肿<br/>护理<br/>措施","colspan":"1","rowspan":"3"},
                {"name":"水肿<br/>部位<br/>及程<br/>度","colspan":"1","rowspan":"3"},
                {"name":"新<br/>活<br/>素<br/>mg<br/>/h","colspan":"1","rowspan":"3"},
                {"name":"多<br/>巴<br/>胺","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3", canSet: true, key: "armValue1","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3", canSet: true, key: "armValue2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"饮<br/>食<br/>指<br/>导","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>安<br/>全","colspan":"1","rowspan":"3"},
                {"name":"启用<br/>相关<br/>护理<br/>表格","colspan":"1","rowspan":"3"},
                {"name":"报<br/>告<br/>医<br/>生","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
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
