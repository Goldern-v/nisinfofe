export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1180px"
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
        name: "观察项目",
        style: {
          height: "20px"
        },
        colspan: "20",
        rowspan: "1"
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
        P<br/>(次/分)
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
        血压<br/>(mmHg)
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
          maxWidth: "40px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        胎位
        `,
        // canSet: true,
        // key: "fieldOne",
        style: {
          minWidth: "38px",
          maxWidth: "38px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        胎心<br/>(次/分)
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
        宫缩
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        宫颈<br/>扩张<br/>(cm)
        `,
        style: {},
        colspan: "1",
        autoComplete: {
          data: [1, 2]
        },
        rowspan: "2",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        先露<br/>高低<br/>(cm)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
        // canSet: true,
        // key: "fieldSix",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        宫颈<br/>管
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
        胎膜
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
        // canSet: true,
        // key: "fieldEight",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        羊水<br/>性状
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
        血糖<br/>(mmol/l)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          whiteSpace: "nowrap",
          minWidth: "50px"
        }
      },
      {
        name: `
        胎动<br/>(次/h)
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
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: `标题2`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldThirteen",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: `标题3`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldFourteen",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: `标题4`,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldFifteen",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      }
    ],
    bottom: [
      {
        name: `
        强<br/>度
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
        style: {
          whiteSpace: "nowrap",
          minWidth: "20px"
        }
      },
      {
        name: `
        持续<br/>/间歇<br/>(s/min)
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
        // canSet: true,
        // key: "fieldFour",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      }
    ]
  }
};
