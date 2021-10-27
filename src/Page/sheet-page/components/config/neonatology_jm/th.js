export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1100px"
  },
  th: {
    top: [{
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
        T(℃)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        HR<br/>次/分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        R<br/>次/分
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
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        皮测黄疸值<br/>umol/L
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        反应
        `,
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        吸吮力
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        脐部
        `,
        colspan: "2",
        rowspan: "1",
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
      },
      {
        name: `喂养方式`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `早开奶`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSixteen",
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
        护士签名
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [{
        name: `
        红润
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        发绀
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        黄染
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        良好
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        激惹
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        迟钝
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        强
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        弱
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        渗血
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        无渗血
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: []
  }
};
