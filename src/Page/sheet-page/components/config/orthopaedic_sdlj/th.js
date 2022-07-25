
/*
  顺德龙江 - 护理记录单（骨科）
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
      width: "1500px"
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
                {"name":"意<br/>识","colspan":"1","rowspan":"3"},
                {"name":"血<br/>氧<br/>饱<br/>和<br/>度<br/>%","colspan":"1","rowspan":"3"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"6","rowspan":"1"},
                {"name":"患肢情况","colspan":"13","rowspan":"1","canSet":true,"key":"armValue2"},
                // {"name":"伤<br/>口<br/>敷<br/>料<br/>⑾","colspan":"1","rowspan":"3"},
                {"name":"功<br/>能<br/>锻<br/>炼<br/>⑿","colspan":"1","rowspan":"3"},
                {"name":"皮<br/>肤<br/>完<br/>整<br/>性<br/>⒀","colspan":"1","rowspan":"3"},
                {"name":"护<br/>理<br/>措<br/>施<br/>⒁","colspan":"1","rowspan":"3"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"expand"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"expand2"},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"expand3"},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}},
                {"name":"上级签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
            ]
        ,
        mid:
            [
                {"name":"内<br/>容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"尿<br/>管<br/>固<br/>定<br/>通<br/>畅","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"颜<br/>色","colspan":"1","rowspan":"2"},
                // {"name":"伤<br/>口<br/>引<br/>流<br/>管","colspan":"1","rowspan":"2"},
                {"name":"","colspan":"1","rowspan":"2", "canSet":true, key: 'outputDrainage', },
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"颜<br/>色","colspan":"1","rowspan":"2"},
                {"name":"患<br/>肢<br/>/<br/>健<br/>肢<br/>长<br/>度","colspan":"1","rowspan":"2"},
                // {"name":"健<br/>肢<br/>长<br/>度","colspan":"1","rowspan":"2"},
                {"name":"体<br/>位<br/>⑴","colspan":"1","rowspan":"2"},
                {"name":"颜<br/>色<br/>⑵","colspan":"1","rowspan":"2"},
                {"name":"皮<br/>温<br/>⑶","colspan":"1","rowspan":"2"},
                // {"name":"肿<br/>胀<br/>⑷","colspan":"1","rowspan":"2"},
                // {"name":"感<br/>觉<br/>⑸","colspan":"1","rowspan":"2"},
                // {"name":"活<br/>动<br/>⑹","colspan":"1","rowspan":"2"},
                {"name":"","colspan":"1","rowspan":"2", "canSet":true, key: 'swelling' },
                {"name":"","colspan":"1","rowspan":"2", "canSet":true, key: 'feeling'},
                {"name":"","colspan":"1","rowspan":"2", "canSet":true, key: 'activity'},
                {"name":"毛<br/>细<br/>血<br/>管<br/>反<br/>应<br/>⑺","colspan":"1","rowspan":"2"},
                {"name":"动<br/>脉<br/>搏<br/>动<br/>⑻","colspan":"1","rowspan":"2"},
                {"name":"伤<br/>口<br/>敷<br/>料<br/>⑼","colspan":"1","rowspan":"2"},
                {"name":"石<br/>膏<br/>⑽","colspan":"1","rowspan":"2"},
                {"name":"牵<br/>引<br/>⑾","colspan":"1","rowspan":"2"},

                {"name":"疼<br/>痛","colspan":"1","rowspan":"2"},
                // {"name":"","colspan":"1","rowspan":"2","canSet":true,"key":"armValue","style":{"minWidth":"35px","maxWidth":"35px"}}
            ]
        ,
        bottom:
            []
        ,
    }
}
