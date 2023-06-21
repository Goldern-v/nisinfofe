
/*
  顺德人医 - 产后产房护理记录单
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
        { "name": "体温<br/>℃", "colspan": "1", "rowspan": "3" },
        { "name": "BP<br/>mmHg", "colspan": "1", "rowspan": "3" },
        { "name": "P<br/>次/分", "colspan": "1", "rowspan": "3" },
        { "name": "HR<br/>次/分", "colspan": "1", "rowspan": "3" },
        { "name": "R<br/>次/分", "colspan": "1", "rowspan": "3" },
        { "name": "血<br/>氧<br/>饱<br/>和<br/>度<br/>%", "colspan": "1", "rowspan": "3" },
        { "name": "会<br/>阴<br/>情<br/>况", "colspan": "1", "rowspan": "3" },
        { "name": "子<br/>宫<br/>收<br/>缩", "colspan": "1", "rowspan": "3" },
        { "name": "宫底<br/>U-fb", "colspan": "1", "rowspan": "3" },
        { "name": "膀<br/>胱<br/>区", "colspan": "1", "rowspan": "3" },
        { "name": "入量", "colspan": "2", "rowspan": "1" },
        { "name": "出量(ML)", "colspan": "2", "rowspan": "1" },
        { "name": "用药", "colspan": "5", "rowspan": "1" },


        { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", "style": { "minWidth": "510px", "maxWidth": "510px" } },
        { "name": "护士签名", "colspan": "1", "rowspan": "3", "style": { "minWidth": "50px", "maxWidth": "50px" } },
        {"name":"查房签名","colspan":"1","rowspan":"3","style":{"minWidth":"50px","maxWidth":"50px"}},
      ]
    ,
    mid:
      [
        { "name": "日期", "colspan": "1", "rowspan": "2", "style": { "minWidth": "35px", "maxWidth": "35px" } },
        { "name": "时间", "colspan": "1", "rowspan": "2", "style": { "minWidth": "35px", "maxWidth": "35px" } },
        { "name": "项目", "colspan": "1", "rowspan": "2" },
        { "name": "量<br/>ml", "colspan": "1", "rowspan": "2" },
        { "name": "项目", "colspan": "1", "rowspan": "2" },
        { "name": "量<br/>ml", "colspan": "1", "rowspan": "2" },
        { "name": "宫颈<br/>管内<br/>注射", "colspan": "1", "rowspan": "2" },
        { "name": "静<br/>注", "colspan": "1", "rowspan": "2" },
        { "name": "肌<br/>注", "colspan": "1", "rowspan": "2" },
        { "name": "肛<br/>塞", "colspan": "1", "rowspan": "2" },
        { "name": "阴道<br/>内放<br/>置", "colspan": "1", "rowspan": "2" }

      ]
    ,
    bottom:
      []
    ,
  }
}
