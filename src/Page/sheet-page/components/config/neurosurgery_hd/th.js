export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1300px"
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
        体温<br/>(℃)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "34px"
        }
      },
      {
        name: `
        脉搏<br/>次/分
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
        心率<br/>次/分
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
        呼吸<br/>次/分
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
        血压
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
        SPO₂<br/>(%)
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入量
        `,
        colspan: "2",
        rowspan: "1",
        canSet: false,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `
        出量
        `,
        colspan: "2",
        rowspan: "1",
        canSet: false,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `健<br/>康<br/>教<br/>育`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `瞳孔`,
        style: {},
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `吸氧<br/>升/分`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `人工<br/>气道<br/>途径`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `头<br/>痛`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          // minWidth: "37px",
          // maxWidth: "37px"
        }
      },
      {
        name: `指尖<br/>血糖<br/>mmol/L`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
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
        审核签名
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        记录人签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [
      {
        name: `
        名<br/>称
        `,
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        }
      },
      {
        name: `
        名<br/>称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        直径<br/>(mm)
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        对光<br/>反应
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "28px",
          maxWidth: "28px",
          whiteSpace: "nowrap"
        }
      },
    ],
    bottom: [
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      }
    ]
  }
};
