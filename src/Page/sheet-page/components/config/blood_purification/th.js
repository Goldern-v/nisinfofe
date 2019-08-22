export default {
  // 科室的名称
  deptType: "",
  style: {
    // width: "100%"
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
        P/HR<br/>(次/分)
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
        动脉压(mmHg或kPa)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "38px"
        }
      },
      {
        name: `
        静脉压(mmHg或kPa)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "38px"
        }
      },
      {
        name: `
        跨膜压(mmHg或kPa)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "38px"
        }
      },
      {
        name: `
        血流量(ml/min)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "38px"
        }
      },
      {
        name: `
        肝素钠（mg)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "38px"
        }
      },
      {
        name: `
        低分子肝素钙（iu）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "38px"
        }
      },
      {
        name: `
        实际超滤量(ml)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "38px"
        }
      },
      {
        name: `
        电导度ms/cm
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "38px"
        }
      },

      {
        name: `
        病情记录
        `,
        style: {
          minWidth: "153px",
          maxWidth: "153px"
        },
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [],
    bottom: []
  }
};
