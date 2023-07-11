/*
  顺德龙江 - 护理记录单（骨科）
*/

/**
 * @description: 开发注意事项:
    1、自定义表头 canSet: true, key: "armValue4"
    2、表格头部年份显示 {"name":'',"style":{},"colspan":"2","rowspan":"1","key":'recordYear'},
    3、特殊情况默认 { "name": "特殊情况记录", "colspan": "1", "rowspan": "3", style: { minWidth: "165px",  maxWidth: "165px"}, },
*/

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1265px"
  },
  th: {
    top: [
      { name:"", colspan:"2", rowspan:"1", key:"recordYear" },
      { name: "入量", colspan: "2", rowspan: "1" },
      { name: "出量", colspan: "5", rowspan: "1" },
      {
        name: "病情记录",
        colspan: "5",
        rowspan: "1",
        style: { minWidth: "400px", maxWidth: "500px" }
      },
      {
        name: "签 名",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
    ],
    mid: [
      {
        name: "日期",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "时间",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      { name: "项目", colspan: "1", rowspan: "2", style: { minWidth: "65px", maxWidth: "65px" } },
      { name: "实入量", colspan: "1", rowspan: "2", style: { minWidth: "65px", maxWidth: "65px" } },
      {
        name: "尿",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "大便",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "呕吐",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "引流",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "超滤量",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "体温",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "脉搏",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "呼吸",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "血压",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "65px", maxWidth: "65px" }
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "300px", maxWidth: "300px" }
      },
    ],
    bottom: []
  }
};
