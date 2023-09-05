export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1100px"
  },
  th: {
    top: [
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: "体温<br/>℃",
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        心率<br/>次/分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        SPO₂<br/>(%)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        肤色
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        皮测黄疸值<br/>(umol/L)
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "70px",
          maxWidth: "70px"
        }
      },
      {
        name: `
        反应
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        吸吮力
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        脐部
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `大便`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `小便`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `血糖<br>(mmol/L)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `喂养方式`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "52px",
          maxWidth: "52px"
        }
      },
      {
        name: `早开奶`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldEighteen",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `标题2`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
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
          minWidth: "180px",
          maxWidth: "180px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
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
        上级护士签名
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [
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
      }
    ],
    bottom: []
  }
};
