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
    width: "1480px"
  },
  th: {
    top: [
      {name:"",colspan:"2",rowspan:"1",key:"recordYear"},

      { name: "意识", colspan: "1", rowspan: "3" },
      { name: "T<br/>℃", colspan: "1", rowspan: "3" },
      { name: "P<br/>次/分", colspan: "1", rowspan: "3" },
      { name: "HR<br/>次/分", colspan: "1", rowspan: "3" },
      { name: "R<br/>次/分", colspan: "1", rowspan: "3" },
      { name: "BP<br/>mmHg", colspan: "1", rowspan: "3" },
      {
        name: "血<br/>氧<br/>饱<br/>和<br/>度<br/>%",
        colspan: "1",
        rowspan: "3"
      },
      { name: "入量", colspan: "2", rowspan: "1" },
      { name: "出量", colspan: "3", rowspan: "1" },
      {
        key: "fieldSix",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        name: "",
      },
      {
        key: "fieldSeven",
        colspan: "1",
        rowspan: "3",
        name: "",
        canSet: true,
      },
      {
        name: "",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEight",
      },
      {
        name: "",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldNine",
      },
      {
        name: "",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTen",
      },
      {
        name: "",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
      },
      {
        name: "",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldThirteen",
      },
      {
        name: "",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldFourteen",
      },
      {
        name: "",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEleven",
      },
      {
        name: "",
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldFifteen",
      },
      {name: "特殊情况记录",colspan: "1",rowspan: "3",style: { minWidth: "260px", maxWidth: "260px" }},
      {
        name: "护士签名",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "50px", maxWidth: "50px" }
      },
      {
        name: "查房签名",
        colspan: "1",
        rowspan: "3",
        style: { minWidth: "50px", maxWidth: "50px" },
        noPrint:true
      }
    ],
    mid: [
      {
        name: "日期",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "时间",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      { name: "内<br/>容", colspan: "1", rowspan: "2" },
      { name: "量<br/>ml", colspan: "1", rowspan: "2" },
      { name: "内<br/>容", colspan: "1", rowspan: "2" },
      { name: "量<br/>ml", colspan: "1", rowspan: "2" },
      { name: "颜<br/>色<br/>性<br/>状", colspan: "1", rowspan: "2" }
    ],
    bottom: []
  }
};
