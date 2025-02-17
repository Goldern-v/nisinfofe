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
    width: "1250px"
  },
  th: {
    top: [
      { name:"", colspan:"2", rowspan:"1", key:"recordYear" },
      { name: "入量(ml)", colspan: "8", rowspan: "1" },
      { name: "出量(ml)", colspan: "5", rowspan: "1" },
      {
        name: "升压药物血管药物<br/>μg/kg/min",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "125px", maxWidth: "125px" }
      },
      {
        name: "强心利尿其他特殊药物",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "150px", maxWidth: "150px" }
      },
      {
        name: "其他药物",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "200px", maxWidth: "200px" }
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
        style: { minWidth: "45px", maxWidth: "45px" }
      },
      {
        name: "时间",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "45px", maxWidth: "45px" }
      },
      { name: "1", colspan: "1", rowspan: "2", style: { minWidth: "42px", maxWidth: "42px" } },
      { name: "2", colspan: "1", rowspan: "2", style: { minWidth: "42px", maxWidth: "42px" } },
      { name: "3", colspan: "1", rowspan: "2", style: { minWidth: "42px", maxWidth: "42px" } },
      { name: "4", colspan: "1", rowspan: "2", style: { minWidth: "42px", maxWidth: "42px" } },
      { name: "5", colspan: "1", rowspan: "2", style: { minWidth: "42px", maxWidth: "42px" } },
      { name: "6", colspan: "1", rowspan: "2", style: { minWidth: "42px", maxWidth: "42px" } },
      {
        name: "口服<br/>/<br/>鼻饲<br/>",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "42px", maxWidth: "42px" }
      },
      { name: "每时", colspan: "1", rowspan: "2", style: { minWidth: "42px", maxWidth: "42px" } },
      // { name: "总量", colspan: "1", rowspan: "2", style: { minWidth: "50px", maxWidth: "50px" } },
      // { name: "总量", colspan: "1", rowspan: "2", style: { minWidth: "50px", maxWidth: "50px" } },
      { name: "每时", colspan: "1", rowspan: "2", style: { minWidth: "42px", maxWidth: "42px" } },
      {
        name: "尿量<br/>",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "42px", maxWidth: "42px" }
      },
      // {
      //   name: "累计<br/>尿量<br/>(ml)",
      //   colspan: "1",
      //   rowspan: "2",
      //   style: { minWidth: "50px", maxWidth: "50px" }
      // },
      // {
      //   name: "累计<br/>胸液<br/>(ml)",
      //   colspan: "1",
      //   rowspan: "2",
      //   style: { minWidth: "50px", maxWidth: "50px" }
      // },
      {
        name: "心包<br/>胸骨后<br/>",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "45px", maxWidth: "45px" }
      },
      {
        name: "胸腔闭<br/>式引流<br/>",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "45px", maxWidth: "45px" }
      },
      {
        name: "其他<br/>",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "60px", maxWidth: "60px" }
      },
    ],
    bottom: []
  }
};
