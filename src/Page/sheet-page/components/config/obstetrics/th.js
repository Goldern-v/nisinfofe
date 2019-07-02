export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1120px"
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
        rowspan: "2"
      },
      {
        name: "时间",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        T<br/>(℃)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          whiteSpace: "nowrap",
          minWidth: "34px"
        }
      },
      {
        name: `
        P/HR<br/>(次/分)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        R<br/>(次/分)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
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
        rowspan: "2"
      },
      {
        name: `
        SpO<sub>2</sub><br>(%)
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        入
        `,
        colspan: "2",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        出
        `,
        colspan: "2",
        rowspan: "1",
        canSet: false
      },
      {
        name: `乳房<br>情况`,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `泌乳<br>情况`,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `宫底<br>高度<br>U=Fb`,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `子宫<br>收缩`,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `伤口`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldFive",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `留置尿管`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldSix",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `留置镇痛泵`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldSeven",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `受压皮肤`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldEight",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldNine",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
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
        rowspan: "2"
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        审核签名
        `,
        style: {},
        colspan: "1",
        rowspan: "2"
      }
    ],
    mid: [
      {
        name: `
        名称
        `,
        style: {
          minWidth: "68px",
          maxWidth: "68px"
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: `
        名称
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "32px",
          maxWidth: "32px",
          whiteSpace: "nowrap"
        }
      }
    ],
    bottom: []
  }
};
