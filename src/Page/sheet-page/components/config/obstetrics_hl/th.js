export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1240px"
  },
  th: {
    top: [{
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
        体温<br/>(℃)
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
        脉搏<br/>(次/分)
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
        呼吸<br/>(次/分)
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
        血氧饱和度><br>(%)
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `神志
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
        name: `宫底<br>高度`,
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
        name: `腹部<br>术口`,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `留置<br>饮口`,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `饮食`,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `肛门<br/>排气`,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: ``,
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
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldTen",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      }, {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "260px",
          maxWidth: "260px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        签名
        `,
        style: {},
        colspan: "1",
        rowspan: "2"
      },
    ],
    mid: [{
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
