
/*
  佛山杏坛 - 护理记录单（新生儿专科）
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
      width: "1380px"
    },
    th: {
        top:
            [
                {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
                {"name":"箱温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"体温<br/>℃","colspan":"1","rowspan":"3"},
                {"name":"心率<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>次/分","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>mmHg","colspan":"1","rowspan":"3"},
                {"name":"SpO2<br/>%<br/>/<br/>血糖<br/>mmol/L","colspan":"1","rowspan":"3"},
                {"name":"更<br/>换<br/>探<br/>头<br/>位<br/>置","colspan":"1","rowspan":"3"},
                {"name":"皮<br/>测<br/>值<br/>mg<br/>/<br/>dl","colspan":"1","rowspan":"3"},
                {"name":"入","colspan":"2","rowspan":"1"},
                {"name":"出","colspan":"2","rowspan":"1"},
                {"name":"反<br/>应","colspan":"1","rowspan":"3"},
                {"name":"哭<br/>声","colspan":"1","rowspan":"3"},
                {"name":"吸<br/>吮<br/>力","colspan":"1","rowspan":"3"},
                {"name":"喂养","colspan":"2","rowspan":"1"},
                // {"name":"咳嗽","colspan":"1","rowspan":"3","canSet":true,"key":"armValue","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"呕吐","colspan":"1","rowspan":"3","canSet":true,"key":"armValue2","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"脐<br/>部<br/>情<br/>况","colspan":"1","rowspan":"3"},
                // {"name":"皮肤颜色","colspan":"1","rowspan":"3","canSet":true,"key":"armValue3","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"弹性","colspan":"1","rowspan":"3","canSet":true,"key":"armValue4","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"皮疹位置","colspan":"1","rowspan":"3","canSet":true,"key":"armValue5","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"性质程度","colspan":"1","rowspan":"3","canSet":true,"key":"armValue6","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"痰液性质","colspan":"1","rowspan":"3","canSet":true,"key":"armValue7","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"痰液量","colspan":"1","rowspan":"3","canSet":true,"key":"armValue8","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"产瘤位置","colspan":"1","rowspan":"3","canSet":true,"key":"armValue9","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"大小 cm³","colspan":"1","rowspan":"3","canSet":true,"key":"armValue10","style":{"minWidth":"25px","maxWidth":"25px"}},
                // {"name":"头部血肿位置","colspan":"1","rowspan":"3","canSet":true,"key":"armValue11","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"大小 cm³","colspan":"1","rowspan":"3","canSet":true,"key":"armValue12","style":{"minWidth":"25px","maxWidth":"25px"}},
                // {"name":"吸<br/>氧<br/>方<br/>式","colspan":"1","rowspan":"3"},
                // {"name":"氧<br/>流<br/>量<br/>L<br/>/<br/>min","colspan":"1","rowspan":"3"},
                // {"name":"氧<br/>浓<br/>度<br/>%","colspan":"1","rowspan":"3"},
                // {"name":"留<br/>置<br/>针<br/>固<br/>定<br/>通<br/>畅","colspan":"1","rowspan":"3"},
                // {"name":"冲<br/>管<br/>护<br/>理","colspan":"1","rowspan":"3"},
                // {"name":"胃管固定通畅","colspan":"1","rowspan":"3","canSet":true,"key":"armValue13","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"外露 cm","colspan":"1","rowspan":"3","canSet":true,"key":"armValue14","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"口<br/>腔<br/>护<br/>理","colspan":"1","rowspan":"3"},
                // {"name":"脐<br/>部<br/>护<br/>理","colspan":"1","rowspan":"3"},
                // {"name":"臀<br/>部<br/>护<br/>理","colspan":"1","rowspan":"3"},
                // {"name":"抚<br/>触","colspan":"1","rowspan":"3"},
                // {"name":"头部制动","colspan":"1","rowspan":"3","canSet":true,"key":"armValue15","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"翻<br/>身<br/>拍<br/>背","colspan":"1","rowspan":"3"},
                // {"name":"沐<br/>浴","colspan":"1","rowspan":"3"},
                // {"name":"床<br/>上<br/>浴","colspan":"1","rowspan":"3"},
                // {"name":"吸痰","colspan":"1","rowspan":"3","canSet":true,"key":"armValue16","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"雾化吸入","colspan":"1","rowspan":"3","canSet":true,"key":"armValue17","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue18","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue19","style":{"minWidth":"18px","maxWidth":"18px"}},
                // {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"armValue20","style":{"minWidth":"18px","maxWidth":"18px"}},

                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem1","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem2","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem3","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem4","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem5","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem6","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem7","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"","colspan":"1","rowspan":"3","canSet":true,"key":"customItem8","style":{"minWidth":"50px","maxWidth":"50px"}},

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
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"内容","colspan":"1","rowspan":"2"},
                {"name":"量<br/>ml","colspan":"1","rowspan":"2"},
                {"name":"种<br/>类","colspan":"1","rowspan":"2"},
                {"name":"方<br/>式","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom:
            []
        ,
    }
}
