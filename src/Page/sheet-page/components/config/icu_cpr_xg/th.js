
/*
  东莞谢岗 - ICU心肺复苏单
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
      width: "1200px"
    },
    th: {
        top: 
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"心脏<br/>呼吸<br/>骤停<br/>时间","colspan":"1","rowspan":"3"},
                {"name":"开始<br/>CRP<br/>时间","colspan":"1","rowspan":"3"},
                {"name":"医生<br/>到达<br/>时间","colspan":"1","rowspan":"3"},
                {"name":"除颤<br/>(焦耳)","colspan":"1","rowspan":"3"},
                {"name":"肾上<br/>腺素","colspan":"1","rowspan":"3"},
                {"name":"阿托品","colspan":"1","rowspan":"3"},
                {"name":"其他药物","colspan":"1","rowspan":"3"},
                {"name":"神志","colspan":"1","rowspan":"3"},
                {"name":"瞳孔","colspan":"2","rowspan":"1"},
                {"name":"生命体征记录","colspan":"5","rowspan":"1"},
                {"name":"停止<br/>CPR<br/>时间","colspan":"1","rowspan":"3"},
                {"name":"抢救特殊记录","colspan": "1","rowspan":"3",style:{ minWidth:"150px", maxWidth:"150px"}, }, 
                {"name":"护士<br/>签名","colspan":"1","rowspan":"3",style:{ minWidth:"70px", maxWidth:"70px"},}
            ]
        ,
        mid: 
            [
                {"name":"左(mm)","colspan":"1","rowspan":"2"},
                {"name":"右(mm)","colspan":"1","rowspan":"2"},
                {"name":"心律","colspan":"1","rowspan":"2"},
                {"name":"BP<br/>(mmHg)","colspan":"1","rowspan":"2"},
                {"name":"P/HR<br/>(次/min)","colspan":"1","rowspan":"2"},
                {"name":"自主R/辅助R<br/>(次/min)","colspan":"1","rowspan":"2"},
                {"name":"SaO2<br/>(%)","colspan":"1","rowspan":"2"}
            ]
        ,
        bottom: 
            []
        ,
    }
}  
