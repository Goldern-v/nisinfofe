
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
      width: "1240px"
    },
    th: {
        top:
            [
                {"name":"日期","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"时间","colspan":"1","rowspan":"3","style":{"minWidth":"35px","maxWidth":"35px"}},
                {"name":"皮肤温度","colspan":"4","rowspan":"1"},
                {"name":"皮肤颜色","colspan":"7","rowspan":"1"},
                {"name":"毛细血管<br>充盈反应","colspan":"4","rowspan":"1"},
                {"name":"组织张力","colspan":"4","rowspan":"1"},
                {"name":"小切口放血","colspan":"5","rowspan":"1"},
                {"name":"护理措施","colspan":"1","rowspan":"3","style":{"minWidth":"200px","maxWidth":"200px"}},
                {"name":"签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
            ]
        ,
        mid:
            [
                {"name":"正常","colspan":"1","rowspan":"2"},
                {"name":"偏高","colspan":"1","rowspan":"2"},
                {"name":"偏低","colspan":"1","rowspan":"2"},
                {"name":"无","colspan":"1","rowspan":"2"},
                {"name":"红润","colspan":"1","rowspan":"2"},
                {"name":"暗红","colspan":"1","rowspan":"2"},
                {"name":"青紫色","colspan":"1","rowspan":"2"},
                {"name":"黑色","colspan":"1","rowspan":"2"},
                {"name":"苍白","colspan":"1","rowspan":"2"},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "filedOne", style: {minWidth: "35px", maxWidth: '35px'}},
                {"name":"","colspan":"1","rowspan":"2", canSet: true, key: "filedTwo", style: {minWidth: "35px", maxWidth: '35px'}},
                {"name":"正常<br/>1-2s","colspan":"1","rowspan":"2"},
                {"name":"偏快<br/><1s","colspan":"1","rowspan":"2"},
                {"name":"偏慢<br/>>2s","colspan":"1","rowspan":"2"},
                {"name":"消失","colspan":"1","rowspan":"2"},
                {"name":"适中","colspan":"1","rowspan":"2"},
                {"name":"偏高","colspan":"1","rowspan":"2"},
                {"name":"偏低","colspan":"1","rowspan":"2"},
                {"name":"干瘪","colspan":"1","rowspan":"2"},
                {"name":"血液颜色","colspan":"2","rowspan":""},
                {"name":"量","colspan":"2","rowspan":""},
                {"name":"无","colspan":"1","rowspan":"2"},
              ]
        ,
        bottom:
            [
                {"name":"鲜艳","colspan":"1","rowspan":"1"},
                {"name":"暗红","colspan":"1","rowspan":"1"},
                {"name":"活跃","colspan":"1","rowspan":"1"},
                {"name":"不活跃","colspan":"1","rowspan":"1"}
            ]
        ,
    }
}
