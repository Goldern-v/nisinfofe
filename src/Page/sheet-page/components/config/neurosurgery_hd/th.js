import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1440px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          width: "40px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: `
        体温<br/>(℃)
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "30px"
        }
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "30px"
        }
      },
      {
        name: `
        心率<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "30px"
        }
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        style: {
          minWidth: "30px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血压
        `,
        style: {
          minWidth: "48px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意识
        `,
        style: {
          minWidth: "30px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        SPO₂<br/>(%)
        `,
        style: {
          minWidth: "30px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入量
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        出量
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `健康教育`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px",
          maxWidth: "50px"
        }
      },
      {
        name: `瞳孔`,
        style: {},
        colspan: "4",
        rowspan: "1",
        // style: {
        //   minWidth: "40px",
        //   maxWidth: "40px"
        // }
      },
      {
        name: `吸氧<br/>升/分`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `人工<br/>气道<br/>途径`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: `头痛`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `指尖<br/>血糖<br/>mmol/L`,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "37px",
          maxWidth: "37px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwelve",
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
        记录人签名
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
        记录人签名
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
      }, {
        name: `
        名称
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
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        }
      },
      {
        name: `
        直径<br/>(mm)
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        对光<br/>反应
        `,
        colspan: "2",
        rowspan: "1",
      },
    ],
    bottom: [{
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "20px",
          maxWidth: "20px"
        }
      }
    ]
  }
};
