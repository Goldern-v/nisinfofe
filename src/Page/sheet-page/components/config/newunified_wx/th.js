// 护理记录单（统一护理记录单）
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1700px"
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
        P/HR
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
        Bp<br/>mmHg
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
        疼痛
        `,
        style: {},
        colspan: "3",
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
        意识
        `,
        style: {
          minWidth: "65px",
          maxWidth: "65px"
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
        name: `精神<br/>状态`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `食欲<br>情况`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `咽部<br>情况`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `扁桃<br>体`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `咳嗽<br>类型`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `肺部<br>听诊`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `腹部<br>评估`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `肠鸣<br>音<br>次/分`,
        style: {},
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
        key: "field21",
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
        key: "field22",
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
        key: "field23",
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
        key: "field24",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题5`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field25",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题6`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field26",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `标题15`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "field7",
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
    mid: [{
        name: `
        ℃
        `,
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        次/
        `,
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        次/
        `,
        colspan: "1",
        rowspan: "1"
      },
      {
        name: `
        部位
        `,
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        性质
        `,
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
        静脉
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        饮食
        `,
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `名称`,
        style: {
          minWidth: "50px",
        },
        colspan: "1",
        rowspan: "2"
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
        style: {},
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `方式`,
        style: {
          minWidth: "35px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `量`,
        style: {},
        colspan: "1",
        rowspan: "2"
      }
    ],
    bottom: [{
        name: `

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
        分
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
        分
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
        性质
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
        性质
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "90px",
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
      }
    ]
  }
};
