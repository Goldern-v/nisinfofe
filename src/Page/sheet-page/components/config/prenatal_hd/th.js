import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1280px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "82px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: `
        体温<br/>℃
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "26px",
          maxWidth: "26px",
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
          whiteSpace: "nowrap",
          minWidth: "26px",
          maxWidth: "26px",
        }
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          whiteSpace: "nowrap",
          minWidth: "26px",
          maxWidth: "26px",
        }
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意识
        `,
        style: {
          minWidth: "44px",
          maxWidth: "44px",
          whiteSpace: "nowrap"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血氧饱和度(%)
        `,
        style: {
          minWidth: "20px",
          maxWidth: "20px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        指尖血糖<br/>mmol/L
        `,
        style: {
          minWidth: "20px",
          maxWidth: "20px",
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        阴道<br/>出血<br/>(ml)
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        }
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `健康宣教`,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldFive",
        style: {
          minWidth: "60px",
          maxWidth: "60px",
          whiteSpace: "nowrap"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSix",
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
        key: "fieldSeven",
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
        key: "fieldEight",
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
        key: "fieldNine",
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
        key: "fieldTen",
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
        key: "fieldEleven",
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
        护士<br>签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士<br>签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [{
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      },
      {
        name: "内容",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "量<br/>(ml)",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "内容",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "量<br/>(ml)",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "颜色",
        style: {
          minWidth: "36px",
          maxWidth: "36px"
        },
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [

    ]
  }
};
