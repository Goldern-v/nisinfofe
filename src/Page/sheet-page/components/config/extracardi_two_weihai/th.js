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
    width: "1360px"
  },
  th: {
    top: [
      { name:"", colspan:"2", rowspan:"1", key:"recordYear" },
      { name: "神志", colspan: "5", rowspan: "1" },
      { name: "呼吸", colspan: "12", rowspan: "1" },
      {
        name: "体温<br/>(℃)",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "循环",
        colspan: "7",
        rowspan: "1",
        style: { minWidth: "70px", maxWidth: "70px" }
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
      { name: "意识", colspan: "1", rowspan: "2", style: { minWidth: "40px", maxWidth: "40px" } },
      { name: "瞳孔(mm)", colspan: "2", rowspan: "1", style: { minWidth: "80px", maxWidth: "80px" } },
      { name: "对光反射", colspan: "2", rowspan: "1", style: { minWidth: "80px", maxWidth: "80px" } },
      { name: "插管<br/>内置<br/>(cm)", colspan: "1", rowspan: "2", style: { minWidth: "50px", maxWidth: "50px" } },
      { name: "气囊压力<br/>(cmH2O)", colspan: "1", rowspan: "2", style: { minWidth: "60px", maxWidth: "60px" } },
      { name: "辅助方式", colspan: "1", rowspan: "2", style: { minWidth: "60px", maxWidth: "60px" } },
      {
        name: "氧浓度%",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "氧流量<br/>L/min",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      { name: "PS<br/>(cmH2O)", colspan: "1", rowspan: "2", style: { minWidth: "50px", maxWidth: "50px" } },
      { name: "PEEP<br/>(cmH2O)", colspan: "1", rowspan: "2", style: { minWidth: "50px", maxWidth: "50px" } },
      { name: "潮气量<br/>(ml)", colspan: "1", rowspan: "2", style: { minWidth: "50px", maxWidth: "50px" } },
      { name: "呼吸音", colspan: "2", rowspan: "1", style: { minWidth: "80px", maxWidth: "80px" } },
      { name: "呼吸<br/>频率<br/>(bmp)", colspan: "1", rowspan: "2", style: { minWidth: "50px", maxWidth: "50px" } },
      {
        name: "Spo2<br/>(%)",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "末梢",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "心率<br/>(bmp)",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "脉搏<br/>(bmp)",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "心律",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "血压<br/>(mmHg)",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "平均压<br/>(mmHg)",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "CVP<br/>(mmHg)",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
    ],
    bottom: [
      {
        name: "左",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "右",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "左",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "右",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "左",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "右",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
    ]
  }
};
