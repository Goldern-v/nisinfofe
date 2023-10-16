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
    width: "1560px"
  },
  th: {
    top: [
      { name: "", colspan: "2", rowspan: "1", key: "recordYear" },
      { name: "呼吸道管理", colspan: "5", rowspan: "1" },
      { name: "管道管理", colspan: "8", rowspan: "1" },
      { name: "皮肤护理", colspan: "1", rowspan: "3" },
      { name: "风险评估", colspan: "6", rowspan: "1" },
      {
        name: "RASS<br/>镇静<br/>评估",
        colspan: "1",
        rowspan: "3" ,
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      { name: "疼痛评估", colspan: "2", rowspan: "1" },
      {
        name: "特殊病情观察及护理措施",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "365px", maxWidth: "365px" }
      },
      {
        name: "签 名",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
    ],
    mid: [
      {
        name: "日期",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "时间",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      { name: "体疗", colspan: "1", rowspan: "2", style: { minWidth: "40px", maxWidth: "40px" } },
      { name: "膨肺/<br/>吸痰", colspan: "1", rowspan: "2", style: { minWidth: "40px", maxWidth: "40px" } },
      { name: "痰液", colspan: "3", rowspan: "1" },
      { name: "动静脉置管", colspan: "3", rowspan: "1" },
      { name: "引流管", colspan: "4", rowspan: "1" },
      { name: "尿管", colspan: "1", rowspan: "1" },
      { name: "Braden压疮", colspan: "2", rowspan: "1" },
      { name: "跌倒", colspan: "2", rowspan: "1" },
      { name: "非计划性拔管", colspan: "2", rowspan: "1" },
      {
        name: "工具/<br/>评分",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "护理措施",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "60px", maxWidth: "60px" }
      },
    ],
    bottom: [
      { name: "颜色", colspan: "1", rowspan: "1", style: { minWidth: "35px", maxWidth: "35px" } },
      { name: "性状", colspan: "1", rowspan: "1", style: { minWidth: "35px", maxWidth: "35px" } },
      { name: "痰量", colspan: "1", rowspan: "1", style: { minWidth: "35px", maxWidth: "35px" } },
      { name: "名称", colspan: "1", rowspan: "1", style: { minWidth: "60px", maxWidth: "60px" } },
      {
        name: "外露<br/>长度<br/>(cm)",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      { name: "护理", colspan: "1", rowspan: "1", style: { minWidth: "35px", maxWidth: "35px" } },
      { name: "名称", colspan: "1", rowspan: "1", style: { minWidth: "60px", maxWidth: "60px" } },
      { name: "引流液<br/>颜色", colspan: "1", rowspan: "1", style: { minWidth: "35px", maxWidth: "35px" } },
      { name: "引流液<br/>性质", colspan: "1", rowspan: "1", style: { minWidth: "35px", maxWidth: "35px" } },
      { name: "护理", colspan: "1", rowspan: "1", style: { minWidth: "35px", maxWidth: "35px" } },
      { name: "尿色", colspan: "1", rowspan: "1", style: { minWidth: "35px", maxWidth: "35px" } },
      { name: "评分", colspan: "1", rowspan: "1", style: { minWidth: "40px", maxWidth: "40px" } },
      { name: "护理措施", colspan: "1", rowspan: "1", style: { minWidth: "60px", maxWidth: "60px" } },
      { name: "评分", colspan: "1", rowspan: "1", style: { minWidth: "40px", maxWidth: "40px" } },
      { name: "护理措施", colspan: "1", rowspan: "1", style: { minWidth: "60px", maxWidth: "60px" } },
      { name: "评分", colspan: "1", rowspan: "1", style: { minWidth: "40px", maxWidth: "40px" } },
      { name: "护理措施", colspan: "1", rowspan: "1", style: { minWidth: "60px", maxWidth: "60px" } },
    ]
  }
};
