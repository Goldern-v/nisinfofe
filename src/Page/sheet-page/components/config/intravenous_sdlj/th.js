
/*
  顺德龙江 - 硫酸镁、安宝静脉点滴观察记录表
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
      width: "1300px"
    },
    th: {
        top:
            [
                {"name":"日期","colspan":"1","rowspan":"3"},
                {"name":"时间","colspan":"1","rowspan":"3"},
                {"name":"液体<br/>名称<br/>(ml)","colspan":"1","rowspan":"3","style":{"minWidth":"40px","maxWidth":"40px"}},
                {"name":"硫酸镁<br/>/g","colspan":"1","rowspan":"3"},
                {"name":"安宝<br/>/mg","colspan":"1","rowspan":"3"},
                {"name":"滴速<br/>(滴/分)","colspan":"1","rowspan":"3"},
                {"name":"宫缩<br/>(s/min)","colspan":"1","rowspan":"3"},
                {"name":"心率<br/>(次/分)","colspan":"1","rowspan":"3"},
                {"name":"呼吸<br/>(次/分)","colspan":"1","rowspan":"3"},
                {"name":"血压<br/>(mmHg)","colspan":"1","rowspan":"3"},
                {"name":"胎心音<br/>(次/分)","colspan":"1","rowspan":"3"},
                {"name":"胎动<br/>(次/时)","colspan":"1","rowspan":"3"},
                {"name":"阴道出血量/颜色<br/>(ml)","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"体温<br/>(℃)","colspan":"1","rowspan":"3"},
                {"name":"脉搏<br/>(次/分)","colspan":"1","rowspan":"3"},

                {"name":"尿量<br/>(ml)","colspan":"1","rowspan":"3"},
                {"name":"膝反射","colspan":"2","rowspan":"1"},
                {
                    name: `
                    入量
                    `,
                    style: {},
                    colspan: "2",
                    rowspan: "1"
                  },
                  {
                    name: `
                    出量
                    `,
                    style: {},
                    colspan: "3",
                    rowspan: "1"
                  },
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue2","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"","colspan":"1","rowspan":"3",canSet: true, key: "armValue3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"特殊情况记录","colspan":"1","rowspan":"3","style":{"minWidth":"150px","maxWidth":"150px"}},
                {"name":"护士签名","colspan":"1","rowspan":"3","style":{"minWidth":"55px","maxWidth":"55px"}},
                {"name":"上级签名","colspan":"1","rowspan":"3","style":{"minWidth":"55px","maxWidth":"55px"}}
            ]
        ,
        mid:
            [
                {"name":"左侧","colspan":"1","rowspan":"2"},
                {"name":"右侧","colspan":"1","rowspan":"2"},
                {
                    name: "内容",
                    colspan: "1",
                    rowspan: "2",
                    style: {
                      minWidth: "65px",
                      maxWidth: "65px"
                    },
                  },
                  {
                    name: "量<br/>ml",
                    colspan: "1",
                    rowspan: "2"
                  },
                  {
                    name: "内容",
                    colspan: "1",
                    rowspan: "2",
                    style: {
                      minWidth: "65px",
                      maxWidth: "65px"
                    },
                  },
                  {
                    name: "量<br/>ml",
                    colspan: "1",
                    rowspan: "2"
                  },
                  {
                    name: "颜色",
                    colspan: "1",
                    rowspan: "2",
                    style: {
                      minWidth: "28px",
                      maxWidth: "28px"
                    },
                  },
            ]
        ,
        bottom:
            []
        ,
    }
}
