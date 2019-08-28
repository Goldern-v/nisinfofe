export default {
  // 科室的名称
  deptType: "",
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
        温箱编号
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "20px"
        }
      },
      {
        name: `
        温度<br/>(℃)
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
        T<br/>(℃)
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
        HR<br/>(次<br/>/分)
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
        R(次<br/>/分)
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
        SPO<sub>2</sub><br>(%)
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
        肤<br/>色
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
        体<br/>位
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
        入量
        `,
        colspan: "3",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        出量
        `,
        colspan: "3",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        喂养
        `,
        colspan: "2",
        rowspan: "1",
        canSet: false
      },
      {
        name: `标题3`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldFifteen",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `标题4`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSixteen",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `标题5`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSeventeen",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
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
      },
      {
        name: `
        审核签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [
      {
        name: `
        静脉<br>(ml)
        `,
        style: {
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        奶<br>(ml)
        `,
        style: {
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldNine",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        大便g/性状
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        小便<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        }
      },
      {
        name: `标题2`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        }
      },
      {
        name: `
        方式
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        种类
        `,
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
        colspan: "1",
        rowspan: "2"
      }
    ],
    bottom: []
  }
};
