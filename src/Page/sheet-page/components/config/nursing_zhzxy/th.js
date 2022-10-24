
/*
  珠海中西医 - 护理记录单
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
      width: "1260px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"2","style":{"minWidth":"55px","maxWidth":"55px"}},
                {"name":"时间","colspan":"1","rowspan":"2","style":{"minWidth":"40px","maxWidth":"40px"}},
                {"name":"T<br>℃","colspan":"1","rowspan":"2"},
                {"name":"P/HR<br>次/分","colspan":"1","rowspan":"2","style":{"minWidth":"45px","maxWidth":"45px"}},
                {"name":"R<br>次/分","colspan":"1","rowspan":"2"},
                {"name":"BP<br>mmHg","colspan":"1","rowspan":"2","style":{"minWidth":"55px","maxWidth":"55px"}},
                {"name":"SpO2<br>％","colspan":"1","rowspan":"2"},
                {"name":"吸氧<br>L/min","colspan":"1","rowspan":"2"},
                {"name":"入量","colspan":"2","rowspan":"1"},
                {"name":"出量","colspan":"3","rowspan":"1"},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "value1", "style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "value2", "style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "value3", "style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "value4", "style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "value5", "style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "value6", "style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "value7", "style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "value8", "style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"病情观察及护理措施","colspan":"1","rowspan":"2","style":{"minWidth":"425px","maxWidth":"425px"}},
                {"name":"签名","colspan":"1","rowspan":"2","style":{"minWidth":"60px","maxWidth":"60px"}},
            ]
        ,
        mid: 
            [
                {"name":"内容","colspan":"1","rowspan":"1","style":{"minWidth":"50px","maxWidth":"50px"}},
                {"name":"ml","colspan":"1","rowspan":"1"},
                {"name":"内容","colspan":"1","rowspan":"1","style":{"minWidth":"100px","maxWidth":"100px"}},
                {"name":"ml","colspan":"1","rowspan":"1"},
                {"name":"颜色/性状","colspan":"1","rowspan":"1","style":{"minWidth":"55px","maxWidth":"55px"}},
            ]
        ,
        bottom: 
            []
        ,
    }
}  
// export default {
//     // 科室的名称
//     deptType: "",
//     style: {
//       width: "1260px"
//     },
//     th: {
//         top: 
//             [
//                 {"name":'',"style":{},"colspan":"2","rowspan":"1","key":'recordYear'},
//                 {"name":"产妇","colspan":"15","rowspan":"1"},
//                 {"name":"新生儿","colspan":"9","rowspan":"1"},
//                 {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
//                 {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}},
//                 {"name":"上级签名","colspan":"1","rowspan":"3","style":{"minWidth":"60px","maxWidth":"60px"}}
//             ]
//         ,
//         mid: 
//             [
                // {"name":"日期","colspan":"1","rowspan":"2"},
//                 {"name":"时间","colspan":"1","rowspan":"2"},
//                 {"name":"T<br/>(℃)","colspan":"1","rowspan":"2"},
//                 {"name":"P<br/>(次/<br/>min)","colspan":"1","rowspan":"2"},
//                 {"name":"R<br/>(次/<br/>min)","colspan":"1","rowspan":"2"},
//                 {"name":"BP<br/>(mmHg)","colspan":"1","rowspan":"2"},
//                 {"name":"意<br/>识","colspan":"1","rowspan":"2"},
//                 {"name":"宫底<br/>高度<br/>U=Fb","colspan":"1","rowspan":"2"},
//                 {"name":"子<br/>宫<br/>收<br/>缩","colspan":"1","rowspan":"2"},
//                 {"name":"产后<br/>出血<br/>量<br/>(ml)","colspan":"1","rowspan":"2"},
//                 {"name":"伤口","colspan":"1","rowspan":"2", canSet: true, key: "wound", "style":{"minWidth":"35px","maxWidth":"35px"}},
//                 {"name":"乳<br/>房<br/>情<br/>况","colspan":"1","rowspan":"2"},
//                 {"name":"泌<br/>乳<br/>情<br/>况","colspan":"1","rowspan":"2"},
//                 {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue", "style":{"minWidth":"35px","maxWidth":"35px"}},
                // {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue2", "style":{"minWidth":"35px","maxWidth":"35px"}},
//                 {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue3", "style":{"minWidth":"35px","maxWidth":"35px"}},
//                 {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "armValue4", "style":{"minWidth":"35px","maxWidth":"35px"}},
//                 {"name":"T<br/>(℃)","colspan":"1","rowspan":"2"},
//                 {"name":"R<br/>(次/<br/>min)","colspan":"1","rowspan":"2"},
//                 {"name":"反<br/>应","colspan":"1","rowspan":"2"},
//                 {"name":"哭<br/>声","colspan":"1","rowspan":"2"},
//                 {"name":"吸<br/>吮<br/>力","colspan":"1","rowspan":"2"},
//                 {"name":"自<br/>吮<br/>种<br/>类","colspan":"1","rowspan":"2"},
//                 {"name":"皮<br/>肤<br/>颜<br/>色","colspan":"1","rowspan":"2"},
//                 {"name":"脐<br/>部<br/>情<br/>况","colspan":"1","rowspan":"2"},
//                 {"name":"早早<br/>接吮<br/>触吸","colspan":"1","rowspan":"2"}
//             ]
//         ,
//         bottom: 
//             []
//         ,
//     }
// }  
