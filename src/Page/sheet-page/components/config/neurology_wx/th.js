export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1650px"
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
        R<br/>(次/分)
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
        疼痛
        `,
        style: {},
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        血糖
        `,
        style: {},
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        SPO<sub>2</sub><br>(%)
        `,
        style: {
          minWidth: "31px",
          maxWidth: "31px"
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
        吸氧<br>升/分
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
        瞳孔
        `,
        style: {},
        colspan: "4",
        rowspan: "1"
      },

      {
        name: `肢体肌力`,
        style: {},
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `肠鸣音`,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `呼吸音`,
        style: {},
        colspan: "1",
        rowspan: "3"
      },

      {
        name: `标题1`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field18",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `标题2`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field19",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `标题3`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field20",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `标题4`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field21",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `标题5`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field22",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `标题6`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field23",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `标题7`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field24",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `标题8`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field25",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      // {
      //   name: `标题5`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "field24",
      //   style: {
      //     minWidth: "37px",
      //     maxWidth: "37px"
      //   }
      // },
      // {
      //   name: `标题6`,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      //   canSet: true,
      //   key: "field25",
      //   style: {
      //     minWidth: "37px",
      //     maxWidth: "37px"
      //   }
      // },
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
        部位
        `,
        style: {
          minWidth: "40px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        性质
        `,
        style: {
          minWidth: "40px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        评分
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        mmol/l
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        鼻塞
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        面罩
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        饮食
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        静脉
        `,
        colspan: "2",
        rowspan: "1"
      },

      {
        name: ``,
        style: {},
        colspan: "3",
        rowspan: "1",
        canSet: true,
        key: "field10"
      },

      {
        name: `
        直径mm
        `,

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
        左
        `,

        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        右
        `,
        colspan: "2",
        rowspan: "1"
      }
    ],
    bottom: [
      {
        name: `
        性质
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "40px",
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
          minWidth: "40px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `
        性质
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "40px",
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
          minWidth: "40px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: `名称`,
        style: {
          minWidth: "40px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `性质`,
        style: {
          minWidth: "40px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `量`,
        style: {
          minWidth: "40px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `左`,
        style: {},
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `右`,
        style: {},
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `左`,
        style: {},
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `右`,
        style: {},
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `上`,
        style: {},
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `下`,
        style: {},
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `上`,
        style: {},
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `下`,
        style: {},
        colspan: "1",
        rowspan: "1"
      }
    ]
  }
};
