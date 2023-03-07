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
    width: "1300px"
  },
  th: {
    top: [
      {
        name: "",
        style: {},
        colspan: "2",
        rowspan: "1",
        key: "recordYear"
      },
      { name: "意<br/>识", colspan: "1", rowspan: "2" },
      { name: "T<br/>℃", colspan: "1", rowspan: "2" },
      { name: "p<br/>次/分", colspan: "1", rowspan: "2" },
      { name: "HR<br/>次/分", colspan: "1", rowspan: "2" },
      { name: "R<br/>次/分", colspan: "1", rowspan: "2" },
      { name: "Bp<br/>mnHg", colspan: "1", rowspan: "2" },
      {
        name: "血<br/>氧<br/>饱<br/>和<br/>度<br/>%",
        colspan: "1",
        rowspan: "2"
      },
      { name: "入量", colspan: "2", rowspan: "1" },
      { name: "出量", colspan: "3", rowspan: "1" },
      // {
      //   name: "",
      //   colspan: "1",
      //   rowspan: "2",
      //   canSet: true,
      //   key: "fieldSix",
      //   style: { minWidth: "40px", maxWidth: "40px" }
      // },
      // {
      //   name: "",
      //   colspan: "1",
      //   rowspan: "2",
      //   canSet: true,
      //   key: "fieldSeven",
      //   style: { minWidth: "40px", maxWidth: "40px" }
      // },
      {
        key: "fieldSix",
        colspan: "1",
          rowspan: "2",
        name: "瞳孔<br/>大小<br/>左/右<br/>mm",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        key: "fieldSeven",
        colspan: "1",
          rowspan: "2",
        name: "瞳孔<br/>反光<br/>左/右<br/>mm",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldEight",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldNine",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldTen",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldTwelve",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldThirteen",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "",
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldFourteen",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "特殊情况记录",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "300px", maxWidth: "300px" }
      },
      {
        name: "护士签名",
        colspan: "1",
        rowspan: "2",
        style: { minWidth: "50px", maxWidth: "50px" }
      }
    ],
    mid: [
      {
        name: "日期",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      {
        name: "时间",
        colspan: "1",
        rowspan: "1",
        style: { minWidth: "40px", maxWidth: "40px" }
      },
      { name: "内<br/>容", colspan: "1", rowspan: "1" },
      { name: "量<br/>ml", colspan: "1", rowspan: "1" },
      { name: "内<br/>容", colspan: "1", rowspan: "1" },
      { name: "量<br/>ml", colspan: "1", rowspan: "1" },
      { name: "颜<br/>色<br/>性<br/>状", colspan: "1", rowspan: "1" }
    ],
    bottom: []
  }
};
