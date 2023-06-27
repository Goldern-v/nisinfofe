export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1100px"
  },
  th: {
    top: [
      {
        name: "日期",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: "时间",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        T<br/>(℃)
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "34px"
        }
      },
      {
        name: `
        P/HR<br/>(次/分)
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        R<br/>(次/分)
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        Bp<br/>(mmHg)
        `,
        style: {
          minWidth: "52px",
          maxWidth: "52px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意识
        `,
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        瞳孔
        `,
        style: {},
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        肌力
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        言语
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        }
      },
      {
        name: `
        皮肤黏<br/>膜出血
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        }
      },
      {
        name: `
        血尿/黑便
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        }
      },
      {
        name: `标题1`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSix",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `标题2`,
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSeven",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px"
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
    mid: [
      {
        name: `
        大小(mm)
        `,
        style: {
          whiteSpace: "nowrap"
        },
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        反射
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        右上肢/<br/>右下肢
        `,
        style: {
          minWidth: "68px",
          maxWidth: "68px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        左上肢/<br/>左下肢
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "68px",
          maxWidth: "68px"
        }
      }
    ],
    bottom: [
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "25px",
          whiteSpace: "nowrap"
        }
      }
    ]
  }
};
