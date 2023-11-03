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
        name: `腹痛<br/>(评分)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `腹胀`,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `伤口<br/>疼痛<br/>(评分)`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `伤口<br/>敷料`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `尿管<br/>尿色`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `阴道出血ml`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `静脉<br/>镇痛<br/>泵`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `吸氧<br/>升/分`,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `
        静脉导管
        `,
        colspan: "3",
        rowspan: "1",
        canSet:true,
        key:"customTitle4",
        style: {
          minWidth: "103px",
          maxWidth: "103px"
        },
      },
      {
        name: `引流管`,
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
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
      {
        name: `
        腹围cm
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        周围皮肤
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        外露刻度cm
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        通常/堵塞
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
      },
      {
        name: `
        外露刻度cm
        `,
        colspan: "1",
        rowspan: "2",
      },

    ],
    bottom: [
    ]
  }
};
