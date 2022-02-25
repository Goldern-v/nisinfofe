
/*
  佛山杏坛 - 护理记录单（内三科通用单）
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
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"HR/P<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO2<br/>%","colspan":"1","rowspan":"3"},
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"3","rowspan":"1"},
                {"name":"深静脉管","colspan":"4","rowspan":"1"},
                {"name":"尿管","colspan":"2","rowspan":"1"},
                {"name":"胃管","colspan":"3","rowspan":"1"},
                {"name":"多<br/>饮","colspan":"1","rowspan":"3","canSet":true,"key":"armValue10","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"多<br/>食","colspan":"1","rowspan":"3","canSet":true,"key":"armValue11","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"多<br/>尿","colspan":"1","rowspan":"3","canSet":true,"key":"armValue12","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"头<br/>晕","colspan":"1","rowspan":"3"},
                {"name":"头<br/>痛","colspan":"1","rowspan":"3"},
                {"name":"饮水呛咳","colspan":"1","rowspan":"3","canSet":true,"key":"armValue13","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"吞咽困难","colspan":"1","rowspan":"3","canSet":true,"key":"armValue14","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue15","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue16","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue17","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue18","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue19","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"吸氧升 / 分","colspan":"1","rowspan":"3","canSet":true,"key":"armValue20","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"心电监护","colspan":"1","rowspan":"3","canSet":true,"key":"armValue21","style":{"minWidth":"20px","maxWidth":"20px"}},
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
                {"name":"大小<br/>mm","colspan":"2","rowspan":"1"},
                {"name":"反应","colspan":"2","rowspan":"1"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"颜色<br/>性状","colspan":"1","rowspan":"2"},
                {"name":"固定通畅","colspan":"1","rowspan":"2","canSet":true,"key":"armValue","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"刻度 cm","colspan":"1","rowspan":"2","canSet":true,"key":"armValue2","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"穿刺口情况","colspan":"1","rowspan":"2","canSet":true,"key":"armValue3","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"是否留管","colspan":"1","rowspan":"2","canSet":true,"key":"armValue44","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"固定通畅","colspan":"1","rowspan":"2","canSet":true,"key":"armValue5","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"尿液颜色","colspan":"1","rowspan":"2","canSet":true,"key":"armValue6","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"固定通畅","colspan":"1","rowspan":"2","canSet":true,"key":"armValue7","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"鼻饲","colspan":"1","rowspan":"2","canSet":true,"key":"armValue8","style":{"minWidth":"20px","maxWidth":"20px"}},
                {"name":"置入长度 cm","colspan":"1","rowspan":"2","canSet":true,"key":"armValue9","style":{"minWidth":"20px","maxWidth":"20px"}},
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
