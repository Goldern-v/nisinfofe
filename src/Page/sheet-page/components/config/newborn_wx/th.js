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
        T
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
        style: {
          whiteSpace: "nowrap",
          minWidth: "34px"
        }
      },
      {
        name: `
        HR
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        R
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
        style: {
          whiteSpace: "nowrap",
          minWidth: "38px"
        }
      },
      {
        name: `
        吸氧
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        入量 (ml)
        `,
        colspan: "4",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        出量 (ml)
        `,
        colspan: "3",
        rowspan: "1",
        canSet: false
      },
      {
        name: `
        吸<br/>允<br/>力
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `
        皮肤<br/>颜色
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
        黄疸
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
        哭声
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "55px",
          maxWidth: "55px"
        }
      },
      {
        name: `
        脐部<br/>情况
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
        呕吐
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field13",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题2`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field14",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题3`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field15",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题4`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field16",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `
        病情观察及治疗
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
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3"
      // }
    ],
    mid: [
      {
        name: `
        ℃
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        次/分
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        次/分
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        方式
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `
        流量
        `,
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        饮食
        `,
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        小便
        `,
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        大便
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `性质`,
        style: {
          minWidth: "50px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `量`,
        style: {
          minWidth: "30px",
          maxWidth: "30px"
        },
        colspan: "1",
        rowspan: "2"
      }
    ],
    bottom: [
      {
        name: `
        升/分
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
        奶
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
        量
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
        水
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
        量
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
        次数
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "55px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        颜色
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "55px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        次数
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "55px",
          whiteSpace: "nowrap"
        }
      }
    ]
  }
};
