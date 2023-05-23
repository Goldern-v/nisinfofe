
/*
  佛山同江 - 护理记录单（全院通用）
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
      width: "1280px"
    },
    th: {
        top:
            [
                {"name":"日期","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"生命体征","colspan":"4","rowspan":"1"},
                {"name":"CVP<br/>cmH2O","colspan":"1","rowspan":"3"},
                {"name":"SPO2<br/>%","colspan":"1","rowspan":"3"},
                {"name":"意识","colspan":"1","rowspan":"3"},
                {"name":"GCS","colspan":"1","rowspan":"3"},
                {"name":"RASS","colspan":"1","rowspan":"3"},
                {"name":"肢体","colspan":"4","rowspan":"1"},
                {"name":"瞳孔","colspan":"4","rowspan":"1"},
                {"name":"入量","colspan":"3","rowspan":"1"},
                {"name":"出量","colspan":"2","rowspan":"1"},
                {"name":"卧位","colspan":"1","rowspan":"3"},
                {"name":"治疗及病情观察","colspan":"1","rowspan":"3","style":{"minWidth":"180px","maxWidth":"180px"}},
                {"name":"签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
            ]
        ,
        mid:
            [
                {"name":"T<br/>℃","colspan":"1","rowspan":"2"},
                {"name":"P<br/>次/分","colspan":"1","rowspan":"2"},
                {"name":"R<br/>次/分","colspan":"1","rowspan":"2"},
                {"name":"Bp<br/>mmHg","colspan":"1","rowspan":"2"},
                {"name":"上","colspan":"2","rowspan":"1"},
                {"name":"下","colspan":"2","rowspan":"1"},
                {"name":"直径","colspan":"2","rowspan":"1"},
                {"name":"对光","colspan":"2","rowspan":"1"},
                {"name":"入量名称","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"途径","colspan":"1","rowspan":"2"},
                {"name":"出量名称","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                
            ]
        ,
        bottom:[
          {"name":"左","colspan":"1","rowspan":"1"},
          {"name":"右","colspan":"1","rowspan":"1"},
          {"name":"左","colspan":"1","rowspan":"1"},
          {"name":"右","colspan":"1","rowspan":"1"},
          {"name":"左","colspan":"1","rowspan":"1"},
          {"name":"右","colspan":"1","rowspan":"1"},
          {"name":"左","colspan":"1","rowspan":"1"},
          {"name":"右","colspan":"1","rowspan":"1"},
        ]
    }
}
