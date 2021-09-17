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
        name: "体温<br/>℃",
        style: {
          width: "30px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          width: "30px"
        }
      },
      {
        name: `
        心率<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          width: "30px"
        }
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          width: "30px"
        }
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意识
        `,
        style: {
          width: "53px",
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
          width: "31px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        入量
        `,
        style: {
          minWidth: '96px',
        },
        colspan: "2",
        rowspan: "1"
      },
      {
        name: `
        出量
        `,
        style: {
          minWidth: '136px',
        },
        colspan: "3",
        rowspan: "1"
      },
      {
        name: `
        健康教育
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '53px',
        },
      },
      {
        name: `标题1`,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldOne",
      },
      {
        name: `标题2`,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldTwo",
      },
      {
        name: `标题3`,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldThree",
      },
      {
        name: `标题4`,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldFour",
      },
      {
        name: `标题5`,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldFive",
      },
      {
        name: `标题6`,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSix",
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "150px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        记录人<br/>签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px",
        },
      },
      {
        name: `
        记录人<br/>签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px",
        },
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
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
        
      },
      {
        name: `
        量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "30px"
        },
      },
      {
        name: `
        名称
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        量<br/>ml
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "30px"
        },
      },
      {
        name: `
        颜色
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "40px"
        },
      }
    ],
    bottom: [

    ]
  }
};
