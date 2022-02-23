
/*
  佛山杏坛 - 护理记录单(产后)
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
      width: "1320px"
    },
    th: {
        top: 
            [
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"P/HR<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"泌<br/>乳<br/>情<br/>况","colspan":"1","rowspan":"3"},
                {"name":"宫<br/>底<br/>高<br/>度<br/>U=<br/>Fb","colspan":"1","rowspan":"3"},
                {"name":"子宫<br/>收缩","colspan":"2","rowspan":"1"},
                {"name":"腹<br/>部<br/>伤<br/>口<br/>敷<br/>料","colspan":"1","rowspan":"3"},
                {"name":"腹<br/>部<br/>伤<br/>口<br/>疼<br/>痛","colspan":"1","rowspan":"3"},
                {"name":"会<br/>阴<br/>伤<br/>口<br/>情<br/>况","colspan":"1","rowspan":"3"},
                {"name":"会<br/>阴<br/>伤<br/>口<br/>疼<br/>痛","colspan":"1","rowspan":"3"},
                {"name":"排<br/>气","colspan":"1","rowspan":"3"},
                {"name":"排<br/>尿","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue","style":{"minWidth":"25px","maxWidth":"25px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue2","style":{"minWidth":"25px","maxWidth":"25px"}},
                {"name":"压<br/>沙<br/>袋","colspan":"1","rowspan":"3"},
                {"name":"预<br/>防<br/>尿<br/>潴<br/>留","colspan":"1","rowspan":"3"},
                {"name":"尿<br/>管<br/>固<br/>定<br/>通<br/>畅","colspan":"1","rowspan":"3"},
                {"name":"尿<br/>液<br/>颜<br/>色","colspan":"1","rowspan":"3"},
                {"name":"镇<br/>痛<br/>泵<br/>固<br/>定<br/>通<br/>畅","colspan":"1","rowspan":"3"},
                {"name":"吸<br/>氧<br/>升<br/>/分","colspan":"1","rowspan":"3"},
                {"name":"心<br/>电<br/>监<br/>护","colspan":"1","rowspan":"3"},
                {"name":"饮<br/>食<br/>指<br/>导","colspan":"1","rowspan":"3"},
                {"name":"母<br/>乳<br/>喂<br/>养<br/>指<br/>导","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>措<br/>施","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>安<br/>全","colspan":"1","rowspan":"3"},
                {"name":"报<br/>告<br/>医<br/>生","colspan":"1","rowspan":"3"},
                {"name":"遵<br/>医<br/>嘱<br/>继<br/>续<br/>观<br/>察","colspan":"1","rowspan":"3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}}
            ]
        ,
        mid: 
            [
                {"name":"日期","colspan":"1","rowspan":"2"},
                {"name":"时间","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"阴道<br/>出血<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"尿量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"硬","colspan":"1","rowspan":"2"},
                {"name":"软","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
