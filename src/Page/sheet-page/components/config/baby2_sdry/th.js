
/*
  佛山顺德人医 - 护理记录单(儿科)
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
    width: "1385px"
  },
  th: {
    top:
      [
        { "name": "年", "colspan": "2", "rowspan": "1", "key": "recordYear" },
        { "name": "温<br/>箱<br/>℃", "colspan": "1", "rowspan": "3" },
        { "name": "T<br/>℃", "colspan": "1", "rowspan": "3" },
        { "name": "HR<br/>次/分", "colspan": "1", "rowspan": "3" },
        { "name": "R<br/>次/分", "colspan": "1", "rowspan": "3" },
        { "name": "BP<br/>mmHg", "colspan": "1", "rowspan": "3" },
        { "name": "SPO₂%", "colspan": "1", "rowspan": "3" },
        {'name':'意<br/>识',"colsapn":"1","rowspan":"3"},
        { "name": "入量", "colspan": "2", "rowspan": "1" },
        { "name": "出量", "colspan": "2", "rowspan": "1" },
        {"name":"皮测胆红素<br/>mg/dl","colspan":"3","rowspan":"1"},
        {"name":"血<br/>糖<br/>mmol/L","colspan":"1","rowspan":"3"},
        {"name":"吸<br/>氧<br/>方<br/>式","colspan":"1","rowspan":"3"},
        {"name":"氧<br/>流<br/>量<br/>L/分","colspan":"1","rowspan":"3"},
        {"name":"氧<br/>浓<br/>度<br/>%","colspan":"1","rowspan":"3"},
        {"name":"喂<br/>养<br/>方<br/>式","colspan":"1","rowspan":"3"},
        {
          "name": `标题1`,
          "colspan": '1',
          "rowspan": '3',
          "canSet": true,
          "key": 'armValue',
          "style": {
            "minWidth": '37px',
            "maxWidth": '37px',
          }
        },
        {
          "name": `标题2`,
          "colspan": '1',
          "rowspan": '3',
          "canSet": true,
          "key": 'armValue2',
          "style": {
            "minWidth": '37px',
            "maxWidth": '37px',
          }
        },
        {
          "name": `标题3`,
          "colspan": '1',
          "rowspan": '3',
          "canSet": true,
          "key": 'armValue3',
          "style": {
            "minWidth": '37px',
            "maxWidth": '37px',
          }
        },
        {
          "name": `标题4`,
          "colspan": '1',
          "rowspan": '3',
          "canSet": true,
          "key": 'armValue4',
          "style": {
            "minWidth": '37px',
            "maxWidth": '37px',
          }
        },
        {
          "name": `标题5`,
          "colspan": '1',
          "rowspan": '3',
          "canSet": true,
          "key": 'armValue5',
          "style": {
            "minWidth": '37px',
            "maxWidth": '37px',
          }
        },
        {
          "name": `标题6`,
          "colspan": '1',
          "rowspan": '3',
          "canSet": true,
          "key": 'armValue6',
          "style": {
            "minWidth": '37px',
            "maxWidth": '37px',
          }
        },

        { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", "style": { "minWidth": "265px", "maxWidth": "265px" } },
        { "name": "护士签名", "colspan": "1", "rowspan": "3", "style": { "minWidth": "50px", "maxWidth": "50px" } },
        {"name":"查房签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
      ]
    ,
    mid:
      [
        { "name": "日期", "colspan": "1", "rowspan": "2", "style": { "minWidth": "35px", "maxWidth": "35px" } },
        { "name": "时间", "colspan": "1", "rowspan": "2", "style": { "minWidth": "35px", "maxWidth": "35px" } },
        { "name": "内容", "colspan": "1", "rowspan": "2" },
        { "name": "量<br/>ml", "colspan": "1", "rowspan": "2" },
        { "name": "内容", "colspan": "1", "rowspan": "2" },
        { "name": "量<br/>ml", "colspan": "1", "rowspan": "2" },
        { "name": "额","colspan":"1","rowspan":"2"},
        { "name": "胸", "colspan": "1", "rowspan": "2" },
        { "name": "腿", "colspan": "1", "rowspan": "2" },
      ]
    ,
    bottom:
      []
    ,
  }
}
