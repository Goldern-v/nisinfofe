
/*
  湛江海军 - 产科特殊用药观察记录表）
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
    width: "1370px"
  },
  th: {
    top:
      [
        // {"name":"","colspan":"2","rowspan":"1","key":"recordYear"},
        { "name": "日期", "colspan": "1", "rowspan": "3", "style": { "minWidth": "35px", "maxWidth": "35px" } },
        { "name": "时间", "colspan": "1", "rowspan": "3", "style": { "minWidth": "35px", "maxWidth": "35px" } },
        { "name": "T<br/>℃", "colspan": "1", "rowspan": "3" },
        { "name": "P", "colspan": "1", "rowspan": "3" },
        { "name": "R<br/>次/分", "colspan": "1", "rowspan": "3" },
        { "name": "Bp<br/>mmHg", "colspan": "1", "rowspan": "3" },
        { "name": "SpO₂<br/>%", "colspan": "1", "rowspan": "3" },
        { "name": "尿量", "colspan": "1", "rowspan": "3" },
        { "name": "膝反射", "colspan": "1", "rowspan": "3" },
        { "name": "宫缩", "colspan": "1", "rowspan": "1" },
        { "name": "胎心率<br/>次/min", "colspan": "1", "rowspan": "3" },
        { "name": "宫颈<br/>扩张", "colspan": "1", "rowspan": "3" },
        { "name": "先露<br/>高低", "colspan": "1", "rowspan": "3" },
        { "name": "滴速<br/>次/每分", "colspan": "1", "rowspan": "3" },
        { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", "style": { "minWidth": "600px", "maxWidth": "600px" } },
        { "name": "护士<br/>签  名", "colspan": "1", "rowspan": "3", "style": { "minWidth": "42px", "maxWidth": "42px" } },
        { "name": "审核人<br/>签  名", "colspan": "1", "rowspan": "3", "style": { "minWidth": "42px", "maxWidth": "42px" } },
      ]
    ,
    mid:
      [
        { "name": "持续<br/>时间", "colspan": "1", "rowspan": "2" },

      ]
    ,
    bottom: []
  }
}
