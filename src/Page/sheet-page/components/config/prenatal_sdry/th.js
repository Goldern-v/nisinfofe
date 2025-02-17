
/*
  佛山杏坛 - 护理记录单(产前待产记录)
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
      width: "1402px"
    },
    th: {
        top:
            [
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"P/HR<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO2<br/>%","colspan":"1","rowspan":"3"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"3","rowspan":"1"},
                { "name":"胎<br/>方<br/>位","colspan":"1","rowspan":"3"},
                {"name":"胎心率<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"胎<br/>动<br/>/2h","colspan":"1","rowspan":"3"},
                {"name":"衔<br/>接","colspan":"1","rowspan":"3"},
                {"name":"宫缩","colspan":"2","rowspan":"1"},
                {"name":"宫<br/>颈<br/>扩<br/>张<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"先<br/>露<br/>高<br/>低<br/>cm","colspan":"1","rowspan":"3"},
                {"name":"胎<br/>膜","colspan":"1","rowspan":"3"},
                {"name":"羊<br/>水<br/>性<br/>状","colspan":"1","rowspan":"3"},
                {"name":"宫缩疼痛评分","colspan":"1","rowspan":"3"},
                {"name":"非药物镇痛方法","colspan":"1","rowspan":"3"},
                {"name":"膀胱充盈度","colspan":"1","rowspan":"3"},
                { "name": "", "colspan": '1', "rowspan": '3', "canSet": true, "key": 'armValue', "style": { "minWidth": '37px', "maxWidth": '37px', } },
                {"name": "", "colspan": '1',"rowspan": '3',"canSet": true,"key": 'armValue2',"style": {"minWidth": '37px',"maxWidth": '37px',}},
                { "name": "", "colspan": '1', "rowspan": '3', "canSet": true, "key": 'armValue3', "style": { "minWidth": '37px', "maxWidth": '37px', } },
                // {"name": "", "colspan": '1',"rowspan": '3',"canSet": true,"key": 'armValue4',"style": {"minWidth": '37px',"maxWidth": '37px',}},


                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"210px","maxWidth":"210px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"查房签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"},noPrint:true},
            ]
        ,
        mid:
            [
                {"name":"日期","colspan":"1","rowspan":"2", "style":{"minWidth":"40px","maxWidth":"40px"}},
                {"name":"时间","colspan":"1","rowspan":"2", "style":{"minWidth":"40px","maxWidth":"40px"}},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"项目","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                { name: "颜<br/>色<br/>性<br/>状", colspan: "1", rowspan: "2" },
                // {"name":"无","colspan":"1","rowspan":"2"},
                { "name":"持续/间歇<br/>（秒/分）","colspan":"1","rowspan":"2"},
                // {"name":"间歇<br/>/分","colspan":"1","rowspan":"2"},
                {"name":"强<br/>度","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom:
            []
        ,
    }
}
