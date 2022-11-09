import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1250px"
  },
  th: {
    top: [{
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
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        心率<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "55px"
        }
      },
      {
        name: `
        意识
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        SPO<sub>2</sub><br>(%)
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入量
        `,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "27px"
        }
      },
      {
        name: `
        出量
        `,
        colspan: "3",
        rowspan: "1",
        style: {
          minWidth: "27px"
        }
      },
      {
        name: `
        健康教育
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "103px",
          maxWidth: "103px"
        },
      },
      {
        name: `标题1`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "fieldOne",
      },
      {
        name: `标题2`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "fieldTwo",
      },
      {
        name: `标题3`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "fieldThree",
      },
      {
        name: `标题4`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "fieldFour",
      },
      {
        name: `标题5`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "fieldFive",
      },
      {
        name: `标题6`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "fieldSix",
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "158px",
          maxWidth: "158px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        记录人<br/>签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        质控人<br/>签名
        `,
        colspan: "1",
        rowspan: "3",
      }
    ],
    mid: [{
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },

      },
      {
        name: `
        量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "65px",
          maxWidth: "65px"
        },
      },
      {
        name: `
        量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        颜色
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      }
    ],
    bottom: [

    ]
  }
};
