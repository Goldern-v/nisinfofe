export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1300px"
  },
  th: {
    top: [{
        name: `
        日期
        `,
        style: {
          minWidth: "40px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        时间
        `,
        style: {
          minWidth: "40px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        生命体征
        `,
        style: {
          // minWidth: "620px",
        },
        colspan: "12",
        rowspan: "1",
      },
      {
        name: `
        出入量
        `,
        style: {
          // minWidth: "143px",
        },
        colspan: "8",
        rowspan: "1",
      },
      {
        name: `
        自定义项目
        `,
        colspan: "4",
        rowspan: "1",
        style: {
          // minWidth: "164px",
        }
      },
      // {
      //   name: `
      //   特殊情况记录
      //   `,
      //   style: {
      //     minWidth: "153px",
      //     maxWidth: "153px"
      //   },
      //   colspan: "1",
      //   rowspan: "3"
      // },
      {
        name: `
       记录人
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "52px",
        },
      },
      {
        name: `
       签名
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "52px",
        },
      }
    ],
    mid: [{
        name: "体温",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "36px",
        },
      },
      {
        name: `
        脉搏
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "36px",
        },
      }, {
        name: `
        呼吸
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "36px",
        },
      }, {
        name: `
        血压
        `,
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        心率
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        疼痛
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        物理<br/>降温
        `,
        style: {
          minWidth: "36px"
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        疼痛<br/>降分
        `,
        style: {
          minWidth: "36px"
        },
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        基础<br/>代谢
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        体重
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        身高
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        血氧<br/>饱和
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        引流量
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        入量
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        痰量
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        大便量
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        大便<br/>次数
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        呕吐量
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        尿量
        `,
        style: {
          minWidth: "36px",
        },
        colspan: "1",
        rowspan: "2"
      }, {
        name: `
        总出量
        `,
        style: {
          minWidth: "78px",
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `自1`,
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldFour",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        }
      },
      {
        name: `自2`,
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldFive",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        }
      },
      {
        name: `自3`,
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldSix",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        }
      },
      {
        name: `自4`,
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldSeven",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        }
      }
    ],
    bottom: []
  }
};
