
/*
  顺德龙江 - 呼吸专科护理记录单
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
      width: "1285px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"生命体征","colspan":"6","rowspan":"1"},
                {"name":"护理观察","colspan":"8","rowspan":"1"},
                {"name":"护理措施","colspan":"12","rowspan":"1"},
                {"name":"其他","colspan":"3","rowspan":"1"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}}
            ]
        ,
        mid: 
            [
                {"name":"T<br/>℃","colspan":"1","rowspan":"2"},
                {"name":"P/HR<br/>次/<br/>min","colspan":"1","rowspan":"2"},
                {"name":"R<br/>次/<br/>min","colspan":"1","rowspan":"2"},
                {"name":"BP<br/>mmHg","colspan":"1","rowspan":"2"},
                {"name":"血<br/>氧<br/>饱<br/>和<br/>度<br/>(%)","colspan":"1","rowspan":"2"},
                {"name":"神<br/>志","colspan":"1","rowspan":"2"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"咳<br/>嗽","colspan":"1","rowspan":"2"},
                {"name":"痰<br/>液<br/>性<br/>质","colspan":"1","rowspan":"2"},
                {"name":"痰<br/>液<br/>量","colspan":"1","rowspan":"2"},
                {"name":"胸<br/>痛","colspan":"1","rowspan":"2"},
                {"name":"吸<br/>氧<br/>L/<br/>min","colspan":"1","rowspan":"2"},
                {"name":"排<br/>痰","colspan":"1","rowspan":"2"},
                {"name":"吸<br/>痰","colspan":"1","rowspan":"2"},
                {"name":"翻身拍背","colspan":"4","rowspan":"1"},
                {"name":"口<br/>腔<br/>护<br/>理","colspan":"1","rowspan":"2"},
                {"name":"会<br/>阴<br/>抹<br/>洗","colspan":"1","rowspan":"2"},
                {"name":"膀<br/>胱<br/>冲<br/>洗","colspan":"1","rowspan":"2"},
                {"name":"泌<br/>尿<br/>功<br/>能<br/>锻<br/>炼","colspan":"1","rowspan":"2"},
                {"name":"健康教育","colspan":"1","rowspan":"2"},
                {"name":"","colspan":"1","rowspan":"2","canSet":true,"key":"armValue","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"2","canSet":true,"key":"armValue2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"2","canSet":true,"key":"armValue3","style":{"minWidth":"35px","maxWidth":"35px"}}
            ]
        ,
        bottom: 
            [
                {"name":"内<br/>容","colspan":"1","rowspan":"1"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"1"},
                {"name":"内<br/>容","colspan":"1","rowspan":"1"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"1"},
                {"name":"左","colspan":"1","rowspan":"1"},
                {"name":"右","colspan":"1","rowspan":"1"},
                {"name":"半<br/>坐<br/>卧<br/>位","colspan":"1","rowspan":"1"},
                {"name":"平<br/>卧<br/>位","colspan":"1","rowspan":"1"}
            ]
        ,
    }
}  
