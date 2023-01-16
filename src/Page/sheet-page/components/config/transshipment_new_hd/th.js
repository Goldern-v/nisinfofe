import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1280px"
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
      // {
      //   name: `
      //   疫苗接种
      //   `,
      //   colspan: "3",
      //   rowspan: "1",
      //   style: {
      //     minWidth: "27px"
      //   }
      // },
      {
        name: `
        新冠十大症状
        `,
        colspan: "10",
        rowspan: "1",
        style: {
          minWidth: "27px"
        }
      },
      // {
      //   name: `
      //   核酸检测
      //   `,
      //   colspan: "2",
      //   rowspan: "1",
      //   style: {
      //     minWidth: "103px",
      //     maxWidth: "103px"
      //   },
      // },
      {
        name: ``,
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
        name: ``,
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
        name: ``,
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
        name: ``,
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
        name: ``,
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
        name: ``,
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
        name: ``,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "fieldSeven",
      },
      {
        name: ``,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        canSet: true,
        key: "fieldEight",
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
      // {
      //   name: `
      //   第一针
      //   `,
      //   colspan: "1",
      //   rowspan: "2",
      //   style: {
      //     minWidth: "28px",
      //     maxWidth: "28px"
      //   },

      // },
      // {
      //   name: `
      //   第二针
      //   `,
      //   colspan: "1",
      //   rowspan: "2",
      //   style: {
      //     minWidth: "28px",
      //     maxWidth: "28px"
      //   },
      // },
      // {
      //   name: `
      //   第三针
      //   `,
      //   colspan: "1",
      //   rowspan: "2",
      //   style: {
      //     minWidth: "28px",
      //     maxWidth: "28px"
      //   },
      // },
      {
        name: `
        发热
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: `
        干咳
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },

      {
        name: `
        乏力
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: `
        鼻塞<br>流涕
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: `
        咽痛
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: `
        结膜炎
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: `
        肌痛
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: `
        腹泻
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: `
        嗅觉减退或消失
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      {
        name: `
        味觉减退或消失
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "28px",
          maxWidth: "28px"
        },
      },
      // {
      //   name: `
      //   第6天
      //   `,
      //   colspan: "1",
      //   rowspan: "2",
      //   style: {
      //     minWidth: "28px",
      //     maxWidth: "28px"
      //   },
      // },
      // {
      //   name: `
      //   第7天
      //   `,
      //   colspan: "1",
      //   rowspan: "2",
      //   style: {
      //     minWidth: "28px",
      //     maxWidth: "28px"
      //   },
      // },
    ],
    bottom: [

    ]
  }
};
