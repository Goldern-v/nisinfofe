import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1300px"
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
        name: "T<br/>℃",
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `
        P/HR<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `
        R<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `
        BP<br/>mmHg
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "55px"
        }
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
        意识
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        瞳孔
        `,
        colspan: "4",
        rowspan: "1",
        style: {
          minWidth: "103px",
          maxWidth: "103px"
        },
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
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "27px"
        }
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
        key: "customTitle1",
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
        key: "customTitle2",
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
        key: "customTitle3",
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
        key: "customTitle4",
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
        key: "customTitle5",
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
        key: "customTitle6",
      },
      {
        name: `标题7`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "customTitle7",
      },
      {
        name: `标题8`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "customTitle8",
      },
      {
        name: `标题9`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "customTitle9",
      },
      {
        name: `标题10`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "customTitle10",
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
        mm
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        对光反射
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "35px",
          maxWidth: "35px"
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
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `
        量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
      },

    ],
    bottom: [
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        左
        `,
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        右
        `,
        colspan: "1",
        rowspan: "1",
      },

    ]
  }
};
