export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1060px"
  },
  th: {
    top: [{
        name: "日期",
        style: {
          width: "36px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "时间",
        style: {
          width: "36px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        体<br/>温<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "40px"
        }
      },
      {
        name: `
        呼<br/>吸<br/>次<br/>/<br/>分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        key: "",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        心<br/>率<br/>次<br/>/<br/>分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "52px",
          maxWidth: "52px",
        }
      },
      {
        name: `
        Spo<sub>2</sub><br>(%)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "31px",
          maxWidth: "31px"
        }
      },
      {
        name: `
        反<br/>应
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
          textAlign: "center"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        哭<br/>声
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        肌<br/>张<br/>力
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        吸<br/>吮<br/>力
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入量(ml)
        `,
        colspan: "2",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        出量(ml)
        `,
        colspan: "2",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        护理记录
        `,
        style: {
          minWidth: "306px",
          maxWidth: "306px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [{
        name: `
        项目
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        量
        `,
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        项目
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        量
        `,
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
        colspan: "1",
        rowspan: "2"
      }
    ],
    bottom: []
  }
};
